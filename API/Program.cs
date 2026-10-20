using API.Middleware;
using API.SignalR;
using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.Validators;
using Domain;
using FluentValidation;
using Infrastructure;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddSignalR();
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));
});
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<EditProfileValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("IsActivityHost", policy =>
    {
        policy.Requirements.Add(new IsHostRequirement());
    });
builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(options => options.AllowAnyMethod().AllowAnyHeader()
    .AllowCredentials()
    .WithOrigins("http://localhost:3000", "https://localhost:3000" ));

app.UseAuthentication();
app.UseAuthorization();

//Middleware that provides the routing
app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();
app.MapHub<CommentHub>("/comments");

// creating a service scope, when this method goes outside the scope anything we use will dispose by the framework
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    //gives access to the db context
    var context = services.GetRequiredService<AppDbContext>();
    var userManager = services.GetRequiredService<UserManager<User>>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context, userManager);
}
catch (Exception e)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "An error occurred seeding the DB.");
}

app.Run();

using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken) ??
                           throw new Exception($"Activity with id {request.Activity.Id} not found");
            
            mapper.Map(request.Activity, activity);
            
            /*activity.Title = request.Activity.Title;
            activity.Date = request.Activity.Date;
            activity.Description = request.Activity.Description;
            activity.Category = request.Activity.Category;
            activity.IsCancelled = request.Activity.IsCancelled;
            activity.City = request.Activity.City;
            activity.Venue = request.Activity.Venue;
            activity.Latitude = request.Activity.Latitude;
            activity.Longitude = request.Activity.Longitude;*/
            
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
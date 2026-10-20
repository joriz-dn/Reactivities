using System.Security.Claims;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext appDbContext) 
    : IUserAccessor
{
    public string GetUserId()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) 
               ?? throw new Exception("No user found");
    }

    public async Task<User> GetUserAsync(CancellationToken cancellationToken = default)
    {
        return await appDbContext.Users.FindAsync(GetUserId(), cancellationToken)
            ?? throw new UnauthorizedAccessException("No user is logged in");
    }

    public async Task<User> GetUserWithPhotosAsync()
    {
        var userId = GetUserId();
        return await appDbContext.Users
                   .Include(x => x.Photos)
                   .FirstOrDefaultAsync(x => x.Id == userId)
               ?? throw new UnauthorizedAccessException("No user is logged in");
    }
}
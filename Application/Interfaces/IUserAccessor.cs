using System.Security.Claims;
using Domain;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetUserAsync(CancellationToken cancellationToken = default); 
    Task<User> GetUserWithPhotosAsync();
}
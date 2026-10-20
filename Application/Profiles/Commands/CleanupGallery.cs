using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class CleanupGallery
{
    public class Command : IRequest<Result<Unit>>{}

    public class Handler(AppDbContext context, IUserAccessor userAccessor, IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();
            foreach (var photo in user.Photos.ToList().Where(photo => user.ImageUrl != photo.Url))
            {
                await photoService.DeletePhoto(photo.PublicId);
                user.Photos.Remove(photo);
            }
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to Clean up Gallery", 400);
        }
    }
}
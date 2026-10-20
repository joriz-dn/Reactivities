using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class FollowToggle
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string TargetUserId { get; set; }
    }
    
    public class Handler(AppDbContext appDbContext, IUserAccessor userAccessor): IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var observer = await userAccessor.GetUserAsync(cancellationToken);
            var target = await appDbContext.Users.FindAsync([request.TargetUserId], cancellationToken);
            
            if (target == null) return Result<Unit>.Failure("Target user not found", 400);
            if (request.TargetUserId == observer.Id) return Result<Unit>.Failure("Can't follow yourself", 400);

            var following =
                await appDbContext.UserFollowings.FindAsync([observer.Id, request.TargetUserId], cancellationToken);

            if (following == null)
                appDbContext.UserFollowings.Add(new UserFollowing
                {
                    ObserverId = observer.Id,
                    TargetId =  request.TargetUserId
                });
            else
                appDbContext.UserFollowings.Remove(following);
            
            var result = await appDbContext.SaveChangesAsync(cancellationToken) > 0;
            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating follow", 400);
        }
    }
}
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditProfileDto EditProfileDto { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext appDbContext) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync(cancellationToken);
            user.DisplayName = request.EditProfileDto.DisplayName;
            user.Bio = request.EditProfileDto.Bio;
            var aa = appDbContext.Entry(user).State;
            if (appDbContext.Entry(user).State == EntityState.Unchanged)
            {
                return Result<Unit>.Failure("No changes were made.", 400);
            }
            
            var result = await appDbContext.SaveChangesAsync(cancellationToken) > 0;
            return result ? Result<Unit>.Success(Unit.Value) :  Result<Unit>.Failure("Error updating profile.", 400);
        }
    }
}
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required UpdateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.ActivityDto.Id], cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found");
            
            mapper.Map(request.ActivityDto, activity);
            
            /*activity.Title = request.Activity.Title;
            activity.Date = request.Activity.Date;
            activity.Description = request.Activity.Description;
            activity.Category = request.Activity.Category;
            activity.IsCancelled = request.Activity.IsCancelled;
            activity.City = request.Activity.City;
            activity.Venue = request.Activity.Venue;
            activity.Latitude = request.Activity.Latitude;
            activity.Longitude = request.Activity.Longitude;*/
            
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return !result ? Result<Unit>.Failure("Failed to update activity", 400) : Result<Unit>.Success(Unit.Value);
        }
    }
}
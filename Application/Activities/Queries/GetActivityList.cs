using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<Result<PagedList<ActivityDto, DateTime?>>>
    {
        public required ActivityParams ActivityParams { get; set; }
    }
    
    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<ActivityDto, DateTime?>>>
    {
        public async Task<Result<PagedList<ActivityDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Activities
                .OrderBy(x => x.Date)
                .Where(x => x.Date >= (request.ActivityParams.Cursor ?? request.ActivityParams.StartDate))
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.ActivityParams.Filter))
            {
                query = request.ActivityParams.Filter switch
                {
                    "isGoing" => query.Where(x => x.Attendees.Any(y => y.UserId == userAccessor.GetUserId())),
                    "isHost" => query.Where(x =>
                        x.Attendees.Any(x => x.IsHost && x.UserId == userAccessor.GetUserId())),
                    _ => query
                };
            }

            var projectedQuery = query.ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                new { currentUserId = userAccessor.GetUserId() });
            
            var activities = await projectedQuery
                .Take(request.ActivityParams.PageSize + 1)
                .ToListAsync(cancellationToken: cancellationToken);
            
            DateTime? nextCursor = null;
            if (activities.Count > request.ActivityParams.PageSize)
            {
                nextCursor = activities.Last().Date;
                activities.RemoveAt(activities.Count - 1);
            }

            return Result<PagedList<ActivityDto, DateTime?>>.Success(
                new PagedList<ActivityDto, DateTime?>
                {
                    Items = activities,
                    NextCursor = nextCursor
                });
        }
    }
}
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfileActivities
{
    public class Query : IRequest<Result<List<ProfileActivityDto>>>
    {
        public required string ProfileId { get; set; }
        public required string Predicate { get; set; }
    }
    
    public class Handler(AppDbContext appDbContext, IMapper mapper) : IRequestHandler<Query, Result<List<ProfileActivityDto>>>
    {
        public async Task<Result<List<ProfileActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = appDbContext.Activities
                .OrderBy(x => x.Date)
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Predicate))
            {
                query = request.Predicate switch
                {
                    "future" => query.Where(x => x.Attendees.Any(y => y.UserId == request.ProfileId && (DateTime.UtcNow < x.Date))),
                    "past" => query.Where(x => x.Attendees.Any(y => y.UserId == request.ProfileId && (DateTime.UtcNow > x.Date))),
                    "hosting" => query.Where(x =>
                        x.Attendees.Any(y => y.IsHost && y.UserId == request.ProfileId)),
                    _ => query
                };
            }
            
            var projectedQuery = await query.ProjectTo<ProfileActivityDto>(mapper.ConfigurationProvider,
                new { currentUserId = request.ProfileId }).ToListAsync(cancellationToken);
            
            return Result<List<ProfileActivityDto>>.Success(projectedQuery);
        }
    }
}
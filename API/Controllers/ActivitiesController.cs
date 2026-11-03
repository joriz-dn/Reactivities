using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController() : ApiController.BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<PagedList<ActivityDto, DateTime?>>> GetActivities([FromQuery] ActivityParams activityParams, CancellationToken cancellationToken)
    {
        return HandleResult(await Mediator.Send(new GetActivityList.Query { ActivityParams = activityParams },
            cancellationToken));
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> GetActivity(string id)
    {
        return HandleResult(await Mediator.Send(new GetActivity.Query{Id = id}));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto createActivity)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { CreateActivityDto = createActivity }));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult<Activity>> UpdateActivity(string id, UpdateActivityDto activity)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new UpdateActivity.Command { ActivityDto = activity }));
    }
    
    [HttpDelete("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult<Activity>> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult> Attend(string id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
    }
} 
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController() : ApiController.BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Activity>>> GetActivities(CancellationToken cancellationToken)
    {
        return await Mediator.Send(new GetActivityList.Query(), cancellationToken);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(string id)
    {
        return HandleResult(await Mediator.Send(new GetActivity.Query{Id = id}));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto createActivity)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { CreateActivityDto = createActivity }));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Activity>> UpdateActivity(string id, UpdateActivityDto activity)
    {
        return HandleResult(await Mediator.Send(new UpdateActivity.Command { ActivityDto = activity }));
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult<Activity>> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }
} 
using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
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
        return await Mediator.Send(new GetActivity.Query{Id = id});
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        return await Mediator.Send(new CreateActivity.Command { Activity = activity });
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Activity>> UpdateActivity(string id, Activity activity)
    {
        await Mediator.Send(new UpdateActivity.Command { Activity = activity });
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult<Activity>> UpdateActivity(string id)
    {
        await Mediator.Send(new DeleteActivity.Command { Id = id });
        return Ok();
    }
} 
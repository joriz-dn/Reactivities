using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ApiController : Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class  BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>() ??
                                                      throw new InvalidOperationException("Mediator not registered");

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            return result switch
            {
                { IsSuccess: false, Code: 404 } => NotFound(),
                { IsSuccess: true, Value: not null } => Ok(result.Value),
                _ => BadRequest(result.Error)
            };
        }
    }
}
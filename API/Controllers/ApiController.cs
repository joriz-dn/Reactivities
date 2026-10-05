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
    }
}
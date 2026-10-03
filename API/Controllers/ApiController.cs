using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ApiController : Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class  BaseApiController : ControllerBase
    {
        
    }
}
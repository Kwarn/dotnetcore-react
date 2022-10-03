using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // whatever the controller class is called minus "controller"
    public class BaseApiController: ControllerBase
    {
        
    }
}
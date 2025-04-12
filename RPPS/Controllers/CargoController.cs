using Microsoft.AspNetCore.Mvc;
using RPPS.Models;

namespace RPPS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CargoController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllFreeCargos()
        {

            List<CargoObj> cargos = CargoObj.GetAllFreeCargo();

            return Ok(cargos)
;
        }

        [HttpPut]
        public IActionResult AssignToOrder(CargoAssignmentRequest obj) {
            CargoObj.AssignOrderId(obj);
            return Ok();
        }
    }
}

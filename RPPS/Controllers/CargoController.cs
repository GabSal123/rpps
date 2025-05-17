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
        [HttpGet]
        [Route("CargosOfOrder")]
        public IActionResult GetSelectedCargos(int orderId) {
            List<CargoObj> cargos = CargoObj.GetOrderCargos(orderId);
            return Ok(cargos);

        }

        [HttpPut]
        public IActionResult AssignToOrder(CargoAssignmentRequest obj) {
            CargoObj.AssignOrderId(obj);
            return Ok();
        }
    }
}

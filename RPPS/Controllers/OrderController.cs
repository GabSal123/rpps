using Microsoft.AspNetCore.Mvc;
using RPPS.Models;
namespace RPPS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            
            List<OrderObj> orders = OrderObj.GetAllOrders();

            return Ok(orders)
;
        }
        private static bool ValidOrder(OrderObj order) {

            return true;
        }

        [HttpGet]
        [Route("GetOne")]
        public IActionResult Get(int id)
        {
            int carId = OrderObj.GetOrder(id).CarId;
            return Ok(carId);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            int carId = OrderObj.GetOrder(id).CarId;
            if(carId == 0)
            {
                return NotFound("No car");
            }
            bool deleted = OrderObj.Delete(id);
            if (deleted)
            {
                CargoObj.FreeCargosFromOrder(id);
                Car.ChangeState(carId, 1);
                return Ok("Deleted!");
            }
            else {
                return BadRequest(":(");
            }
        }

        [HttpPut]
        [Route("Update")]
        public IActionResult UpdateOrderCarIdAndCargoCount(int orderId, int newCarId, int cargoCount) {
            var order = OrderObj.GetOrder(orderId);
            int carId = order.CarId;
            if (carId == 0)
            {
                return NotFound("No car");
            }
            Car.ChangeState(carId, 1);

            CargoObj.FreeCargosFromOrder(orderId);

            Car.ChangeState(newCarId, 4);

            OrderObj.ChangeOrderCarId(orderId, newCarId);

            OrderObj.ChangeCargoCount(orderId, cargoCount);

            return Ok(order.Id);
        }

        [HttpPost]
        public IActionResult Create([FromBody] OrderObj order) {
            foreach (var i in order.selectedCargoIds) {
                Console.WriteLine(i);
            }
            Console.Write(order.CarId);

            if (ValidOrder(order))
            {
                int orderId = OrderObj.Create(order);
                return Ok(orderId);
            }
            return BadRequest();
        }
        private static int GetOrderType(int orderId)
        {
            List<CargoObj> cargoList = CargoObj.GetAllCargoOfOrder(orderId);

            return cargoList[0].Type;
        }   
    }
}

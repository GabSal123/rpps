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

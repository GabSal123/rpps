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

            foreach (OrderObj order in orders)
            {
                order.Type = GetOrderType(order.Id);

            }
            return Ok(orders)
;
        }

        private static int GetOrderType(int orderId)
        {
            List<CargoObj> cargoList = CargoObj.GetAllCargo(orderId);

            return cargoList[0].Type;
        }   
    }
}

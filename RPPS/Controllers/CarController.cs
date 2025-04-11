using Microsoft.AspNetCore.Mvc;
using RPPS.Models;

namespace RPPS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarController : ControllerBase
    {

        [HttpGet]
        [Route("all")]
        public IActionResult GetAll(int orderType) {

            List<Car> cars = Car.GetAllCars(orderType);
            return Ok(cars);
        }

        [HttpGet]
        public IActionResult Get(int carId)
        {

            Car car = Car.GetCar(carId);
            return Ok(car);
        }
    }
}

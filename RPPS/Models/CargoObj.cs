using MySqlConnector;

namespace RPPS.Models
{
    public class CargoAssignmentRequest
    {
        public List<int> CargoIds { get; set; }
        public int OrderId { get; set; }
    }
    public class CargoObj
    {
        public int Id { get; set; }
        public int Width { get; set; }
        public int Volume { get; set; }
        public int Weight { get; set; }
        public int Quantity { get; set; }
        public int Type { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; } 
        public decimal Cost { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string DestinationCity {get; set;}
        public float StartCoordinateX { get; set; }
        public float StartCoordinateY { get; set; }
        public float EndCoordinateX { get; set; }
        public float EndCoordinateY { get; set; }
        public bool Approved { get; set; }
        public bool Payed { get; set; }
        public bool Done { get; set; }
        public string CanceledReason { get; set; }
        public int? OrderId { get; set; }
        public int CustomerId { get; set; }
        public int PlannerId { get; set; }

        private static string _connectionString;

        public static void SetConnectionString(string connectionString)
        {
            _connectionString = connectionString;
        }

        public static List<CargoObj> GetAllCargoOfOrder(int orderId)
        {
            var cargos = new List<CargoObj>();

            using var connection = new MySqlConnection(_connectionString);
            connection.Open();


            using var command = new MySqlCommand(
                "SELECT id, width, volume, weight, quantity, type, startDate, endDate, cost, Country, City, DestinationCity, " +
                "startCoordinateX, startCoordinateY, endCoordinateX, endCoordinateY, approved, payed, done, " +
                $"CanceledReason, orderid, customerid, plannerId FROM cargoobj WHERE orderid={orderId}", connection);

            using var reader = command.ExecuteReader();

            while (reader.Read())
            {
                cargos.Add(new CargoObj
                {
                    Id = reader.GetInt32(0),
                    Width = reader.GetInt32(1),
                    Volume = reader.GetInt32(2),
                    Weight = reader.GetInt32(3),
                    Quantity = reader.GetInt32(4),
                    Type = reader.GetInt32(ordinal: 5),
                    StartDate = reader.GetDateTime(6),
                    EndDate = reader.GetDateTime(7), 
                    Cost = reader.GetDecimal(8),
                    Country = reader.GetString(9),
                    City = reader.GetString(10),
                    DestinationCity = reader.GetString(11),
                    StartCoordinateX = reader.GetFloat(12),
                    StartCoordinateY = reader.GetFloat(13),
                    EndCoordinateX = reader.GetFloat(14),
                    EndCoordinateY = reader.GetFloat(15),
                    Approved = reader.GetBoolean(16),
                    Payed = reader.GetBoolean(17),
                    Done = reader.GetBoolean(18),
                    CanceledReason = reader.GetString(19),
                    OrderId = reader.GetInt32(20),
                    CustomerId = reader.GetInt32(21),
                    PlannerId = reader.GetInt32(22)
                });
            }
            for(int i=0; i<cargos.Count;i++){
                Console.WriteLine(cargos[i].StartCoordinateX);
            }

            return cargos;
        }

        public static List<CargoObj> GetAllFreeCargo()
        {
            var cargos = new List<CargoObj>();

            using var connection = new MySqlConnection(_connectionString);
            connection.Open();


            using var command = new MySqlCommand(
                "SELECT id, width, volume, weight, quantity, type, startDate, endDate, cost, Country, City, DestinationCity, " +
                "startCoordinateX, startCoordinateY, endCoordinateX, endCoordinateY, approved, payed, done, " +
                $"CanceledReason, orderid, customerid, plannerId FROM cargoobj WHERE orderid IS NULL", connection);

            using var reader = command.ExecuteReader();

            while (reader.Read())
            {
                cargos.Add(new CargoObj
                {
                    Id = reader.GetInt32(0),
                    Width = reader.GetInt32(1),
                    Volume = reader.GetInt32(2),
                    Weight = reader.GetInt32(3),
                    Quantity = reader.GetInt32(4),
                    Type = reader.GetInt32(ordinal: 5),
                    StartDate = reader.GetDateTime(6),
                    EndDate = reader.GetDateTime(7),
                    Cost = reader.GetDecimal(8),
                    Country = reader.GetString(9),
                    City = reader.GetString(10),
                    DestinationCity = reader.GetString(11),
                    StartCoordinateX = reader.GetFloat(12),
                    StartCoordinateY = reader.GetFloat(13),
                    EndCoordinateX = reader.GetFloat(14),
                    EndCoordinateY = reader.GetFloat(15),
                    Approved = reader.GetBoolean(16),
                    Payed = reader.GetBoolean(17),
                    Done = reader.GetBoolean(18),
                    CanceledReason = reader.GetString(19),
                    OrderId = null,
                    CustomerId = reader.GetInt32(21),
                    PlannerId = reader.GetInt32(22)
                });
            }

            return cargos;
        }


        public static void AssignOrderId(CargoAssignmentRequest obj) {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            foreach (int cargoId in obj.CargoIds)
            {
                using var command = new MySqlCommand("UPDATE cargoobj SET orderid = @OrderId WHERE id = @CargoId", connection);
                command.Parameters.AddWithValue("@OrderId", obj.OrderId);
                command.Parameters.AddWithValue("@CargoId", cargoId);
                command.ExecuteNonQuery();
            }
        }
    }
}

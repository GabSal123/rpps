using MySqlConnector;

namespace RPPS.Models
{
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
        public int StartCoordinateX { get; set; }
        public int StartCoordinateY { get; set; }
        public int EndCoordinateX { get; set; }
        public int EndCoordinateY { get; set; }
        public bool Approved { get; set; }
        public bool Payed { get; set; }
        public bool Done { get; set; }
        public string CanceledReason { get; set; }
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int PlannerId { get; set; }

        private static string _connectionString;

        public static void SetConnectionString(string connectionString)
        {
            _connectionString = connectionString;
        }

        public static List<CargoObj> GetAllCargo(int orderId)
        {
            var cargos = new List<CargoObj>();

            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            using var command = new MySqlCommand(
                "SELECT id, width, volume, weight, quantity, type, startDate, endDate, cost, Country, City, " +
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
                    StartCoordinateX = reader.GetInt32(11),
                    StartCoordinateY = reader.GetInt32(12),
                    EndCoordinateX = reader.GetInt32(13),
                    EndCoordinateY = reader.GetInt32(14),
                    Approved = reader.GetBoolean(15),
                    Payed = reader.GetBoolean(16),
                    Done = reader.GetBoolean(17),
                    CanceledReason = reader.GetString(18),
                    OrderId = reader.GetInt32(19),
                    CustomerId = reader.GetInt32(20),
                    PlannerId = reader.GetInt32(21)
                });
            }

            return cargos;
        }
    }
}

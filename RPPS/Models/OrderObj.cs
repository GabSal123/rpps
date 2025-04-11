using MySqlConnector;


namespace RPPS.Models
{
    public class OrderObj
    {
        public int Id { get; set; }
        public int CargoCount { get; set; }
        public int LeftToCompleteCargoCount { get; set; }
        public int CarId { get; set; }
        public bool Done { get; set; }
        public bool InProgress { get; set; }
        public int PlannerId { get; set; }
        public int Type { get; set; }




        private static string _connectionString;

        public static void SetConnectionString(string connectionString)
        {
            _connectionString = connectionString;
        }

        public static List<OrderObj> GetAllOrders()
        {
            var orders = new List<OrderObj>();

            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            using (var command = new MySqlCommand("SELECT id, CargoCount, leftToCompleteCargoCount, carId, Done, InProgress, PlannerId FROM orderobj", connection))
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    orders.Add(new OrderObj
                    {
                        Id = reader.GetInt32(0),
                        CargoCount = reader.GetInt32(1),
                        LeftToCompleteCargoCount = reader.GetInt32(2),
                        CarId = reader.GetInt32(3),
                        Done = reader.GetBoolean(4),
                        InProgress = reader.GetBoolean(5),
                        PlannerId = reader.GetInt32(6)
                    });
                }
            }

            return orders;
        }
    }
}

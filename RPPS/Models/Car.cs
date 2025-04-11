using System.Data;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Microsoft.AspNetCore.Mvc;
namespace RPPS.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Type {  get; set; }
        public int TrailersLength { get; set; }
        public int TrailersHeight { get; set; }
        public int TrailersWidth { get; set; }
        public string State { get; set; }
        public int? CoordinateX { get; set; }
        public int? CoordinateY { get; set; }
        public string NumberPlate { get; set; }


        private static string _connectionString;

        public static void SetConnectionString(string connectionString)
        {
            _connectionString = connectionString;
        }
        private static Dictionary<int, string> GetStates(MySqlConnection connection) {
            var states = new Dictionary<int, string>();
            using (var command_state = new MySqlCommand("SELECT id, state FROM carstates", connection))
            using (var reader_state = command_state.ExecuteReader())
            {
                while (reader_state.Read())
                {
                    int id = reader_state.GetInt32(0);
                    string state = reader_state.GetString(1);
                    states[id] = state;
                }
            }

            return states;
        }

        private static Dictionary<int, string> GetTypes(MySqlConnection connection) {
            var types = new Dictionary<int, string>();
            using (var command_type = new MySqlCommand("SELECT Id, Name FROM cartype", connection))
            using (var reader_type = command_type.ExecuteReader())
            {
                while (reader_type.Read())
                {
                    int id = reader_type.GetInt32(0);
                    string type = reader_type.GetString(1);
                    types[id] = type;
                }
            }

            return types;
        }

        public static Car GetCar(int carId) {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();


            var states = GetStates(connection);
            var types = GetTypes(connection);

            using (var command = new MySqlCommand($"SELECT id, type,trailersLength,trailersWidth,trailersHeight, state, numberplate FROM car WHERE id={carId}", connection))
            using (var reader = command.ExecuteReader())
            {
                reader.Read();
                
                    var car = new Car
                    {
                        Id = reader.GetInt32(0),
                        Type = types[reader.GetInt32(1)],
                        TrailersLength = reader.GetInt32(2),
                        TrailersWidth = reader.GetInt32(3),
                        TrailersHeight = reader.GetInt32(4),
                        State = states[reader.GetInt32(5)],
                        CoordinateX = null,
                        CoordinateY = null,
                        NumberPlate = reader.GetString(6)
                    };
                return car;
            }


        }


        public static List<Car> GetAllCars(int orderType)
        {
            var cars = new List<Car>();

            using var connection = new MySqlConnection(_connectionString);
            connection.Open();


            var states = GetStates(connection);
            var types = GetTypes(connection);

            using (var command = new MySqlCommand($"SELECT id, type,trailersLength,trailersWidth,trailersHeight, state, numberplate FROM car WHERE state=1 AND type={orderType}", connection))
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    cars.Add(new Car
                    {
                        Id = reader.GetInt32(0),
                        Type = types[reader.GetInt32(1)],
                        TrailersLength = reader.GetInt32(2),
                        TrailersWidth = reader.GetInt32(3),
                        TrailersHeight = reader.GetInt32(4),
                        State = states[reader.GetInt32(5)],
                        CoordinateX = null,
                        CoordinateY = null,
                        NumberPlate = reader.GetString(6)
                    }); ;
                }
            }

            return cars;
        }
    }
}

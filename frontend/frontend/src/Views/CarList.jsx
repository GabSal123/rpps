import { useEffect, useState } from 'react'
import CarHandler from '../Handlers/CarHandler'
import './CarListStyles.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CarList = () => {
  const [cars, setCars] = useState([])
  const { carId } = useParams()
  const [selectedCarId, setSelectedCarId] = useState(carId)
  const navigate = useNavigate()
  const { orderType } = useParams()


  useEffect(() => {
    console.log(orderType)
    CarHandler.getAllCars(orderType).then(
      fetchedCars => {
        console.log(fetchedCars)
        setCars(fetchedCars)
      }
    )
        
  }, [])

  const handleSubmit = () => {
      navigate('/cargos') 

  }

  const handleSelect = (event) => {
    setSelectedCarId(event.target.value)
  }

  return (
    <div className="car-list-container">
      <h2 className="car-list-heading">Select a Car</h2>
      <ul className="car-list">
        {cars.map((car) => (
          <li key={car.id} className="car-list-item">
            <label
              className={`car-card ${selectedCarId === String(car.id) ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="selectedCar"
                value={car.id}
                checked={selectedCarId === String(car.id)}
                onChange={handleSelect}
                className="car-list-radio"
              />
              <span className="car-list-info">
                <strong>{car.numberPlate}</strong> — {car.type} <br />
                Size: {car.trailersLength}×{car.trailersWidth}×{car.trailersHeight}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {selectedCarId && (
        <div className="car-selected-info">
          Selected Car ID: {selectedCarId}
        </div>
      )}

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!selectedCarId}
      >
        Submit Car
      </button>
    </div>
  )
}

export default CarList

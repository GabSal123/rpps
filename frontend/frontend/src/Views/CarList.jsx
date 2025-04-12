import { useEffect, useState } from 'react'
import CarHandler from '../Handlers/CarHandler'
import './CarListStyles.css'
import { useLocation } from 'react-router-dom'
import { useCustomRouter } from '../Handlers/useCustomRouter'
import OrderHandler from '../Handlers/OrderHandler'
import CargoHandler from '../Handlers/CargoHandler'

const CarList = () => {
  const location = useLocation()
  const { finishOrderCreation } = useCustomRouter()

  const selectedCargoIds = location.state?.selectedCargoIds || []
  const typeOfCargo = location.state?.typeOfCargo || null
  const [cars, setCars] = useState([])
  const [selectedCarId, selectCar] = useState(null)



  useEffect(() => {
    CarHandler.getAllCars(typeOfCargo).then(
      fetchedCars => {
        setCars(fetchedCars)
      }
    )
        
  }, [])

  const submitCar = () => {
    OrderHandler.createOrder(selectedCarId, selectedCargoIds, typeOfCargo)
    .then(orderId => CargoHandler.assingCargos(orderId, selectedCargoIds)).then(temp => console.log(temp))

    CarHandler.changeCarState(selectedCarId, 4)
    finishOrderCreation()
  }

  const handleSelectCar = (event) => {
    selectCar(event.target.value)
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
                onChange={handleSelectCar}
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
        onClick={submitCar}
        disabled={!selectedCarId}
      >
        Submit Car
      </button>
    </div>
  )
}

export default CarList

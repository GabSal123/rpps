import { useEffect, useState } from 'react'
import CarHandler from '../Handlers/CarHandler'
import '../Views/CarListStyles.css'
import { useLocation } from 'react-router-dom'
import { useCustomRouter } from '../Handlers/useCustomRouter'
import OrderHandler from '../Handlers/OrderHandler'
import CargoHandler from '../Handlers/CargoHandler'

const CarForm = ({edit, oldOrderId}) => {
  const location = useLocation()
  const { finishOrderCreation } = useCustomRouter()

  const selectedCargoIds = location.state?.selectedCargoIds || []
  const typeOfCargo = location.state?.typeOfCargo || null
  const [cars, setCars] = useState([])
  const [selectedCarId, selectCar] = useState(null)



useEffect(() => {
  const fetchCars = async () => {
    const fetchedCars = await CarHandler.getAllCars(typeOfCargo)

    if (oldOrderId) {
      const oldCar = await CarHandler.getCarFromOrder(oldOrderId)
      fetchedCars.push(oldCar)
    }

    setCars(fetchedCars)
  }

  fetchCars()
}, [])

 const submitCar = async () => {
  try {
    if(edit){    
      const orderId = await OrderHandler.changeOrderCar(oldOrderId, selectedCarId, selectedCargoIds.length);
      const assignResult = await CargoHandler.assingCargos(orderId, selectedCargoIds);
      await CarHandler.changeCarState(selectedCarId, 4);
     
    }else{
      const orderId = await OrderHandler.createOrder(selectedCarId, selectedCargoIds, typeOfCargo);
      const assignResult = await CargoHandler.assingCargos(orderId, selectedCargoIds);
      await CarHandler.changeCarState(selectedCarId, 4);
    }
    const message =  edit? "Edited!": "Created!"
    finishOrderCreation(message);
  } catch (error) {
    console.error("Error during submitCar:", error);
    finishOrderCreation("Error")
  }
};

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

export default CarForm

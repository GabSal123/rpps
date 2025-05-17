import { useNavigate } from 'react-router-dom'

export const useCustomRouter = () => {
  const navigate = useNavigate()

  const goToCarSelection = (cargoIds, type) => {
    if (!cargoIds.length || type == null) {
      alert('Please select at least one cargo')
      return
    }

    navigate('/select-car', {
      state: {
        selectedCargoIds: cargoIds,
        typeOfCargo: type
      }
    })
  }

  const finishOrderCreation = (message) => {
    navigate('/', {
      state: {
        message: message
      }
    })
  }

  const showCargos = () => {
    navigate(`/cargos`)
  }

  const navigateEditCargos = (orderId) =>{
    navigate(`/cargos-edit/${orderId}`)
  }

  const navigateEditCar = (orderId, cargoIds , type) =>
    {
    if (!cargoIds.length || type == null) {
      alert('Please select at least one cargo')
      return
    }
    navigate(`/car-edit/${orderId}`, {
      state: {
        selectedCargoIds: cargoIds,
        typeOfCargo: type
      }
    })
  }

  return {
    goToCarSelection,
    finishOrderCreation,
    showCargos,
    navigateEditCargos,
    navigateEditCar
  }
}
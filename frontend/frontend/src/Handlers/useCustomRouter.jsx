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

  const finishOrderCreation = () => {
    navigate('/')
  }

  const showCargos = () => {
    navigate(`/cargos`)
  }

  return {
    goToCarSelection,
    finishOrderCreation,
    showCargos
  }
}
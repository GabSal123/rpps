import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CargoHandler from '../Handlers/CargoHandler'
import RouteHandler from '../Handlers/RouteHandler'
import { useCustomRouter } from '../Handlers/useCustomRouter'
import CargoForm from '../Components/CargoForm'
import './CargoListStyles.css'
const CargoList = () => {
  const [cargos, setCargos] = useState([])
  const [, setForceUpdate] = useState(0) // dummy state to force rerender
  const { goToCarSelection } = useCustomRouter()

  useEffect(() => {
    CargoHandler.getFreeCargos().then(fetchedCargos => setCargos(fetchedCargos))
  }, [])

  const handleSelect = (cargoId, type, coordinates) => {
    RouteHandler.selectCargo(cargoId, type, coordinates)
    setForceUpdate(n => n + 1) // force re-render to reflect changes
  }

  const submitCargo = () => {
    goToCarSelection(RouteHandler.getSelectedIds(), RouteHandler.getSelectedType())
  }


  const selectedIds = RouteHandler.getSelectedIds()
  const markers = RouteHandler.getMarkers()

  return (

    <div><CargoForm selectedCargoIds={[]} selectedCargoType={null} selectedCargos={[]} edit={false} orderId={null}/></div>

  )
}

export default CargoList

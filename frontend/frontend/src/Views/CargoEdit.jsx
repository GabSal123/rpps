import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CargoHandler from '../Handlers/CargoHandler'
import { useEffect, useState } from 'react'
import './CargoListStyles.css'
import { useCustomRouter } from '../Handlers/useCustomRouter'
import CargoForm from '../Components/CargoForm'


const CargoEdit = () => {
  const { orderId } = useParams()
  const [selectedCargoIds, setCargosIds] = useState([])
  const [selectedCargoType, setCargoType] = useState(null)
  const [cargos, setCargos] = useState([])

  useEffect(() => {
    CargoHandler.getOrderCargos(orderId).then(fetchedCargos => {
      setCargos(fetchedCargos)
      const ids = fetchedCargos.map(x => x.id)
      setCargoType(fetchedCargos[0].type)
      setCargosIds(ids)
    })
  }, [])

  return (
    <div><CargoForm selectedCargoIds={selectedCargoIds} selectedCargoType={selectedCargoType} selectedCargos={cargos} edit={true} orderId={orderId}/></div>
  )
}

export default CargoEdit

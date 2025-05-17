import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CargoHandler from '../Handlers/CargoHandler'
import RouteHandler from '../Handlers/RouteHandler'
import { useCustomRouter } from '../Handlers/useCustomRouter'
import CargoForm from '../Components/CargoForm'
import './CargoListStyles.css'
const CargoList = () => {

  return (
    <div><CargoForm selectedCargoIds={[]} selectedCargoType={null} selectedCargos={[]} edit={false} orderId={null}/></div>
  )
}

export default CargoList

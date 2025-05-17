import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CargoHandler from '../Handlers/CargoHandler'
import { useEffect, useState } from 'react'
import './CargoListStyles.css'
import { useCustomRouter } from '../Handlers/useCustomRouter'
import CargoForm from '../Components/CargoForm'

const CargoList = () => {

  return (
    <div><CargoForm selectedCargoIds={[]} selectedCargoType={null} selectedCargos={[]} edit={false} orderId={null}/></div>
  )
}

export default CargoList

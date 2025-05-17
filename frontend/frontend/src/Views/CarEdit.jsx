import { useEffect, useState } from 'react'
import CarHandler from '../Handlers/CarHandler'
import './CarListStyles.css'
import { useLocation } from 'react-router-dom'
import { useCustomRouter } from '../Handlers/useCustomRouter'
import OrderHandler from '../Handlers/OrderHandler'
import CargoHandler from '../Handlers/CargoHandler'
import CarForm from '../Components/CarForm'
import { useParams } from 'react-router-dom'

const CarEdit = () => {
  const { orderId } = useParams()
  return (
    <div>
      <CarForm edit={true} oldOrderId={orderId}/>
    </div>
  )
}

export default CarEdit

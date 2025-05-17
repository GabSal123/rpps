import { useEffect, useState } from 'react'
import axios from 'axios'
import './OrderListStyles.css'
import OrderHandler from '../Handlers/OrderHandler'
import { useNavigate } from 'react-router-dom'
import { useCustomRouter } from '../Handlers/useCustomRouter'

const OrderList = () => {
  const {showCargos} = useCustomRouter()
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    OrderHandler.getAllOrders().then(
      fetchedOrders => {
        setOrders(fetchedOrders)
      }
    )
        
  }, [])

  const createOrder = () => {
    showCargos()
  }

  return (
    <div className="order-list-container">
      <h2 className="order-list-heading">Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cargo Count</th>
            <th>Left</th>
            <th>Car ID</th>
            <th>Done</th>
            <th>In Progress</th>
            <th>Planner ID</th>

          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr
              key={order.id}
              className="order-row"
              style={{ cursor: 'pointer' }}
              disabled = {true}
            >
              <td>{order.id}</td>
              <td>{order.cargoCount}</td>
              <td>{order.leftToCompleteCargoCount}</td>
              <td>{order.carId}</td>
              <td>{order.done ? '✅' : '❌'}</td>
              <td>{order.inProgress ? '🔄' : '❌'}</td>
              <td>{order.plannerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="submit-button"
        onClick={()=>createOrder()}
      >
        Create Order
      </button>
    </div>
    
  )
}


export default OrderList
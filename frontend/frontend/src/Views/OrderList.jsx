import { useEffect, useState } from 'react'
import axios from 'axios'
import './OrderListStyles.css'
import OrderHandler from '../Handlers/OrderHandler'
import { useNavigate } from 'react-router-dom'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    OrderHandler.getAllOrders().then(
      fetchedOrders => {
        setOrders(fetchedOrders)
      }
    )
        
  }, [])

 

  const handleOrderClick = (type,id) => {
    navigate(`/orders/${type}/select-car/${id}`)
  }

  return (
    <div className="order-list-container">
      <h2 className="order-list-heading">Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>type</th>
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
              onClick={() => handleOrderClick(order.type, order.id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{order.id}</td>
              <td>{order.type}</td>
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

    </div>
  )
}

export default OrderList
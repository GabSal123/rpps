import { useEffect, useState } from 'react'
import axios from 'axios'
import './OrderListStyles.css'
import OrderHandler from '../Handlers/OrderHandler'
import { useLocation } from 'react-router-dom'
import { useCustomRouter } from '../Handlers/useCustomRouter'
import MessageBox from '../ModalMessages/MessageBox'
  

const OrderList = () => {
  const location = useLocation()
  const {showCargos} = useCustomRouter()
  const [orders, setOrders] = useState([])
  const [deleteStatus, setDeleteStatus] = useState("")
  const [type, setType] = useState('success')
  const { navigateEditCargos } = useCustomRouter()
  const [messageToShow, setMessageToShow] = useState("")

  useEffect(() => {
    setMessageToShow(location.state?.message || "")
  }, [location.state?.message])

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

  const editOrder = (orderId) => {
    navigateEditCargos(orderId)
  }

const removeOrder = async (orderId) => {
  try {
    const status = await OrderHandler.deleteOrder(orderId);
    setDeleteStatus(status);
    const newOrders = orders.filter(x=>x.id != orderId)
    setOrders(newOrders)
  } catch (error) {
    console.error("Failed to delete order:", error);
    setDeleteStatus("error"); 
  }
};

  return (
    <div className="order-list-container">
      <MessageBox message={deleteStatus} type={"error"} onClose={() => setDeleteStatus('')} />
      <MessageBox message={messageToShow} type={"success"} onClose={() => setMessageToShow('')} />
      <MessageBox message={messageToShow} type={"success"} onClose={() => setMessageToShow('')} />
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
              <td> <button onClick={() => editOrder(order.id)}>Edit</button> </td>
              <td> <button onClick={() => removeOrder(order.id)}>Remove</button> </td>
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
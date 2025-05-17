import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import OrderList from './Views/OrderList'
import CarList from './Views/CarList'
import CargoList from './Views/CargoList'
import CargoEdit from './Views/CargoEdit'
import CarEdit from './Views/CarEdit'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/select-car" element={<CarList />} />
        <Route path="/cargos" element={<CargoList/>}/>
        <Route path="/cargos-edit/:orderId" element={<CargoEdit />} />
        <Route path="/car-edit/:orderId" element={<CarEdit />} />
      </Routes>
    </Router>
  )
}

export default App
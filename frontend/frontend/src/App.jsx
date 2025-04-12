import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import OrderList from './Views/OrderList'
import CarList from './Views/CarList'
import CargoList from './Views/CargoList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/select-car" element={<CarList />} />
        <Route path="/cargos" element={<CargoList/>}/>
      </Routes>
    </Router>
  )
}

export default App
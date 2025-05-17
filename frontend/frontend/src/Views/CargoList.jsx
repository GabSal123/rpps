import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CargoHandler from '../Handlers/CargoHandler'
import RouteHandler from '../Handlers/RouteHandler'
import { useCustomRouter } from '../Handlers/useCustomRouter'
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
    <div className="cargo-list-container">
      <h2 className="cargo-list-heading">Select Cargos</h2>
      <table className="cargo-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Width</th>
            <th>Volume</th>
            <th>Weight</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>City</th>
            <th>Destination City</th>
          </tr>
        </thead>
        <tbody>
          {cargos.map(cargo => {
            const cargoCoordinates = {
              startCoordinateX: cargo.startCoordinateX,
              startCoordinateY: cargo.startCoordinateY,
              endCoordinateX: cargo.endCoordinateX,
              endCoordinateY: cargo.endCoordinateY,
            }

            return (
              <tr
                key={cargo.id}
                className="cargo-row"
                onClick={() => handleSelect(cargo.id, cargo.type, cargoCoordinates)}
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(cargo.id)}
                    onChange={() => handleSelect(cargo.id, cargo.type, cargoCoordinates)}
                  />
                </td>
                <td>{cargo.id}</td>
                <td>{cargo.width}</td>
                <td>{cargo.volume}</td>
                <td>{cargo.weight}</td>
                <td>{cargo.quantity}</td>
                <td>{cargo.type}</td>
                <td>{cargo.city}</td>
                <td>{cargo.destinationCity}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {markers.length >= 1 && (
        <div style={{ marginTop: '5em', display: 'flex', justifyContent: 'center' }}>
          <iframe
            width="600"
            height="450"
            style={{ marginRight: '2em' }}
            loading="lazy"
            allowFullScreen
            src={RouteHandler.generateMapUrl()}
          ></iframe>
        </div>
      )}

      <div style={{ marginTop: '5em', display: 'flex', justifyContent: 'center' }}>
        <button
          className="submit-button"
          onClick={submitCargo}
          disabled={!RouteHandler.getSelectedType()}
        >
          Submit Cargos
        </button>
      </div>
    </div>
  )
}

export default CargoList

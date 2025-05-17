import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CargoHandler from '../Handlers/CargoHandler'
import { useEffect, useState } from 'react'
import './CargoListStyles.css'
import { useCustomRouter } from '../Handlers/useCustomRouter'

const CargoList = () => {
  const [cargos, setCargos] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [selectedType, setSelectedType] = useState(null)
  const [markers, setMarkers] = useState([]) // Stores selected cargos' coordinates
  const { goToCarSelection } = useCustomRouter()

  useEffect(() => {
    CargoHandler.getFreeCargos().then(fetchedCargos => setCargos(fetchedCargos))
  }, [])

  const navigate = useNavigate()

  const submitCargo = () => {
    goToCarSelection(selectedIds, selectedType)
  }

  const selectCargo = (cargoId, type, coordinates) => {
    const updatedSelectedIds = [...selectedIds]

    const index = updatedSelectedIds.indexOf(cargoId)
    if (index > -1) {
      updatedSelectedIds.splice(index, 1)
      setMarkers(markers.filter(marker => marker.id !== cargoId)) // Remove marker
    } else {
      updatedSelectedIds.push(cargoId)
      setMarkers([...markers, { id: cargoId, ...coordinates }]) // Add marker
    }

    setSelectedIds(updatedSelectedIds)
    setSelectedType(type)

    if (updatedSelectedIds.length === 0) {
      setSelectedType(null)
    }
  }

  const generateMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/directions?key=API_KEY";
    const originPlaceId = "ChIJYUZqKZat4EYR5lUU8K0vl4I";
    const destinationPlaceId = "ChIJQ9NnsXAi50YRvIs3x-DRS2E";
    let markersStr = markers
      .map(marker => `&waypoints=${marker.startCoordinateX},${marker.startCoordinateY}`)
      .join('');

    return `${baseUrl}&origin=place_id:${originPlaceId}&destination=place_id:${destinationPlaceId}${markersStr}`;
  }

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
          </tr>
        </thead>
        <tbody>
          {cargos.map(cargo => {
            const cargoCoordinates = { 
              startCoordinateX: cargo.startCoordinateX, 
              startCoordinateY: cargo.startCoordinateY 
            };

            return (
              <tr
                key={cargo.id}
                className="cargo-row"
                onClick={() => selectCargo(cargo.id, cargo.type, cargoCoordinates)}
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(cargo.id)}
                    onChange={() => selectCargo(cargo.id, cargo.type, cargoCoordinates)}
                  />
                </td>
                <td>{cargo.id}</td>
                <td>{cargo.width}</td>
                <td>{cargo.volume}</td>
                <td>{cargo.weight}</td>
                <td>{cargo.quantity}</td>
                <td>{cargo.type}</td>
                <td>{cargo.city}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Google Maps iframe showing selected cargos */}
      {markers.length >= 2 && (
      <iframe
        width="600"
        height="450"
        style={{ marginRight: '2em' }}
        loading="lazy"
        allowFullScreen
        src={generateMapUrl()}
      ></iframe>
)}


      <p></p>
      <button
        className="submit-button"
        onClick={submitCargo}
        disabled={!selectedType}
      >
        Submit Cargos
      </button>
    </div>
  )
}

export default CargoList

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
  const [markers, setMarkers] = useState([])
  const { goToCarSelection } = useCustomRouter()

  useEffect(() => {
    CargoHandler.getFreeCargos().then(fetchedCargos => setCargos(fetchedCargos))
  }, [])

  const navigate = useNavigate()

  const submitCargo = () => {
    goToCarSelection(selectedIds, selectedType)
  }

  const selectCargo = (cargoId, type, coordinates) => {
    const updatedSelectedIds = [...selectedIds];
    const index = updatedSelectedIds.indexOf(cargoId);

    if (index > -1) {
      updatedSelectedIds.splice(index, 1);
      setMarkers(markers.filter(marker => marker.id !== cargoId));
    } else {
      updatedSelectedIds.push(cargoId);
      setMarkers([...markers, { id: cargoId, ...coordinates }]);
    }

    setSelectedIds(updatedSelectedIds);
    setSelectedType(type);

    if (updatedSelectedIds.length === 0) {
      setSelectedType(null);
    }
};


  const generateMapUrl = () => {
    if (markers.length < 1) return '';

    // Sort markers consistently using selectedIds to maintain intended order
    const orderedMarkers = selectedIds
      .map(id => markers.find(marker => marker.id === id))
      .filter(Boolean); // Filter out any nulls (in case of desync)

    if (orderedMarkers.length < 1) return '';

    const origin = `${orderedMarkers[0].startCoordinateX},${orderedMarkers[0].startCoordinateY}`;
    const destination = `${orderedMarkers[orderedMarkers.length - 1].endCoordinateX},${orderedMarkers[orderedMarkers.length - 1].endCoordinateY}`;

    const waypointCoords = [];

    // Include start and end of all cargos *except* first and last (handled as origin/destination)
    for (let i = 0; i < orderedMarkers.length; i++) {
      const marker = orderedMarkers[i];

      const isFirst = i === 0;
      const isLast = i === orderedMarkers.length - 1;

      if (!isFirst) {
        waypointCoords.push(`${marker.startCoordinateX},${marker.startCoordinateY}`);
      }

      if (!isLast) {
        waypointCoords.push(`${marker.endCoordinateX},${marker.endCoordinateY}`);
      }
    }

    const waypoints = waypointCoords.join('|');

    const baseUrl = "https://www.google.com/maps/embed/v1/directions";
    const apiKey = "API_KEY";

    return `${baseUrl}?key=${apiKey}&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}`;
};


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
            endCoordinateY: cargo.endCoordinateY
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
                <td>{cargo.destinationCity}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Google Maps iframe showing selected cargos */}
      {markers.length >= 1 && (
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

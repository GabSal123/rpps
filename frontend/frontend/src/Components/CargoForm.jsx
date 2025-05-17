import CargoHandler from '../Handlers/CargoHandler'
import { useEffect, useState } from 'react'
import '../Views/CargoListStyles.css'
import { useCustomRouter } from '../Handlers/useCustomRouter'
import RouteHandler from '../Handlers/RouteHandler'


const CargoForm = ({selectedCargoIds, selectedCargoType, selectedCargos, edit, orderId}) => {
  const [cargos, setCargos] = useState(selectedCargos)
  const [dummy, setForceUpdate] = useState(0)
  const [selectedIds, setSelectedIds] = useState(selectedCargoIds)
  const [selectedType, setSelectedType] = useState(selectedCargoType)
  const [markers, setMarkers] = useState([])
  const { goToCarSelection, navigateEditCar } = useCustomRouter()

useEffect(() => {
  const fetchCargos = async () => {
    const fetchedCargos = await CargoHandler.getFreeCargos();
    const allCargos = edit ? [...fetchedCargos, ...selectedCargos] : fetchedCargos;
    setCargos(allCargos);
    setSelectedIds(selectedCargoIds);
    setSelectedType(selectedCargoType);

    const new_markers = allCargos.map(cargo => ({
      id: cargo.id,
      startCoordinateX: cargo.startCoordinateX,
      startCoordinateY: cargo.startCoordinateY,
      endCoordinateX: cargo.endCoordinateX,
      endCoordinateY: cargo.endCoordinateY,
    }));
    setMarkers(new_markers);
  };

  fetchCargos();
}, [selectedCargos, selectedCargoType]);

  const handleSelect = (cargoId, type, coordinates) => {
    selectCargo(cargoId, type, coordinates)
    setForceUpdate(n => n + 1)
  }


  const submitCargo = () => {
    if(edit){
      navigateEditCar(orderId,selectedIds, selectedType)
    }else{
      goToCarSelection(selectedIds, selectedType)
    }

  }

  const selectCargo = (cargoId,type, coordinates) => {
    const updatedSelectedIds = [...selectedIds]

  const index = updatedSelectedIds.indexOf(cargoId)
  if (index > -1) {
    const new_markers = markers.filter(marker => marker.id !== cargoId);
    setMarkers(new_markers)
    updatedSelectedIds.splice(index, 1)
  } else {
    const new_markers = [...markers, { id: cargoId, ...coordinates }];
    setMarkers(new_markers)
    updatedSelectedIds.push(cargoId)
  }
    setSelectedIds(updatedSelectedIds)
    setSelectedType(type)
    if(updatedSelectedIds.length == 0){
      setSelectedType(null)
    }
    
    
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
            <th>Destination City</th>
          </tr>
        </thead>
        <tbody>
  {cargos
    .filter(cargo => !selectedType || cargo.type === selectedType)
    .map(cargo => {
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

      {markers.length >= 1 && selectedType && selectedIds.length > 0 && (
  <div style={{ marginTop: '5em', display: 'flex', justifyContent: 'center' }}>
    <iframe
      width="600"
      height="450"
      style={{ marginRight: '2em' }}
      loading="lazy"
      allowFullScreen
      src={RouteHandler.generateMapUrl(markers, selectedIds, selectedType) || undefined}
    ></iframe>
  </div>
)}

      <div style={{ marginTop: '5em', display: 'flex', justifyContent: 'center' }}>
        <button
          className="submit-button"
          onClick={submitCargo}
          disabled={!selectedType}
        >
          Submit Cargos
        </button>
      </div>
    </div>
  )
}

export default CargoForm

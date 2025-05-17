import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CargoHandler from '../Handlers/CargoHandler'
import { useEffect, useState } from 'react'
import '../Views/CargoListStyles.css'
import { useCustomRouter } from '../Handlers/useCustomRouter'

const CargoForm = ({selectedCargoIds, selectedCargoType, selectedCargos, edit, orderId}) => {
  const [cargos, setCargos] = useState(selectedCargos)
  const [selectedIds, setSelectedIds] = useState(selectedCargoIds)
  const [selectedType, setSelectedType] = useState(selectedCargoType)
  const { goToCarSelection, navigateEditCar } = useCustomRouter()

useEffect(() => {
  if (edit) {
    CargoHandler.getFreeCargos().then(fetchedCargos => {
      const newCargos = [...fetchedCargos, ...selectedCargos];
      setCargos(newCargos);
      setSelectedIds(selectedCargoIds)
    });
  } else {
    CargoHandler.getFreeCargos().then(fetchedCargos => {
      setCargos(fetchedCargos);
    });
  }
  setSelectedType(selectedCargoType)
  setSelectedIds(selectedCargoIds)
}, [selectedCargos, selectedCargoType]);

  const submitCargo = () => {
    if(edit){
      navigateEditCar(orderId,selectedIds, selectedType)
    }else{
      goToCarSelection(selectedIds, selectedType)
    }

  }

  const selectCargo = (cargoId,type) => {
    const updatedSelectedIds = [...selectedIds]

  const index = updatedSelectedIds.indexOf(cargoId)
  if (index > -1) {
    updatedSelectedIds.splice(index, 1)
  } else {
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
          </tr>
        </thead>
        <tbody>
          {cargos.map(cargo => {
            if(selectedType == null){
              return (
            
                <tr
                  key={cargo.id}
                  className="cargo-row"
                  onClick={() => handleRowClick(cargo)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(cargo.id)}
                      onChange={() => selectCargo(cargo.id, cargo.type)}
                    />
                  </td>
                  <td>{cargo.id}</td>
                  <td>{cargo.width}</td>
                  <td>{cargo.volume}</td>
                  <td>{cargo.weight}</td>
                  <td>{cargo.quantity}</td>
                  <td>{cargo.type}</td>
                </tr>
              )
            }else if (selectedType == cargo.type){
              return (
            
                <tr
                  key={cargo.id}
                  className="cargo-row"
                  onClick={() => handleRowClick(cargo)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(cargo.id)}
                      onChange={() => selectCargo(cargo.id, cargo.type)}
                    />
                  </td>
                  <td>{cargo.id}</td>
                  <td>{cargo.width}</td>
                  <td>{cargo.volume}</td>
                  <td>{cargo.weight}</td>
                  <td>{cargo.quantity}</td>
                  <td>{cargo.type}</td>
                </tr>
              )
            }
            })}
        </tbody>
      </table>
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

export default CargoForm

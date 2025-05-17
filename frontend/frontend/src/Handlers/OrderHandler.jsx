import axios from 'axios';

const getAllOrders = () => {
    const request = axios.get(`https://localhost:7257/Order`)
    return request.then(response => response.data)
}

const createOrder = (selectedCarId, selectedCargoIds, typeOfCargo) => {
    const order = {
        "Id": 0,
        "CargoCount": selectedCargoIds.length,
        "LeftToCompleteCargoCount": selectedCargoIds.length,
        "CarId": selectedCarId,
        "Done": false,
        "InProgress": false,
        "PlannerId": 1,
        "Type": typeOfCargo,
        "selectedCargoIds": selectedCargoIds
    }

    const request = axios.post("https://localhost:7257/Order", order)
    return request.then(response => response.data)
}

export default {getAllOrders, createOrder}
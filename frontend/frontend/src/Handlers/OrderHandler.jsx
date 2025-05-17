import axios from 'axios';

const getAllOrders = () => {
    const request = axios.get(`https://localhost:7257/Order`)
    return request.then(response => response.data)
}

const deleteOrder = (orderId) => {
    const request = axios.delete(`https://localhost:7257/Order?id=${orderId}`)
    return request.then(response => response.data)
}

const changeOrderCar = (orderId, newCarId, cargoCount) => {
    const request = axios.put(`https://localhost:7257/Order/Update?orderId=${orderId}&newCarId=${newCarId}&cargoCount=${cargoCount}`)
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

export default {getAllOrders, createOrder, deleteOrder, changeOrderCar}
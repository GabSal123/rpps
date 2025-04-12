import axios from 'axios';

const getFreeCargos = () => {
    const request = axios.get(`https://localhost:7257/Cargo`)
    return request.then(response => response.data)
}

const assingCargos = (orderId, selectedCarId) => {
    const obj = {
        "OrderId": orderId,
        "CargoIds": selectedCarId

    }
    axios.put("https://localhost:7257/Cargo", obj)
}


export default {getFreeCargos, assingCargos}
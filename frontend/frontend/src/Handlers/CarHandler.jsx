import axios from 'axios';


const getAllCars = (orderType) => {
    const request = axios.get(`https://localhost:7257/Car/all?orderType=${orderType}`)
    return request.then(response => response.data)
}

const getCurrentCar = (carId) => {
    const request = axios.get(`https://localhost:7257/Car?orderType=${carId}`)
    return request.then(response => response.data)
}
const changeCarState = (carId, state) => {
  return axios.put(`https://localhost:7257/Car?carId=${carId}&state=${state}`);
};

const getCarFromOrder = (orderId) => {
  const request = axios.get(`https://localhost:7257/Car/FromOrder?orderId=${orderId}`)
  return request.then(response => response.data)
}


export default {getAllCars, getCurrentCar, changeCarState, getCarFromOrder}
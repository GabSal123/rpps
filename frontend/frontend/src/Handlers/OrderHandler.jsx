import axios from 'axios';

const getAllOrders = () => {
    const request = axios.get(`https://localhost:7257/Order`)
    return request.then(response => response.data)
}

export default {getAllOrders}
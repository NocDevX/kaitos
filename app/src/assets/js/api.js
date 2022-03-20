import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://dummyapi.io/data/v1/',
    // withCredentials: true,
    headers: {
        "app-id": "6233c290907c4773865901a1"
    }
});

export default api;
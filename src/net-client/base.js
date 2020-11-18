import config from '@/appConfig';
import axios from 'axios'

const headers = {
    'Authorization': 'Bearer ' + '5d370094-57a7-4476-ace4-4f29bfa43d44'
}
const api = axios.create({
    baseURL: config.API_HOST,
    timeout: config.REQUEST_TIMEOUT_MS,
})

api.interceptors.request.use((config) => {
    config.headers = headers;
    return config;
}, (error) => {
    console.error('Request error: ', error);
    return Promise.reject(error);
});

api.interceptors.request.use((config) => {
    config.headers = headers;
    return config;
}, (error) => {
    console.error('Request error: ', error);
    return Promise.reject(error);
});

api.requestData = async (page) => {
    const response = await api.get(`/cabinet/protected/transactions/page/${page}`);
    return response.data;
}

export default api;
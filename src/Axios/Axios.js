import axios from 'axios';

import { API_URL } from '../Constant/Static';
// const accessToken = token();

const axioslogin = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Accept-Language": "en-GB,en"
    }
});

axioslogin.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (err) {
    console.log(err);
})


export default axioslogin
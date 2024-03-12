import realAxios from 'axios'
import Cookies from 'js-cookie';


const axios = realAxios.create({
    baseURL: 'http://localhost:3000/',
});

axios.interceptors.request.use((config) => {
    const token = Cookies.get('auth');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {    
    return response.data;
}, (error) => {
    if(error?.response?.data) {
        if(error?.response?.data?.data === "Invalid token") {
            Cookies.remove('auth');
            window.location.href = "/login";
        }
        return error?.response
    }
    else console.log({ status: false, data: error });
});

export default axios;
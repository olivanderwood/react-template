import axios from 'axios';
import {AuthenManager} from './index'

const axiosInstant = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    }
})

const refreshToken = () => {
    return axiosInstant.post('/token',{
        // refreshToken: getLocalRefreshToken()
    })
}


axiosInstant.setToken = (token) => {
    axiosInstant.defaults.headers['Authorization'] = token
    AuthenManager.shared().setToken(token)
}

axiosInstant.interceptors.request.use((config) => {

    config.headers['Authorization'] =  AuthenManager.shared().getToken();
    return config;
})



axiosInstant.interceptors.response.use((response) => {
    
    const {code, auto} = response.data
    if (code === 401) {
        if(auto === 'yes'){

            return refreshToken().then(rs => {
                const { token } = rs.data
                axiosInstant.setToken(token);
                const config = response.config
                config.headers['Authorization'] = token
                config.baseURL = 'http://localhost:3000/'
                return axiosInstant(config)

            })
        }
    }
    return response
}, error => {
    console.warn('Error status', error.response.status)
    // return Promise.reject(error)
    if (error.response) {
        return error.response.data
    } else {
        return Promise.reject(error)
    }
})


export default axiosInstant
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    // baseURL:'https://www.kindless.top:8443/',
    baseURL:'http://localhost:8080/',
    timeout:5000,
    withCredentials:true
})

// service.interceptors.request.use(
//     config => {
//         setTokenToHeader(config)
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        // console.log(error.response.data.code);
        console.log(error);

        if (error.response.data.code && error.response.data.code !== 200) {
            Message.error(error.response.data.msg)
            // this..error(error.response.data.message)
        }
        return Promise.reject(error)
    }
)

export default service
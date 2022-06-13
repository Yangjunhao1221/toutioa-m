import axios from 'axios'
import store from '@/store'
axios.defaults.baseURL = 'http://api-toutiao-web.itheima.net'
//请求拦截器
axios.interceptors.request.use(
    config => {
        const { userToken } = store.state
        //判断是否有token，没有就不加token
        if (userToken && userToken.token) {
            // 将token统一添加
            config.headers.Authorization = `Bearer ${userToken.token}`
        }
        console.log(config);
        return config
    },
    err => {
        return Promise.reject(error)
    });
//响应拦截器
export default axios

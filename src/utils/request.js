import axios from 'axios'
import store from '@/store'

import jsonBig from 'json-bigint'
// axios.defaults.baseURL = 'http://api-toutiao-web.itheima.net'
const request = axios.create({
    //基准路径
    baseURL: 'http://api-toutiao-web.itheima.net',
    //自定义后端返回的原始数据
    transformResponse: [function (data) {
        try {
            // console.log(jsonBig.parse(data));
            return jsonBig.parse(data)
        } catch (error) {
            return data//不是标准字符串的话，直接返回原始数据
        }
    }]
})
//请求拦截器
request.interceptors.request.use(
    config => {
        const { userToken } = store.state
        //判断是否有token，没有就不加token
        if (userToken && userToken.token) {
            // 将token统一添加
            config.headers.Authorization = `Bearer ${userToken.token}`
        }
        // console.log(config);
        return config
    },
    err => {
        return Promise.reject(error)
    });
//响应拦截器
export default request

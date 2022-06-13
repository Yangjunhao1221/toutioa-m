import request from "@/utils/request"
import store from '@/store'
export const Userlogin = data => request({
    method: "post",
    url: '/app/v1_0/authorizations',
    data
})//登录
export const sendSms = mobile => request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: "GET",
    mobile
})//获取验证码
//获取用户信息
export const getUser = () => request({
    url: '/app/v1_0/user',
    method: 'GET',
    //将验证token统一添加到请求拦截器
    // headers: {
    //     //验证token
    //     Authorization: `Bearer ${store.state.userToken.token}`
    // }
}
) 
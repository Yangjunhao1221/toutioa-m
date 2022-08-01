import request from '@/utils/request'
export const articleList = () => request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
})
export const getArticle = (params) => request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params
})
export const getAllChannle = () => request({
    url: '/app/v1_0/channels',
    method: 'GET'
})//所有频道列表
export const getUserChannle = (channel) => request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: {
        channels: [channel]
    }

})//添加用户指定频道（部分覆盖）
export const deletChannel = (target) => request({
    url: `/app/v1_0/user/channels/${target}`,
    method: 'DELETE'
})//删除用户指定频道
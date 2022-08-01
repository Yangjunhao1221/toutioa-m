import request from '@/utils/request'
//喜欢
export const addLike = target => request({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
        target
    }
})
//取消喜欢
export const deleteLike = target => request({
    url: `/app/v1_0/article/likings/${target}`,
    method: 'DELETE',

})
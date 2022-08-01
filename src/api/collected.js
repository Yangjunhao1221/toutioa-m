import request from '@/utils/request'
//收藏文章
export const addCollected = target => request({
    url: '/app/v1_0/article/collections',
    method: 'POST',
    data: {
        target
    }
})
//取消收藏
export const deleteCollected = target => request({
    url: `/app/v1_0/article/collections/${target}`,
    method: 'DELETE',
})
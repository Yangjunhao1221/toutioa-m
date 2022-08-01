import request from "@/utils/request";
//获取评论或评论回复
export const commentList = params => request(
    {
        url: '/app/v1_0/comments',
        method: 'GET',
        params
    }
)
//点赞评论
export const addLikeComment = target => request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
        target
    }
})
//取消对评论点赞
export const deleteLikeComment = target => request({
    url: `/app/v1_0/comment/likings/${target}`,
    method: 'DELETE',
})
//添加评论或评论回复
export const addComments = data => request({
    url: `/app/v1_0/comments`,
    method: 'POST',
    data
})
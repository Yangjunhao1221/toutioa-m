import request from '@/utils/request'
export const articleDetails = params => request({
    url: `/app/v1_0/articles/${params}`,
    method: 'GET',
})
export const focusUser = target => request({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
        target
    }

})//关注用户
export const unFollowUser = target => request({
    url: `/app/v1_0/user/followings/${target}`,
    method: 'DELETE',

})//取消关注
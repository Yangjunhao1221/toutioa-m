import request from "@/utils/request"
//联想建议
export const getSuggestion = q => request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
        q
    }
})
//搜索结果
export const getSearchResult = params => request({
    url: '/app/v1_0/search',
    method: 'GET',
    params
})
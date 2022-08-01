import { Userlogin, sendSms, getUser } from "./user";
import { articleList, getArticle, getAllChannle, getUserChannle, deletChannel } from './home'
import { getSuggestion, getSearchResult } from './search'
import { articleDetails, focusUser, unFollowUser } from './article'
import { addCollected, deleteCollected } from './collected'
import { addLike, deleteLike } from './like'
import { commentList, addLikeComment, deleteLikeComment, addComments } from './comment'
export const UserloginAPI = Userlogin
export const sendSmsAPI = sendSms
export const getUserAPI = getUser
export const articleListAPI = articleList
export const getArticleAPI = getArticle
export const getAllChannleAPI = getAllChannle
export const getUserChannleAPI = getUserChannle
export const deletChannelAPI = deletChannel
export const getSuggestionAPI = getSuggestion
export const getSearchResultAPI = getSearchResult
export const articleDetailsAPI = articleDetails
export const focusUserAPI = focusUser
export const unFollowUserAPI = unFollowUser
export const deleteCollectedAPI = deleteCollected
export const addCollectedAPI = addCollected
export const addLikeAPI = addLike
export const deleteLikeAPI = deleteLike
export const commentListAPI = commentList
export const addLikeCommentAPI = addLikeComment
export const deleteLikeCommentAPI = deleteLikeComment
export const addCommentsAPI = addComments
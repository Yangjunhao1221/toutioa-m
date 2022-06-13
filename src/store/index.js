import Vuex from 'vuex'
import Vue from 'vue'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'Token-toutiao'
export default new Vuex.Store({
    state: {
        userToken: getItem(TOKEN_KEY)//打开默认从本地取出token
    },
    mutations: {
        updatedUserToken(state, payload) {
            state.userToken = payload//将token存入状态
            setItem(TOKEN_KEY, state.userToken)//存入token
        }
    },
    actions: {

    }
})
import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        loading: false,
        inputMsg: false
    },
    mutations: {
        clearMsg(state, param) {
            state.inputMsg = param;
        }
    },
    modules: {
        user
    }
})

export default store
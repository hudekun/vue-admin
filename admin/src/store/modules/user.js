import { login } from '../../api/user'
const state = {
    msg: '',
}
const mutations = {
    SET_MSG: (state, msg) => {

        state.msg = msg
    }
}
const actions = {
    loginOn({ commit }, params) {
        const { username, password } = params
        return new Promise((resolve, reject) => {
            login({ username: username, password: password }).then(response => {
                window.sessionStorage.removeItem("token");
                if (response.tokenI !== 'undefined') {
                    window.sessionStorage.setItem("token", response.tokenI);
                    window.sessionStorage.setItem('username', response.username);
                }
                commit('SET_MSG', response.username)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}




export default {
    namespaced: true,
    state,
    mutations,
    actions
}
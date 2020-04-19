import { login } from '../../api/user'
const state = {
    username: '',
    avatar: ""
}
const mutations = {
    SET_MSG: (state, params) => {

        state.msg = params.username
        state.avatar = params.avatar
    },
    SET_AVATAR: (state, params) => {
        state.avatar = params.avatar
    }
}
const actions = {
    loginOn({ commit }, params) {
        const { username, password } = params
        return new Promise((resolve, reject) => {
            login({ username: username, password: password }).then(response => {
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('username')
                sessionStorage.removeItem('avatar')
                if (response.status == '200') {
                    window.sessionStorage.setItem("token", response.tokenI);
                    window.sessionStorage.setItem('username', response.username);
                    window.sessionStorage.setItem('avatar', response.img);
                    resolve({ 'msg': response.msg, 'code': 1 })
                }
                commit('SET_MSG', { username: response.username, avatar: response.img })

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
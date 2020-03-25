import request from '../../utils/request.js'

export function login(data) {
    return request({
        url: '/users/login',
        method: 'post',
        data
    })
}

export function regist(data) {
    return request({
        url: '/users/loginRegist',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: '/vue-element-admin/user/logout',
        method: 'post'
    })
}
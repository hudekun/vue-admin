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

export function changeAvatar(data) {
    return request({
        url: '/upload',
        method: 'post',
        data
    })
}
export function saveAvatar(data) {
    return request({
        url: '/users/avatar',
        method: 'post',
        data
    })
}
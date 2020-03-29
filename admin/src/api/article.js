import request from '../../utils/request.js'

export function submitData(data) {
    return request({
        url: '/articles/submit',
        method: 'post',
        data
    })
}
export function queryList(query) {
    return request({
        url: '/articles/query',
        method: 'get',
        params: query
    })
}
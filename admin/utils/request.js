import axios from 'axios'
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么，例如加入token
    var token = window.sessionStorage.getItem('token')
    if (token) {
        config.headers.authorization = token
    }
    return config
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
axios.interceptors.response.use(function(response) {
    const res = response.data
        // token验证,cookie时效性,store处理
    return res
})


//axios.defaults.baseURL = 'http://127.0.0.1:3000'

export default axios
import axios from 'axios'
import { MessageBox } from 'element-ui'
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
    if (res.status == '401') {
        MessageBox.confirm('您的登录时间已过，请重新登陆', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('username')
            window.location.href = '#/login'
        }).catch(() => {
            MessageBox.message({
                type: 'info',
                message: '已取消'
            });
        });
    }
    // token验证,cookie时效性,store处理
    return res
})


//axios.defaults.baseURL = 'http://127.0.0.1:3000'

export default axios
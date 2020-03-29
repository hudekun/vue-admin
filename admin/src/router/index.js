import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout'
import Login from '../components/login'
import ArticleList from '../views/articleList/index'
import WriteArticle from '../views/writeArticle/index'
import ArticleListDetail from '../views/articleList/details/index'
import Func31 from '../views/func31'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/layout',
        redirect: '/articleList',
    },
    {
        path: '/',
        name: 'layout',
        redirect: '/articleList',
        component: Layout,
        children: [{
                path: 'articleList',
                name: '文章列表',
                component: ArticleList,
            },
            {
                path: 'articleListDetail',
                name: '列表详情',
                component: ArticleListDetail,
            },
            {
                path: 'writeArticle',
                name: '写文章',
                component: WriteArticle
            },
            {
                path: 'func31',
                name: '菜单',
                component: Func31
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

router.beforeEach(function(to, from, next) {
    var token = window.sessionStorage.getItem('token')
    if (to.name === 'login' && !token) { //如果是登录页，则跳过验证
        next() //必不可少
        return //以下的代码不执行
    }
    //未登录
    if (!token) { //判断登陆状态
        next({ name: 'login' }) //如果未登录，则跳转到登录页
    } else {
        if (to.name === 'login') {
            next({ name: 'layout' })
        } else {
            next() //如果已经登陆，那就可以跳转
        }
    }

})

export default router
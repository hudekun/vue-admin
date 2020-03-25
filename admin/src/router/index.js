import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout'
import Login from '../components/login'
import Fun1 from '../views/fun'
import Func31 from '../views/func31'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/layout',
    redirect: '/authority',
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/authority',
    component: Layout,
    children:[
      {
        path:'authority',
        name:'权限管理',
        component:Fun1
      },
      {
        path:'func31',
        name:'菜单',
        component:Func31
      }
    ]
  }
  
]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  var token = window.sessionStorage.getItem('token')
  if(to.name === 'login' && !token) {  //如果是登录页，则跳过验证
    next()  //必不可少
    return  //以下的代码不执行
  }
  //未登录
  if(!token) {   //判断登陆状态
    next({ name : 'login'})   //如果未登录，则跳转到登录页
  } else {
    if(to.name === 'login') {
      next({ name : 'layout'})
    }else{
      next()  //如果已经登陆，那就可以跳转
    }
  }

})

export default router

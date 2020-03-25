import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

import './assets/css/globel.css'
import './plugin/element-ui'



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
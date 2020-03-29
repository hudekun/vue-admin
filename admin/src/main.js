import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

import './assets/css/globel.css'
import './plugin/element-ui'
import Card from './components/card/index'


import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.component('card-btn', Card)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
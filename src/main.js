import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import './mock/mockServer'
import loading from './common/img/loading.gif'
import './filter' //加载过滤器

Vue.config.productionTip = false
FastClick.attach(document.body)

//注册全局组件
Vue.component(Button.name, Button)
Vue.use(VueLazyload, {
  loading
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// eslint-disable-next-line no-unused-vars
import elementUI from 'element-ui'
import axios from 'axios'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import cookies from 'vue-cookies'
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(elementUI)
Vue.prototype.$axiso = axios
Vue.use(cookies)
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  elementUI,
  components: { App },
  template: '<App/>'
})

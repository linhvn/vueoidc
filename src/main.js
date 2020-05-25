import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import google from '@/plugin/google'

Vue.config.productionTip = false

Vue.prototype.$google = google

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

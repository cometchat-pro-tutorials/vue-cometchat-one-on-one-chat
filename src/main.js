import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { CometChat } from '@cometchat-pro/chat'

const appId = process.env.VUE_APP_COMETCHAT_APP_ID

Vue.config.productionTip = false
Vue.prototype.$currentUser = null

CometChat.init(appId)
  .then(() => {
    console.log('CometChat was initialized successfully!')
  })
  .catch(() => {
    console.log('An error occured while initializing CometChat')
  })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

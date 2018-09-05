import Vue from 'vue'
import App from './index'
import store from '@/utils/store'

Vue.prototype.$store = store
const app = new Vue(App)
// const app = new Vue({
//   store: store,
//   render: h => h(App)
// })

app.$mount()

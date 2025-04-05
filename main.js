import App from './App'
import store from './store'
import API from '@/api/index'
import * as navTo from '@/utils/navTo'
import toast from '@/utils/toast'
import tools from '@/utils/index'
import Vue from 'vue'
import dayjs from "dayjs";
import {globalData} from '@/api/url'
import TuniaoUI from 'tuniao-ui'
// import '@/libs/permission'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$API = API
Vue.prototype.$tools = tools
Vue.prototype.$navTo = navTo
Vue.prototype.$toast = toast
Vue.prototype.$dayjs = dayjs
Vue.prototype.$globalData = globalData
Vue.use(TuniaoUI)

let vuexStore = require('@/store/$t.mixin.js')
Vue.mixin(vuexStore)

let mpShare = require('tuniao-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)

const app = new Vue({
  store,
  ...App
})

app.$mount()

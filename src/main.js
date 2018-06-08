import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import VueTimeago from 'vue-timeago'
import timeago from 'timeago.js'
import moment from 'moment'

Vue.prototype.moment = moment
Vue.prototype.timeago = timeago

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'zh-cn', // Default locale
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    'ja': require('date-fns/locale/ja')
  }
})
import '@/icons' // icon
import '@/permission' // permission control
import request from '@/utils/request'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(ElementUI, { locale: locale, size: 'small' })
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.prototype.$http = request

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import element from 'element-ui'
import api from './utils/api/index' // 接口
import table from './utils/table/index' // 表格展示数据
import clearSearchData from './utils/clearSearchData/index'
import cardStatus from './utils/changeType/cardStatus' // 展示卡状态
import workType from './utils/changeType/workType' // 展示启用禁用状态
// css
import '../static/css/reset_min.css' // reset
// import 'element-ui/lib/theme-default/index.css' // element.css
// import '../static/804000/index.css' // 咖啡色风格
import '../static/8080c0/index.css' // 淡蓝色风格
import '../static/css/main.css' // 全局css
import '../static/css/item.css' // content里的css

Vue.config.productionTip = false
// 全局定义
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$table = table
// 启用vue插件
Vue.use(element)
Vue.use(clearSearchData)
Vue.use(cardStatus)
Vue.use(workType)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

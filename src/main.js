// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'

Vue.config.productionTip = false

// 加载ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css' // 使用 light 主题
Vue.use(MuseUI)

import 'common/scss/index.scss'

// 在vue原型中添加$http方法等于axios
Vue.prototype.$http = axios

// 设置默认打开的页面
router.replace('message')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  // 组件创建前，进行异步数据数据请求
  beforeCreate() {
    this.$store.dispatch('getAllData', this);
  }
})

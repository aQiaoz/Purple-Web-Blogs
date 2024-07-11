// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './views/fonts/iconfont.css'

Vue.config.productionTip = false

/*导入axios*/
import axios from "axios";
/*全局绑定axios*/
Vue.prototype.$axios = axios;

/*导入qs*/
import qs from 'qs';
/*全局绑定*/
Vue.prototype.$qs = qs;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

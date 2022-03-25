import Vue from 'vue/dist/vue.min'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as MathLive from "../public/js/mathlive.min";
import MathfiledComponent from "../public/js/vue-mathlive.mjs"
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import 'echarts-gl'
import jquery from 'jquery';

Vue.prototype.$ = jquery;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(MathfiledComponent, MathLive);

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

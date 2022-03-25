import Vue from 'vue/dist/vue.min'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import HomeMsg from '@/views/Home/HomeMsg/HomeMsg.vue'
import Paint2D from '@/views/Home/Paint/Paint2D.vue'
import Paint3D from '@/views/Home/Paint/Paint3D.vue'
import Calculation from '@/views/Home/Calculation/Calculation.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', redirect: '/home/homemsg' },
    {
      path: '/home', component: Home, children: [
        { path: '/home/homemsg', component: HomeMsg },
        { path: '/home/paint2d', component: Paint2D },
        { path: '/home/paint3d', component: Paint3D },
        { path: '/home/calculation', component: Calculation },
      ]
    },
  ]
})


export default router
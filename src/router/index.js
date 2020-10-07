import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout', 有了默认子路邮，就不用给父路邮起名字了
    component: Layout,
    children: [
      {
        path: '', // 这个path为空时，表示这个路邮为默认路邮
        name: 'home',
        component: Home
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router

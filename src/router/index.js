import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
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
      },
      {
        path: '/article', // 这个path为空时，表示这个路邮为默认路邮
        name: 'article',
        component: Article
      }

    ]
  }

]

const router = new VueRouter({
  routes
})
// to 是去哪个页面
// from 是从哪里来的
// next 放行
// 所有的路由都会经过这里，我们要是不放行。所有页都是空白页。
router.beforeEach((to, from, next) => {
  // 我们先判断是不是在登录页
  // 判断是不是登录页先看本地存储有没有user。
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 先判断一下，是不是在登录页。
  if (to.path !== '/login') { // 如果不是登录页。
    if (user) {
      // 如果有了本地储存的user后，我们就判断，是登录 允许通过。
      next()
    } else {
      // 没有登录就跳到登录页。
      next('/login')
    }
  } else {
    // 如果在，就正常通过
    next()
  }
})
export default router

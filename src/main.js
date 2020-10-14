// 项目启动入口
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 加载全局样式文件
import './styles/index.less'
// 加载组件库
import ElementUI from 'element-ui'
// 加载组件库样式
import 'element-ui/lib/theme-chalk/index.css'
// import { ElementTiptapPlugin } from 'element-tiptap'
// Vue.use(ElementTiptapPlugin)
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

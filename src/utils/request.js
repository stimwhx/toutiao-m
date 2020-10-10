import axios from 'axios'
// axios可以有不同的实例，不同的实例可以有不同的配置
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' // 请求的基础路径
})
// 请求拦截器 https://github.com/axios/axios 在这里有这个axios的文档 Interceptors
// 所有的请求都要经过这个axios的拦截器。 这里的config变量，拿到的就是请示的所有数据。是个对象
// 我上边定义了request 为axios对象，请求是通过这个发出去的。
request.interceptors.request.use(function (config) {
  // 我们在登录成功后，设置的这个本地存储。现在取出来。为每个请求设置统一的token
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 如果有这个用户登录信息。我们就为每个请示设置token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 最后我们一定是要在别的模块中加载用的，所以别忘记了导出
export default request

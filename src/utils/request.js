import axios from 'axios'
// axios可以有不同的实例，不同的实例可以有不同的配置
import JSONBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', // 请求的基础路径
  // 这个就是处理后端返回数据的格式的，因为后端返回的数据都是json的。转换字符串会有问题。所以用json-bigint第三方库
  transformResponse: [function (data) {
    try {
      // 这里是接收的是字符串类开的数据，我们就用这个json-bigint直接转换
      return JSONBig.parse(data)
    } catch (err) {
      // 如果不是字符串，那么不转换。直接返回去
      return data
    }
  }]
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

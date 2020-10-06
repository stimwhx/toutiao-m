import axios from 'axios'
// axios可以有不同的实例，不同的实例可以有不同的配置
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' // 请求的基础路径
})
// 最后我们一定是要在别的模块中加载用的，所以别忘记了导出
export default request

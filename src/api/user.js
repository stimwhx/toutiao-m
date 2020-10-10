/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data用来设置  post 请求体
    data
  })
}
// 获取用户信息
export const gerUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // asios通过headers：{}对象来设置请求头
    // headers: {// Authorization: `Bearer ${user.token}`
    // }
  })
}

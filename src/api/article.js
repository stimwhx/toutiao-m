/**
* 文章的请求方法
*/

import request from '@/utils/request'

export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用data设置
    // Query 参数使使用params 设置
    // requests 参数使用 requests 设置
    params
  })
}

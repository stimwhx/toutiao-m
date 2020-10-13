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
// 获取文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
// 删除文章
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    // 当访问路径中有这个：xxx 时，就是在URL上传递数据。
    url: `/mp/v1_0/articles/${articleId}`
  })
}
// 发表文章
export const publisArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}
// 编辑文章（修改）
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}
// 获取文章
export const getArticleMethod = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

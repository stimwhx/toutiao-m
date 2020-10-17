/**
 * 评论页接口
*/
import request from '@/utils/request'

// 获取评论或评论回复
export const getCommentList = (params, data) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/comments',
    params,
    data
  })
}
// 修改文章评论状态
export const updateCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}

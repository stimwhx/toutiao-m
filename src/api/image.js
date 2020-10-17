/**
 *获取文章素材
 */
import request from '@/utils/request'
// 获取用户素材
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
// 上传用户素材
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 上传文件上的请求头，要设置content-type为multip/form-data 用的是axios就不用设置了，这个框架自动给我们设置了
    // 我们只要给data传一个FormData对象就可以了
    data
  })
}
// 收藏用户素材
export const collectImage = (imageId, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}
// 删除图片素材
export const deleteImage = (imageId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}

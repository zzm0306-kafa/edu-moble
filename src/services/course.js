import request from '@/utils/request'
// 顶部轮播图
export const getAllAds = params => {
  return request({
    method: 'get',
    url: '/front/ad/getAllAds',
    params
  })
}
// 获取课程内容
export const getAllCourse = () => {
  return request({
    method: 'get',
    url: '/front/course/getAllCourse'
  })
}
// 获取分页课程信息
export const getQueryCourses = data => {
  return request({
    method: 'post',
    url: '/boss/course/getQueryCourses',
    data
  })
}
// 获取已购课程信息
export const getPurchaseCourse = () => {
  return request({
    method: 'get',
    url: '/front/course/getPurchaseCourse'
  })
}
// 获取课程详情信息
export const getCourseById = params => {
  return request({
    method: 'get',
    url: '/front/course/getCourseById',
    params
  })
}
// 获取章节信息
export const getSectionAndLesson = params => {
  return request({
    method: 'get',
    url: '/front/course/session/getSectionAndLesson',
    params
  })
}
// 获取视频信息
export const videoPlayInfo = params => {
  return request({
    method: 'get',
    url: '/front/course/media/videoPlayInfo',
    params
  })
}

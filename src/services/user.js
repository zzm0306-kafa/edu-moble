import request from '@/utils/request'
import qs from 'qs'
// 登录接口
export const getUserLogin = data => {
  return request({
    method: 'post',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}
// 用户信息展示
export const getInfo = () => {
  return request({
    method: 'get',
    url: '/front/user/getInfo'
  })
}

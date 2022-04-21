import request from '@/utils/request'
// 创建商品订单
export const createOrder = data => {
  return request({
    method: 'post',
    url: '/front/order/saveOrder',
    data
  })
}
// 获取支付方式
export const getPayInfo = params => {
  return request({
    method: 'get',
    url: '/front/pay/getPayInfo',
    params
  })
}
// 创建订单
export const initPayment = data => {
  return request({
    method: 'post',
    url: '/front/pay/saveOrder',
    data
  })
}
// 查询订单
export const getPayResult = params => {
  return request({
    method: 'get',
    url: '/front/pay/getPayResult',
    headers: { 'content-type': 'application/json' },
    params
  })
}

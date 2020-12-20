import { request,uploadFile } from '../utils/request';
import Config from '../utils/config';
//轮播图
export async function getFocusInfo() {
  return request(`${Config.API_HOST}/api/focus/info`);
}
//广告
export async function getAdvertInfo() {
  return request(`${Config.API_HOST}/api/advert/info`);
}
//热门产品
export async function getProductHot() {
  return request(`${Config.API_HOST}/api/product/hot`);
}
//主打产品
export async function getProductList(params) {
  return request(`${Config.API_HOST}/api/product/list?page=${params.page}`);
} 
//提交维修
export async function uploadInfo(params) {
  return uploadFile(`${Config.API_HOST}/api/maintain/upload`,params);
} 
//商品分类
export async function getMainList(params) {
  return request(`${Config.API_HOST}/api/product/main?cate_id=${params.cate_id}`)
}
//详情信息
export async function getDetailInfo(params) {
  return request(`${Config.API_HOST}/api/detail/info?id=${params.id}`)
}
//商品相册图
export async function getProductPhoto(params) {
  return request(`${Config.API_HOST}/api/detail/photo?id=${params.id}`)
}
//分类列表
export async function getCategoryList() {
  return request(`${Config.API_HOST}/api/category/list`)
}
//获取分类详情
export async function getCategoryDetail(params) {
  return request(`${Config.API_HOST}/api/categoryDetail/list?classify_id=${params.classify_id}`,{})
}
//获取商品详情
export async function getProductDetail(params){
  return request(`${Config.API_HOST}/api/product/detail?id=${params.id}`,{})
}
//用户登录
export async function userLogin(params) {
  return request(`${Config.API_HOST}/api/userInfo/login?code=${params.code}&appid=${params.appid}`,{});
}

//购物车
export async function userInfoCartSave(params) {
  return request(`${Config.API_HOST}/api/cart/save`,{
    method:'POST',
    body:params
  });
}
//获取购物车详情
export async function getCartList(params) {
  return request(`${Config.API_HOST}/api/userInfo/cartList?openid=${params.openid}`);
}
//更新购物车数量
export async function updateCartList(params) {
  return request(`${Config.API_HOST}/api/cart/update?id=${params.id}&number=${params.number}`);
}
//获取预支付信息
export async function getPayInfo(params) {
  return request(`${Config.API_HOST}/api/userInfo/pay`,{
    method:'POST',
    body:params
  })
}
//删除购物车
export async function deleteCart(params) {
  return request(`${Config.API_HOST}/api/cart/delete?id=${params.id}`);
}
//更新购物车状态
export async function updateCartStatus(params) {
  return request(`${Config.API_HOST}/api/cart/status?id=${params.id}&checked=${params.checked}`);
}
//城市接口
export async function cityInfoList() {
  return request(`${Config.API_HOST}/api/city/info`);
}
//企业注册
export async function companyRegister(params) {
  return uploadFile(`${Config.API_HOST}/api/company/register`,params);
}
//企业登录
export async function companyLogin(params) {
  return request(`${Config.API_HOST}/api/company/login`,{
    method:'POST',
    body:params
  })
}
//获取企业信息
export async function companyInfo(params) {
  return request(`${Config.API_HOST}/api/company/info?creditCode=${params.creditCode}`);
}
//用户发起预支付
export async function userPrepaid(params) {
  return request(`${Config.API_HOST}/api/userInfo/prepaid`,{
    method:'POST',
    body:params
  })
}
//获取支付列表
export async function payInfoList(params){
  return request(`${Config.API_HOST}/api/userInfo/pay/list?openid=${params.openid}&goods_id=${params.goods_id}`);
}
//更新订单状态
export async function updateStatus(params) {
  return request(`${Config.API_HOST}/api/userInfo/update/order?openid=${params.openid}`);
}
//订单列表
export async function getOrderList(params) {
  return request(`${Config.API_HOST}/api/userInfo/order/list?openid=${params.openid}&status=${params.status}`);
}
//统计订单数量
export async function getOrderContent(params) {
  return request(`${Config.API_HOST}/api/userInfo/order/count?openid=${params.openid}`);
}
//删除订单
export async function deleteOrder(params) {
  return request(`${Config.API_HOST}/api/userInfo/order/delete?openid=${params.openid}&id=${params.id}`);
}
//购物车预支付订单
export async function cartPrepaid(params) {
  return request(`${Config.API_HOST}/api/cart/prepaid`,{
    method:'POST',
    body:params
  })
}
//保存用户信息
export async function userInfoSave(params) {
  return request(`${Config.API_HOST}/api/userInfo/save`,{
    method:'POST',
    body:params
  })
}
//获取用户信息
export async function getUserInfo(params) {
  return request(`${Config.API_HOST}/api/user/info?openid=${params.openid}`)
}
//获取预约列表
export async function maintainList(params) {
  return request(`${Config.API_HOST}/api/maintain/list?openid=${params.openid}&status=${params.status}`);
}
//预约删除
export async function maintainDelete(params) {
  return request(`${Config.API_HOST}/api/maintain/delete?id=${params.id}&openid=${params.openid}`);
}
//确认签收
export async function maintainSign(params) {
  return request(`${Config.API_HOST}/api/maintain/sign?id=${params.id}&openid=${params.openid}&status=${params.status}`)
}
//上传评价
export async function maintainEvaluation(params) {
  return request(`${Config.API_HOST}/api/maintain/evaluation`,{
    method:'POST',
    body:params
  })
}

//增加地址
export async function userAddressAdd(params) {
  return request(`${Config.API_HOST}/api/address/add`,{
    method:"POST",
    body:params
  })
}
//获取地址列表
export async function userAddressList(params) {
  return request(`${Config.API_HOST}/api/address/list?openid=${params.openid}`)
}
//删除地址
export async function userAddressDelete(params) {
  return request(`${Config.API_HOST}/api/address/delete?id=${params.id}&openid=${params.openid}`)
}
//获取单条地址
export async function userAddressInfo(params) {
  return request(`${Config.API_HOST}/api/address/info?id=${params.id}&openid=${params.openid}`)
}
//更新地址
export async function userAddressUpdate(params) {
  return request(`${Config.API_HOST}/api/address/update`,{
    method:"POST",
    body:params
  })
}
//获取用户默认地址
export async function userAddressDefault(params) {
  return request(`${Config.API_HOST}/api/address/default?openid=${params.openid}`)
}




import { request,uploadFile } from '../utils/request';
import Config from '../common/config';
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
//用户信息保存
export async function userLoginSave(params) {
  return request(`${Config.API_HOST}/api/userInfo/save`,{
    method:'POST',
    body:params
  })
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
//企业登录
export async function companyLogin(params) {
  return uploadFile(`${Config.API_HOST}/api/company/login`,params);
}




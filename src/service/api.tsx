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
export async function uploadInfo(data) {
  return uploadFile(`${Config.API_HOST}/api/maintain/upload`,data);
} 
//主打分类
export async function getMainList(params) {
  return request(`${Config.API_HOST}/api/product/main?main_id=${params.main_id}`)
}
//详情信息
export async function getDetailInfo(params) {
  return request(`${Config.API_HOST}/api/detail/info?detail_id=${params.detail_id}`)
}
//分类列表
export async function getCategoryList() {
  return request(`${Config.API_HOST}/api/category/list`)
}
//获取分类详情
export async function getCategoryDetail(params) {
  return request(`${Config.API_HOST}/api/categoryDetail/list?classify_id=${params.classify_id}`)
}




import {stringify} from 'qs';
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




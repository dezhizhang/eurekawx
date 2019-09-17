import {stringify} from 'qs';
import request from '../utils/request';
import Config from '../common/config';
//轮播图
export async function getFocusInfo() {
  return request(`${Config.API_HOST}/api/focus/info`);
}
//广告
export async function getAdvertInfo() {
  return request(`${Config.API_HOST}/api/advert/info`);
}




import {stringify} from 'qs';
import request from '../utils/request';
import Config from '../common/config';
console.log(Config.API_HOST)

export async function getFocusInfo() {
  return request(`${Config.API_HOST}/api/focus/info`);
}


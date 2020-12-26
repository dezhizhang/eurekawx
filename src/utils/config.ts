/*
 * @Author: your name
 * @Date: 2020-12-13 16:46:08
 * @LastEditTime: 2020-12-13 16:48:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /eurekawx/src/utils/config.ts
 */
const config = {
    development: {
      API_HOST: 'http://127.0.0.1:8082',
      HOST_TITLE: '(开发环境)',
      QINIU_KEY: '',
      
      BAIDU_MAP_AK: '',
      AMAP_KEY: '',
      PUSHY_APP_KEY: {
        ios: '',
        android: ''
      },
      WECHAT_APP_ID: ''
    },
    staging: {
      API_HOST: 'https://www.guicaioa.com',
      HOST_TITLE: '(测试环境)',
      QINIU_KEY: '',
      BAIDU_MAP_AK: '',
      AMAP_KEY: '',
      PUSHY_APP_KEY: {
        ios: '',
        android: ''
      },
      WECHAT_APP_ID: ''
    },
    production: {
      API_HOST: 'https://www.guicaioa.com',
      HOST_TITLE: '(生产环境)',
      QINIU_KEY: '',
      BAIDU_MAP_AK: '',
      AMAP_KEY: '',
      PUSHY_APP_KEY: {
        ios: '',
        android: ''
      },
      WECHAT_APP_ID: ''
    },
    common: {
      VERSION_NAME: {
        ios: '1.0.0',
        android: '1.0.0'
      },
    
    }
  };
  
  export default {
    // ...config.development,
    ...config.production,
    ...config.common
  };
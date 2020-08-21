import Taro from '@tarojs/taro';
export const appid = 'wx2198b51c8406aed0';

//提示
export const showToast = (params) => {
    Taro.showToast({
        title: params.title || '成功',
        icon: params.icon || 'success',
        image:'',
        duration: params.duration || 2000
    })
}
//loading
export const showLoading = (params) => {
    Taro.showLoading({
        title: params.title || 'loading'
    })
}
//消失loading
export const hideLoading = () => {
    Taro.hideLoading()
}
export const showModal = (params) => {
    Taro.showModal({
        title: params.title || '',
        content: params.content || '',
        showCancel:params.showCancel ||  false,
        confirmText:params.confirmText
    })
}
//获取缓存数据
export const getStorageSync = (key) => {
    try {
        const res = Taro.getStorageSync(key);
        return res
      } catch (e) {
       console.log(e);
    }
}
//存储缓存
export const setStorageSync = (params) => {
    try {
        Taro.setStorageSync(params.key, params.value);
    } catch (e) {
        console.log(e);
    }
}
//支持多订单号
export const orderNumber = () => {
    let d = new Date();
    let str = 'GC'+ d.getFullYear() + (d.getMonth()+1)+ d.getDate() + d.getHours() + d.getMinutes() + random(6);
    return str;
}
//生机随机字符串
export const random =(n) => {
    let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    return res;
} 

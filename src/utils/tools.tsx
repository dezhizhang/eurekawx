import Taro from '@tarojs/taro'

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
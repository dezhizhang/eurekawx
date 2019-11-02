export const baseURL = 'http://127.0.0.1:7001'
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
//生成用户唯一id
export const userInfoId =(number) => {
   return Number(Math.random().toString().substr(3,number) + Date.now()).toString(36)
} 
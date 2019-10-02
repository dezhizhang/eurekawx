export const baseURL = 'https://www.eureka.net.cn'
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
import '@tarojs/async-await'

export default {
   
  pages: [
    'pages/index/index',
    'pages/my/index',
    'pages/maintain/index',
    'pages/cart/index',
    'pages/category/index',
    'pages/detail/index',
    'pages/classify/index',
    'pages/login/index',
    "pages/setting/index",
    "pages/message/index",
    "pages/collection/index",
    "pages/company/index",
    "pages/user/index",
    "pages/address/index",
    "pages/perLogin/index",
    "pages/comLogin/index",
    "pages/order/index",
    "pages/payment/index",
    "pages/agreement/index",
   
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#735ff7',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    list: [{
      pagePath: "pages/index/index",
      text: "首页",
      iconPath: "./images/tab/home.png",
      selectedIconPath: "./images/tab/home-active.png"
    },
    {
      pagePath: "pages/category/index",
      text:'分类',
      iconPath:'./images/tab/cate.png',
      selectedIconPath:'./images/tab/cate-active.png'
    },
    {
      pagePath: "pages/cart/index",
      text: "购物车",
      iconPath: "./images/tab/cart.png",
      selectedIconPath: "./images/tab/cart-active.png"
    },{
      pagePath:"pages/my/index",
      text:"我的",
      iconPath:"./images/tab/user.png",
      selectedIconPath:"./images/tab/user-active.png"
    }
  ],
  }

}
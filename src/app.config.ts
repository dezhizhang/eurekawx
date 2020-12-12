export default {
  pages: [
    'pages/index/index',
    'pages/my/index',
    'pages/category/index',
    'pages/cart/index',
    "pages/detail/index",
    "pages/maintain/index",
    "pages/setting/index",
    "pages/login/index",
    "pages/company/index",
    "pages/order/index",
    "pages/payment/index",
    "pages/agreement/index",
    "pages/signature/index",
    "pages/user/index",
    "pages/address/index",
    "pages/evaluation/index",
    "pages/contact/index",
<<<<<<< HEAD
    "pages/message/index",
    "pages/money/index"
=======
    "pages/addressList/index",
    
>>>>>>> 574d8d6540d677529668c3497e2a31ee2a94bcb6
  
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
  },
}

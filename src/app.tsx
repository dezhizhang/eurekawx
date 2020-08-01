import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import configStore from './store'
import 'taro-ui/dist/style/index.scss'
import './app.less'

const store = configStore()
class App extends Component {

  
  config: Config = {
    pages: [
      'pages/my/index',
      'pages/index/index',
      'pages/maintain/index',
      'pages/cart/index',
      'pages/category/index',
      'pages/detail/index',
      'pages/classify/index',
      'pages/login/index',
      "pages/setting/index",
      "pages/message/index",
      "pages/collection/index",
      "pages/user/index",
      "pages/address/index"
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

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

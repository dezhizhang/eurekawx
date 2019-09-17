import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import configStore from './store'
import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()
class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/category/index',
      'pages/cart/index',
      'pages/my/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#735ff7',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    // tabBar: {
    //   list: [{
    //     pagePath: "pages/index/index",
    //     text: "首页",
    //     // iconPath: "./images/tab/home.png",
    //     // selectedIconPath: "./images/tab/home-active.png"
    //   }, {
    //     pagePath: "pages/category/index",
    //     text: "分类",
    //     iconPath: "./images/tab/cart.png",
    //     selectedIconPath: "./images/tab/cart-active.png"
    //   },{
    //     pagePath: "pages/cart/index",
    //     text: "购物车",
    //     iconPath: "./images/tab/user.png",
    //     selectedIconPath: "./images/tab/user-active.png"
    //   },{
    //     pagePath: "pages/user/index",
    //     text: "我的",
    //     iconPath: "./images/tab/user.png",
    //     selectedIconPath: "./images/tab/user-active.png"
    //   }],
    //   color: '#333',
    //   selectedColor: '#333',
    //   backgroundColor: '#fff',
    //   borderStyle: '#ccc'
    // }
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
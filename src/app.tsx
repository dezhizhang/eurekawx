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
      'pages/my/index',
      'pages/index/index',
      'pages/maintain/index',
      'pages/cart/index',
     
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
        iconPath: "./images/tab/index.png",
        selectedIconPath: "./images/tab/index_active.png"
      },
      {
        pagePath: "pages/cart/index",
        text:'购物车',
        iconPath:'./images/tab/cart.png',
        selectedIconPath:'./images/tab/cart_active.png'
      },
      {
        pagePath: "pages/maintain/index",
        text: "预约",
        iconPath: "./images/tab/make.png",
        selectedIconPath: "./images/tab/make_active.png"
      },{
        pagePath:"pages/my/index",
        text:"我的",
        iconPath:"./images/tab/my.png",
        selectedIconPath:"./images/tab/my_active.png"
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

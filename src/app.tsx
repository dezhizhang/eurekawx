import '@tarojs/async-await'
import Taro, {  Config } from '@tarojs/taro'
import React, { Component }  from 'react' 
import { Provider } from '@tarojs/redux'
import Index from './pages/index/index'
import configStore from './store'
import 'taro-ui/dist/style/index.scss'
import './app.less'

const store = configStore()
class App extends Component {

 
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

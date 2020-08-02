import { ComponentClass } from 'react'
import Taro, { Component, Config, } from '@tarojs/taro'
import { View,Button } from '@tarojs/components'
import  './index.less'


type PageStateProps = {
  counter: {
    num: number
  }
}


type PageOwnProps = {}

type PageState = {
  username:String,
  mobile:String,
  address:String,
  description:String
}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}
class Index extends Component {
  state = {
    username:'',
    mobile:'',
    address:'',
    description:'',
    tempFilePaths:''
  }
    config: Config = {
    navigationBarTitleText: '我的设置'
  }
  handleClearStroage = () => {
    try{
      Taro.clearStorageSync();
      Taro.reLaunch({
        url: '../my/index'
      })
    } catch(error) {
      console.log(error);
    }
  }
  render () {
    return (
         <View className="setting">
          <View className="bottom">
            <Button className="btn" onClick={this.handleClearStroage}>退出登录</Button>
          </View>
        </View>
    )
  }
}

export default Index as unknown as ComponentClass<PageOwnProps, PageState>


/**
 * @author:zhangdezhi
 * @date:20202-08-06
 * @desc:个人登录
*/
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, } from '@tarojs/components'
import  './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}
type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
    state = {
      isHide:false
    }
    config: Config = {
    navigationBarTitleText: '订单列表'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow() {

  }
  handleCompany = () => {
    Taro.navigateTo({
      url:'../company/index'
    });  
  }
  componentDidMount() {
   
  }
  

  componentDidHide () { }

  render () {
    return (
    <View className="order">
      <View className="order-wrapper">
        订单列表
      </View>
    </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>

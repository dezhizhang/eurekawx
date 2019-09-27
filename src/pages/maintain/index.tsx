import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input,Text, Button,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import goods from '../../images/goods.png'
import  './index.less'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '信息登记'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
     <View className="maintain">
         <View className="header">
            <View className="header">为了给你提供更好的服务，请准确填写如下信息</View>
            <View className="content">
                <View className="content-input">
                    <Text className="text">姓　　名：</Text>
                    <Input className="input" placeholder='请输入您的姓名'/>
                </View>
                <View className="content-input">
                    <Text className="text">联系电话：</Text>
                    <Input className="input" placeholder='请输入您的联系电话'/>
                </View>
                <View className="content-input">
                    <Text className="text">联系地址：</Text>
                    <Input className="input" placeholder="请输入您的联系地址"/>
                </View>
                <View className="content-input" style={{borderBottom:'none'}}>
                    <Text className="text">问题描述：</Text>
                    <Input className="input" placeholder="请输入您遇到的问题"/>
                </View>
                <View className="image">
                  <View className="image-flex image-left">
                      <Image src={goods} mode='aspectFill' className="image"/>
                  </View> 
                  <View className="image-flex image-right">
                      <Image src={goods} mode='aspectFill' className="image"/>
                  </View>
                </View>
            </View>
            <View className="bottom">
                <Button className="btn">提交</Button>
            </View>
         </View>
     </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>

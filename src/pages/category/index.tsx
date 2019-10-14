import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,  Image,ScrollView, } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import  './index.less'
import detailSwiper from '../../images/detail_swiper.png'
import bay from '../../images/bay.png'

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
  state = {
    listArr:[
      {key:1,name:'全 部'},
      {key:2,name:'女装'},
      {key:3,name:'男装'},
      {key:4,name:'套装'}
    ]
  }
  config: Config = {
    navigationBarTitleText: '商品分类'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
     <View className="category">
       <View className="left">
         <View className="left-item">
           <View className="item-icon"></View>
           <View className="item-text">全 部</View>
         </View>
         <View className="left-item">
           <View style={{display:'none'}} className="item-icon"></View>
           <View className="item-text">全 部</View>
         </View>
       </View>
      <ScrollView
        scrollY
        className="right"
      >
        <View className="right-item">
          <View className="item-box">
            <View className="box-left">
              <Image src={detailSwiper} className="image"/>
            </View>
            <View className="box-right">
              <View className="right-top">品牌男士休闲运动装</View>
              <View className="right-bottom">
                <View className="bottom-left">￥280.00 </View>
                <View className="bottom-right">
                  <Image src={bay} className="image"/>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="right-item">
          <View className="item-box">
            <View className="box-left">
              <Image src={detailSwiper} className="image"/>
            </View>
            <View className="box-right">
              <View className="right-top">品牌男士休闲运动装</View>
              <View className="right-bottom">
                <View className="bottom-left">￥280.00 </View>
                <View className="bottom-right">
                  <Image src={bay} className="image"/>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="right-item">
          <View className="item-box">
            <View className="box-left">
              <Image src={detailSwiper} className="image"/>
            </View>
            <View className="box-right">
              <View className="right-top">品牌男士休闲运动装</View>
              <View className="right-bottom">
                <View className="bottom-left">￥280.00 </View>
                <View className="bottom-right">
                  <Image src={bay} className="image"/>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="right-item">
          <View className="item-box">
            <View className="box-left">
              <Image src={detailSwiper} className="image"/>
            </View>
            <View className="box-right">
              <View className="right-top">品牌男士休闲运动装</View>
              <View className="right-bottom">
                <View className="bottom-left">￥280.00 </View>
                <View className="bottom-right">
                  <Image src={bay} className="image"/>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="right-item">
          <View className="item-box">
            <View className="box-left">
              <Image src={detailSwiper} className="image"/>
            </View>
            <View className="box-right">
              <View className="right-top">品牌男士休闲运动装</View>
              <View className="right-bottom">
                <View className="bottom-left">￥280.00 </View>
                <View className="bottom-right">
                  <Image src={bay} className="image"/>
                </View>
              </View>
            </View>
          </View>
        </View>
        
      </ScrollView>
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

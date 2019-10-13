import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Radio,ScrollView,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import arror from '../../images/icon/arrow.png'
import detailSwiper from '../../images/detail_swiper.png'
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
    navigationBarTitleText: '购物车'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <ScrollView className='cart'
        scrollY
        scrollWithAnimation
      >
        <View className="header">
          <View className="header-wrapper">
            <View className="item-left">全场满99元包邮，还差44.03元包邮</View>
            <View className="item-center">去凑单</View>
            <View className="item-right">
              <Image src={arror} className="image"/>
            </View>
          </View>
        </View>
        {/* 列表 */}
        <View className="content">
          <View className="content-wrapper">
            <View className="content-item">
              <View className="item-left">
                <Radio value='' checked className="radio"></Radio>
              </View>
              <View className="item-center">
                <Image src={detailSwiper} className="image"/>
              </View>
              <View className="item-right">
                <View className="right-top">新西兰皇家红苹果6个约135g/个 90元包邮送货上门</View>
                <View className="right-bottom">
                  <View className="bottom-left">￥27.90</View>
                  <View className="bottom-right">
                    <View className="number-left">-</View>
                    <View className="number-center"><Input className="input" value="1"/></View>
                    <View className="number-right">+</View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
           {/* 列表 */}
           <View className="content">
          <View className="content-wrapper">
            <View className="content-item">
              <View className="item-left">
                <Radio value='' checked className="radio"></Radio>
              </View>
              <View className="item-center">
                <Image src={detailSwiper} className="image"/>
              </View>
              <View className="item-right">
                <View className="right-top">新西兰皇家红苹果6个约135g/个 90元包邮送货上门</View>
                <View className="right-bottom">
                  <View className="bottom-left">￥27.90</View>
                  <View className="bottom-right">
                    <View className="number-left">-</View>
                    <View className="number-center"><Input className="input" value="1"/></View>
                    <View className="number-right">+</View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
           {/* 列表 */}
           <View className="content">
          <View className="content-wrapper">
            <View className="content-item">
              <View className="item-left">
                <Radio value='' checked className="radio"></Radio>
              </View>
              <View className="item-center">
                <Image src={detailSwiper} className="image"/>
              </View>
              <View className="item-right">
                <View className="right-top">新西兰皇家红苹果6个约135g/个 90元包邮送货上门</View>
                <View className="right-bottom">
                  <View className="bottom-left">270px</View>
                  <View className="bottom-right">
                    <View className="number-left">-</View>
                    <View className="number-center"><Input className="input" value="1"/></View>
                    <View className="number-right">+</View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        <View className="bottom">
          <View className="bottom-wrapper">
            <View className="item-one">
              <Radio value='' className="radio"></Radio>
            </View>
            <View className="item-two">全选</View>
            <View className="item-three">合计(不含运费)</View>
            <View className="item-four">￥94.23</View>
            <View className="item-six">去支付</View>
          </View>
        </View>
        
      </ScrollView>
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

import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Radio,ScrollView,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import arror from '../../images/icon/arrow.png'
import detailSwiper from '../../images/detail_swiper.png'
import  './index.less'

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


export default Index as ComponentClass<PageOwnProps, PageState>

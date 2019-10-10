import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { AtAvatar  } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import myHeader from '../../images/my_header.png'
import facility from '../../images/facility.png'
import gift from '../../images/gift.png'
import allOrder from '../../images/all_order.png'
import msg from '../../images/icon/msg.png'
import arrow from '../../images/icon/arrow.png'
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
    navigationBarTitleText: '我的'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
    <View className="my">
      <View className="header">
          <View className="header_top">
            <View className="header_image">
              <Image className="image" src={myHeader}/>
            </View>
            <View className="header_avatar">
              <Image src={facility} className="avatar"/>
              {/* <AtAvatar className="avatar" image='https://jdc.jd.com/img/200'/> */}
            </View>
            <View className="header_user">
              <View className="user_name">路啊路</View>
              <View className="user_address">ID:65788768</View>
            </View>
            <View className="header_right">
               <View className="right">
                  <View className="icon">
                    <Image src={gift} className="image"/>
                  </View>
                  <View className="text">推荐送礼</View>
               </View>
            </View>
          </View>
          <View className="header_content">
          <View className="content_card">
            <View className="card_info">
              <View className="info_box">
                <View className="box_top">
                  <View className="top_item">
                    <View className="item_top">待付款</View>
                    <View className="item_bottom">3</View>
                  </View>
                  <View className="top_item">
                    <View className="item_top">待发货</View>
                    <View className="item_bottom">3</View>
                  </View>
                  <View className="top_item">
                    <View className="item_top">待收货</View>
                    <View className="item_bottom">6</View>
                  </View>
                  <View className="top_item">
                    <View className="item_top">待评价</View>
                    <View className="item_bottom">12</View>
                  </View>
                </View>
                <View className="box-bottom">
                    <View className="bottom-wrapper">
                      <View className="bottom-item">
                        <View className="item-top">
                           <Image src={allOrder} className="image"/>
                        </View>
                        <View className="item-bottom">所有订单</View>
                      </View>
                      <View className="bottom-item">
                        <View className="item-top">
                          <Image src={allOrder} className="image"/>
                        </View>
                        <View className="item-bottom">完成订单</View>
                      </View>
                    </View>
                </View>
              </View>
            </View>
          </View>
      </View>
      </View>
      <View className="content">
        <View className="content-item">
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的消息</View>
             <View className="text-right">
               <View className="text-number">16</View>
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的收藏</View>
             <View className="text-right">
               {/* <View className="text-number">16</View> */}
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的卡券</View>
             <View className="text-right">
              你有3张优惠券待使用
               {/* <View className="text-number">16</View> */}
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的金币</View>
             <View className="text-right">
               {/* <View className="text-number">16</View> */}
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的预约</View>
             <View className="text-right">
               {/* <View className="text-number">16</View> */}
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
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

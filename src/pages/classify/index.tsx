import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,ScrollView,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import bay from '../../images/bay.png'
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
    <ScrollView className='classify'
        scrollY
        scrollWithAnimation
      >
        <View className="wrapper">
            <View className="list">
                <View className="list-item">
                    <View className="item-top">
                        <Image src={detailSwiper} className="image"/>
                    </View>
                    <View className="item-bottom">
                       <View className="bottom-wrapper">
                           <View className="wrapper-top">2019潮流韩版蝙蝠衫</View>
                           <View className="wrapper-bottom">
                               <View className="bottom-left">￥100</View>
                               <View className="bottom-right">
                                   <Image src={bay} className="image"/>
                               </View>
                           </View>
                       </View>
                    </View>
                </View>
                <View className="list-item"></View>
                <View className="list-item"></View>
                <View className="list-item"></View>
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

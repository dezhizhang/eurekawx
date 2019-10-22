import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Radio,ScrollView,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import arror from '../../images/icon/arrow.png'
import { baseURL } from '../../utils/tools'
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
  state = {
    cartList:[]
  }
  config: Config = {
    navigationBarTitleText: '购物车'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    const cartList = Taro.getStorageSync('cartList');
    this.setState({
      cartList
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let { cartList } = this.state;
    console.log(cartList);

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
          {cartList.map((item,index) => {
            return <View key={index} className="content">
            <View className="content-wrapper">
              <View className="content-item">
                <View className="item-left">
                  <Radio value='' checked className="radio"></Radio>
                </View>
                <View className="item-center">
                  <Image src={`${baseURL}${item.goods_img}`} className="image"/>
                </View>
                <View className="item-right">
                  <View className="right-top">{item.title}</View>
                  <View className="right-bottom">
                    <View className="bottom-left">￥{item.price}</View>
                    <View className="bottom-right">
                      <View className="number-left">-</View>
                      <View className="number-center"><Input className="input" value={item.number}/></View>
                      <View className="number-right">+</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          })}
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

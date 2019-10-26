import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Radio,ScrollView,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getCartList,updateCartList } from '../../service/api'
import { showToast,baseURL } from '../../utils/tools'
import { add, minus, asyncAdd } from '../../actions/counter'
import arror from '../../images/icon/arrow.png'
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
  componentDidShow() {
    let userInfoKey = Taro.getStorageSync('userInfoKey');
    let userInfo = JSON.parse(userInfoKey);
    if(userInfo) {
      getCartList({...userInfo}).then(res=> {
        let list = res.data;
        if(list.code == 200) {
          let cartList = list.data;
          this.setState({cartList});
        }
      })
    }
  }

  componentWillUnmount () { }
  handleDecrement = (item) => {
    let { cartList } = this.state;
    for(let i=0;i<cartList.length;i++) {
      if(item._id == cartList[i]._id) {
        if(cartList[i].number > 1) {
          let number = cartList[i].number;
          number--;
          cartList[i].number = number;
          updateCartList({id:item._id,number:number});
        } else {
          showToast({title:'数量不能小于1',icon:'none'})
        }
      }
    }
    this.setState({cartList});
  }

  handleIncrement = (item) => {
    let { cartList } = this.state;
    for(let i=0;i<cartList.length;i++) {
      if(item._id == cartList[i]._id) {
        let number = cartList[i].number;
        number++;
        cartList[i].number = number;
        updateCartList({id:item._id,number:number});
      }
    }
    this.setState({cartList});
  }
  handleNumberChange = (ev,item) => {
    let value = ev.target.value;
    if(value <=0) {
      showToast({title:'数量不能小于0',icon:'none'});
      return;
    }
    let { cartList } = this.state;
    for(let i=0;i<cartList.length;i++) {
      if(item._id == cartList[i]._id) {
        cartList[i].number = value;
      }
    }
    this.setState({cartList});
  }
  componentDidHide () { }

  render () {
    let { cartList } = this.state;
    let totalPrice = 0;
    for(let i=0;i<cartList.length;i++) {
      totalPrice += cartList[i].number * cartList[i].price
    }
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
                      <View className="number-left" onClick={() => this.handleDecrement(item)}>-</View>
                      <View className="number-center"><Input className="input" disabled={true} onInput={(event) => this.handleNumberChange(event,item)} value={item.number} type="number"/></View>
                      <View className="number-right" onClick={() => this.handleIncrement(item)}>+</View>
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
            <View className="item-four">￥{totalPrice}</View>
            <View className="item-six">去支付</View>
          </View>
        </View>
      </ScrollView>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>

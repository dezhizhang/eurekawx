import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Radio,ScrollView,Image } from '@tarojs/components'
import { getCartList,updateCartList,deleteCart,updateCartStatus,cartPrepaid } from '../../service/api'
import { showToast,getStorageSync } from '../../utils/tools'
import arror from '../../images/icon/arrow.png'
import  './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageOwnProps = {}

type PageState = {
  cartList:any;
  allChecked:boolean;
  openid:string;
}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}


class Index extends Component {
  state = {
    cartList:[
      {
        url:'',
        checked:'',
        number:0,
        title:'',
        price:0,
        _id:'',
      }
    ],
    openid:"",
    allChecked:true
  }
  config: Config = {
    navigationBarTitleText: '购物车'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidShow(){
    this.getListInfo();
  }

  getListInfo = async () => {
    const userInfoKey = getStorageSync("userInfoKey");
    const userInfo = userInfoKey ? JSON.parse(userInfoKey):{};
    if(Object.keys(userInfo).length <= 0) { //当前还没有登录
      showToast({
        title:'您当前还没有登录',
        icon:'none'
      });
      setTimeout(() =>{
        Taro.switchTab({
          url:'../my/index',
        })
      } ,1000);
      return
    }
    const { openid } = userInfo;
    let res =await getCartList({openid});
    if(res.data.code == 200) {
      let cartList = res.data.data;
      this.setState({ cartList,openid });
    }
  }

  componentWillUnmount () { }
  handleDecrement = async(item) => {
    let { cartList } = this.state;
    for(let i=0;i<cartList.length;i++) {
      if(item._id == cartList[i]._id) {
        if(cartList[i].number > 1) {
          let number = cartList[i].number;
          number--;
          cartList[i].number = number;
          updateCartList({id:item._id,number:number});
        } else {
          let res = await deleteCart({id:item._id});
          let data = res.data;
          if(data.code == 200) {
            this.getListInfo()
          }
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
  handleRadio = async(item) => {
    let checked = false;
    let { cartList } = this.state;
    for(let i=0;i<cartList.length;i++) {
      if(cartList[i]._id == item._id) {
        cartList[i].checked  = cartList[i].checked ? false:true;
        checked = cartList[i].checked ? true:false;
      }
    }
    let res = await updateCartStatus({id:item._id,checked});
    if(res.data.code == 200) {
      console.log(res);
    }
    this.setState({cartList});
  }
  handleAllChecked = () => {
    let { allChecked,cartList } = this.state 
    let checked = !allChecked
    const length = cartList.length;
    for(let i=0;i < length;i++) {
      cartList[i].checked = checked;
    }
    this.setState({
      cartList,
      allChecked: checked
    })
  }
  //去支付
  handlePayMent = async() => {
    let { cartList,openid } = this.state;
    let cartArr = [];
    let length = cartList.length;
    for(let i=0;i < length;i++) {
      if(cartList[i].checked) {
        delete cartList[i]._id
        cartArr.push(cartList[i]);
      }
    }
    let res = await cartPrepaid({openid,list:cartArr});
    if(res.data.code === 200) {
      Taro.navigateTo({
        url:`../payment/index?openid=${openid}`
      });
    } 
  }
  componentDidHide () { }

  render () {
    let { cartList,allChecked } = this.state;
    let totalPrice = 0;
    for(let i=0;i<cartList.length;i++) {
      if(cartList[i].checked) {
        totalPrice += cartList[i].number * cartList[i].price
      }
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
          {cartList.map(item => { 
            console.log("item",item);
            return <View key={item._id} className="content">
            <View className="content-wrapper">
              <View className="content-item">
                <View className="item-left">
                  <Radio value="" color="#735ff7" checked={item.checked} className="radio" onClick={() => this.handleRadio(item)}></Radio>
                </View>
                <View className="item-center">
                  <Image src={item.url} className="image"/>
                </View>
                <View className="item-right">
                  <View className="right-title">
                    <View className="title-left">{item.title}</View>
                    <View className="title-sub"></View>
                  </View>
                  <View className="right-bottom">
                    <View className="bottom-left">￥{Number((item.price)).toFixed(2)}</View>
                    <View className="bottom-right">
                      <View className="number-left" onClick={() => this.handleDecrement(item)}>-</View>
                      <View className="number-center"><Input className="input" disabled={true} onInput={(event) => this.handleNumberChange(event,item)} value={(item.number)} type="number"/></View>
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
              <Radio value={'allButton'} onClick={this.handleAllChecked} checked={allChecked} color="#735ff7" className="radio"></Radio>
            </View>
            <View className="item-two">全选</View>
            <View className="item-three">合计(不含运费)</View>
            <View className="item-four">￥{Number(totalPrice).toFixed(2)}</View>
            <View className="item-six" onClick={this.handlePayMent}>去支付</View>
          </View>
        </View>
      </ScrollView>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>

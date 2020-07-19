import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import detailStore from '../../images/icon/detail_store.png'
import detailCart from '../../images/icon/detail_cart.png'
import detailService from '../../images/icon/detail_service.png'
import detailShare from '../../images/icon/detail_share.png'
import arrow from '../../images/icon/arrow.png'
import close from '../../images/icon/close.png'
import  './index.less'
import { showLoading,hideLoading,baseURL,showToast } from '../../utils/tools'
import { View, Swiper, SwiperItem,Image, ScrollView, Button,Input} from '@tarojs/components'
import { getDetailInfo,userInfoCartSave,getPayInfo,userLogin,getProductPhoto,getProductDetail } from '../../service/api'

type PageStateProps = {
  counter: {
    num: number
  }
}


type PageOwnProps = {}

type PageState = {
  baseData:any;
  photoList:any;
  detailList:any;
}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}


class Index extends Component {
    state = {
      detailData:[],
      focus_img:[],
      detailList:[],
      showModalStatus:false,
      animationData:'',
      number:1,
      cartList:[],
      photoList:[],
      baseData:{
        title:'',
        price:0,
        freight:0,
        sales:0,
        inventory:0,
      },
    }
    
    config: Config = {
    navigationBarTitleText: '商品详情'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillMount () {
    let params = this.$router.params;
    this.baseData(params);
    this.photoDetail(params);
    this.detailData(params);
  }
  baseData = async (params) => {
    showLoading({title:'加载中...'});
    let res = await getDetailInfo(params);
    if(res.data.code === 200) {
      let result = res.data.data;
      this.setState({
        baseData:result[0],
      });
      hideLoading()
    }
  }
  photoDetail = async(params) => {
    let res = await getProductPhoto(params);
    if(res.data.code === 200) {
      let photoList = res.data.data;
      this.setState({ photoList });
    }
  }
  detailData = async(params) => {
    let res = await getProductDetail(params);
    if(res.data.code === 200) {
      let detailList = res.data.data;
      this.setState({ detailList })
    }
  }
  handleShowModal = () => {
    let that = this;
    let animation  = Taro.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
    });
    this.state.animation = animation
    animation.translateY(300).step();
    this.setState({
      animationData:animation.export(),
      showModalStatus:true
    });
    setTimeout(function () {
      animation.translateY(0).step()
      that.setState({
        animationData: animation.export()
      })
    }.bind(this), 200)

  }
  handlehideModal = () => {
    let that = this;
    let animation = Taro.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation
    animation.translateY(300).step();
    this.setState({
      animationData: animation.export(),
    });
    setTimeout(function () {
      animation.translateY(0).step()
      that.setState({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }
  handleSubtraction = () => {
    let { number } = this.state;
    if(number<=1) {
      showToast({
        title:'商品数量不能小于1',
        icon:'none'
      })
    } else {
      number--;
    }
    this.setState({
      number
    });
  };
  handleAddition = () => {
    let { number } = this.state;
    number++;
    this.setState({
      number
    });
  };
  handleInputChange = (ev) => {
    let value = ev.target.value;
    this.setState({
      number:value
    });
  }
  handleSubmit = () => {
    let that = this;
    let { number,detailData,focus_img } = this.state;
    let title = detailData[0].title;
    let price =  detailData[0].price;
    let goods_img = focus_img[0];
    let userInfoKey = Taro.getStorageSync('userInfoKey');
    let userInfo =userInfoKey ? JSON.parse(userInfoKey):''
    let params = {
      number,
      title,
      price,
      goods_img,
      openid:userInfo.openid
    }
    showLoading({title:'加入中'});
    userInfoCartSave(params).then(res => {
    hideLoading();
    let cart = res.data;
    if(cart.code == 200) {
      showToast({title:cart.msg});
      that.handlehideModal();
      Taro.switchTab({
        url:'../cart/index'
      })
    }
  });
  }
  handlePayment = async() => {
    let loginInfo = await Taro.login();
    let userInfo = await userLogin({code:loginInfo.code,appid:'wx070d1456a4a9c0fb'});
    if(userInfo.data.code == 200) {
      let result = userInfo.data.data
      let payInfo = await getPayInfo(result);
      console.log(payInfo);

    }
    

   

    // Taro.login().then(res => {
    //   let params = {
    //     code:res.code,
    //     appid:'wx070d1456a4a9c0fb',
    //   }
    //   userLogin(params).then(res => {
    //       if(res.data.code == 200) {
    //         let result = res.data.data;
    //         let userInfoKey = JSON.stringify(result);
    //         Taro.setStorageSync('userInfoKey', userInfoKey);
    //       }
    //   })
    // })
    // getPayInfo(params).then(res => {
    //   console.log(res);

    // })
    // let params = {
    //   timeStamp:'111',
    //   nonceStr:'222',
    //   package:'444',
    //   paySign:'5555',
    //   signType:'MD5'
    // }
    // Taro.requestPayment(params).then(res => {
    //      console.log(res);

    // })

   

  }
  componentWillUnmount () { }

  componentDidShow () {

    let result = Taro.getStorageSync('userInfo');
    let userInfo = result ? JSON.parse(result):''
    if(!userInfo) {
      Taro.switchTab({
        url: '../my/index'
      })
    }
   }

  componentDidHide () { }

  render () {
    let { baseData,photoList,detailList,animationData,showModalStatus,number } = this.state;
   
    return (
     <ScrollView 
        scrollY
        className="detail"
        scrollWithAnimation
      >
        <View className="detail-header">
          <View className="detail-swiper">
          <Swiper
            className="swiper"
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            {photoList&&photoList.map((item,index) => {
              return (<SwiperItem key={index}>
                <View className='swiper-item'>
                  <Image src={`${item}`}  className="image"/>
                </View>
              </SwiperItem>)
            })}
          </Swiper>
          </View>
          <View className="detail-content">
            <View className="content-top">
              <View className="top-title">
                <View className="title-left">{baseData.title}</View>
                <View className="title-right">
                  <View className="right-icon">
                    <Image src={detailShare} className="image"/>
                  </View>
                  <View className="right-text">分享</View>
                </View>
              </View>
              <View className="top-price">￥{baseData.price}</View>
              <View className="top-list">
                <View className="list-wrapper">
                  <View className="list-item">运费：￥{baseData.freight}</View>
                  <View className="list-item">销量：{baseData.sales}</View>
                  <View className="list-item">库存：{baseData.inventory}</View>
                </View>
              </View>
            </View>
            <View className="content-center">
              <View className="center-wrapper">
                <View className="item-one center-item">优惠</View>
                <View className="item-two center-item">领券后至少可减￥10</View>
                <View className="item-three center-item">领券</View>
                <View className="item-four">
                  <Image className="image" src={arrow}/>
                </View>
              </View>
            </View>
            <View className="content-bottom">
              <View className="bottom-title">图文详情</View>
              {detailList&&detailList.map((item,index) => {
                return (<View key={index} className="bottom-item">
                  <Image src={`${item}`} className="image"/>
                </View>
                )})}
            </View>
          </View>
        </View>
        <View className="detail-bottom">
          <View className="detail-wrapper">
            <View className="detail-item">
              <View className="item-store">
                <View className="store-icon">
                  <Image src={detailStore} className="image"/>
                </View>
                <View className="store-text">店铺</View>
              </View>
            </View>
            <View className="detail-item">
              <View className="item-store">
                <View className="store-icon">
                  <Image src={detailService} className="image"/>
                </View>
                <View className="store-text">客服</View>
              </View>
            </View>
            <View className="detail-item">
              <View className="item-store">
                <View className="store-icon">
                  <Image src={detailCart} className="image"/>
                </View>
                <View className="store-text">购物车</View>
              </View>
            </View>
            <View onClick={this.handleShowModal} className="detail-bgitem item-cart">加入购物车</View>
            <View className="detail-bgitem item-buy" onClick={this.handlePayment}>立即购买</View>
          </View>
        </View>
        
        {/* <View className="detail-bg" style={{display:false?'block':'none'}}></View>
        <View animation={animationData} style={{display:showModalStatus?'block':'none'}} className="detail-modal">
          <View className="modal-wrapper">
             <View className="modal-box">
               <View className="box-top">
                 <View className="top-left">
                   <Image src={`${baseURL}${detail_img&&detail_img[0]}`} className="image"/>
                 </View>
                 <View className="top-right">
                   <View className="right-icon" onClick={this.handlehideModal}>
                     <Image src={close} className="image"/>
                   </View>
                   <View className="right-text">{detailData[0].title}</View>
                   <View className="right-price">￥{detailData[0].price}</View>
                 </View>
               </View>
               <View className="box-bottom">
                 <View className="bottom-title">尺码</View>
                 <View className="bottom-item">
                   <View className="item-list">标码</View>
                 </View>
                 <View className="bottom-title">颜色</View>
                 <View className="bottom-item">
                   <View className="item-list">标色</View>
                 </View>
                 <View className="right-bottom">
                  <View className="bottom-left"></View>
                  <View className="bottom-right">
                    <View onClick={this.handleSubtraction} className="number-left">-</View>
                    <View className="number-center"><Input type='number' value={number} onChange={this.handleInputChange}  className="input"/></View>
                    <View className="number-right" onClick={this.handleAddition}>+</View>
                  </View>
                </View>
                 <View className="bottom-btn">
                   <Button onClick={this.handleSubmit} className="btn">确定</Button>
                 </View>
               </View>
             </View>
          </View>
        </View> */}

     </ScrollView>
    )
  }
}
export default Index as ComponentClass<PageOwnProps, PageState>

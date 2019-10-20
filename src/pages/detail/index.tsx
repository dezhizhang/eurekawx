import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem,Image, ScrollView} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getDetailInfo } from '../../service/api'
import { showLoading,hideLoading,baseURL } from '../../utils/tools'
import { add, minus, asyncAdd } from '../../actions/counter'
import detailStore from '../../images/icon/detail_store.png'
import detailCart from '../../images/icon/detail_cart.png'
import detailService from '../../images/icon/detail_service.png'
import detailShare from '../../images/icon/detail_share.png'
import arrow from '../../images/icon/arrow.png'
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
      detailData:[],
      focus_img:[],
      detail_img:[],
    }
    config: Config = {
    navigationBarTitleText: '商品详情'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillMount () {
    let params = this.$router.params;
    this.detailData(params);
  }
  detailData = async (params) => {
    showLoading({title:'加载中...'})
    let detail = await getDetailInfo(params);
    if(detail.data.code == 200) {
      let detailData = detail.data.data;
      let { focus_img,detail_img } = detailData&&detailData[0];
      this.setState({detailData,focus_img,detail_img});
      hideLoading()
    }
  }
  

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let { detailData,focus_img,detail_img } = this.state;
   
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
    
            {focus_img&&focus_img.map((item,index) => {
              return (<SwiperItem key={index}>
                <View className='swiper-item'>
                  <Image src={`${baseURL}${item}`}  className="image"/>
                </View>
              </SwiperItem>)
            })}
          </Swiper>
          </View>
          <View className="detail-content">
            <View className="content-top">
              <View className="top-title">
                <View className="title-left">{detailData[0].title}</View>
                <View className="title-right">
                  <View className="right-icon">
                    <Image src={detailShare} className="image"/>
                  </View>
                  <View className="right-text">分享</View>
                </View>
              </View>
              <View className="top-price">￥{detailData[0].price}</View>
              <View className="top-list">
                <View className="list-wrapper">
                  <View className="list-item">运费：￥{detailData&&detailData[0].freight}</View>
                  <View className="list-item">销量：{detailData&&detailData[0].sales}</View>
                  <View className="list-item">库存：{detailData&&detailData[0].inventory}</View>
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
              {detail_img&&detail_img.map((item,index) => {
                return (<View key={index} className="bottom-item">
                  <Image src={`${baseURL}${item}`} className="image"/>
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
            <View className="detail-bgitem item-cart">加入购物车</View>
            <View className="detail-bgitem item-buy">立即购买</View>
          </View>
        </View>
     </ScrollView>
    )
  }
}
export default Index as ComponentClass<PageOwnProps, PageState>

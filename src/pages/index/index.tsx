import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem,ScrollView,Image  } from '@tarojs/components'
import { add, minus, asyncAdd } from '../../actions/counter'
import { getFocusInfo,getAdvertInfo,getProductHot,getProductList } from '../../service/api'
import { baseURL,showLoading,hideLoading } from '../../utils/tools'
import category from '../../images/category.png'
import facility from '../../images/facility.png'
import stationery from '../../images/stationery.png'
import evenmore from '../../images/evenmore.png'
import cart from '../../images/icon/cart.png'
import bay from '../../images/bay.png'
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
      focusData:[],
      advertData:[],
      hotData:[],
      listData:[],
      listArr:[],
      page:1,
      classifyArr:[
        {
          name:'办公',
          main_id:'1',
          src:category
        },
        {
          name:'设备',
          main_id:'2',
          src:facility
        },
        {
          name:'文具',
          main_id:'3',
          src:stationery
        },
        {
          name:'更多',
          main_id:'4',
          src:evenmore
        }
      ]
    }

  config: Config = {
    navigationBarTitleText: 'e瑞轻办公文具'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getFocusData();
    this.getadvertData();
    this.getProductHotData();
    this.getProductListData();
  }
  getFocusData = async () =>  {
     const result = await getFocusInfo();
     const data = result.data;
     if(data.code == 200) {
       let focusData = data.data
       this.setState({focusData})
     }
  }
  getadvertData = async () =>  {
     const result = await getAdvertInfo();
     const data = result.data;
     if(data.code == 200) {
       let advertData = data.data;
       this.setState({advertData})
     }
  }
  getProductHotData = async () => {
    const result = await getProductHot();
    const data = result.data;
    if(data.code == 200) {
      let hotData = data.data;
      this.setState({hotData});
    }
  }
  getProductListData = async () =>  {
    const { page } = this.state;
    const result = await getProductList({page:page});
    const data = result.data;
    if(data.code == 200) {
      let listData = data.data;
      this.setState({listData})
    }
  }
  handleAdvert = () => {
    Taro.switchTab({
      url: '../maintain/index'
    });
  }
  //数组转换方法
  arrTrans = (num,arr) => {
    let iconsArr = [];
    arr.forEach((item, index) => {
      let page = Math.floor(index / num); // 计算该元素为第几个素组内
      if (!iconsArr[page]) { // 判断是否存在
        iconsArr[page] = [];
      }
      iconsArr[page].push(item);
    });
    return iconsArr;
  } 

  onReachBottom = async() => {
    let { page,listData } = this.state;
    page++;
    const result = await getProductList({page:page});
    const data = result.data;
    showLoading({title:'加载中'})
    if(data.code == 200) {
      hideLoading();
      let listArr = listData.concat(data.data);
      this.setState({listData:listArr,page});
    }
  }
  //商品详情
  handleToDetail = (item) => {
    Taro.navigateTo({
      url: `../detail/index?id=${item._id}`
    })
  }
  //分类详情
  handleToCateDetail = (item) => {
    Taro.navigateTo({
      url: `../classify/index?main_id=${item.main_id}`
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { focusData,advertData,hotData,listData,classifyArr } = this.state;
    let hotArr = this.arrTrans(3,hotData); //3代表二维数据有几个
  
    return (
      <ScrollView className='index'
        scrollY={true}
        scrollWithAnimation={true}
        enableBackToTop
      >
        <View className='wrapper'>
          <View className="list">
            <Swiper
              className='swiper'
              indicatorColor='#537afb'
              indicatorActiveColor='#735ff7'
              circular
              indicatorDots
              autoplay>
              {focusData.length && focusData.map((item,index) => {
                return (
                  <SwiperItem key={index}>
                    <View className="bannner"><Image className="banner_image" mode='aspectFill' src={`${baseURL}${item.focus_img}`}/></View>
                  </SwiperItem>)
                })}
            </Swiper>
            <View className="category">
               {classifyArr.map((item,index) => {
                return (
                  <View key={index} className="item" onClick={() => this.handleToCateDetail(item)}>
                    <View className="top">
                      <View className="image_wrapper">
                          <Image className="image" mode='aspectFill'  src={item.src}/>
                      </View>
                    </View>
                    <View className="bottom">{item.name}</View>
                  </View>
                )})}
            </View>
            <View className="advert" onClick={this.handleAdvert}>
              {advertData.length&&advertData.map((item,index) => {
                return (<Image className="advert_image" key={index} mode='aspectFill' src={`${baseURL}${item.advert_img}`}></Image>)
              })}
            </View>
            <View className="hot">
              <View className="top">
                 <View className="left">热门产品</View>
                 <View className="right">MORE</View>
              </View>
              <View className="bottom">
                <Swiper
                  circular
                  autoplay
                  >
                  {hotArr.map((item,index) => {
                    return <SwiperItem key={index}>
                     <View className='swiper-item'>
                       {item.map((list,number) => {
                         return <View className='item' key={number} onClick={() => this.handleToDetail(list)}>
                         <View className="item-top">
                             <Image className="image" mode='aspectFill'  src={`${baseURL}${list.product_url}`}/>
                         </View>
                         <View className="item-bottom">
                          <View className="bottom-top">{list.description}</View>
                          <View className="bottom-bottom">
                            <View className="bottom-left">￥{list.price}</View>
                            <View className="bottom-right">
                              <Image className="image" mode='aspectFill'  src={cart}/>
                            </View>
                          </View>
                         </View>
                      </View>
                       })}
                     </View>
                   </SwiperItem>
                  })}
                </Swiper>
              </View>
            </View>
          </View>
          <View className="product">
             主打产品
          </View>
          <View className='product_item'>
          <View className="product_wrapper">
            {listData.map((item,index) => {
              return  <View className="item" key={index} onClick={() =>this.handleToDetail(item)}>
              <View className="item-top">
                <Image className="image" mode='aspectFill'  src={`${baseURL}${item.product_url}`}/>
              </View>
              <View className="item-bottom">
                <View className="bottom-desc">{item.description}</View>
                <View className="bottom-text">
                    <View className="text-left">￥{item.price}</View>
                    <View className="text-right">
                      <Image className="image" src={bay}/>
                    </View>
                </View>
              </View>
            </View>
            })}
          </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>

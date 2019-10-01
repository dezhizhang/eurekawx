import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem,ScrollView,Image  } from '@tarojs/components'
import { add, minus, asyncAdd } from '../../actions/counter'
import { getFocusInfo,getAdvertInfo,getProductHot,getProductList } from '../../service/api'
import { baseURL } from '../../utils/tools'
import  './index.less'
import category from '../../images/category.png'
import goods from '../../images/goods.png'
import cart from '../../images/icon/cart.png'
import bay from '../../images/bay.png'


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
    state = {
      focusData:[],
      advertData:[],
      hotData:[],
      listData:[],
      page:1
    }
    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '商城'
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
    if(data.code == 200) {
      let listArr = listData.concat(data.data);
      this.setState({listData:listArr})
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { focusData,advertData,hotData,listData } = this.state;
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
                 return (<SwiperItem key={index}>
                   <View className="bannner"><Image className="banner_image" mode='aspectFill' src={`${baseURL}${item.focus_img}`}/></View>
                 </SwiperItem>)
              })}
            </Swiper>
            <View className="category">
                <View className="item">
                  <View className="top">
                    <View className="image_wrapper">
                      <Image className="image" mode='aspectFill'  src={category}/>
                    </View>
                   
                  </View>
                  <View className="bottom">女装</View>
                </View>
                <View className="item">
                  <View className="top">
                    <View className="image_wrapper">
                      <Image className="image" mode='aspectFill'  src={category}/>
                    </View>
                   
                  </View>
                  <View className="bottom">男装</View>
                </View>
                <View className="item">
                  <View className="top">
                    <View className="image_wrapper">
                      <Image className="image" mode='aspectFill'  src={category}/>
                    </View>
                   
                  </View>
                  <View className="bottom">套装</View>
                </View>
                <View className="item">
                  <View className="top">
                    <View className="image_wrapper">
                      <Image className="image" mode='aspectFill'  src={category}/>
                    </View>
                  </View>
                  <View className="bottom">更多</View>
                </View>
            </View>
            <View className="advert">
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
                  >
                  {hotArr.map((item,index) => {
                    return <SwiperItem key={index}>
                     <View className='swiper-item'>
                       {item.map((list,number) => {
                         return <View className='item' key={number}>
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
                return  <View className="item" key={index}>
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

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>

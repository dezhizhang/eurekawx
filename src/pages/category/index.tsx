import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,  Image,ScrollView, } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { getCategoryList,getCategoryDetail } from '../../service/api'
import { baseURL } from '../../utils/tools'
import  './index.less'
import bay from '../../images/bay.png'



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
    categoryArr:[],
    detailArr:[],
    currentIndex:0
  }
  config: Config = {
    navigationBarTitleText: '商品分类'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.categoryData()
  }
  categoryData = async () => {
    let list = await getCategoryList();
    if(list.data.code == 200) {
      let categoryArr = list.data.data;
      this.categoryDetailData(categoryArr[0])
      this.setState({categoryArr});
    }
  }
  categoryDetailData = async(item) => {
    let detail = await getCategoryDetail({'classify_id':item._id});
    if(detail.data.code == 200) {
      let detailArr = detail.data.data;
      this.setState({detailArr});
    }
  }
  handleClickCategory = async(index,item) => {
    this.setState({currentIndex:index});
    let detail = await getCategoryDetail({'classify_id':item._id});
    if(detail.data.code == 200) {
      let detailArr = detail.data.data;
      this.setState({detailArr});
    }
  }


  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let { categoryArr,currentIndex,detailArr } = this.state;
    return (
     <View className="category">
       <View className="left">
         {categoryArr&&categoryArr.map((item,index) => {
           return(
            <View key={index} className="left-item" onClick={() => this.handleClickCategory(index,item)}>
              <View  style={{display:index == currentIndex ? 'block':'none'}} className="item-icon"></View>
              <View className="item-text">{item.name}</View>
            </View>
          )})}
       </View>
      <ScrollView
        scrollY
        className="right"
      >
        {/* <View className="right-item">
          <View className="item-box">
            <View className="box-left">
              <Image src={detailSwiper} className="image"/>
            </View>
            <View className="box-right">
              <View className="right-top">品牌男士休闲运动装</View>
              <View className="right-bottom">
                <View className="bottom-left">￥280.00 </View>
                <View className="bottom-right">
                  <Image src={bay} className="image"/>
                </View>
              </View>
            </View>
          </View>
        </View> */}
        {detailArr&&detailArr.map((item,index) => {
          return ( <View key={index} className="right-item">
          <View className="item-box">
            <View className="box-left">
              <Image src={`${baseURL}${item.classify_img}`} className="image"/>
            </View>
            <View className="box-right">
              <View className="right-top">{item.title}</View>
              <View className="right-bottom">
                <View className="bottom-left">￥{item.price} </View>
                <View className="bottom-right">
                  <Image src={bay} className="image"/>
                </View>
              </View>
            </View>
          </View>
        </View>)
        })}
   
    

      </ScrollView>
     </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>

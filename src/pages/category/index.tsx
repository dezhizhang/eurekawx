import { ComponentClass,Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View,  Image,ScrollView, } from '@tarojs/components'
import { getCategoryList } from '../../service/api'
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
      let detailArr = categoryArr[0].items;
      this.setState({categoryArr,detailArr});
    }
  }
  handleClickCategory = async(index,item) => {
    let detailArr = item.items;
    this.setState({
      detailArr,
      currentIndex:index,
    });
  }
  handleToDetail = (item) => {
    Taro.navigateTo({
      url:`../classify/index?cate_id=${item._id}`
    })
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
           console.log(item);
           return(
            <View key={item._id} className="left-item" onClick={() => this.handleClickCategory(index,item)}>
              <View  style={{display:index == currentIndex ? 'block':'none'}} className="item-icon"></View>
              <View className="item-text">{item.title}</View>
            </View>
          )})}
       </View>
      <ScrollView
        scrollY
        className="right"
      >
        {detailArr&&detailArr.map(item => {
          return ( <View key={item._id} className="right-item" onClick={() => this.handleToDetail(item)}>
          <View className="item-box">
            <View className="box-left">
              <Image src={item.url} className="image"/>
            </View>
            <View className="box-right">
              <View className="right-top">{item.title}</View>
              <View className="right-bottom">
                <View className="bottom-left">{item.description} </View>
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

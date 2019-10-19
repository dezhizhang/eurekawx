import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,ScrollView,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { getMainList } from '../../service/api'
import { showLoading,hideLoading,baseURL } from '../../utils/tools'
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
      classifyArr:[],
    }
    config: Config = {
    navigationBarTitleText: '商品分类'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillMount () {
    let params = this.$router.params
    this.getClassifyList(params);
  }
  getClassifyList = async (params) => {
      showLoading({title:'加载中...'});
      let list = await getMainList(params);
      if(list.data.code == 200) {
        hideLoading();
        let classifyArr = list.data.data;
        this.setState({classifyArr});
      }
  }
  handleToDetail = (item) => {
    Taro.navigateTo({
      url: `../detail/index?id=${item._id}`
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let { classifyArr } = this.state
    return (
    <ScrollView className='classify'
        scrollY
        scrollWithAnimation
      >
        <View className="wrapper">
            <View className="list">
                {classifyArr&&classifyArr.map((item,index) => {
                  return (<View key={index} onClick={() => this.handleToDetail(item)} className="list-item">
                  <View className="item-top">
                      <Image src={`${baseURL}${item.main_img}`} className="image"/>
                  </View>
                  <View className="item-bottom">
                     <View className="bottom-wrapper">
                         <View className="wrapper-top">{item.title}</View>
                         <View className="wrapper-bottom">
                             <View className="bottom-left">￥{item.price}</View>
                             <View className="bottom-right">
                                 <Image src={bay} className="image"/>
                             </View>
                         </View>
                     </View>
                  </View>
              </View>)})}
            </View>
        </View>
    </ScrollView>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>

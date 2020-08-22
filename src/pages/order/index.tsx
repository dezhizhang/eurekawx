
/**
 * @author:zhangdezhi
 * @date:20202-08-22
 * @desc:订单列表
*/
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,ScrollView,Image,Text } from '@tarojs/components'
import { getStorageSync,showToast } from '../../utils/tools'
import { getOrderList } from '../../service/api';
import arrow from '../../images/icon/arrow.png'
import  './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}
type PageOwnProps = {}

type PageState = {
  status:string;
  orderList:any;
  tabArr:any;
  activeTab:any;
}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
    state = {
      isHide:false,
      status:'',
      orderList:[],
      tabArr:[
        {
          key:'0',
          value:'全部',
        },
        {
          key:'1',
          value:'待付款',
        },
        {
          key:'2',
          value:'待配送',
        },
        {
          key:'3',
          value:'已签收'
        },
        {
          key:'4',
          value:'待评价'
        },
        {
          key:'5',
          value:'已退货'
        }
      ],
      activeTab:'0',
    }
    config: Config = {
    navigationBarTitleText: '订单列表'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount () { 
    let params = this.$router.params;
    let status = params.status;
    let userInfoKey = getStorageSync('userInfoKey');
    let userInfo = userInfoKey ? JSON.parse(userInfoKey):{};
    //检测当前有没有登录
    if(!userInfo.openid) {
      showToast({
        title:'你当前还没有登录',
        icon:'none'
      });
      setTimeout(() =>{
        Taro.switchTab({
          url:'../my/index'
        })
      } ,1000);
      return;
    }
    params.openid = userInfo.openid;
    this.getOrderList(params);
    this.setState({
      status
    });
  }
  //订单列表
  getOrderList = async(params) => {
    let res = await getOrderList(params);
    if(res.data.code === 200) {
      let orderList = res.data.data;
      this.setState({orderList});
    }
  }
  componentDidShow() {

  }
  handleCompany = () => {
    Taro.navigateTo({
      url:'../company/index'
    });  
  }
  componentDidMount() {
   
  }
  //订单
  handleTabs = (item) => {
    this.setState({
      activeTab:item.key
    });
  }
  componentDidHide () { }

  render () {
    const { tabArr,activeTab } = this.state;
    return (
    <View className="order">
      <View className="order-tabs">
        {
          tabArr.map(item => {
            return (
            <View
              key={item.key}
              className="tabs-item"
              style={{color:item.key === activeTab ? '#735ff7':'',borderBottom:item.key === activeTab ? '2px solid #735ff7':''}}
              onClick={() => this.handleTabs(item)}
              >
                {item.value}
            </View>)
          })
        }
      </View>
      <ScrollView className="order-wrapper">
        <View className="order-list">
          <View className="order-header">
            <View className="header-title">情侣衬衫</View>
            <View className="header-status">交易成功</View>
            <View className="header-icon">
              <Image src={arrow} className="image"/>
            </View>
          </View>
          <View className="order-content">
            <View className="content-wrapper">
              <View className="content-left">
                <Image className="left-image" src={'http://img.xiaozhi.shop/public/admin/upload/2020-05-01/1588309530260.jpeg'}/>
              </View>
              <View className="content-right">
                <View className="right-desc">2018早秋装ins古着新款韩版条纹衬衫情侣装chic…</View>
                <View className="right-color">颜色：<Text className="color-text">粉色</Text></View>
                <View className="right-color">尺码：<Text className="color-text">37</Text></View>
              </View>
            </View>
          </View>
        </View>
     
        订单列表
      </ScrollView>
    </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>

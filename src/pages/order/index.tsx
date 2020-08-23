
/**
 * @author:zhangdezhi
 * @date:20202-08-22
 * @desc:订单列表
*/
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,ScrollView,Image,Text, Button } from '@tarojs/components'
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
  btnArr:any;
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
      orderList:[{title:'',_id:'',color:'',size:'',price:'',url:''}],
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
      btnArr:[
        {
          key:'1',
          value:'删除订单',
        },
        {
          key:'2',
          value:'再来一单',
        },
        {
          key:'3',
          value:'联系商家'
        },
        {
          key:'4',
          value:'评价'
        }
    ],
      activeTab:'0',
      activeBtn:'1',
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
      activeTab:status
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
  //按钮操作
  handleBtns = (item) => {
    this.setState({
      activeBtn:item.key
    })
  }
  componentDidHide () { }

  render () {
    const { tabArr,activeTab,btnArr,activeBtn,orderList } = this.state;
    console.log('orderList',orderList);

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
        {
          orderList.map(list => {
            return  <View key={list._id} className="order-list">
            <View className="order-header">
          <View className="header-title">{list.title}</View>
              <View className="header-status">交易成功</View>
              <View className="header-icon">
                <Image src={arrow} className="image"/>
              </View>
            </View>
            <View className="order-content">
              <View className="content-wrapper">
                <View className="content-left">
                  <Image className="left-image" src={list.url}/>
                </View>
                <View className="content-right">
                  <View className="right-desc">2018早秋装ins古着新款韩版条纹衬衫情侣装chic…</View>
                  <View className="right-color">颜色：<Text className="color-text">{list.color}</Text></View>
                  <View className="right-color">尺码：<Text className="color-text">{list.size}</Text></View>
                </View>
              </View>
            </View>
            <View className="order-bottom">
              <View className="bottom-wrapper">
                <View className="bottom-left"></View>
                <View className="bottom-right">
                  共1件商品  实付款：￥{(list.price)}
                </View>
              </View>
            </View>
            <View className="bottom-btn">
              <View className="btn-wrapper">
                {
                  btnArr.map(item => {
                    return (
                    <View 
                      className="btn-item"
                      onClick={() => this.handleBtns(item)}
                      style={{marginLeft:Number(item.key) > 0 ? '10px':'',color:item.key=== activeBtn ? '#735ff7':''}}
                      >
                        {item.value}
                    </View>
                    )
                  })
                }
              </View>
            </View>
          </View>
          })
        }
      </ScrollView>
    </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>

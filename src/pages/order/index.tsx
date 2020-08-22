
/**
 * @author:zhangdezhi
 * @date:20202-08-22
 * @desc:订单列表
*/
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, } from '@tarojs/components'
import { getStorageSync,showToast } from '../../utils/tools'
import { getOrderList } from '../../service/api';
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
          value:'待发货',
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
      <View className="order-wrapper">
     
        订单列表
      </View>
    </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>

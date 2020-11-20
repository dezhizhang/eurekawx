import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View,ScrollView,Image,} from '@tarojs/components'
import { getStorageSync,showToast,maintainType } from '../../utils/tools'
import { maintainDelete,maintainList, } from '../../service/api'
import arrow from '../../images/icon/arrow.png'
import Maintain from '../../components/maintain'
import './index.less'
interface IndexProps {

}
interface IndexState {

}
export default class Index extends Component<IndexProps,IndexState> {
    state = {
        isHide:false,
        status:'',
        orderList:[{title:'',_id:'',description:'',size:'',price:'',url:'',status:'',number:''}],
        tabArr:[
          {
            key:'1',
            value:'预约工单',
          },
          {
            key:'2',
            value:'处理中',
          },
          {
            key:'3',
            value:'已完结',
          },
          {
            key:'4',
            value:'待评价'
          },
        ],
        bottomBtn:{
          '1':[
            {
              key:'1',
              value:'删除订单'
            },
            {
              key:'2',
              value:'再来一单'
            },
            {
              key:'3',
              value:'联系商家'
            },
            {
              key:'4',
              value:'支付订单'
            }
          ],//待支付
          '2':[
            {
              key:'2',
              value:'删除预约'
            },
            {
              key:'3',
              value:'联系商家'
            }
          ],//待配送
          '3':[
            {
              key:'3',
              value:'联系商家'
            },
            {
              key:'5',
              value:'确认签收'
            }
          ], //已签收
          '4':[
            {
              key:'3',
              value:'联系商家'
            },
            {
              key:'6',
              value:'去评价'
            }
          ]
  
        },
        activeTab:'1',
        activeBtn:'1',
      }
      
  
    componentWillReceiveProps (nextProps) {
      console.log(this.props, nextProps)
    }
  
    componentWillMount () { 
      let params = getCurrentInstance().router.params;
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
      this.setState({
        activeTab:status
      });
    }
    //订单列表
    getOrderList = async(params) => {
      let res = await maintainList(params);
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
      let params = {
        openid:'',
        status:''
      }
      let userInfoKey = getStorageSync('userInfoKey');
      let userInfo = userInfoKey ? JSON.parse(userInfoKey):{};
      params.openid = userInfo.openid;
      params.status = item.key;
      this.getOrderList(params); //切换时调用订单列表
      this.setState({
        activeTab:item.key
      });
    }
    //按钮操作
    handleBtns = (list,item) => {
      let params = {
        '2':this.handleDeleteOrder,
        '3':this.handleConnect,
      }
      return params[item.key](list);
    }
    //删除当前订单
    handleDeleteOrder = async(list) => {
      let { activeTab } = this.state;
      let params = {
        id:list._id,
        openid:list.openid,
      }
      let res = await maintainDelete(params);
      if(res.data.code === 200) {
        showToast({
          title:`${res.data.msg}`,
          icon:'success'
        });
        //删除完成后重新调用
        this.getOrderList({'openid':list.openid,'status':activeTab});
      }
    }
    //联系商家
    handleConnect = () => {
      console.log('联系商家')
    }
    //确认签收
    handleSignOk = () => {
      console.log("确认签收");
    }
    //去评价
    handleEvaluation = () => {
      console.log('去评价')
    }
  
    componentDidHide () { }
  
    render () {
      const { tabArr,activeTab,bottomBtn,activeBtn,orderList } = this.state;
      console.log("activeTab",activeTab);
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
            activeTab === '1' ? 
            <Maintain/>:
            orderList.map(list => {
              return  <View key={list._id} className="order-list">
              <View className="order-header">
              <View className="header-title">{list.title}</View>
                <View className="header-status">{maintainType(list.status)}</View>
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
                    <View className="right-desc">{list.description}</View>
                  </View>
                </View>
              </View>
              <View className="bottom-btn">
                <View className="btn-wrapper">
                  {
                    bottomBtn[list.status] && bottomBtn[list.status].map(item => {
                      return (
                      <View 
                        className="btn-item"
                        onClick={() => this.handleBtns(list,item)}
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




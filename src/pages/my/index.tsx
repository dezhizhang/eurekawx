import React, { Component } from 'react'
import Taro  from '@tarojs/taro'
import { View,Image  } from '@tarojs/components'
import { getStorageSync } from '../../utils/tools'
import myHeader from '../../images/my_header.png'
import avatar from '../../images/avatar.png'
import allOrder from '../../images/all_order.png'
import endall_order from '../../images/endall_order.png'
import msg from '../../images/icon/msg.png'
import fix_yuyue from '../../images/icon/fix_yuyue.png'
import renzheng_01 from '../../images/icon/renzheng_01.png'
import VIP_01 from '../../images/icon/VIP_01.png'
import setting_01 from '../../images/icon/setting_01.png'
import kefu_01 from '../../images/icon/kefu_01.png'
import arrow from '../../images/icon/arrow.png'
import  './index.less'
import { 
  companyInfo,
  getUserInfo,
  userMessageInfo,
  getOrderContent,
} from '../../service/api';


interface IndexProps {

}

interface IndexState {
  messageInfo:any;
  orderInfo:any;
}

export default class Index extends Component<IndexProps,IndexState> {
 
    state = {
        userInfo:{
          nickName:'',
          userType:'',
          avatarUrl:'',
          url:'',
          isLogin:false, //当削是否登录过
        },
        messageInfo:[],
        orderInfo:{
          stayDelivery: 0,
          stayDistribution: 0,
          stayEvaluation: 0,
          stayPayment: 0,
        }
      }
    componentWillReceiveProps (nextProps) {
        console.log(this.props, nextProps)
      }
      componentWillMount() {
       
      }
      orderCount = async() => {
        let userInfoKey = getStorageSync('userInfoKey');
        let userInfo = userInfoKey ? JSON.parse(userInfoKey):{};
        let res = await getOrderContent({'openid':userInfo.openid});
        if(res.data.code === 200) {
          let orderInfo = res.data.data;
          this.setState({ orderInfo });
        }
      }
      componentDidMount() {
        this.getMessage();
      }
      //获取消息
      getMessage = async() => {
        let userInfoKey = getStorageSync('userInfoKey');
        let userInfo = userInfoKey ? JSON.parse(userInfoKey):{};
        let res = await userMessageInfo({'openid':userInfo.openid});
        if(res.data.code === 200) {
          let messageInfo = res.data.data;
          this.setState({ messageInfo });
        }
      }
      componentDidShow() {
        this.orderCount() //统计订单数量
        this.getMessage();
        let creditCode =  getStorageSync('creditCode');
        if(creditCode) { //证明企业用户
          this.getCompanyInfo(creditCode);
        } else {
          this.userInfo()
          // let result = getStorageSync('userInfo');
          // let userInfo =result?JSON.parse(result):{};//不存在时就是一个空对像
          // if(Object.keys(userInfo).length > 0) {
          //   userInfo.isLogin = true;
          // }
          // this.setState({userInfo});
        }
      }
      userInfo = async() => {
        const userInfoKey = getStorageSync("userInfoKey");
        const userInfo = userInfoKey ? JSON.parse(userInfoKey):{}
        const { openid } = userInfo;
        let res = await getUserInfo({openid});
        if(res.data.code === 200) {
          let userInfo = res.data.data;
          this.setState({userInfo});
        }
      }
      //获取公司信息
      getCompanyInfo = async(creditCode) => {
        let res = await companyInfo({creditCode});
        if(res.data.code === 200) {
          let userInfo = res.data.data;
          userInfo.isLogin = true; //当前以登录
          this.setState({userInfo});
        }
      }
      handleToLogin =() => {
        Taro.navigateTo({
          url:'../login/index'
        })
      }
      handleOrder = () => {
        Taro.navigateTo({
          url:'../maintain/index?status=1'
        })
      }
      //我的设置
      handleSetting = () => {
        Taro.navigateTo({
          url:'../setting/index'
        })
      }
      //消息
      handleMessage = (status) => {
          Taro.navigateTo({
            url:`../message/index?status=${status}`
        })
      }
      //收藏
      handleCollection = () => {
        Taro.navigateTo({
          url:'../collection/index',
        })
      }
      //客服
      handleCustomer = () => {
        Taro.navigateTo({
          url:'../customer/index'
        })
      }
      //个人信息
      handleUserInfo = () => {
        Taro.navigateTo({
          url:'../user/index'
        })
      }
      //个人登录
      handlePerToLogin = () => {
        Taro.navigateTo({
          url:'../login/index'
        });
      }
      //企业登录
      handleComToLogin = () => {
        Taro.navigateTo({
          url:'../comLogin/index'
        });
      }
      //企业认证
      handleCompany = () => {
        Taro.navigateTo({
          url:'../company/index'
        })
      }
      //跳转到订单页
      handleToOrder = (status) => {
        Taro.navigateTo({
          url:`../order/index?status=${status}`
        })
      }
      //跳转联系我们单页
      handleContact = (status) => {
        Taro.navigateTo({
          url:`../contact/index?status=${status}`
        })
      }
      //跳转订阅缴费单页
      handleMoney = (status) => {
        Taro.navigateTo({
          url:`../money/index?status=${status}`
        })
      }
      handleCoupons = () => {
        Taro.navigateTo({
          url:`../coupons/index`
        })
      }
    componentDidHide () { }
    render () {
          let { userInfo,orderInfo,messageInfo } = this.state;
          console.log("messageInfo",messageInfo);
          return (
          <View className="my">
            <View className="header">
                <View className="header_top">
                  <View className="header_image">
                    <Image className="image" src={myHeader}/>
                  </View>
                  <View className="header_avatar">
                    <Image src={userInfo&&userInfo?.avatarUrl ? userInfo.avatarUrl:userInfo?.url ? userInfo?.url:avatar} className="avatar"/>
                  </View>
                  <View className="header_user">
                    <View className="user_name" onClick={this.handlePerToLogin}>{userInfo?.nickName ? userInfo?.nickName:'点击登录'}</View>
                    <View className="user_address">会员:{userInfo&&userInfo?.userType}</View>
                  </View>
                  <View className="header_right">
                    <View className="right" onClick={this.handleUserInfo}>
                        <View className="text">个人资料管理</View>
                    </View>
                  </View>
                </View>
                <View className="header_content">
                <View className="content_card">
                  <View className="card_info">
                    <View className="info_box">
                      <View className="box_top">
                        <View className="top_item" onClick={() => this.handleToOrder(1)}>
                          <View className="item_top">待付款</View>
                          <View className="item_bottom">{orderInfo.stayPayment}</View>
                        </View>
                        <View className="top_item" onClick={() => this.handleToOrder(2)}>
                          <View className="item_top">待配送</View>
                          <View className="item_bottom">{orderInfo.stayDelivery}</View>
                        </View>
                        <View className="top_item" onClick={() => this.handleToOrder(3)}>
                          <View className="item_top">己完成</View>
                          <View className="item_bottom">{orderInfo.stayDistribution}</View>
                        </View>
                        <View className="top_item" onClick={() => this.handleToOrder(4)}>
                          <View className="item_top">待评价</View>
                          <View className="item_bottom">{orderInfo.stayEvaluation}</View>
                        </View>
                      </View>
                      <View className="box-bottom">
                        <View className="bottom-wrapper">
                          <View className="bottom-item" onClick={() => this.handleToOrder(0)}>
                            <View className="item-top">
                                <Image src={allOrder} className="image"/>
                            </View>
                            <View className="item-bottom">所有订单</View>
                          </View>
                          <View className="bottom-item" onClick={() => this.handleToOrder(3)}>
                            <View className="item-top">
                              <Image src={endall_order} className="image"/>
                            </View>
                            <View className="item-bottom">完成订单</View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
            </View>
            </View>
            <View className="content">
            <View className="content-item" onClick={this.handleCoupons}>
                <View className="item">
                  <View className="icon-left">
                    <Image className="image" src={msg}/>
                  </View>
                  <View className="text-left">我的卡券</View>
                  <View className="text-right">
                  <View className="text-number">{messageInfo?.length}</View>
                  </View>
                  <View className="icon-right">
                    <Image src={arrow} className="image"/>
                  </View>
                </View>
              </View>
              <View className="content-item" onClick={this.handleMessage}>
                <View className="item">
                  <View className="icon-left">
                    <Image className="image" src={msg}/>
                  </View>
                  <View className="text-left">我的消息</View>
                  <View className="text-right">
                  <View className="text-number">{messageInfo?.length}</View>
                  </View>
                  <View className="icon-right">
                    <Image src={arrow} className="image"/>
                  </View>
                </View>
              </View>
              <View className="content-item" onClick={this.handleMessage}>
                <View className="item">
                  <View className="icon-left">
                    <Image className="image" src={msg}/>
                  </View>
                  <View className="text-left">我的积分</View>
                  <View className="text-right">
                  <View className="text-number">{messageInfo?.length}</View>
                  </View>
                  <View className="icon-right">
                    <Image src={arrow} className="image"/>
                  </View>
                </View>
              </View>
              <View className="content-item" onClick={this.handleCompany}>
                <View className="item">
                  <View className="icon-left">
                    <Image className="image" src={renzheng_01}/>
                  </View>
                  <View className="text-left">企业认证</View>
                  <View className="text-right">
                  </View>
                  <View className="icon-right">
                    <Image src={arrow} className="image"/>
                    </View>
                </View>
              </View>
              <View className="content-item" onClick={this.handleMoney}>
                <View className="item">
                  <View className="icon-left">
                    <Image className="image" src={VIP_01}/>
                  </View>
                  <View className="text-left">订阅缴费</View>
                  <View className="text-right">
                  </View>
                  <View className="icon-right">
                    <Image src={arrow} className="image"/>
                  </View>
                </View>
              </View>
              <View className="content-item" onClick={this.handleOrder}>
                <View className="item">
                  <View className="icon-left">
                    <Image className="image" src={fix_yuyue}/>
                  </View>
                  <View className="text-left">我的预约</View>
                  <View className="text-right">
                  </View>
                  <View className="icon-right">
                    <Image src={arrow} className="image"/>
                  </View>
                </View>
              </View>
            </View>
            <View className="footer">
              <View className="content-item" onClick={this.handleSetting}>
                  <View className="item">
                    <View className="icon-left">
                      <Image className="image" src={setting_01}/>
                    </View>
                    <View className="text-left">我的设置</View>
                    <View className="text-right">
                    </View>
                    <View className="icon-right">
                      <Image src={arrow} className="image"/>
                    </View>
                  </View>
              </View>
              <View className="content-item" onClick={this.handleContact}>
                  <View className="item">
                    <View className="icon-left">
                      <Image className="image" src={kefu_01}/>
                    </View>
                    <View className="text-left">官方客服</View>
                    <View className="text-right">
                      {/* <View className="text-number">16</View> */}
                    </View>
                    <View className="icon-right">
                      <Image src={arrow} className="image"/>
                    </View>
                  </View>
              </View>
            </View>
          </View>
        
    )
  }
}




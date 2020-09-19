import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image,} from '@tarojs/components'
import { getStorageSync } from '../../utils/tools'
import { companyInfo,getOrderContent,getUserInfo} from '../../service/api';
import myHeader from '../../images/my_header.png'
import avatar from '../../images/avatar.png'
import allOrder from '../../images/all_order.png'
import msg from '../../images/icon/msg.png'
import arrow from '../../images/icon/arrow.png'
import  './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageOwnProps = {
 
}

type PageState = {
  userInfo:any;
  orderInfo:any;
}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
    state = {
      userInfo:{
        nickName:'',
        userType:'',
        avatarUrl:'',
        url:'',
        isLogin:false, //当削是否登录过
      },
      orderInfo:{
        stayDelivery: 0,
        stayDistribution: 0,
        stayEvaluation: 0,
        stayPayment: 0,
      }
    }
    config: Config = {
    navigationBarTitleText: '我的'
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
  componentDidShow() {
    this.orderCount() //统计订单数量
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
      url:'../maintain/index'
    })
  }
  //我的设置
  handleSetting = () => {
    Taro.navigateTo({
      url:'../setting/index'
    })
  }
  //消息
  handleMessage = () => {
    Taro.navigateTo({
      url:'../message/index'
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
      url:'../perLogin/index'
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
  componentDidHide () { }

  render () {
    let { userInfo,orderInfo } = this.state;
    console.log("userInfo",userInfo);

    return (
    <View className="my">
      <View className="header">
          <View className="header_top">
            <View className="header_image">
              <Image className="image" src={myHeader}/>
            </View>
            <View className="header_avatar">
              <Image src={userInfo&&userInfo.avatarUrl ? userInfo.avatarUrl:userInfo.url ? userInfo.url:avatar} className="avatar"/>
            </View>
            <View className="header_user">
              <View className="user_name" onClick={this.handlePerToLogin}>{userInfo.nickName ? userInfo.nickName:'马上登录'}</View>
              <View className="user_address">会员:{userInfo&&userInfo.userType}</View>
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
                        <Image src={allOrder} className="image"/>
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
        <View className="content-item" onClick={this.handleMessage}>
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的消息</View>
             <View className="text-right">
               <View className="text-number">16</View>
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        {/* <View className="content-item" onClick={this.handleCollection}>
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的收藏</View>
             <View className="text-right">
               
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的卡券</View>
             <View className="text-right">
              你有3张优惠券待使用
              
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View> */}
        <View className="content-item" onClick={this.handleCompany}>
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">企业认证</View>
             <View className="text-right">
               {/* <View className="text-number">16</View> */}
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item" onClick={this.handleOrder}>
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
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
                <Image className="image" src={msg}/>
              </View>
              <View className="text-left">我的设置</View>
              <View className="text-right">
                <View className="text-number">16</View>
              </View>
              <View className="icon-right">
                <Image src={arrow} className="image"/>
              </View>
            </View>
        </View>
        <View className="content-item" onClick={this.handleCustomer}>
            <View className="item">
              <View className="icon-left">
                <Image className="image" src={msg}/>
              </View>
              <View className="text-left">官方客服</View>
              <View className="text-right">
                <View className="text-number">16</View>
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

// #region 导出注意
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误

export default Index as ComponentClass<PageOwnProps, PageState>

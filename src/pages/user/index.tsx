import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import arrow from '../../images/icon/arrow.png'
import { getStorageSync } from '../../utils/tools'
import { companyInfo,getUserInfo,userAddressDefault } from '../../service/api';
import avatar from '../../images/avatar.png'
import  './index.less'


interface IndexProps {

}

interface IndexState {
  userInfo:any;
  defaultAddress:any;
}

export default class Index extends Component<IndexProps,IndexState> {
    state = {
        defaultAddress:{
          cityInfo:'',
          detail:'',
          mobile:'',
          userName:'',
        },
        userInfo:{
          nickName:'',
          url:'',
          avatarUrl:'',
          address:'',
          mobile:'',
          userName:'',
        },
      }
  
    componentWillReceiveProps (nextProps) {
      console.log(this.props, nextProps)
    }

    componentDidMount() {
      this.getDefaultAddress();
    }
  
    componentWillUnmount () { 
      
    }
    //获取默认地址
    getDefaultAddress = async() => {
      const userInfoKey = getStorageSync("userInfoKey");
      const userInfo = userInfoKey ? JSON.parse(userInfoKey):{}
      let res = await userAddressDefault(userInfo);
      if(res.data.code === 200) {
        let defaultAddress = res.data.data;
        console.log("defaultAddress",defaultAddress);
        this.setState({ defaultAddress });
      }
    }
    componentDidShow() {
      let creditCode = getStorageSync("creditCode");
      if(creditCode) {
        this.getCompanyInfo(creditCode);
      } else {
        this.userInfo();
        
      } 
      this.getDefaultAddress()
    }
    userInfo = async() => {
      const userInfoKey = getStorageSync("userInfoKey");
      const userInfo = userInfoKey ? JSON.parse(userInfoKey):{}
      if(Object.keys(userInfo).length < 0) {
        Taro.showToast({
          title:'您还没有登录不能查看信息',
          icon:'none'
        });
        return
      }
      const { openid } = userInfo;
      let res = await getUserInfo({openid});
      if(res.data.code === 200) {
        let userInfo = res.data.data;
        this.setState({
          userInfo
        });
      }
    }
    getCompanyInfo = async(creditCode) => {
      let res = await companyInfo({creditCode});
      if(res.data.code === 200) {
        let userInfo = res.data.data;
        this.setState({userInfo});
      }
    }
    //个人信息
    handleAddress = () => {
      Taro.navigateTo({
          url:'../addressList/index?current=1'
      })
    }
  
    componentDidHide () { }
  
    render () {
      const { userInfo,defaultAddress } = this.state;
      console.log("defaultAddress",defaultAddress);
      return (
      <View className="user">
        <View className="content">
          <View className="content-item">
            <View className="item">
               <View className="text-left">头像</View>
               <View className="text-right">
                  <View className="header_avatar">
                    <Image src={userInfo.url ? userInfo.url:avatar} className="avatar"/>
                  </View>
               </View>
            </View>
          </View>
          <View className="content-item">
            <View className="item">
              <View className="text-left">呢称</View>
              <View className="text-right">
                 <View className="text-right">{userInfo.userName ? userInfo.userName:userInfo.nickName}</View>
              </View>
            </View>
          </View>
          <View className="content-item">
            <View className="item">
              <View className="text-left">姓名</View>
              <View className="text-right">
                 <View className="text-right">{defaultAddress?.userName}</View>
              </View>
            </View>
          </View>
          <View className="content-item">
            <View className="item">
             
               <View className="text-left">手机</View>
               <View className="text-right">
                  {defaultAddress?.mobile}
               </View>
            </View>
          </View>
          <View className="content-item" onClick={this.handleAddress}>
            <View className="item">
               <View className="text-left">地址</View>
               <View className="text-right">
                 {defaultAddress ? `${defaultAddress?.cityInfo}${defaultAddress?.detail}`:'请选择地址'}
                 
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




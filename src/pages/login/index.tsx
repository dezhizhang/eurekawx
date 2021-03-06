import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View,Button} from '@tarojs/components'
import { userLogin,userInfoSave } from '../../service/api'
import { showModal,appid } from '../../utils/tools'
import './index.less'

interface IndexProps {

}

interface IndexState {

}

export default class Index extends Component<IndexProps,IndexState> {
    state = {
        isHide:false
    }
    componentWillReceiveProps (nextProps) {
      console.log(this.props, nextProps)
    }
  
    componentWillUnmount () { }
  
    componentDidShow() {
  
    }
    handleCompany = () => {
      Taro.navigateTo({
        url:'../company/index'
      });  
    }
    componentWillmount() {
     
    }
    bindGetUserInfo = async(ev) => {
      let userInfo = ev.detail.userInfo;
      Taro.getSetting().then(res => {
        if(res.authSetting['scope.userInfo']) {
          Taro.getUserInfo().then(res => {
            if(res.userInfo) {
              Taro.login().then(res => {
                let params = {
                  code:res.code,
                  appid:appid,
                }
                userLogin(params).then(res => {
                  if(res.data.code == 200) {
                    let result = res.data.data;
                    let userInfoKey = JSON.stringify(result);
                    userInfo.userType = '普通用户';
                    userInfo.url = userInfo.avatarUrl;
                    Taro.setStorageSync('userInfoKey', userInfoKey);
                    Taro.setStorageSync('userInfo', JSON.stringify(userInfo));
                    userInfoSave({'openid':result.openid,...userInfo}).then(res => {
                      if(res.data.code === 200) {
                        Taro.switchTab({
                          url:'../my/index'
                        });
                      }
                    })
                  }
                })
              })
            } else {
              showModal({
                title:'警告',
                content:'您还没有授权，请重新授权!',
                showCancel:false,
                confirmText:'授权登录'
              })
            }
          })
        } 
      });
    }
    componentDidHide () { }
  
    render () {
      return (
      <View className="login">
        <View className="login-weapper">
          <Button openType="getUserInfo" className="btn" type="primary" onGetUserInfo={this.bindGetUserInfo}>微信登录</Button>
        </View>
      </View>
      )
    }
}




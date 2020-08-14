
/**
 * @author:zhangdezhi
 * @date:20202-08-06
 * @desc:个人登录
*/
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { userLogin,userLoginSave, } from '../../service/api'
import { showModal } from '../../utils/tools'
import  './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}
type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
    state = {
      isHide:false
    }
    config: Config = {
    navigationBarTitleText: '登录'
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
  componentDidMount() {
    Taro.getSetting().then(res => {
      if(res.authSetting['scope.userInfo']) {
        Taro.getUserInfo().then(res => {
          if(res.userInfo) {
            Taro.login().then(res => {
              let params = {
                code:res.code,
                appid:'wx070d1456a4a9c0fb',
              }
              userLogin(params).then(res => {
                  if(res.data.code == 200) {
                    let result = res.data.data;
                    let userInfoKey = JSON.stringify(result);
                    Taro.setStorageSync('userInfoKey', userInfoKey);
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
    })
  }
  
  bindGetUserInfo = async(ev) => {
    if(ev.detail.userInfo){
      let result  = ev.detail.userInfo;
      result.userType = '普通会员';
      let userInfoKey = Taro.getStorageSync('userInfoKey');
      result.openid = userInfoKey ? JSON.parse(userInfoKey).openid:'';
      result.url = result.avatarUrl; //转换字段
      Taro.setStorageSync('userInfo', JSON.stringify(result));
      Taro.switchTab({
        url:'../my/index'
      });
    }
  }
  componentDidHide () { }

  render () {
    return (
    <View className="login">
      <View className="login-weapper">
        <Button openType="getUserInfo" className="btn" type="primary" onGetUserInfo={this.bindGetUserInfo}>个人登录</Button>
      </View>
    </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>

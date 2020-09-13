
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { userLogin } from '../../service/api'
import { showModal,appid } from '../../utils/tools'
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
                appid:appid,
              }
              console.log("params",params);
              
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
  


  componentDidHide () { }

  render () {
    return (<></>)
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>

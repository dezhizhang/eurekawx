import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'

import  './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
    state = {

    }
    config: Config = {
    navigationBarTitleText: '我的'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow  = async() => { 

    // const data = await Taro.login();
    // if(data.code) {
    //   let params = {
    //     code:data.code,
    //     appid:'wx070d1456a4a9c0fb'
    //   }
    //   userLogin(params).then(res => {
    //     console.log(res);


    //   });
    

    // }
   






  }
  componentDidMount = async () =>  {
  
  }
  bindGetUserInfo = async (e) => {
 
    let res =await Taro.getSetting();
    if(!res.authSetting['scope.userInfo']) {
        await Taro.authorize({scope: 'scope.userInfo'});
        Taro.getUserInfo().then(res => {
            console.log(res);
            
        })
      


    }
    console.log(e.detail.userInfo)
  }
  componentDidHide () { }

  render () {
    return (
    <View className="login">
        <Button openType="getUserInfo" onClick={this.bindGetUserInfo}>登录授权</Button>
     
    </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>

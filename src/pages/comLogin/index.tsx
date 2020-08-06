
/**
 * @author:zhangdezhi
 * @date:2020806
 * @desc:企业登录
*/
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
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
    handleCompanyLogin = () => {
        Taro.navigateTo({
            url:'../comRegister/index',
        })
    }

    componentDidMount() {
    
    }
    componentDidHide () { }

  render () {
    return (
    <View className="login">
      <View className="login-weapper">
        <Button className="btn" type="primary" onClick={this.handleCompanyLogin}>企业登录</Button>
        <Button className="btn" type="primary" onClick={this.handleCompany}>企业注册</Button>
      </View>
    </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>

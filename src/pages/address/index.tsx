import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image, Button, Input } from '@tarojs/components'
import arrow from '../../images/icon/arrow.png'
import  './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageOwnProps = {}

type TextareaProps = {
    value:any
}

type PageState = {
  userInfo:any;
}

type IProps = PageStateProps & TextareaProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
    state = {
      userInfo:{},
    }
    config: Config = {
    navigationBarTitleText: '收货地址'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow() {
    let result = Taro.getStorageSync('userInfo');
    let userInfo =result?JSON.parse(result):''
    if(userInfo) {
      this.setState({userInfo});
    } else {
      Taro.showModal({
        title: '温馨提示',
        content: '您还没有登录!',
      }).then(res => {
        if(res.confirm) {
          Taro.navigateTo({
            url:'../login/index'
          })
        }
      })
    }
  }
  handleToLogin =() => {
    Taro.navigateTo({
      url:'../login/index'
    })
  }
  handleAddressSave = () => {
     console.log('save');

  }
  componentDidHide () { }

  render () {
    let { userInfo } = this.state;
    return (
    <View className="address">
      <View className="content">
        <View className="content-item">
          <View className="item">
             <View className="text-left">收 货  人</View>
             <View className="text-right">
                <Input className="input" placeholder="请输入收货人"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="text-left">手机号码</View>
             <View className="text-right">
               <Input className="input" placeholder="请输入手机号"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="text-left">邮箱地址</View>
             <View className="text-right">
               <Input className="input" placeholder="请输邮箱地址"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="text-left">地区信息</View>
             <View className="text-right">
              你有3张优惠券待使用
               {/* <View className="text-number">16</View> */}
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="text-left">详细地址</View>
             <View className="text-right">
                <Input className="input" placeholder="请输入详细地址"/>
             </View>
          </View>
        </View>
      </View>
      <View className="footer">
        <Button className="btn" onClick={this.handleAddressSave}>保存</Button>
      </View>
    </View>
    )
  }
}

// #region 导出注意
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误

export default Index as ComponentClass<PageOwnProps, PageState>
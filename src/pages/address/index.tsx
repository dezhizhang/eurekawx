import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image, Button, Input } from '@tarojs/components'
import arrow from '../../images/icon/arrow.png'
import Address from '../../components/address'
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
  visible:boolean;
  cityInfo:string;
}

type IProps = PageStateProps & TextareaProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
    state = {
      userInfo:{},
      visible:false,
      cityInfo:''
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
  //打开地址选择
  handleAddressOpen = () => {
    this.setState({
      visible:true
    })
  }
  //地区选择取消
  handleCancel = (ev) => {
    ev.stopPropagation();
    this.setState({
      visible:false,
    })
  }
  handleAddress = (cityInfo) => {
    this.setState({
      cityInfo,
      visible:false,
    });
  }
  handleSubmit = () => {

  }
  componentDidHide () { }

  render () {
    let { userInfo,visible,cityInfo } = this.state;
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
          <View className="item" onClick={this.handleAddressOpen}>
            <View className="text-left">地区信息</View>
            <View className="text-right">
              {cityInfo}
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
      <Button className="btn" onClick={this.handleSubmit}>保存</Button>
      <Address 
        visible={visible}
        handleCancel={this.handleCancel}
        handleAddress={this.handleAddress}
      />
    </View>
    )
  }
}

// #region 导出注意
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误

export default Index as ComponentClass<PageOwnProps, PageState>

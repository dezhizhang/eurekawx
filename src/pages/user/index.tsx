import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image,} from '@tarojs/components'
import msg from '../../images/icon/msg.png'
import arrow from '../../images/icon/arrow.png'
import  './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageOwnProps = {}

type PageState = {
  userInfo:any;
}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
    state = {
      userInfo:{},
    }
    config: Config = {
    navigationBarTitleText: '个人信息'
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
  //个人信息
  handleAddress = () => {
    Taro.navigateTo({
        url:'../address/index'
    })
  }

  componentDidHide () { }

  render () {
    return (
    <View className="user">
      <View className="content">
        <View className="content-item">
          <View className="item">
             <View className="text-left">头像</View>
             <View className="text-right">
               <View className="text-number">16</View>
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
           
             <View className="text-left">呢称</View>
             <View className="text-right">
               <View className="text-right">不哭的小孩</View>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
           
             <View className="text-left">手机</View>
             <View className="text-right">
              15083356190
             </View>
          </View>
        </View>
        <View className="content-item" onClick={this.handleAddress}>
          <View className="item">
             <View className="text-left">地址</View>
             <View className="text-right">
                 11111111111
               {/* <View className="text-number">16</View> */}
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        {/* <View className="content-item">
          <View className="item">
             <View className="text-left">邮箱</View>
             <View className="text-right">
                 1541609448@qq.com
             </View>
          </View>
        </View> */}
      </View>
    </View>
    )
  }
}

// #region 导出注意
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误

export default Index as ComponentClass<PageOwnProps, PageState>

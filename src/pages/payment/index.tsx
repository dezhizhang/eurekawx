import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image,ScrollView, Button,Text} from '@tarojs/components'
import { getStorageSync } from '../../utils/tools'
import { companyInfo } from '../../service/api';
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
  payArr:any
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
      payArr:[]
    }
    config: Config = {
    navigationBarTitleText: '订单确认'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidShow() {
    // let creditCode =  getStorageSync('creditCode');
    // if(creditCode) { //证明企业用户
    //   this.getCompanyInfo(creditCode);
    // } else {
    //   let result = getStorageSync('userInfo');
    //   let userInfo =result?JSON.parse(result):{};//不存在时就是一个空对像
    //   if(Object.keys(userInfo).length > 0) {
    //     userInfo.isLogin = true;
    //   }
    //   this.setState({userInfo});
    // }
  }

  componentWillMount () {
    let params = this.$router.params;
    console.log("params",params);

   
  }


  componentDidHide () { }

  render () {
    let { userInfo,payArr } = this.state;
    console.log("userInfo",userInfo);

    return (
      <ScrollView className='payment'
      scrollY
      scrollWithAnimation
      >
      <View className="content">
        <View className="content-item" onClick={this.handleMessage}>
          <View className="item">
             <View className="text-left">收货人</View>
             <View className="text-right">
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        {payArr&&payArr.map(item => {
          return (<View key={item._id} className="right-item" onClick={() => this.handleToDetail(item)}>
          <View className="item-box">
            <View className="box-left">
              <Image src={item.url} className="image"/>
            </View>
            <View className="box-right">
              <View className="right-top">{item.title}</View>
              <View className="right-bottom">
                <View className="bottom-left">{item.description} </View>
              </View>
            </View>
          </View>
        </View>)
        })}
        <View className="content-item">
          <View className="item">
             <View className="text-left">总计</View>
             <View className="text-right">
               1000
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="text-left">运费</View>
             <View className="text-right">
               1000
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="text-left">共优惠金额</View>
             <View className="text-right">
               1000
             </View>
          </View>
        </View>
      </View>
      
      <View className="footer">
        <View className="left">
          实付金额：<Text className="left-text">1111</Text>
        </View>
        <View className="right">提交订单</View>
      </View>
    </ScrollView>
    )
  }
}

// #region 导出注意
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
export default Index as ComponentClass<PageOwnProps, PageState>

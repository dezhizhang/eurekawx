import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image,ScrollView,Text} from '@tarojs/components'
import { showToast,appid,orderNumber } from '../../utils/tools';
import arrow from '../../images/icon/arrow.png'
import { payInfoList,getPayInfo } from '../../service/api';
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
  payArr:any;
  totalPrice:number;
  totalFreight:number;
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
      totalPrice:0,
      totalFreight:0, //总共的运费
      payArr:[{url:'',title:'',price:'',number:0,color:'',size:'',goods_id:'',out_trade_no:''}]
    }
    config: Config = {
    navigationBarTitleText: '订单确认'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  // componentDidShow() {
  //   // let creditCode =  getStorageSync('creditCode');
  //   // if(creditCode) { //证明企业用户
  //   //   this.getCompanyInfo(creditCode);
  //   // } else {
  //   //   let result = getStorageSync('userInfo');
  //   //   let userInfo =result?JSON.parse(result):{};//不存在时就是一个空对像
  //   //   if(Object.keys(userInfo).length > 0) {
  //   //     userInfo.isLogin = true;
  //   //   }
  //   //   this.setState({userInfo});
  //   // }
  // }

  componentWillMount () {
    let params = this.$router.params;
    this.getPayList(params);
  }
  //获取预支付列表
  getPayList = async(params) => {
    let res = await payInfoList(params);
    if(res.data.code === 200) {
      let payArr = res.data.data;
      let totalPrice = 0; 
      let totalFreight = 0;
      for(let i=0;i < payArr.length;i++) {
        totalPrice += Number(payArr[i].price); //计算多个商品的总价钱
        totalFreight += Number(payArr[i].freight)
      }
      this.setState({ payArr,totalPrice,totalFreight });
    }
  }
  //提交表单
  handleSubmit = async() => {
    Taro.showActionSheet({
      itemList:['微信支付', '现下支付']
    }).then(res => {
      switch(res.tapIndex) {
        case 0:
          this.handleWayPay()
          break;
        case 1:
          this.handleNowpay();
          break
      }
    });
  }
  handleWayPay = async() => {
    let { payArr,totalPrice,totalFreight } = this.state;
    let total = totalPrice + totalFreight;
    let out_trade_no = "";
    if(payArr.length > 1) { //有个多订单
      out_trade_no = orderNumber();
    }else {
      payArr[0].out_trade_no = payArr[0].goods_id
    }
    let res = await Taro.login();
    if(res.code) { //用户授权登录
      let params = {
        code:res.code,
        appid:appid,
        total:total,
        out_trade_no,
        ...payArr[0]
      }
      //发起预支付
      let payInfo = await getPayInfo(params);
      let payment = await Taro.requestPayment({...payInfo.data.data,signType:'MD5'});


      console.log(payment);
      


      // let user = await userLogin(params);
      // console.log('user',user);


     

      // userLogin(params).then(res => {
      //   console.log("res",res);

      // })
      // let user = await 
      // if(user.data.code === 200) {
      //   let result = user.data.data;
      //   console.log("result",result);
        
      // }
      // if((await user).data.)

    }
    console.log('res',res);
    
    //  Taro.login().then(res => {
    //   let params = {
    //     code:res.code,
    //     appid:'wx070d1456a4a9c0fb',
    //   }
    //   // userLogin(params).then(res => {
    //   //     if(res.data.code == 200) {
    //   //       let result = res.data.data;
    //   //       let userInfoKey = JSON.stringify(result);
    //   //       Taro.setStorageSync('userInfoKey', userInfoKey);
    //   //     }
    //   // })
    // })

  
  }
  //现下支付
  handleNowpay = () => {
    showToast({
      title:'现下支付成功',
      icon:'success'
    });
  }
  componentDidHide () { }
  render () {
    let { payArr,totalPrice,totalFreight } = this.state;
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
        {/*列表*/}
        <View className="content-list">
        {payArr&&payArr.map(item => {
          return (
          <View key={item._id} className="list-wrapper">
             <View className="box-left">
              <Image style={{width:'100%',height:'100%',borderRadius:10}} src={item.url} className="image"/>
            </View>
            <View className="box-right">
              <View className="right-top">{item.title}</View>
              <View className="right-bottom">
                <View className="bottom-text">订单号:<Text>{item.goods_id}</Text></View>
                <View className="bottom-text">价格：<Text style={{color:'red'}}>￥{item.price}</Text> </View>
                <View className="bottom-text">数量：<Text>{item.number}</Text></View>
                <View className="bottom-text">颜色：<Text style={{color:item.color}}>{item.color}</Text></View>
                <View className="bottom-text">尺码：<Text>{item.size}</Text></View>
              </View>
            </View>
        </View>)
        })}
        </View>
        <View className="content-item">
          <View className="item">
             <View className="text-left">总计</View>
             <View className="text-right">
               ￥{totalPrice.toFixed(2)}
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="text-left">运费</View>
             <View className="text-right">
               ￥{totalFreight.toFixed(2)}
             </View>
          </View>
        </View>
        {/* <View className="content-item">
          <View className="item">
             <View className="text-left">共优惠金额</View>
             <View className="text-right">
               1000
             </View>
          </View>
        </View> */}
      </View>
      <View className="footer">
        <View className="left">
        实付金额：<Text className="left-text">￥{(totalPrice+totalFreight).toFixed(2)}</Text>
        </View>
        <View className="right" onClick={this.handleSubmit}>提交订单</View>
      </View>
    </ScrollView>
    )
  }
}

// #region 导出注意
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
export default Index as ComponentClass<PageOwnProps, PageState>

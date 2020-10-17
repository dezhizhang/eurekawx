import Taro, { Config } from '@tarojs/taro'
import {Component,ComponentClass} from 'react';
import { View,Button, Input,Text } from '@tarojs/components'
import { getStorageSync } from '../../utils/tools'
import { userInfoSave } from '../../service/api';
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
  userName:string;
  mobile:string;
  detail:string; //详细地址
  current:string; //当前跳转进来页面1表示用户，2表示支付
}

type IProps = PageStateProps & TextareaProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
    state = {
      userInfo:{},
      visible:false,
      cityInfo:'',
      userName:'',
      mobile:'',
      detail:'', //详细地址
      current:'0',
    }
    config: Config = {
    navigationBarTitleText: '收货地址'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    let params = this.$router.params;
    this.setState({
      current:params.current
    });
  }

  componentWillUnmount () { }

  componentDidShow() {
    let result = Taro.getStorageSync('userInfo');
    let userInfo =result?JSON.parse(result):''
    if(Object.keys(userInfo).length > 0) {
      this.setState({userInfo});
    } else {
      Taro.showModal({
        title: '温馨提示',
        content: '您还没有登录!',
      }).then(res => {
        if(res.confirm) {
          Taro.navigateTo({
            url:'../my/index'
          })
        }
      })
    }
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
  //地区地址
  handleAddress = (cityInfo) => {
    this.setState({
      cityInfo,
      visible:false,
    });
  }
  //收货人
  handleNickName = (ev) => {
    let userName = ev.target.value;
    this.setState({
      userName
    });
  }
  //手机号
  handleMobile = (ev) => {
    let mobile = ev.target.value;
    this.setState({
      mobile
    });
  }
  //手机号失去焦点
  handleMobileBlur = (ev) => {
    let mobile = ev.target.value;
    let reg = /^1(3|4|5|6|7|8|9)\d{9}$/g;
    if(!reg.test(mobile)) {
      Taro.showToast({
        title:'填写手机号不合法',
        icon:'none'
      });
      this.setState({
        mobile:''
      })
    }
   
  }
  //详细地址
  handleDetail = (ev) => {
    let detail = ev.target.value;
    this.setState({
      detail
    })
  }
  handleSubmit = async() => {
    const {detail,userName,mobile,cityInfo,current} = this.state;
    const userInfoKey = getStorageSync("userInfoKey"); //用户key
    const userinfoItem = getStorageSync("userInfo")
    const userInfo = userInfoKey ? JSON.parse(userInfoKey):{}
    const userItem = userinfoItem ? JSON.parse(userinfoItem):{}
    const { openid } = userInfo;
    const { nickName,avatarUrl,gender } = userItem
    
    let address = `${cityInfo}${detail}`;
    let params = {
      mobile,
      openid,
      userName,
      address,
      nickName,
      url:avatarUrl,
      gender
    }
    if(!mobile) {
      Taro.showToast({
        title:'手机号不能为空',
        icon:'none'
      });
      return
    }
    let res = await userInfoSave(params);
    if(res.data.code === 200) {
      switch(current) {
        case '1': //用户页面
          this.handleUser();
        break;
        case '2':
          this.handlePayment(openid);
        break;
      }
    }
  }
  //跳转到用户
  handleUser = () => {
    Taro.redirectTo({
      url:'../user/index'
    });
  }
  handlePayment = (openid) => {
    Taro.redirectTo({
      url:`../payment/index?openid=${openid}`
    });
  }
  componentDidHide () { }

  render () {
    let { visible,cityInfo } = this.state;
    return (
    <View className="address">
      <View className="content">
        <View className="content-item">
          <View className="item">
             <View className="text-left">收 货  人</View>
             <View className="text-right">
                <Input className="input" placeholder="请输入收货人" onInput={this.handleNickName}/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="text-left">手机号码</View>
             <View className="text-right">
               <Input className="input" placeholder="请输入手机号" onInput={this.handleMobile} onBlur={this.handleMobileBlur}/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item" onClick={this.handleAddressOpen}>
            <View className="text-left">地区信息</View>
            <View className="text-right">
              {cityInfo ? cityInfo:<Text style={{fontSize:'30rpx'}} >请选择地区信息</Text>}
            </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="text-left">详细地址</View>
             <View className="text-right">
                <Input className="input" placeholder="请输入详细地址" onInput={this.handleDetail}/>
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

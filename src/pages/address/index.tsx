import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { View,Button,Input,Text,Switch } from '@tarojs/components'
import { getStorageSync, showToast} from '../../utils/tools'
import { userAddressAdd } from '../../service/api';
import Address from '../../components/address'
import './index.less'


interface IndexProps {

}

interface IndexState {
    userInfo:any;
    visible:boolean;
    cityInfo:string;
    userName:string;
    mobile:string;
    checked:boolean; //是否选中
    detail:string; //详细地址
    current:string; //当前跳转进来页面1表示用户，2表示支付
}

export default class Index extends Component<IndexProps,IndexState> {
    state = {
        userInfo:{},
        visible:false,
        checked:false,
        cityInfo:'',
        userName:'',
        mobile:'',
        detail:'', //详细地址
        current:'0',
    }
    componentWillReceiveProps (nextProps) {
      console.log(this.props, nextProps)
    }
    componentDidMount() {
        let params = getCurrentInstance().router.params;
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
      const {detail,userName,mobile,cityInfo,current,checked } = this.state;
      const userInfoKey = getStorageSync("userInfoKey"); //用户key
      const userInfo = userInfoKey ? JSON.parse(userInfoKey):{}
      const { openid } = userInfo;
  
      
      let address = `${cityInfo}${detail}`;
      let params = {
        mobile,
        openid,
        userName,
        address,
        checked,
      }
      if(!mobile) {
        Taro.showToast({
          title:'手机号不能为空',
          icon:'none'
        });
        return
      }
      let res = await userAddressAdd(params);
      if(res.data.code !== 200) { //返回错误
        showToast({
          icon:'none',
          title:res.data.msg,
        });
        return
      }
      showToast({
        icon:'success',
        title:res.data.msg,
      });
      setTimeout(() => {
        Taro.redirectTo({
          url:'../addressList/index'
        });
      },200);
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
    //是否选中
    handleChecked = (ev) => {
      let checked = ev.target.value;
      this.setState({checked});
    }
    componentDidHide () { }
  
    render () {
      let { visible,cityInfo,checked } = this.state;
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
          <View className="content-item">
            <View className="item">
               <View className="text-left">设为默认</View>
               <View className="right-switch">
                <Switch color="#735ff7" checked={checked} onChange={this.handleChecked}/>
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




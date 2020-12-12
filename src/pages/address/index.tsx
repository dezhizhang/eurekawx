import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { View,Button,Input,Text,Switch } from '@tarojs/components'
import { getStorageSync, showToast} from '../../utils/tools'
import { userAddressAdd,userAddressInfo,userAddressUpdate } from '../../service/api';
import Address from '../../components/address'
import './index.less'


interface IndexProps {
  params:any;
  id:string;
  type:string; //当前处于的类型
}

interface IndexState {
    addressInfo:any;
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
        addressInfo:{
          userName:"",
          mobile:"",
          cityInfo:"",
          detail:"",
          checked:false,
        },
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
        if(params.type === 'edit') {
          this.getAddressInfo(params);
        }
    }
    getAddressInfo = async(params) => {
      const userInfoKey = getStorageSync("userInfoKey"); //用户key
      const userInfo = userInfoKey ? JSON.parse(userInfoKey):{}
      const { openid } = userInfo;
      let res = await userAddressInfo({openid,id:params?.id});
      if(res.data.code === 200) {
        let addressInfo = res.data.data;
        this.setState({addressInfo});
      }
    }
  
    componentWillUnmount () { }
  
    componentDidShow() {
      let result = Taro.getStorageSync('userInfo');
      let userInfo =result?JSON.parse(result):'';
      let params = getCurrentInstance().router.params;
      if(params.type === 'edit') {
        this.getAddressInfo(params);
      }
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
      let { addressInfo } = this.state;
      addressInfo.cityInfo = cityInfo
      this.setState({
        addressInfo,
        visible:false,
      });
    }
    //收货人
    handleNickName = (ev) => {
      let { addressInfo } = this.state;
      let userName = ev.target.value;
      addressInfo.userName = userName
      this.setState({
        addressInfo
      });
    }
    //手机号
    handleMobile = (ev) => {
      let { addressInfo } = this.state;
      let mobile = ev.target.value;
      addressInfo.mobile = mobile;
      this.setState({
        addressInfo
      });
    }
    //手机号失去焦点
    handleMobileBlur = (ev) => {
      let { addressInfo } = this.state;
      let mobile = ev.target.value;
      let reg = /^1(3|4|5|6|7|8|9)\d{9}$/g;
      if(!reg.test(mobile)) {
        Taro.showToast({
          title:'填写手机号不合法',
          icon:'none'
        });
        addressInfo.mobile = mobile;
        this.setState({
          addressInfo
        })
      }
     
    }
    //详细地址
    handleDetail = (ev) => {
      let { addressInfo } = this.state;
      let detail = ev.target.value;
      addressInfo.detail = detail;
      this.setState({
        addressInfo
      })
    }
    //是否选中
    handleChecked = (ev) => {
      let { addressInfo } = this.state;
      let checked = ev.target.value;
      addressInfo.checked = checked;
      this.setState({checked});
    }
    handleSubmit = async() => {
      let res:any = {};
      let params = getCurrentInstance().router.params;
      const { addressInfo } = this.state;
      const userInfoKey = getStorageSync("userInfoKey"); //用户key
      const userInfo = userInfoKey ? JSON.parse(userInfoKey):{}
      const { openid } = userInfo;
      if(!addressInfo?.mobile) {
        Taro.showToast({
          title:'手机号不能为空',
          icon:'none'
        });
        return
      }
      if(params?.type === 'create') { //如果是创建
        res = await userAddressAdd({openid,...addressInfo});
      } else if(params?.type === 'edit') {
        res = await userAddressUpdate({openid,id:params?.id,...addressInfo})
      }
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

    componentDidHide () { }
  
    render () {
      let { visible,cityInfo,checked,addressInfo } = this.state;
      console.log("addressInfo",addressInfo);
      return (
      <View className="address">
        <View className="content">
          <View className="content-item">
            <View className="item">
               <View className="text-left">收 货  人</View>
               <View className="text-right">
                  <Input className="input" value={addressInfo?.userName} placeholder="请输入收货人" onInput={this.handleNickName}/>
               </View>
            </View>
          </View>
          <View className="content-item">
            <View className="item">
               <View className="text-left">手机号码</View>
               <View className="text-right">
                 <Input className="input" value={addressInfo?.mobile} placeholder="请输入手机号" onInput={this.handleMobile} onBlur={this.handleMobileBlur}/>
               </View>
            </View>
          </View>
          <View className="content-item">
            <View className="item" onClick={this.handleAddressOpen}>
              <View className="text-left">地区信息</View>
              <View className="text-right">
                {addressInfo?.cityInfo ? addressInfo?.cityInfo:<Text style={{fontSize:'30rpx'}} >请选择地区信息</Text>}
              </View>
            </View>
          </View>
          <View className="content-item">
            <View className="item">
               <View className="text-left">详细地址</View>
               <View className="text-right">
                  <Input className="input" value={addressInfo?.detail} placeholder="请输入详细地址" onInput={this.handleDetail}/>
               </View>
            </View>
          </View>
          <View className="content-item">
            <View className="item">
               <View className="text-left">设为默认</View>
               <View className="right-switch">
                <Switch color="#735ff7" checked={addressInfo?.checked} onChange={this.handleChecked}/>
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




import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Textarea, Button,Image,Text,} from '@tarojs/components'
import { uploadInfo,getUserInfo } from '../../service/api'
import { showLoading,hideLoading,getStorageSync,showToast } from '../../utils/tools'
import Address from '../address/index';
import server from '../../images/server.png'
import upload from '../../images/upload.png'
import arrow from '../../images/icon/arrow.png'
import  './index.less'


interface IndexProps{
  defaultAddredd?:any
  handleSuccess:(value) => void; //上传成功时的回调
}

interface IndexState{
  visible:boolean;
  description:string;
  tempFilePaths:string;
  userInfo:any;
  
}

export default class Index extends Component<IndexProps,IndexState> {
  state = {
    region:'',
    details:'',
    visible:false,
    description:'',
    tempFilePaths:'',
    userInfo:{
      userName:'',
      mobile:'',
      address:'',
      openid:'',
      region:'', //地区信息
      detail:'' //详细地址
    },
  }


  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  handleDescription = (event:any) => {
    let description = event.target.value;
    this.setState({description})
  }
  handleChooseImage = () => {
    let that = this;
    const params = {
      count:1,
      sizeType:['original', 'compressed'],
      sourceType: ['album', 'camera']
    }
    Taro.chooseImage(params).then(res => {
       const tempFilePaths = res.tempFilePaths[0]; 
       that.setState({tempFilePaths});
    })
  }
  componentDidMount() {
    this.userInfo();
  }
  //获取用户信息
  userInfo = async() => {
    const userInfoKey = getStorageSync("userInfoKey"); //用户key
    const userInfo = userInfoKey ? JSON.parse(userInfoKey):{}
    const { openid } = userInfo;
    let res = await getUserInfo({openid});
    if(res.data.code === 200) {
      let userInfo = res.data.data;
      this.setState({
        userInfo
      })
    }
  }
  handleSubmit = async() => {
    const { defaultAddredd } = this.props;
    const { description,tempFilePaths,userInfo } = this.state;
    const { mobile,openid,userName,detail,region,} = userInfo;
    let address = defaultAddredd ? `${defaultAddredd?.cityInfo}${defaultAddredd?.detail}`:""
    const params = {
      detail,
      region,
      openid,
      mobile,
      address,
      userName,
      description,
      tempFilePaths
    }

    console.log(address);

    //判断地址是否存在
    if(!address) {
      Taro.showToast({
        title:'请填写地址',
        icon:'none'
      });
      return;
    }

    if(!description) { 
      Taro.showToast({
        title:'为您更好服务请填写问题描述',
        icon:'none'
      });
      return
    }
    if(!tempFilePaths) {
      Taro.showToast({
        title:'请按示例上传图片',
        icon:'none'
      });
    }
    let res = await Taro.requestSubscribeMessage({
      tmplIds:['0XK1EO7jvqJtHbt_wVfRF9f050sAe4LAo021WqG0_Ds']
    });
    if(res.errMsg === 'requestSubscribeMessage:ok') { //判断用户是否授权消息
      if(tempFilePaths && description) {
        showLoading({title:'信息上传中'});
        uploadInfo(params).then(res => {
          let data = JSON.parse(res.data);
          if(data.code == 200) {
            hideLoading();
            showToast({
              title:"您的问题以提交我们会尽快联系你",
              icon:'success'
            });
            this.props.handleSuccess(true);
          }
        });
      }
    }
  }
  //打电话
  handlePhoneCall = async() => {
    let res = await Taro.makePhoneCall({phoneNumber:'13025376666'});
    console.log("res",res);
  }
  handleAddressOpen = () => {
    this.setState({
      visible:true
    })
  }
  handleCancel = () => {
    this.setState({
      visible:false
    })
  }
  //地区信息
  handleAddress = (region) => {
    let { userInfo } = this.state;
    userInfo.region = region;
    this.setState({
      userInfo,visible:false
    });
  }
  //详细地址
  handleDetail = (ev) => {
    let { userInfo } = this.state;
    let detail = ev.detail.value;
    userInfo.detail = detail;
    this.setState({userInfo});
  }

//个人信息
handleUserInfo = () => {
  Taro.navigateTo({
    url:'../addressList/index'
  })
}
  render () {
    const { tempFilePaths,description,visible } = this.state;
    const { defaultAddredd } = this.props;
    return (
     <View className="maintain">
          <View className="content">
            <View className="content-item" onClick={this.handleUserInfo}>
              <View className="item-left">{defaultAddredd?.cityInfo ? `${defaultAddredd?.cityInfo}${defaultAddredd?.detail}`:'请填写地址'}</View>
              <View className="item-right" >
                <Image src={arrow} className="image"/>
              </View>
            </View>
              <View className="content-input">
                <Textarea value={description} className="text-area" placeholder="请填写问题描述"  autoFocus onInput={this.handleDescription}></Textarea>                
              </View>
                <View className="image">
                  <View onClick={this.handleChooseImage} className="image-flex">
                    <View className="image-top">点击上传</View>
                    <View className="image-bottom bottom-left">
                      <Image src={!tempFilePaths ? upload:tempFilePaths} mode='aspectFill' className="image"/>
                    </View>
                  </View> 
                  <View className="image-flex">
                      <View className="image-top">示例图片</View>
                      <View className="image-bottom">
                        <Image src={server} mode='aspectFill' className="image"/>
                      </View>
                  </View>
                </View>
          </View>
          <Button className="btn"formType="submit" onClick={this.handleSubmit}>提交</Button>
          <Address 
            visible={visible}
            handleCancel={this.handleCancel}
            handleAddress={this.handleAddress}
          />
          <View style={{textAlign:'center',color:'#ccc',fontSize:14}} onClick={this.handlePhoneCall}>
            <Text>电话联系客服:13025376666</Text>
          </View>
    </View>
     
    )
  }
}





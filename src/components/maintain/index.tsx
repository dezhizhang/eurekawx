import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Textarea, Button,Image,Text, } from '@tarojs/components'
import { uploadInfo,getUserInfo } from '../../service/api'
import { showLoading,hideLoading,getStorageSync,showToast } from '../../utils/tools'
import server from '../../images/server.png'
import upload from '../../images/upload.png'
import  './index.less'

// interface IndexProps {
//     visible:boolean;
//     handleCancel:() => void;
//     handleAddress:(values) => void;
// }

interface IndexState{
  description:string;
  tempFilePaths:string;
  userInfo:any;
}



export default class Index extends Component<any,IndexState> {
  state = {

    description:'',
    tempFilePaths:'',
    userInfo:{
      userName:'',
      mobile:'',
      address:'',
      openid:'',
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
    const { description,tempFilePaths,userInfo } = this.state;
    const { mobile,address,openid,userName } = userInfo;
    const params = {
      openid,
      mobile,
      address,
      userName,
      description,
      tempFilePaths
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
          setTimeout(() => {
            Taro.switchTab({
              url: '../index/index'
            });
          },2000);
        }
      });
    }
  }
  //打电话
  handlePhoneCall = async() => {
    let res = await Taro.makePhoneCall({phoneNumber:'13025376666'});
    console.log("res",res);
  }
  render () {
    const { tempFilePaths,description } = this.state;
    return (
     <View className="maintain">
          <View className="content">
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
    
          <View style={{textAlign:'center',color:'#ccc',fontSize:32}} onClick={this.handlePhoneCall}>
            <Text>电话联系客服:13025376666</Text>
          </View>
    </View>
     
    )
  }
}





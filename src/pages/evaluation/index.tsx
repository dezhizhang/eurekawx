import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Textarea, Button,Image,Text,Input } from '@tarojs/components'
import { getUserInfo } from '../../service/api'
import { showLoading,hideLoading,getStorageSync,showToast } from '../../utils/tools'
import  './index.less'


interface IndexProps{
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
    const { description,userInfo } = this.state;
    const { mobile,openid,userName } = userInfo;
    const params = {
      openid,
      mobile,
      userName,
      description,
    }
 

    //   if(tempFilePaths && description) {
    //     showLoading({title:'信息上传中'});
    //     uploadInfo(params).then(res => {
    //       let data = JSON.parse(res.data);
    //       if(data.code == 200) {
    //         hideLoading();
    //         showToast({
    //           title:"您的问题以提交我们会尽快联系你",
    //           icon:'success'
    //         });
    //         this.props.handleSuccess(true);
    //       }
    //     });
    //   }
    // }
  }
  render () {
    const { description,} = this.state;
    return (
     <View className="maintain">
        <View className="content">
            <View className="content-input">
                <Textarea value={description} className="text-area" placeholder="请填写你的维修评价"  autoFocus onInput={this.handleDescription}></Textarea>                
            </View>  
        </View>
        <Button className="btn"formType="submit" onClick={this.handleSubmit}>提交</Button>
    </View>  
    )
  }
}





import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { View, Textarea, Button } from '@tarojs/components'
import { getUserInfo,maintainEvaluation } from '../../service/api'
import { getStorageSync,showToast } from '../../utils/tools'
import  './index.less'


interface IndexProps{
    handleSuccess:(value) => void; //上传成功时的回调
}

interface IndexState{
    idInfo:any; //上级传过来的id
    description:string;
    userInfo:any;
  
}

export default class Index extends Component<IndexProps,IndexState> {
  state = {
    idInfo:{
        id:''
    },
    description:'',
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
  componentDidMount() {
    let idInfo = getCurrentInstance().router.params;
    this.setState({idInfo});
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
    const { description,userInfo,idInfo } = this.state;
    const { id } = idInfo;
    const { mobile,openid,userName } = userInfo;
    const params = {
        id,
        openid,
        mobile,
        userName,
        description,
    }
    let res = await maintainEvaluation(params);
    if(res.data.code == 200) {
        showToast({
            title:res.data.msg,
            icon:'success'
        });
        Taro.navigateTo({
            url: `../maintain/index?status=5&id=${id}&openid=${openid}`
        });
    }
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





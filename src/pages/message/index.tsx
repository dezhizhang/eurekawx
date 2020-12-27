import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { userMessageInfo } from '../../service/api';
import { View,Text,Image } from '@tarojs/components';
import { getStorageSync } from '../../utils/tools'
import arrow from '../../images/icon/arrow.png'
import  './index.less'


interface IndexProps{
  handleSuccess:(value) => void; //上传成功时的回调
}

interface IndexState{
  messageInfo:any;
}
export default class Index extends Component<IndexProps,IndexState> {
  state = {
    messageInfo:[{add_time:"",url:"",description:""}],
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
    this.getMessage();
  }
  componentDidShow(){
    this.getMessage();
  }
  //获取消息
  getMessage = async() => {
    let userInfoKey = getStorageSync('userInfoKey');
    let userInfo = userInfoKey ? JSON.parse(userInfoKey):{};
    let res = await userMessageInfo({'openid':userInfo.openid});
    if(res.data.code === 200) {
      let messageInfo = res.data.data;
      this.setState({ messageInfo });
    }
  }
  render () {
    let {messageInfo} = this.state;
    return (
      <View className="message">
        {
          messageInfo.length > 0 ? 
          messageInfo.map((item,index) => {
            return (
            <View key={index} className="message-content">
              <View className="content-header">
                <View className="header-icon"></View>
                <View className="header-title">通知</View>
              <View className="header-time">{item.add_time}</View>
              </View>
              <View className="content-body">
                <Image src={item?.url} className="body-image"/>
              </View>
              <View className="content-desc">
                {item.description}
              </View>
              <View className="content-bottom">
                <View className="content-left">查看详情</View>
                <View className="content-right">
                  <Image src={arrow} className="right-image"/>
                </View>
              </View>
            </View>
          )
          })
          :<View className="">暂无消息</View>
        }
          
      </View>
    )
  }
}





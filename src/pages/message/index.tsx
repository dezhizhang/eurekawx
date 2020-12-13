import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import  './index.less'


interface IndexProps{
  handleSuccess:(value) => void; //上传成功时的回调
}

interface IndexState{
  
}
export default class Index extends Component<IndexProps,IndexState> {
  state = {
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  //打电话
  handlePhoneCall = async() => {
    let res = await Taro.makePhoneCall({phoneNumber:'13025376666'});
    console.log("res",res);
  }
  render () {
    return (
     <View className="contact">
     
          <View className="phone" style={{textAlign:'center',color:'#ccc',fontSize:14}}>
            <Text>没有消息...</Text>
          </View>
    </View>
     
    )
  }
}





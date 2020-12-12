import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { View,Button,Input,Text,Radio } from '@tarojs/components'
import { getStorageSync } from '../../utils/tools'
import { userInfoSave } from '../../service/api';
import Address from '../../components/address'
import './index.less'


interface IndexProps {

}

interface IndexState {
}

export default class Index extends Component<IndexProps,IndexState> {
    state = {

    }
    componentWillReceiveProps (nextProps) {
      console.log(this.props, nextProps)
    }
    
  
    componentWillUnmount () { }
  
    componentDidShow() {
     
    }
   
    componentDidHide () { }
  
    render () {
      let { visible,cityInfo } = this.state;
      return (
      <View className="address-list">
         <View className="list-wrapper">
          <View className="list-header">
            <View className="item-title">姓名：<Text className="item-text">张德志</Text></View>
            <View className="item-title">电话：<Text className="item-text">15083356190</Text></View>
            <View style={{marginBottom:10}} className="item-title">地址：<Text className="item-text">1111</Text></View>
          </View>
          <View className="list-bottom">
            <View className="bottom-left"><Radio  color="#735ff7" className="bottom-radio" />默认地址</View>
            <View className="bottom-right">
              <Text>编辑</Text>
              <Text>删除</Text>
            </View>
          </View>
        </View>
        <View>新建收货地址</View>
      </View>
      )
    }
}




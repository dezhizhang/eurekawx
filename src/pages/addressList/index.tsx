import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { View,Button,Input,Text,Radio,Image } from '@tarojs/components'
import { getStorageSync } from '../../utils/tools'
import { userAddressList } from '../../service/api';
import Address from '../../components/address'
import arrow from '../../images/icon/detail_store.png'
import './index.less'


interface IndexProps {

}

interface IndexState {
  list:any;
} 

export default class Index extends Component<IndexProps,IndexState> {
    state = {
      list:[{userName:"",mobile:"",address:"",checked:false}],
    }
    componentWillReceiveProps (nextProps) {
      console.log(this.props, nextProps)
    }
    
  
    componentWillUnmount () {
      this.getAddressList();
     }

    componentDidShow() {
      this.getAddressList();
    }

    //获取地址列表
    getAddressList = async() => {
      
      const userInfoKey = getStorageSync("userInfoKey"); //用户key
      const userInfo = userInfoKey ? JSON.parse(userInfoKey):{}
      const { openid } = userInfo;
      let res = await userAddressList({openid});
      if(res.data.code === 200) {
        let list = res.data.data;
        this.setState({list});
      }
    }

    handleAddress = () => {
      Taro.redirectTo({
        url:'../address/index'
      })
    }
   
    componentDidHide () { }
  
    render () {
      let { list } = this.state;
      console.log("list",list);
      return (
      <View className="address-list">
        <View className="list-box">
        {
          list?.map((item,index) => {
            return (
              <View className="list-wrapper">
              <View className="list-header">
                <View className="item-title">姓名：<Text className="item-text">张德志</Text></View>
                <View className="item-title">电话：<Text className="item-text">15083356190</Text></View>
                <View style={{marginBottom:10}} className="item-title">地址：<Text className="item-text">1111</Text></View>
              </View>
              <View className="list-bottom">
                <View className="bottom-left"><Radio  color="#735ff7" className="bottom-radio" />默认地址</View>
                <View className="bottom-right">
                  <View className="right-edit">
                    <View className="edit-left"> <Image src={arrow} className="edit-icon"/></View>
                    <View className="edit-right"><Text>编辑</Text></View>
                  </View>
                  <View className="right-delete">
                  <View className="edit-left"> <Image src={arrow} className="edit-icon"/></View>
                    <View className="edit-right">  <Text>删除</Text></View>
                  </View>
                </View>
              </View>
            </View>
            )
          })
        }
        </View>
      
        <Button className="list-bottom-btn" onClick={this.handleAddress}>新建收货地址</Button>
      </View>
      )
    }
}




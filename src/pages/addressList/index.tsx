import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { View,Button,Text,Radio,Image } from '@tarojs/components'
import { getStorageSync,showToast } from '../../utils/tools'
import { userAddressList,userAddressDelete } from '../../service/api';
import arrow from '../../images/icon/detail_store.png'
import './index.less'


interface IndexProps {

}

interface IndexState {
  list:any;
  openid:string;
} 

export default class Index extends Component<IndexProps,IndexState> {
    state = {
      openid:"",
      list:[{userName:"",mobile:"",address:"",checked:false,cityInfo:"",detail:""}],
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
        this.setState({list,openid});
      }
    }

    handleAddress = () => {
      Taro.redirectTo({
        url:`../address/index?type=create`
      })
    }
    handleAddressDelete = async(item) => {
      let { openid,} = this.state;
      let res = await userAddressDelete({openid,id:item?._id});
      if(res.data.code === 200) {
        showToast({
          icon:'success',
          title:res.data.msg
        });
        this.getAddressList();
      }
    }
    handleAddressEdit = (item) => {
      Taro.redirectTo({
        url:`../address/index?id=${item?._id}&type=edit`
      })
    }
    componentDidHide () { }

    handleRadio = (ev) => {
      ev.preventDefault;
      return;
    }
  
    render () {
      let { list } = this.state;
      console.log("list",list);
      return (
      <View className="address-list">
        <View className="list-box">
        {
          list?.map((item,index) => {
            return (
              <View className="list-wrapper" key={index}>
              <View className="list-header">
                <View className="item-title">姓名：<Text className="item-text">{item?.userName}</Text></View>
                <View className="item-title">电话：<Text className="item-text">{item?.mobile}</Text></View>
                <View style={{marginBottom:10}} className="item-title">地址：<Text className="item-text">{`${item?.cityInfo}${item?.detail}`}</Text></View>
              </View>
              <View className="list-bottom">
                <View className="bottom-left"><Radio checked={item?.checked}  color="#735ff7" className="bottom-radio" disabled={!item?.checked} />默认地址</View>
                <View className="bottom-right">
                  <View className="right-edit" onClick={() => this.handleAddressEdit(item)}>
                    <View className="edit-left"> <Image src={arrow} className="edit-icon"/></View>
                    <View className="edit-right"><Text>编辑</Text></View>
                  </View>
                  <View className="right-delete" onClick={() => this.handleAddressDelete(item)}>
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



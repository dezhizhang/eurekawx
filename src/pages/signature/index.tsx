import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { View,Image,ScrollView,Text,Canvas, Button} from '@tarojs/components'
import { appid,orderNumber, } from '../../utils/tools';
import arrow from '../../images/icon/arrow.png'
import { payInfoList,getPayInfo,updateStatus,getUserInfo } from '../../service/api';
import  './index.less'


interface IndexProps {

}

interface IndexState {
   
}

export default class Index extends Component<IndexProps,IndexState> {
    state = {
      
    }  

    onShareAppMessage() {
      return {
        title: '贵彩办公',
        path: '/pages/payment/index'
      }
    }
    componentDidHide () { }
    render () {
      
      return (
        <View className="wrapper">
        <View className="singer-title">
            <View className="singer-text">请在下面区域书写清晰可辨的签名</View>
        </View>
        <View className="singer-content">
            <View className="user-singer">
                <Canvas className="singer-start" />
            </View>
            <View className="singer-button">
               <View className="flex-button"><Button className="button-cancle"></Button></View>
               <View className="flex-button" ><Button className="button-ok">确定</Button></View>
            </View>
        </View>
    </View>
      )
    }
}




import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { View,Canvas, Button} from '@tarojs/components'

import { payInfoList,getPayInfo,updateStatus,getUserInfo } from '../../service/api';
import  './index.less'


interface IndexProps {

}

interface IndexState {
   
}

export default class Index extends Component<IndexProps,IndexState> {

    state = {
        // 内置数据
        selectColor: 'black',
        lineColor: '#1A1A1A', // 颜色
        slideValue: 2,
        placeholder:"签名区域",
        cancleText:'取消',
        canvas:'',
        submitOk:false,
        disabled:false,
        buttonBg:'',
        pointMove:false,
        bizNo:''
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




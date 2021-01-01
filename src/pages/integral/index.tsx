import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View,Swiper, SwiperItem,ScrollView,Image  } from '@tarojs/components'
import './index.less';

interface IndexProps {

}

interface IndexState {

}

export default class Index extends Component<IndexProps,IndexState> {
    render() {
        return (
            <View className="integral">
                <View className="integral-header">
                    我的积分
                </View>
                <View className="integral-wrapper">
                    <View className="wrapper-header">
                        <View className="wrapper-panel">1111</View>
                    </View>
                    <View className="wrapper-body">
                            111
                    </View>
                </View>
            </View>
        )
    }
}




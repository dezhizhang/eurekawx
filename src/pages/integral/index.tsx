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
                        <View className="wrapper-panel">
                            <View className="panel-item panel-left">
                                <View className="left-text">我的积分</View>
                                <View className="left-number">2000</View>
                            </View>
                            <View className="panel-item panel-right">
                                <View className="right-text">立即签到</View>
                                <View className="right-text text-shop">积分商城</View>
                            </View>
                        </View>
                    </View>
                    <View className="wrapper-body">
                        <View className="body-sign"></View>
                        <View className="body-task">
                            <View className="tash"></View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}




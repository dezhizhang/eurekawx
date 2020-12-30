import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import  './index.less'


interface IndexProps{
  handleSuccess:(value) => void; //上传成功时的回调
}

interface IndexState{
    tableList:any,
    activeId:number;
}
export default class Index extends Component<IndexProps,IndexState> {
  state = {
    activeId:1,
    tableList:[
        {
            id:1,
            name:'全部',
            active:true,
        },
        {
            id:2,
            name:"已使用",
            active:false,
        },
        {
            id:3,
            name:"已失效",
        },
        {
            id:4,
            name:'其他',
            active:false
        }
    ]
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  //改变tabs
  handleTabs = (item) => {
    this.setState({
        activeId:item?.id
    })
  }
  render () {
    const { tableList,activeId } = this.state;
    return (
     <View className="coupons">
        <View className="coupons-header">
            {tableList.map((item,index) => {
                return <View onClick={() => this.handleTabs(item)} style={{color:item?.id === activeId ? '#333':''}} className="header-tabs" key={index}>{item?.name}</View>
            })}
        </View>
        <View className="coupons-body">
            <View className="coupons-list">
                <View className="circle circle-top"></View>
                <View className="circle circle-bottom"></View>
                <View className="list-wrapper">
                    <View className="list-left">
                        <Text className="left-symbol">￥</Text>
                        <Text className="left-monay">5</Text>
                    </View>
                    <View className="list-right">
                        <View className="right-header">仅限部分商店部分商品使用</View>
                        <View className="right-center">使用时间：2019.08.10-2019.08.20</View>
                        <View className="right-bottom">马上使用</View>
                    </View>
                </View>
            </View>
        </View>
    </View>
     
    )
  }
}





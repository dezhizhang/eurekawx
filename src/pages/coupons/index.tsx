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
            
        </View>
    </View>
     
    )
  }
}





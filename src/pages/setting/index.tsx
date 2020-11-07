import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View,Button} from '@tarojs/components'
import './index.less'


interface IndexProps {

}

interface IndexState {

}

export default class Index extends Component<IndexProps,IndexState> {
    state = {
        username:'',
        mobile:'',
        address:'',
        description:'',
        tempFilePaths:''
      }
      handleClearStroage = () => {
        try{
          Taro.clearStorageSync();
          Taro.reLaunch({
            url: '../my/index'
          })
        } catch(error) {
          console.log(error);
        }
      }
      render () {
        return (
             <View className="setting">
              <View className="bottom">
                <Button className="btn" onClick={this.handleClearStroage}>退出登录</Button>
              </View>
            </View>
        )
      }
}




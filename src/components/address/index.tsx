import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Text,PickerView,PickerViewColumn,} from '@tarojs/components'
import  './index.less'

type PageStateProps = {
   
}

type PageOwnProps = {
    provinces:any;
    citys:any;
    countys:any;
    show?:any;
    value:any;
    handleCancel?:any;
    handleOk?:any;
    bindChange:any;
}

type PageState = {
 
}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
    state = {
    }
    config: Config = {
    navigationBarTitleText: ''
  }

  render () {
    const { provinces,citys,countys,show,handleCancel,handleOk,value,bindChange } = this.props;
    return (
        <View className="animation-element-wrapper" style={{visibility:show ? 'visible':'hidden'}}>
        <View className="animation-element">
          <Text className="left-btn" onClick={handleCancel}>取消</Text>
          <Text className="right-btn" onClick={handleOk}>确定</Text>
        <View className="line"></View>
          <PickerView className="picker-view" indicatorStyle='height: 50px;' style='width: 100%; height: 380px;' value={value} onChange={bindChange}>
            <PickerViewColumn className="picker-view-column">
              {provinces.map((item,index) => {
                return <View key={index}>{item.name}</View>
              })}
            </PickerViewColumn>
            <PickerViewColumn>
            {citys.map((item,index) => {
              return <View key={index}>{item.name}</View>
            })}
            </PickerViewColumn>
            <PickerViewColumn>
            {countys.map((item,index) => {
              return <View key={index}>{item.name}</View>
            })}
            </PickerViewColumn>
          </PickerView>
          </View>
        </View>
    )
  }
}

// #region 导出注意
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误

export default Index as ComponentClass<PageOwnProps, PageState>

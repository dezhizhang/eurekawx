import { ComponentClass } from 'react'
import Taro, { Component, Config, } from '@tarojs/taro'
import { View, Button,Checkbox,Text } from '@tarojs/components'
import  './index.less'


type PageStateProps = {
  counter: {
    num: number
  }
}

type PageOwnProps = {}
type PageState = {
  username:String,
  mobile:String,
  address:String,
  description:String
}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
  state = {
    username:'',
    mobile:'',
    address:'',
    description:'',
    tempFilePaths:''
  }
    config: Config = {
    navigationBarTitleText: '用户协议'
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  render () {
    return (
        <View className="agreement">
            <View className="content">
                <View className="content-title">一、协议的接受、变更与补充</View>
                <View className="content-info">
                1、勾选本协议前选项框并点击“注册”，将视为您签署了本协议，表明您自愿接受本协议全部条款的约束，本协议将构成您与上海佰集科技有限公司及其经营的“简书”平台（以下统称“简书”，包括相关关联方）之间具有约束力的法律文件。无论您是进入简书浏览网页，还是在简书上发布任何内容，或者是直接或通过各类方式（如站外API引用等）间接使用简书网服务和数据的行为，都将被视作已无条件接受本声明所涉全部内容。
                </View>
            </View>
            <View className="checkbox"><Checkbox color="#735ff7" value="1"/><Text className="user">接收并同意本协议</Text></View>
            <Button className="btn">确定</Button>
        </View>
    )
  }
}

export default Index as unknown as ComponentClass<PageOwnProps, PageState>

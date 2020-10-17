import { ComponentClass,Component } from 'react'
import Taro, {  Config, } from '@tarojs/taro'
import { View } from '@tarojs/components'
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
    navigationBarTitleText: '我的消息'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  render () {
    return (
         <View className="message">
             该功能正在开发中敬请期待
        </View>
    )
  }
}

export default Index as unknown as ComponentClass<PageOwnProps, PageState>

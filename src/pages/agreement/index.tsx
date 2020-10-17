import { ComponentClass } from 'react'
import Taro, {  Config, } from '@tarojs/taro'
import { Component } from 'react'
import { View, Button,Checkbox,Text } from '@tarojs/components'
import { showToast } from '../../utils/tools'
import { userPrepaid } from '../../service/api'
import  './index.less'


type PageStateProps = {
  counter: {
    num: number
  }
}

type PageOwnProps = {}
type PageState = {
    checked:boolean;
    goodsJson:any;
}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
  state = {
    checked:false,
    goodsJson:{
        status:1
    },
  }
    config: Config = {
    navigationBarTitleText: '用户协议'
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    let params = this.$router.params;
    let goods = params.goods;
    let goodsJson = JSON.parse(goods);
    this.setState({ goodsJson });
  }
  handleCheckbox = () => {
    let { checked } = this.state;
    this.setState({
        checked:!checked
    });
  }
  //线下支付
  handleSubmit = async() => {
    let { checked,goodsJson } = this.state;
    if(!checked) {
        showToast({
            title:'请选择协议',
            icon:'none'
        });
        return;
    }
    goodsJson.status = 2;
    let res =await userPrepaid(goodsJson);
    if(res.data.code === 200) {
        Taro.redirectTo({
            url:'../order/index?status=2'
        });
    }
  }
  render () {
        const { checked } = this.state;
    return (
        <View className="agreement">
            <View className="content">
                <View className="content-title">一、协议的接受、变更与补充</View>
                <View className="content-info">
                1、勾选本协议前选项框并点击“注册”，将视为您签署了本协议，表明您自愿接受本协议全部条款的约束，
                本协议将构成您与上海佰集科技有限公司及其经营的“简书”平台（以下统称“简书”，包括相关关联方）
                之间具有约束力的法律文件。无论您是进入简书浏览网页，还是在简书上发布任何内容，或者是直接或通过各类方式（如站外API引用等）间接使用简书网服务和数据的行为，
                都将被视作已无条件接受本声明所涉全部内容。
                </View>
                <View className="content-title">二、帐号密码与注册、登录</View>
                <View className="content-info">
                2、请您妥善保管您注册时填写的用户帐号和密码，不要将帐号密码告知他人，因用户原因导致帐号或密码泄露而造成的法律后果由用户负责。同时，用户还应当对以此帐号登录进行的所有活动和事件承担全部后果与法律责任。
                </View>
            </View>
            <View className="checkbox"><Checkbox onClick={this.handleCheckbox} color="#735ff7" value="1" checked={checked}/><Text className="user">接收并同意本协议</Text></View>
            <Button className="btn" onClick={this.handleSubmit}>确定</Button>
        </View>
    )
  }
}

export default Index as unknown as ComponentClass<PageOwnProps, PageState>

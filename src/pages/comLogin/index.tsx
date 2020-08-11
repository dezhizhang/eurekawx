import { ComponentClass } from 'react'
import Taro, { Component, Config, } from '@tarojs/taro'
import { View, Input,Text, Button } from '@tarojs/components'
import { companyLogin } from '../../service/api'
import { showToast,setStorageSync } from '../../utils/tools'
import  './index.less'


type PageStateProps = {
  counter: {
    num: number
  }
}

type PageOwnProps = {}

type PageState = {
  mobile:string;
  password:string;
}

type IProps = PageStateProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
  state = {
    mobile:"",
    password:'',
  }
    config: Config = {
    navigationBarTitleText: '企业登录'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  //公司名称
  handlePhone = (ev) => {
    let mobile = ev.target.value;
    this.setState({
      mobile
    });
  }
  //密码
  handlePassword = (ev) => {
    let password = ev.target.value;
    this.setState({
      password
    })
  }
  handleSubmit = async(ev) => {
    ev.preventDefault();
    const { mobile,password } = this.state;
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/g;
    //当前企业邮箱为空
    if(!mobile) {
      showToast({
        title:'手机号不能为空',
        icon:'none',
      });
      return;
    }
    if(!password) {
      showToast({
        title:'密码不能为空',
        icon:'none'
      });
      return;
    }
    //当前企业邮箱不合法
    if(!reg.test(mobile)) {
      showToast({
        title:'手机号不合法！',
        icon:'none'
      });
      return;
    }
    //执行登录
    let res = await companyLogin({mobile,password});
    if(res.data.code === 200 && res.data.success) { //登录成功
      showToast({
        title:'登录成功',
        icon:'success'
      });
      Taro.switchTab({
        url: `../my/index`
      });
      //把社会信用码存在缓存中，实现数据的共享
      setStorageSync({key:'email',value:mobile});
     } else{ //还没有注册
      showToast({
        title:'您还没有注册！',
        icon:'none'
      });
      Taro.navigateTo({
        url:'../company/index'
      })
    }
  }
  render () {
    return (
     <View className="maintain">
        <View className="content">
          <View className="content-input">
            <Text className="text">帐号</Text>
            <Input className="input" placeholder='请输入手机号' onChange={this.handlePhone}/>
          </View>
          <View className="content-input">
            <Text className="text">密码</Text>
            <Input className="input" placeholder='请输入密码' onChange={this.handlePassword}/>
          </View>
        </View>
        <Button className="btn" onClick={this.handleSubmit}>提交</Button>
    </View>
     
    )
  }
}

export default Index as unknown as ComponentClass<PageOwnProps, PageState>

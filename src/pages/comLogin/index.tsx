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
  email:string;
}

type IProps = PageStateProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
  state = {
    email:"",
    nickName:'',
    creditCode:'',
  }
    config: Config = {
    navigationBarTitleText: '企业登录'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  //公司名称
  handleCompanyEmail = (ev) => {
    let email = ev.target.value;
    this.setState({
      email
    });
  }
  handleSubmit = async() => {
    const { email } = this.state;
    const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/g
    if(email) {
      if(!reg.test(email)) {
        showToast({
          title:'企业邮箱不合法',
          icon:'none'
        })
      } else {//提交数据
        const params = {
          email
        }
        let res = await companyLogin(params);
        if(res.data.code === 200 && res.data.success) { //登录成功
          showToast({
            title:'登录成功',
            icon:'success'
          });
          Taro.switchTab({
            url: `../my/index`
          });
          //把社会信用码存在缓存中，实现数据的共享
          setStorageSync({key:'email',value:email});
        } else{ //还没有注册
          showToast({
            title:'您还没有注册',
            icon:'none'
          });
          Taro.navigateTo({
            url:'../company/index'
          })
        }
      }
     
    } else if(!email){
      showToast({
        title:'企业邮箱不能为空',
        icon:'none',
      });
    }
  }
  handleCreditCode = (ev) => {
    let creditCode = ev.target.value;
    this.setState({
      creditCode
    });
  }
  render () {
    return (
     <View className="maintain">
        <View className="content">
          <View className="content-input">
            <Text className="text">企业邮箱</Text>
            <Input className="input" placeholder='请输入企业邮箱' onChange={this.handleCompanyEmail}/>
          </View>
        </View>
      <View className="bottom">
        <Button className="btn" onClick={this.handleSubmit}>提交</Button>
      </View>
    </View>
     
    )
  }
}

export default Index as unknown as ComponentClass<PageOwnProps, PageState>

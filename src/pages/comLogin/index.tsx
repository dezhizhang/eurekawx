import { ComponentClass } from 'react'
import Taro, { Component, Config, } from '@tarojs/taro'
import { View, Input,Text, Button,Image } from '@tarojs/components'
import { uploadInfo } from '../../service/api'
import { showToast,showLoading,hideLoading } from '../../utils/tools'
import  './index.less'


type PageStateProps = {
  counter: {
    num: number
  }
}

type PageOwnProps = {}

type PageState = {
  nickName:String,
  creditCode:String,
}

type IProps = PageStateProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
  state = {
    nickName:'',
    creditCode:'',
  }
    config: Config = {
    navigationBarTitleText: '企业登录'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  handleUserName = (event:any) => {
     const username = event.target.value;
     this.setState({username})
  }
  //公司名称
  handleCompanyName = (ev) => {
    let nickName = ev.target.value;
    this.setState({
      nickName
    });
  }
  handleSubmit = () => {
    const { nickName,creditCode,} = this.state;
    const reg =/[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g
    if(nickName && creditCode ) {
      if(!reg.test(creditCode)) {
        showToast({
          title:'信用代码不合法',
          icon:'none'
        })
      } else {//提交数据
        const params = {
          nickName,
          creditCode,
        }
        showLoading({title:'信息上传中'});
        uploadInfo(params).then(res => {
          let data = JSON.parse(res.data);
          if(data.code == 200) {
            hideLoading();
            showToast({
              title:'上传成功',
              icon:'success'
            });
            Taro.switchTab({
              url: '../index/index'
            });
          }
        })
      }
     
    } else if(!nickName){
      showToast({
        title:'公司名称不能为空',
        icon:'none',
      });
    } else if(!creditCode) {
      showToast({
        title:'信用代码不能为空',
        icon:'none'
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
            <Text className="text">公司名称</Text>
            <Input className="input" placeholder='请输入公司名称' onChange={this.handleCompanyName}/>
          </View>
          <View className="content-input">
            <Text className="text">信用代码</Text>
            <Input className="input" placeholder='请输入信用代码' onChange={this.handleCreditCode}/>
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

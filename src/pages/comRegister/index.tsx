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
  username:String,
  mobile:String,
  address:String,
  description:String
}

type IProps = PageStateProps & PageOwnProps

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
    navigationBarTitleText: '企业注册'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  handleUserName = (event:any) => {
     const username = event.target.value;
     this.setState({username})
  }
  handleMobile = (event:any) => {
    const mobile = event.target.value;
    this.setState({mobile});
  }
  handleAddress = (event:any) => {
    let address = event.target.value;
    this.setState({address})
  }
  handleDescription = (event:any) => {
    let description = event.target.value;
    this.setState({description})
  }
  handleChooseImage = () => {
    let that = this;
    const params = {
      count:1,
      sizeType:['original', 'compressed'],
      sourceType: ['album', 'camera']
    }
    Taro.chooseImage(params).then(res => {
       const tempFilePaths = res.tempFilePaths[0]; 
       that.setState({tempFilePaths});
    })
  }
  handleSubmit = () => {
    const { username,mobile,address,description,tempFilePaths } = this.state;
    const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
    if(username && mobile && address && tempFilePaths) {
      if(!reg.test(mobile)) {
        showToast({
          title:'手机号不合法',
          icon:'none'
        })
      } else {//提交数据
        const params = {
          username,
          mobile,
          address,
          description,
          tempFilePaths
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
     
    } else if(!username){
      showToast({
        title:'用户名不能为空',
        icon:'none',
      });
    } else if(!mobile) {
      showToast({
        title:'联系电话不能为空',
        icon:'none'
      });
    } else if(!address){
       showToast({
         title:'联系地址不能为空',
         icon:'none'
       })
    } else if(!tempFilePaths) {
      showToast({
        title:'请上传维修图片',
        icon:'none'
      })
    } 
  }
  render () {
    const { tempFilePaths } = this.state;
    return (
     <View className="maintain">
         {/* <View className="header">
            <View className="header-text">提示：为了给你提供更好的服务，请准确填写如下信息</View>
          </View> */}
        <View className="content">
            <View className="content-input">
                <Text className="text">公司名称</Text>
                <Input className="input" placeholder='请输入公司名称' onChange={this.handleUserName}/>
            </View>
            <View className="content-input">
                  <Text className="text">信用代码</Text>
                  <Input className="input" placeholder='请输入信用代码' onChange={this.handleMobile}/>
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
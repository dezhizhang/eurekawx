import { ComponentClass } from 'react'
import Taro, { Component, Config, } from '@tarojs/taro'
import { View, Input,Text, Button,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { uploadInfo } from '../../service/api'
import { showToast,showLoading,hideLoading } from '../../utils/tools'
import server from '../../images/server.png'
import upload from '../../images/upload.png'
import  './index.less'


type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {
  username:String,
  mobile:String,
  address:String,
  description:String
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  state = {
    username:'',
    mobile:'',
    address:'',
    description:'',
    tempFilePaths:''
  }
    config: Config = {
    navigationBarTitleText: '预约登记'
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
         <View className="header">
            <View className="header-text">提示：为了给你提供更好的服务，请准确填写如下信息</View>
          </View>
          <View className="content">
                <View className="content-input">
                    <Text className="text">真实姓名：</Text>
                    <Input className="input" placeholder='请输入您的真实姓名' onChange={this.handleUserName}/>
                </View>
                <View className="content-input">
                    <Text className="text">联系电话：</Text>
                    <Input className="input" placeholder='请输入您的联系电话' onChange={this.handleMobile}/>
                </View>
                <View className="content-input">
                    <Text className="text">联系地址：</Text>
                    <Input className="input" placeholder="请输入您的联系地址" onChange={this.handleAddress}/>
                </View>
                <View className="content-input">
                    <Text className="text">问题描述：</Text>
                    <Input className="input" placeholder="请输入您遇到的问题" onChange={this.handleDescription}/>
                </View>
                <View className="image">
                  <View onClick={this.handleChooseImage} className="image-flex">
                    <View className="image-top">点击上传</View>
                    <View className="image-bottom bottom-left">
                      <Image src={!tempFilePaths ? upload:tempFilePaths} mode='aspectFill' className="image"/>
                    </View>
                  </View> 
                  <View className="image-flex">
                      <View className="image-top">示例图片</View>
                      <View className="image-bottom">
                        <Image src={server} mode='aspectFill' className="image"/>
                      </View>
                  </View>
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

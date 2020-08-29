import { ComponentClass } from 'react'
import Taro, { Component, Config, } from '@tarojs/taro'
import { View, Textarea, Button,Image } from '@tarojs/components'
import { uploadInfo,getUserInfo } from '../../service/api'
import { showLoading,hideLoading,getStorageSync,showToast } from '../../utils/tools'
import server from '../../images/server.png'
import upload from '../../images/upload.png'
import  './index.less'


type PageStateProps = {
  counter: {
    num: number
  }
}



type PageOwnProps = {}

type PageState = {
  username:String;
  mobile:String;
  address:String;
  description:String;
  userInfo:any;
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
    tempFilePaths:'',
    userInfo:{
      userName:'',
      mobile:'',
      address:'',
    },
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
  componentDidMount() {
    this.userInfo();
  }
  //获取用户信息
  userInfo = async() => {
    const userInfoKey = getStorageSync("userInfoKey"); //用户key
    const userInfo = userInfoKey ? JSON.parse(userInfoKey):{}
    const { openid } = userInfo;
    let res = await getUserInfo({openid});
    if(res.data.code === 200) {
      let userInfo = res.data.data;
      this.setState({
        userInfo
      })
    }
  }
  handleSubmit = () => {
    const { description,tempFilePaths,userInfo } = this.state;
    const { userName,mobile,address } = userInfo;
    const params = {
      userName,
      mobile,
      address,
      description,
      tempFilePaths
    }
    if(!description) {
      Taro.showToast({
        title:'为您更好服务请填写问题描述',
        icon:'none'
      });
      return
    }
    if(!tempFilePaths) {
      Taro.showToast({
        title:'请按示例上传图片',
        icon:'none'
      });
    }
    if(tempFilePaths && description) {
      showLoading({title:'信息上传中'});
      uploadInfo(params).then(res => {
        let data = JSON.parse(res.data);
        if(data.code == 200) {
          hideLoading();
          showToast({
            title:"您的问题以提交我们会尽快联系你",
            icon:'success'
          });
          setTimeout(() => {
            Taro.switchTab({
              url: '../index/index'
            });
          },2000);
        }
      });
    }
    
  }
  render () {
    const { tempFilePaths,description } = this.state;
    return (
     <View className="maintain">
          <View className="content">
                <View className="content-input">
                  <Textarea value={description} className="text-area" placeholder="请填写问题描述"  autoFocus onInput={this.handleDescription}></Textarea>                
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
          <Button className="btn" onClick={this.handleSubmit}>提交</Button>
    </View>
     
    )
  }
}

export default Index as unknown as ComponentClass<PageOwnProps, PageState>

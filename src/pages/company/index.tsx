import { ComponentClass } from 'react'
import Taro, { Component, Config, } from '@tarojs/taro'
import { View, Input,Text, Button,Image,PickerView,PickerViewColumn } from '@tarojs/components'
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

type PageOwnProps = {}

type PageState = {
  username:String,
  mobile:String,
  address:String,
  description:String
  selector:any;
  selectorChecked:string;
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
    tempFilePaths:'',
    selectorChecked:'',
    selector: ['美国', '中国', '巴西', '日本'],
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
                <View className="content-input">
                  <Text className="text">地区信息</Text>
                  <View>{this.state.year}年{this.state.month}月{this.state.day}日</View>
                  <PickerView indicatorStyle='height: 50px;' style='width: 100%; height: 300px;' value={this.state.value} onChange={this.onChange}>
                    <PickerViewColumn>
                      {this.state.years.map(item => {
                        return (
                          <View>{item}年</View>
                        );
                      })}
                    </PickerViewColumn>
                    <PickerViewColumn>
                      {this.state.months.map(item => {
                        return (
                          <View>{item}月</View>
                        )
                      })}
                    </PickerViewColumn>
                    <PickerViewColumn>
                      {this.state.days.map(item => {
                        return (
                          <View>{item}日</View>
                        )
                      })}
                    </PickerViewColumn>
                  </PickerView>
                  {/* <Input className="input" placeholder="请输入您的联系地址" onChange={this.handleAddress}/> */}
                </View>
                <View className="content-input">
                  <Text className="text">详细地址</Text>
                  <Input className="input" placeholder="请输入您的联系地址" onChange={this.handleAddress}/>
                </View>
                <View className="image">
                  <View onClick={this.handleChooseImage} className="image-flex">
                    <View className="image-top">营业执照</View>
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

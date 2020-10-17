import { ComponentClass,Component } from 'react'
import Taro, { Config, } from '@tarojs/taro'
import { View, Input,Text, Button,Image,} from '@tarojs/components'
import { companyRegister,cityInfoList } from '../../service/api'
import { showToast,showLoading,hideLoading, getStorageSync } from '../../utils/tools'
import server from '../../images/server.png'
import upload from '../../images/upload.png'
import Address from '../../components/address';
import  './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageOwnProps = {}

type PageState = {
  compamyName:string,
  creditCode:string,
  address:string,
  description:string
  selector:any;
  visible:boolean;
}

type IProps = PageStateProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
  state = {
    compamyName:'',
    creditCode:'',
    address:'',
    detailed:'',
    cityInfo:'',
    tempFilePaths:'',
    visible:false
  }
    config: Config = {
    navigationBarTitleText: '企业认证'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
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
    const { compamyName,creditCode,detailed,tempFilePaths,cityInfo } = this.state;
    const reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g;
    const address = `${cityInfo}${detailed}`;
    const userInfo = JSON.parse(getStorageSync("userInfo"));
    const userInfoKey = getStorageSync("userInfoKey");
    const userInfoItem = userInfoKey ? JSON.parse(userInfoKey):{}
    const { url,nickName,} = userInfo;
    const { openid } = userInfoItem
    if(!compamyName) {
      showToast({
        title:'公司名称不能为空',
        icon:'none',
      });
      return
    }
    if(!creditCode) {
      showToast({
        title:'信用代码不能为空',
        icon:'none'
      });
      return
    }
    if(!address) {
      showToast({
        title:'地址不能为空',
        icon:'none'
      })
      return;
    }
    if(!tempFilePaths) {
      showToast({
        title:'请上传营业执照',
        icon:'none'
      })
      return;
    }
    if(!userInfo.nickName) {
      showToast({
        title:'没有登录的用户不能进行企业认证',
        icon:'none'
      })
    }
    if(compamyName && creditCode && address && tempFilePaths && userInfo.nickName) {
      if(!reg.test(creditCode)) {
        showToast({
          title:'社会信用代码不合法',
          icon:'none'
        })
      } else {//提交数据
        const params = {
          url,
          openid,
          nickName,
          address,
          compamyName,
          creditCode,
          userType:"企业",
          tempFilePaths
        }
        showLoading({title:'信息上传中'});
        companyRegister(params).then(res => {
          let data = JSON.parse(res.data);
          if(data.code == 200) {
            hideLoading();
            showToast({
              title:`${data.msg}`,
              icon:'success'
            });
            //认证成功修改用户级别
            setTimeout(() => {
              Taro.switchTab({
                url: '../my/index'
              });
            },2000)
           
          }
        })
      }
    }
  }
  //公司名称
  handleCompanyName = (ev) => {
    let compamyName = ev.target.value;
    this.setState({
      compamyName
    });
  }


  handleTranslate = () => {
   this.setState({
     visible:true,
   })
  }
  hiddenFloatView = () => {
    this.setState({
      visible:false
    })
  }
  //地址取消
  handleCancel = () => {
    this.setState({
      visible:false
    })
  }
  //地址提交
  handleAddress = (cityInfo) => {
    this.setState({
      cityInfo,
      visible:false
    });
  }
  //详细地址
  handleDetail = (ev) => {
    let detailed = ev.target.value;
    this.setState({
      detailed
    })
  }
  //信用代码
  handleCreditCode = (ev) => {
    let creditCode = ev.target.value;
    this.setState({
      creditCode
    });
  }
  //企业邮箱
  handleCompanyEmail = (ev) => {
    let mobile = ev.target.email;
    this.setState({
      mobile
    })
  }
  render () {
    const { tempFilePaths,visible,cityInfo} = this.state;
    return (
     <View className="maintain">
      <View className="content">
        <View className="content-input">
          <Text className="text"><Text style={{color:'red'}}>*</Text>公司名称</Text>
          <Input className="input" placeholder='请输入公司名称' onInput={this.handleCompanyName}/>
        </View> 
        <View className="content-input">
          <Text className="text"><Text style={{color:'red'}}>*</Text>信用代码</Text>
          <Input className="input" placeholder='请输入信用代码' onInput={this.handleCreditCode}/>
        </View>
        <View className="content-input" onClick={this.handleTranslate}>
          <Text className="text"><Text style={{color:'red'}}>*</Text>地区信息</Text>
          <Input className="input" value={cityInfo} placeholder="请选择地区信息"/>
         
        </View>
        <View className="content-input">
          <Text className="text"><Text style={{color:'red'}}>*</Text>详细地址</Text>
          <Input className="input" placeholder="请输入您的联系地址" onInput={this.handleDetail}/>
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
        <Button className="btn" style={{display:visible ? 'none':'block'}} onClick={this.handleSubmit}>保存</Button>
        <Address 
          visible={visible}
          handleAddress={this.handleAddress} 
          handleCancel={this.handleCancel} 
        />  
    </View>
    )
  }
}

export default Index as unknown as ComponentClass<PageOwnProps, PageState>

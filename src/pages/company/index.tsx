import { ComponentClass } from 'react'
import Taro, { Component, Config, } from '@tarojs/taro'
import { View, Input,Text, Button,Image,PickerView,PickerViewColumn } from '@tarojs/components'
import { companyRegister,cityInfoList } from '../../service/api'
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
  nickName:String,
  creditCode:String,
  address:String,
  description:String
  selector:any;
  areaInfo:any; //所有城市县区数据
  provinces:any//省
  province:string;
  citys:any//城市
  city:string;
  countys:any;//区县
  county:string;
  value:any;
  cityInfo:string;
  detailed:string; //详细地址
  moveY:number;
  time:number;
  animation:any;
  selectorChecked:string;
}

type IProps = PageStateProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
  state = {
    nickName:'',
    creditCode:'',
    address:'',
    detailed:'',
    cityInfo:'',
    tempFilePaths:'',
    areaInfo:[],
    provinces:[],
    province:'',
    citys:[],
    city:'',
    countys:[],
    county:'',
    show:false,
    time:0,
    moveY:200,
    animation:undefined,
    value: [0, 0, 0],
    index:[0, 0, 0],
  }
    config: Config = {
    navigationBarTitleText: '企业注册'
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
    const { nickName,creditCode,detailed,tempFilePaths,cityInfo } = this.state;
    const reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g;
    const address = `${cityInfo}${detailed}`
    if(nickName && creditCode && address && tempFilePaths) {
      if(!reg.test(creditCode)) {
        showToast({
          title:'社会信用代码不合法',
          icon:'none'
        })
      } else {//提交数据
        const params = {
          nickName,
          creditCode,
          address,
          userType:"高级会员",
          tempFilePaths
        }
        showLoading({title:'信息上传中'});
        companyRegister(params).then(res => {
          let data = JSON.parse(res.data);
          if(data.code == 200) {
            hideLoading();
            showToast({
              title:'注册成功',
              icon:'success'
            });
            Taro.switchTab({
              url: '../my/comLogin'
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
    } else if(!address){
       showToast({
         title:'地址不能为空',
         icon:'none'
       })
    } else if(!tempFilePaths) {
      showToast({
        title:'请上传营业执照',
        icon:'none'
      })
    } 
  }
  componentDidMount() {
    this.getCityData();
  }
  getCityData = async() => {
    let res = await cityInfoList();
    if(res.data.code === 200) {
      let areaInfo = res.data.data;
      this.setState({
        areaInfo
      });
      this.getProvinceData(areaInfo); //获取省份数据
    } 
  }
  getProvinceData = (areaInfo) => {
    let s;
    let provinces = [];
    let num = 0;
    for (let i = 0; i < areaInfo.length; i++) {
      s = areaInfo[i];
      if (s.di == "00" && s.xian == "00") {
        provinces[num] = s;
        num++;
      }
      
    }
    this.getCityArr(0,areaInfo,provinces)
    this.setState({provinces});
  }
  getCityArr = (count,areaInfo,provinces) => {
    let c;
    let citys = [];
    let num = 0;
    for(let i=0;i < areaInfo.length;i++) {
      c = areaInfo[i];
      if(c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
        citys[num] = c;
        num++;
      }
    }
    this.getCountyInfo(0,0,areaInfo,provinces,citys)
    this.setState({
      city:'',
      citys,
      value:[count,0,0]
    })
  }
  getCountyInfo = (column0,column1,areaInfo,provinces,citys) => {
    let c;
    let countys = [];
    let num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
      c = areaInfo[i];
      if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
        countys[num] = c;
        num++;
      }
    }
    this.setState({
      county:'',
      countys,
      value: [column0, column1, 0]
    })
  }

  //公司名称
  handleCompanyName = (ev) => {
    let nickName = ev.target.value;
    this.setState({
      nickName
    });
  }
  bindChange = (ev) => {
    let val = ev.detail.value;
    let {index,areaInfo,provinces,citys,countys} = this.state;
    //若省份column做了滑动则定位到地级市和区县第一位
    if (index[0] != val[0]) {
      val[1] = 0;
      val[2] = 0;
      this.getCityArr(val[0],areaInfo,provinces);//获取地级市数据
      this.getCountyInfo(val[0],val[1],areaInfo,provinces,citys);
    } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
      if (index[1] != val[1]) {
        val[2] = 0;
        this.getCountyInfo(val[0],val[1],areaInfo,provinces,citys);
      }
    }
    index = val;
    //更新数据
    this.setState({
      value: [val[0], val[1], val[2]],
      province: provinces[val[0]].name,
      city: citys[val[1]].name,
      county: countys[val[2]].name,
    })
  }

  handleTranslate = () => {
   this.setState({
     show:true,
   })
  }
  hiddenFloatView = () => {
    this.setState({
      show:false
    })
  }
  handleCancel = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({
      show:false
    })
  }
  handleOk = (ev) => {
    ev.stopPropagation();
    let { province,city, county } = this.state;
    let cityInfo = `${province}${city}${county}`;
    this.setState({
      show:false,
      cityInfo
    })
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
  render () {
    const { tempFilePaths,provinces,value,citys,countys,show,cityInfo} = this.state;
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
                <View className="content-input" onClick={this.handleTranslate}>
                  <Text className="text">地区信息</Text>
                  <Input className="input" value={cityInfo} placeholder="请选择地区信息"/>
                  <View className="animation-element-wrapper" style={{visibility:show ? 'visible':'hidden'}}>
                  <View className="animation-element">
                    <Text className="left-btn" onClick={this.handleCancel}>取消</Text>
                    <Text className="right-btn" onClick={this.handleOk}>确定</Text>
                    <View className="line"></View>
                    <PickerView className="picker-view" indicatorStyle='height: 50px;' style='width: 100%; height: 380px;' value={value} onChange={this.bindChange}>
                      <PickerViewColumn className="picker-view-column">
                        {provinces.map((item,index) => {
                          return <View key={index}>{item.name}</View>
                        })}
                      </PickerViewColumn>
                      <PickerViewColumn>
                        {citys.map((item,index) => {
                          return <View key={index}>{item.name}</View>
                        })}
                      </PickerViewColumn>
                      <PickerViewColumn>
                        {countys.map((item,index) => {
                          return <View key={index}>{item.name}</View>
                        })}
                      </PickerViewColumn>
                    </PickerView>
                  </View>
                 
                </View>
                </View>
                <View className="content-input">
                  <Text className="text">详细地址</Text>
                  <Input className="input" placeholder="请输入您的联系地址" onChange={this.handleDetail}/>
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
          <View className="bottom" style={{display:show ? 'none':'block'}}>
            <Button className="btn" onClick={this.handleSubmit}>提交</Button>
          </View>
    </View>
     
    )
  }
}

export default Index as unknown as ComponentClass<PageOwnProps, PageState>

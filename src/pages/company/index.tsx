import { ComponentClass } from 'react'
import Taro, { Component, Config, } from '@tarojs/taro'
import { View, Input,Text, Button,Image,PickerView,PickerViewColumn } from '@tarojs/components'
import { uploadInfo,cityInfoList } from '../../service/api'
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
  areaInfo:any; //所有城市县区数据
  provinces:any//省
  province:string;
  citys:any//城市
  city:string;
  countys:any;//区县
  county:string;
  value:any;
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
    username:'',
    mobile:'',
    address:'',
    description:'',
    tempFilePaths:'',
    areaInfo:[],
    provinces:[],
    citys:[],
    countys:[],
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
  handleCompanyName = (ev:any) => {
    let nickName = ev.target.value;
    this.setState({
      nickName
    });
  }
  bindChange = (ev) => {
    let val = ev.detail.value;
    let {index,areaInfo,provinces,citys,countys} = this.state;
    
    // console.log(e)
    //判断滑动的是第几个column
    //若省份column做了滑动则定位到地级市和区县第一位
    if (index[0] != val[0]) {
      val[1] = 0;
      val[2] = 0;
      this.getCityArr(val[0],areaInfo,provinces);
      //this.getCityArr(val[0], this);//获取地级市数据
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
      county: countys[val[2]].name
    })
  }
  animationEvents =(that,moveY,show) =>{
    let animation = Taro.createAnimation({
      transformOrigin: "50% 50%",
      duration: 400,
      timingFunction: "ease",
      delay: 0
    }
    )
    animation.translateY(moveY + 'vh').step()
    that.setData({
      animation: that.animation.export(),
      show: true
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
  render () {
    const { tempFilePaths,provinces,value,citys,countys,show,animation} = this.state;
    console.log("animation",animation);

    return (
     <View className="maintain">
          <View className="content">
                <View className="content-input">
                    <Text className="text">公司名称</Text>
                    <Input className="input" placeholder='请输入公司名称' onChange={this.handleCompanyName}/>
                </View>
                <View className="content-input">
                  <Text className="text">信用代码</Text>
                  <Input className="input" placeholder='请输入信用代码' onChange={this.handleMobile}/>
                </View>
                <View className="content-input" onClick={this.handleTranslate}>
                  <Text className="text">地区信息</Text>
                  <Input className="input" placeholder="请选择地区信息"/>
                  <View className="animation-element-wrapper" style={{visibility:show ? 'visible':'hidden'}}>
                  <View className="animation-element">
                    <Text className="left-btn">取消</Text>
                    <Text className="right-btn">确定</Text>
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
          <View className="bottom" style={{display:show ? 'none':'block'}}>
            <Button className="btn" onClick={this.handleSubmit}>提交</Button>
          </View>
    </View>
     
    )
  }
}

export default Index as unknown as ComponentClass<PageOwnProps, PageState>

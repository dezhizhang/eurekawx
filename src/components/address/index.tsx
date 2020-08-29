import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Text,PickerView,PickerViewColumn,} from '@tarojs/components'
import { cityInfoList } from '../../service/api'
import  './index.less'

type PageStateProps = {
   
}

type PageOwnProps = {
    visible:boolean;
    handleCancel:any;
    handleAddress:(value:any) => void;
    bindChange?:any;
}

type PageState = {
    value:any;
    cityInfo:string;
    areaInfo:any;
    provinces:any;
    province:string;
    citys:any;
    city:string;
    countys:any;
    county:string;

}

type IProps = PageStateProps  & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
    state = {
      cityInfo:'',
      areaInfo:[],
      provinces:[{name:''}],
      province:'',
      citys:[{name:''}],
      city:'',
      countys:[{name:''}],
      county:'',
      animation:undefined,
      value: [0, 0, 0],
      index:[0, 0, 0],
    }
    config: Config = {
    navigationBarTitleText: ''
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

  bindChange = (ev) => {
    let val = ev.detail.value;
    let {index,areaInfo,provinces,citys,countys} = this.state;
    //若省份column做了滑动则定位到地级市和区县第一位
    if (index[0] != val[0]) {
      val[1] = 0;
      val[2] = 0;
      this.getCityArr(val[0],areaInfo,provinces);//获取地级市数据
      this.getCountyInfo(val[0],val[1],areaInfo,provinces,citys);
    } else {//若省份column未做滑动，地级市做了滑动则定位区县第一位
      if (index[1] != val[1]) {
        val[2] = 0;
        this.getCountyInfo(val[0],val[1],areaInfo,provinces,citys);
      }
    }
    index = val;
    
    //更新数据
    this.setState({
      index:index,
      value: [val[0], val[1], val[2]],
      province: provinces[val[0]].name,
      city: citys[val[1]].name,
      county: countys[val[2]].name,
    })
  }
  //点击确定
  handleOk = (ev) => {
    ev.stopPropagation();
    let { province,city, county } = this.state;
    let cityInfo = `${province}${city}${county}`;
    this.props.handleAddress(cityInfo)
  }
  render () {
    const { provinces,citys,countys,value} = this.state;
    const { visible,handleCancel } = this.props;
    console.log("visible",visible);

    return (
      <View className="animation-element-wrapper" style={{visibility:visible ? 'visible':'hidden'}}>
        <View className="animation-element">
        <Text className="left-btn" onClick={handleCancel}>取消</Text>
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
        
    )
  }
}

// #region 导出注意
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误

export default Index as ComponentClass<PageOwnProps, PageState>

import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { View,Canvas, Button} from '@tarojs/components'
import { payInfoList,getPayInfo,updateStatus,getUserInfo } from '../../service/api';
import  './index.less'

interface IndexProps {

}
interface IndexState {
   
}
export default class Index extends Component<IndexProps,IndexState> {
    // 内置数据
    canvasName:'handWriting';
    ctx:any;
    canvasWidth:0;
    canvasHeight:0;
    linePrack:any = [];//划线轨迹 , 生成线条的实际点
    currentLine:any = [];
    transparent:1// 透明度
    pressure:0.5; // 默认压力
    smoothness:15000; //顺滑度，用60的距离来计算速度
    lineSize:0.2; // 笔记倍数
    lineMin:0.5 //最小笔画半径
    lineMax:2 //最大笔画半径
    currentPoint:any = {};
    firstTouch:boolean = true; // 第一次触发
    radius:any = 0.5;//画圆的半径
    cutArea: { top: 0, right: 0, bottom: 0, left: 0 }; //裁剪区域
    lastPoint: 0;
    chirography:any =[]; //笔迹
    startY: 0;
    deltaY: 0;
    startValue: 0;
    state = {
        // 内置数据
        selectColor: 'black',
        lineColor: '#1A1A1A', // 颜色
        slideValue: 2,
        placeholder:"签名区域",
        cancleText:'取消',
        canvas:'',
        submitOk:false,
        disabled:false,
        buttonBg:'',
        pointMove:false,
        bizNo:''
    }  

    componentDidMount() {
        this.ctx = Taro.createCanvasContext(this.canvasName)
        var query = Taro.createSelectorQuery();
        query.select('.handCenter').boundingClientRect(rect => {
          // console.log(rect)
          // this.canvasWidth = rect.width;
          // this.canvasHeight = rect.height;
        }).exec();
    }

    onShareAppMessage() {
      return {
        title: '贵彩办公',
        path: '/pages/payment/index'
      }
    }
    //画两点之间的线条；参数为:line，会绘制最近的开始的两个点；
    pointToLine = (line) => {
        this.calcBethelLine(line);
        return;
    }
    calcBethelLine = (line) => {
        if (line.length <= 1) {
            line[0].r = this.radius;
            return;
          }
          let x0, x1, x2, y0, y1, y2, r0, r1, r2, len, lastRadius, dis = 0, time = 0, curveValue = 0.5;
          if (line.length <= 2) {
            x0 = line[1].x
            y0 = line[1].y
            x2 = line[1].x + (line[0].x - line[1].x) * curveValue;
            y2 = line[1].y + (line[0].y - line[1].y) * curveValue;
            //x2 = line[1].x;
            //y2 = line[1].y;
            x1 = x0 + (x2 - x0) * curveValue;
            y1 = y0 + (y2 - y0) * curveValue;;
      
          } else {
            x0 = line[2].x + (line[1].x - line[2].x) * curveValue;
            y0 = line[2].y + (line[1].y - line[2].y) * curveValue;
            x1 = line[1].x;
            y1 = line[1].y;
            x2 = x1 + (line[0].x - x1) * curveValue;
            y2 = y1 + (line[0].y - y1) * curveValue;
          }
          //从计算公式看，三个点分别是(x0,y0),(x1,y1),(x2,y2) ；(x1,y1)这个是控制点，控制点不会落在曲线上；实际上，这个点还会手写获取的实际点，却落在曲线上
          len = this.distance({ x: x2, y: y2 }, { x: x0, y: y0 }, 'calc');
          lastRadius = this.radius;
          for (let n = 0; n < line.length - 1; n++) {
            dis += line[n].dis;
            time += line[n].time - line[n + 1].time;
            if (dis > this.smoothness) break;
          }
          this.radius = Math.min(time / len * this.pressure + this.lineMin, this.lineMax) * this.lineSize
          line[0].r = this.radius;
          //计算笔迹半径；
          if (line.length <= 2) {
            r0 = (lastRadius + this.radius) / 2;
            r1 = r0;
            r2 = r1;
            //return;
          } else {
            r0 = (line[2].r + line[1].r) / 2;
            r1 = line[1].r;
            r2 = (line[1].r + line[0].r) / 2;
          }
          let n = 5;
          let point:any = [];
          for (let i = 0; i < n; i++) {
            let t = i / (n - 1);
            let x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * x1 + t * t * x2;
            let y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * y1 + t * t * y2;
            let r = lastRadius + (this.radius - lastRadius) / n * i;
            point.push({ x: x, y: y, r: r });
            if (point.length == 3) {
              let a = this.ctaCalc(point[0].x, point[0].y, point[0].r, point[1].x, point[1].y, point[1].r, point[2].x, point[2].y, point[2].r);
              a[0].color = this.state.lineColor;
              this.bethelDraw(a, 1);
              point = [{ x: x, y: y, r: r }];
            }
          }
    }

    //求两点之间距离
    distance = (a, b, type) => {
        let x = b.x - a.x;
        let y = b.y - a.y;
        return Math.sqrt(x * x + y * y) * 5;
    };
    ctaCalc = (x0, y0, r0, x1, y1, r1, x2, y2, r2)=> {
        let a:any = [], vx01, vy01, norm, n_x0, n_y0, vx21, vy21, n_x2, n_y2;
        vx01 = x1 - x0;
        vy01 = y1 - y0;
        norm = Math.sqrt(vx01 * vx01 + vy01 * vy01 + 0.0001) * 2;
        vx01 = vx01 / norm * r0;
        vy01 = vy01 / norm * r0;
        n_x0 = vy01;
        n_y0 = -vx01;
        vx21 = x1 - x2;
        vy21 = y1 - y2;
        norm = Math.sqrt(vx21 * vx21 + vy21 * vy21 + 0.0001) * 2;
        vx21 = vx21 / norm * r2;
        vy21 = vy21 / norm * r2;
        n_x2 = -vy21;
        n_y2 = vx21;
        a.push({ mx: x0 + n_x0, my: y0 + n_y0, color: "#1A1A1A" });
        a.push({ c1x: x1 + n_x0, c1y: y1 + n_y0, c2x: x1 + n_x2, c2y: y1 + n_y2, ex: x2 + n_x2, ey: y2 + n_y2 });
        a.push({ c1x: x2 + n_x2 - vx21, c1y: y2 + n_y2 - vy21, c2x: x2 - n_x2 - vx21, c2y: y2 - n_y2 - vy21, ex: x2 - n_x2, ey: y2 - n_y2 });
        a.push({ c1x: x1 - n_x2, c1y: y1 - n_y2, c2x: x1 - n_x0, c2y: y1 - n_y0, ex: x0 - n_x0, ey: y0 - n_y0 });
        a.push({ c1x: x0 - n_x0 - vx01, c1y: y0 - n_y0 - vy01, c2x: x0 + n_x0 - vx01, c2y: y0 + n_y0 - vy01, ex: x0 + n_x0, ey: y0 + n_y0 });
        a[0].mx = a[0].mx.toFixed(1);
        a[0].mx = parseFloat(a[0].mx);
        a[0].my = a[0].my.toFixed(1);
        a[0].my = parseFloat(a[0].my);
        for (let i = 1; i < a.length; i++) {
        a[i].c1x = a[i].c1x.toFixed(1);
        a[i].c1x = parseFloat(a[i].c1x);
        a[i].c1y = a[i].c1y.toFixed(1);
        a[i].c1y = parseFloat(a[i].c1y);
        a[i].c2x = a[i].c2x.toFixed(1);
        a[i].c2x = parseFloat(a[i].c2x);
        a[i].c2y = a[i].c2y.toFixed(1);
        a[i].c2y = parseFloat(a[i].c2y);
        a[i].ex = a[i].ex.toFixed(1);
        a[i].ex = parseFloat(a[i].ex);
        a[i].ey = a[i].ey.toFixed(1);
        a[i].ey = parseFloat(a[i].ey);
        }
        return a;
    };
    bethelDraw  = (point, is_fill, color) => {
        this.ctx.beginPath();
        this.ctx.moveTo(point[0].mx, point[0].my);
        if (undefined != color) {
        this.ctx.setFillStyle(color);
        this.ctx.setStrokeStyle(color);
        } else {
        this.ctx.setFillStyle(point[0].color);
        this.ctx.setStrokeStyle(point[0].color);
        }
        for (let i = 1; i < point.length; i++) {
        this.ctx.bezierCurveTo(point[i].c1x, point[i].c1y, point[i].c2x, point[i].c2y, point[i].ex, point[i].ey);
        }
        this.ctx.stroke();
        if (undefined != is_fill) {
        this.ctx.fill(); //填充图形 ( 后绘制的图形会覆盖前面的图形, 绘制时注意先后顺序 )
        }
        this.ctx.draw(true)
    };

    // 笔迹开始
    uploadScaleStart  =(e)=> {
        if (e.type != 'touchstart') return false;
        this.ctx.setFillStyle(this.state.lineColor);  // 初始线条设置颜色
        this.ctx.setGlobalAlpha(this.transparent);  // 设置半透明
        this.currentPoint = {
          x: e.touches[0].x,
          y: e.touches[0].y
        }
        this.currentLine.unshift({
          time: new Date().getTime(),
          dis: 0,
          x: this.currentPoint.x,
          y: this.currentPoint.y
        })
        if (this.firstTouch) {
          this.cutArea = { top: this.currentPoint.y, right: this.currentPoint.x, bottom: this.currentPoint.y, left: this.currentPoint.x }
          this.firstTouch = false
        }
        this.pointToLine(this.currentLine);
    }
    // 笔迹移动
    uploadScaleMove = (e)=> {
        if (e.type != 'touchmove') return false;
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        let point = {
        x: e.touches[0].x,
        y: e.touches[0].y
        }
        //测试裁剪
        if (point.y < this.cutArea.top) {
        this.cutArea.top = point.y;
        }
        if (point.y < 0) this.cutArea.top = 0;

        if (point.x > this.cutArea.right) {
        this.cutArea.right = point.x;
        }
        if (this.canvasWidth - point.x <= 0) {
        this.cutArea.right = this.canvasWidth;
        }
        if (point.y > this.cutArea.bottom) {
        this.cutArea.bottom = point.y;
        }
        if (this.canvasHeight - point.y <= 0) {
        this.cutArea.bottom = this.canvasHeight;
        }
        if (point.x < this.cutArea.left) {
        this.cutArea.left = point.x;
        }
        if (point.x < 0) this.cutArea.left = 0;

        this.lastPoint = this.currentPoint;
        this.currentPoint = point
        this.currentLine.unshift({
        time: new Date().getTime(),
        dis: this.distance(this.currentPoint, this.lastPoint, 'move'),
        x: point.x,
        y: point.y
        })
        this.pointToLine(this.currentLine);
    };

    // 笔迹结束
    uploadScaleEnd = (e) =>  {
        if (e.type != 'touchend') return 0;
        let point = {
            x: e.changedTouches[0].x,
            y: e.changedTouches[0].y
        }
        this.lastPoint = this.currentPoint;
        let currentPoint = this.lastPoint;
    
        this.currentPoint = point
        this.currentLine.unshift({
        time: new Date().getTime(),
        dis: this.distance(this.currentPoint, this.lastPoint, 'end'),
        x: point.x,
        y: point.y
        })
        if (this.currentLine.length > 2) {
        var info = (this.currentLine[0].time - this.currentLine[this.currentLine.length - 1].time) / this.currentLine.length;
        //$("#info").text(info.toFixed(2));
        }
        //一笔结束，保存笔迹的坐标点，清空，当前笔迹
        //增加判断是否在手写区域；
        this.pointToLine(this.currentLine);
        var currentChirography:any = {
        lineSize: this.lineSize,
        lineColor: this.state.lineColor
        };
        this.chirography.unshift(currentChirography);
        this.linePrack.unshift(this.currentLine);
        this.currentLine = []
    };

    componentDidHide () { }
    render () {
      
      return (
        <View className="wrapper">
        <View className="singer-title">
            <View className="singer-text">请在下面区域书写清晰可辨的签名</View>
        </View>
        <View className="singer-content">
            <View className="user-singer">
                <Canvas canvasId='handWriting' 
                    onTouchStart={this.uploadScaleStart} 
                    onTouchMove={this.uploadScaleMove} 
                    onTouchEnd={this.uploadScaleEnd}  className="singer-start" 
                />
            </View>
            <View className="singer-button">
               <View className="flex-button"><Button className="button-cancle">取消</Button></View>
               <View className="flex-button" ><Button className="button-ok">确定</Button></View>
            </View>
        </View>
    </View>
      )
    }
}




//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pLeft:0,
    pTop:0,
    screenHeight:0,
    screenWidth:0,
    pageX:0,
    pageY:0,
    animation:null,
    max:100
  },
  //事件处理函数
  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          screenHeight:res.windowHeight,
          screenWidth:res.windowWidth
        });
      },
    })
  },
  handletouchmove:function(event) {

    //当前坐标
    let currentPageX = event.touches[0].pageX;
    let currentPageY = event.touches[0].pageY;
    // 设置当前滑动位移
    this.setData({
      pLeft: currentPageX - this.data.pageX,
      pTop: currentPageY - this.data.pageY
    });
  },
  handletouchstart:function(event){
    console.log(event);
    let X = event.touches[0].pageX;
    let Y = event.touches[0].pageY;
    this.setData({
      pageX:X,
      pageY:Y
    });
  },
  handletouchend:function(event) {
    //获取当前偏移量
    let _left = this.data.pLeft;
    let _top = this.data.pTop;
    let max = this.data.max;
    /*
     屏幕边界判断
    */
    let moveTop, moveLeft;
    console.log(Math.abs(_left));
    console.log(Math.abs(_top));
    if (Math.abs(_left) < max && Math.abs(_top) < max) {
      console.log('小于边界值');
      this.setData({
        pTop:0,
        pLeft:0
      })
    } else {
      moveTop = _top * 10;
      moveLeft = _left * 10;
    }
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 20
    });
    this.animation = animation;
    animation.translate(moveLeft, moveTop).step();
    this.setData({
      animation: animation.export(),
      _top:_top,
      _left:_left
    });
    // 第二个产品
    var animation2 = wx.createAnimation({
      duration:500,
      timingFunction:'linear',
      delay:200
    });
    this.animation = animation2;
    animation2.scaleY('1').top('0px').step();
    this.setData({
      animation2:animation2.export()
    });
    // 第三个产品
    var animation3 = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 200
    });
    this.animation = animation3;
    animation3.scale('.96','.96').top('15px').step();
    this.setData({
      animation3: animation3.export()
    });

  },
  handlereset:function() {
    console.log('撤销！');
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear',
      delay: 0
    });
    this.animation = animation;
    animation.left(0).top(0).step();
    this.setData({
      animation: animation.export()
    });
  }
})

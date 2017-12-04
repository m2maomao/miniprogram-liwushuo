//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    screenHeight:0,
    screenWidth:0,
    pageX:0,
    pageY:0,
    max:100,
    cardInfoList:[{
      imageUrl:'../../images/500x500.jpg',
      t1:'1111111111',
      t2:'一场呵护与润色的时尚盛宴',
      t3:'100',
      animation:'animation1',
      pLeft:0,
      pTop:0
    }, {
      imageUrl: '../../images/500x500.jpg',
      t1: '2222222222',
      t2: '一场呵护与润色的时尚盛宴',
      t3: '200',
      animation: 'animation2',
      pLeft:null,
      pTop:null
    }, {
      imageUrl: '../../images/500x500.jpg',
      t1: '3333333333',
      t2: '一场呵护与润色的时尚盛宴',
      t3: '300',
      animation: 'animation3',
      pTop:null,
      pTop:null
    }]
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
  // touch移动
  handletouchmove:function(event) {
    let _id = event.currentTarget.id;
    //当前坐标
    let currentPageX = event.touches[0].pageX;
    let currentPageY = event.touches[0].pageY;
    // 为data赋值
    let _cardInfoList = this.data.cardInfoList;
    // console.log(_cardInfoList);
    _cardInfoList[_id].pLeft = currentPageX - _cardInfoList[_id].pageX;
    _cardInfoList[_id].pTop = currentPageY - _cardInfoList[_id].pageY;
    this.setData({
      cardInfoList:_cardInfoList
    });
  },
  // touch开始
  handletouchstart:function(event){
    // console.log('之前数据：',this.data);
    // 获取当前操作ID
    let _id = event.currentTarget.id;
    // 为data赋值
    let _cardInfoList = this.data.cardInfoList;
    let X = event.touches[0].pageX;
    let Y = event.touches[0].pageY;
    _cardInfoList[_id].pageX = X;
    _cardInfoList[_id].pageY = Y;

    this.setData({
      cardInfoList:_cardInfoList
    });

    // console.log('修改后数据：', this.data);
  },
  handletouchend:function(event) {
    // 获取当前操作ID
    let _id = event.currentTarget.id;
    // 为data赋值
    let _cardInfoList = this.data.cardInfoList;

    //获取当前偏移量
    let _left = _cardInfoList[_id].pLeft;
    let _top = _cardInfoList[_id].pTop;
    let max = this.data.max;
    /*
     屏幕边界判断
    */
    let moveTop, moveLeft;
    if (Math.abs(_left) < max && Math.abs(_top) < max) {
      console.log('小于边界值');
      _cardInfoList[_id].pTop = 0;
      _cardInfoList[_id].pLeft = 0;
      this.setData({
        cardInfoList:_cardInfoList
      })
    } else {
      moveTop = _top * 10;
      moveLeft = _left * 10;
    }
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 20
    });
    this.animation = animation1;
    animation1.translate(moveLeft, moveTop).step();
    _cardInfoList[_id].pTop = moveTop;
    _cardInfoList[_id].pLeft = moveLeft;
    this.setData({
      animation: animation1.export(),
      cardInfoList:_cardInfoList
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

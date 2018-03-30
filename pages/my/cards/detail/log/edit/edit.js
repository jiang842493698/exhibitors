

let _this;
let $ = getApp().$;
let log = $.request.linkLog();
//观众id
let id;
let exhibitionId;
let Idnumber = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FocusBool: true,
    level: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    id = options.id;
    let Idnumbers = options.Idnumber;
    Idnumber = Idnumbers.substr(1, Idnumbers.length - 2).split(",");
    exhibitionId = options.exhibitionId;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      _this.onLoad();
    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSubmit: (e) => {
    console.log(e)
    let info = e.detail.value.content;
    if (!info) {
      $.service.showModal({
        title: '提示',
        content: '请输入添加日志的内容',
        showCancel: false,
      });
      return;
    }
    console.log("abcdefg")
    console.log(id)
    if(id == -1 ){
      /**
       * 批量添加日志
       */
      console.log(Idnumber)
      for (let i of Idnumber){
        console.log(i)
        let data = {
          info,
          level: _this.data.level,
          contactId: i

        };
        console.log(data)
        log.post1(data).then(res => {
          if (res.resCode == 0) {
            console.log("成功")
            wx.navigateBack({
              delta: 1
            });
            console.log("成功")
          }
        })
      }
    }else{
      /**
       * 正常单个添加日志
       */
      let data = {
        info,
        level: _this.data.level,
        contactId: id

      };
      console.log(data)
      log.post1(data).then(res => {
        if (res.resCode == 0) {
          console.log("成功")
          wx.navigateBack({
            delta: 1
          });
          console.log("成功")
        }
      })
    }
  },
  OnFocus: () => {
    _this.setData({
      FocusBool: false
    })
  },
  changeColor: (e) => {
    console.log(e)
    console.log(e.currentTarget.dataset.color)
    let color = e.currentTarget.dataset.color
    if (color == "violet") {
      _this.setData({
        color: "violet",
        level: 0
      })
    }
    if (color == "green") {
      _this.setData({
        color: "green",
        level: 1
      })
    }
    if (color == "yellow") {
      _this.setData({
        color: "yellow",
        level: 2
      })
    }
    console.log(_this.data.color)
    console.log(_this.data.level)
  }
})
// pages/my/cards/detail/remind/edit/edit.js
let $ = getApp().$;
let linkRemind = $.request.linkRemind();
let remind
let id
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("aaaaaaaaaaaa")
    console.log(options.id)
    id = options.id
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
    
    this.setData({
      date : "2018-04-01",
      time: "08:30"
    })
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
  onInput : function(e){
    remind = e.detail.value;
  },
  bindDateChange:function(e){
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange:function(e){
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  onSave:function(){
    if (remind==null||remind==''){
      $.service.showModal({
        title: '提示',
        content: '请输入添加提醒的内容',
        showCancel: false,
      });
      return;
    }
    
    let dateTime = this.data.date+" "+this.data.time
    console.log("9999999999999999999999999999")
    console.log(id)
    let data = {
      RemindContent: remind,
      RemindDate: dateTime,
      ContactId: id
    }
    linkRemind.post1(data).then(res=>{
      if(res.resCode == 0){
        wx.navigateBack({
          delta: 1
        });
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
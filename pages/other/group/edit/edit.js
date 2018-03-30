// pages/other/group/edit/edit.js
let $ = getApp().$;

let group = $.request.group();

let _this
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
    _this = this;
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
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
  },
  onSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value.name)
    let Info = {}
    Info.Name = ""
    this.setData({
      Info
    })

    $.request.group().post1(e.detail.value.name).then(res => {
      if (res.resCode == 0) {
        console.log("修改成功")
        console.log(res.resMsg)
        e.detail.value.name = 0;
        $.service.alert({ title: '添加成功', image: '/assets/images/icon/fail.png' });
      } else {
        $.service.alert({ title: '添加失败', image: '/assets/images/icon/fail.png' });
      }
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
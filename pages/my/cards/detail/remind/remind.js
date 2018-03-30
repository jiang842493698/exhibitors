// pages/my/cards/detail/remind/remind.js

let $ = getApp().$;
let linkRemind = $.request.linkRemind();
let id;
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
    this.load_reminds()
  },
  load_reminds() {
    let _this = this;
    console.log("9999999999999999")
    console.log(id)
    linkRemind.post(id).then(res => {
      if (res.resCode == 0) {
        console.log("7777777777777777")
        console.log(res.result)
        _this.setData({
          reminds: res.result
        })

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
  
  },
  onAdd(){
    console.log(id)
    wx.navigateTo({url:'/pages/my/cards/detail/remind/edit/edit?id='+id});
  }
})
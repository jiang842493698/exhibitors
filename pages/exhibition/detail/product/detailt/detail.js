// pages/exhibition/detail/product/detail/detail.js
let id
let index
let _this
let item
let $ = getApp().$;
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
    index = options.index
    _this = this

    console.log(id)
    console.log(index)
    $.request.SelectExhibitsFromTenantId().get(id).then(res => {
      if (res.resCode == 0) {
        let productList = res.result;
        console.log("展品列表")
        console.log(productList)
        _this.setData({
          product: productList[index]
        })
      }
    })
  },
  onSwiperChange(e) {
    console.log(e.detail.current + 1)
    _this.setData({ index: e.detail.current + 1 });
  },
  onBreak: function () {
    wx.navigateBack({
      delta: 1
    })
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
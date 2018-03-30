// pages/my/index.js
let _this
let app = getApp()
let $ = getApp().$
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
    _this = this
    _this.onUser();
    _this.onExhibitior();
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
  onhome: function () {
    wx.switchTab({
      url: '/pages/home/index'
    })
  },
  // onUser: function () {
  //   // let userInfo = wx.getStorageSync('userInfo');

  //   let user = wx.getStorageSync("userInfo")
  //   console.log("缓存数据")
  //   console.log(user)
  //   let name = user.Name;
  //   let job = user.Job == null ? "" : user.Job
  //   let companyName = user.CompanyName
  //   let city = user.City == null ? "" : user.City
  //   let Industry = user.Industry == null ? "" : user.Industry
  //   let introduction = user.Introduction == null ? "" : user.Introduction
  //   let image = user.Image == null ? '/assets/images/other/not_logo.png' : user.Image
  //   let id = user.LinkId
  //   _this.setData({
  //     user: {
  //       name, job, companyName, city, Industry, introduction, image, id
  //     },
  //     Industry
  //   })
  //   wx.setStorage({
  //     key: 'user',
  //     data: _this.data.user,
  //   })

  // },
  onUser: function () {
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLL")
    $.request.ExhibitorContact().getMyContact().then(res => {
      if (res.resCode == 0) {
        console.log(res.result)
        let result = res.result[0]
        console.log(result)
        let image
        image = result.Image

        _this.setData({
          result,
          images: image
        })
        console.log("[[[[[[[[[[[[[[[[[[[[[")
        console.log(result)
      }
    })
  },
  onExhibitior() {
    $.request.ExhibitorInfo().get().then(res => {
      if (res.resCode == 0) {
        let Exhibitior = res.result[0]
        console.log(Exhibitior)
        _this.setData({
          Exhibitior
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
})
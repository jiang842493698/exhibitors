// pages/exhibition/search/search.js
let $ = getApp().$
let matchEx = $.request.matchEx();
let VisitInfo = $.request.VisitInfo();
let value
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

    // let name = this.data.name == null ? "-1" : this.data.name
    let name = wx.getStorageSync("filterKey") == null ? "-1" : wx.getStorageSync("filterKey")
    this.onfilter(name)
  },
  onfilter(e){
    let data = {}
    if(e!="-1"){
      data = {CompanyName:`/${e}/`}
    }
    matchEx.getAll(data).then(res => {
      if(res.resCode == 0){
        let result = res.result
        this.setData({
          message: result,
          count: result.length,
        })
        console.log(this.data.message)
        this.count()
        wx.setStorageSync("filterKey", e)
      }
    })
  },
  count(){
    VisitInfo.getCount().then(ress => {
      if (ress.resCode == 0) {
        let results = ress.result
        this.setData({
          VisitInfoCount: results
        })
        console.log("访问数" + results)
      }

    })
  },
  onFilterInput(e){
    console.log(e.detail.value)
    value = e.detail.value
    
    this.onfilter(value)
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
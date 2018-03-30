// pages/my/cards/search/search.js
let $ = getApp().$
let _this
let value;
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
    this.onlink(-1);

  },
  onlink(e){
    let data = {}
    if(e!=-1){
      data = {
        Name :`/${e}/`
      }
    }
    $.request.link().getContact(data).then(res=>{
      if(res.resCode==0){
        let result = res.result
        _this.setData({
          message: result,
          count: result.length
        })
      }
    })
  },
  onTapSearch(){

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  onFilterInput(e){
    value = e.detail.value
    _this.onlink(value)

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
// pages/other/smstemp/edit/edit.js
let recordName
let content
let app = getApp();
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
  onMoban(e){
    // console.log(e.detail.value)
    recordName = e.detail.value
  },
  onContent(e){
    content = e.detail.value
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
  onSubmit(){
    if (recordName == "" || recordName == null){
      wx.showToast({
        title: '请输入模版名称',
        icon : "none"
      })
    }else if (content == "" || content == null){
      wx.showToast({
        title: '请输入模版内容',
        icon: "none"
      })
    }else{
      let record = {
          Name: recordName,
          Type : "1",
          Content : content,
          "IsActive": true
      }
      $.request.cmsgTemp().post(record).then(res => {
        
        if(res.resCode == 0){
          console.log("进来了")
          wx.navigateBack({
            delta :1,
          })
        }
      })
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
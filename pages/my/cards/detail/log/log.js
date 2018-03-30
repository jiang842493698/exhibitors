// pages/my/cards/detail/log/log.js
let $ = getApp().$
let linkLog = $.request.linkLog();
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
    this.load_logs()
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
  load_logs: function () {
    let _this = this;
    
    linkLog.post(id).then(res => {
      if (res.resCode == 0) {
        console.log("bbbbbbbbbbbb")
        console.log(res.result)
        let result = res.result
        function replacer(match){

        }
        for (let r of res.result){
          let createdAt = r.CreatedAt
          let time = createdAt.replace(/-/g, "/")
          let times = ""
         
          console.log(times)
         
          r.time = time
        }
        _this.setData({
          logs: result
        })
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onAdd(){
    wx.redirectTo({url:"/pages/my/cards/detail/log/edit/edit?id="+id})
  }
})
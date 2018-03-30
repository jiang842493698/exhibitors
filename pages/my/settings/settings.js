// pages/my/settings/settings.js
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
  qiehuanzhanghao(){
    wx.clearStorageSync()
    wx.clearStorage()
    wx.reLaunch({
      url:"/pages/login/index"
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
  onTime() {
    console.log("11111111")
    let _this = this
    console.log(this)
    console.log(this.data.dateShow)
    // let id
    // $.request.inviteTime().getDate().then(res=>{
    //   if(res.resCode == 0){
    // let date = res.result
    let date = ["2月1日", "2月2日", "2月3日"]
    _this.setData({
      date: date
    })
    // let timejson = {
    //   date: date[0]
    // }
    // $.request.inviteTime().getTime(timejson).then(res => {
    //   if(res.resCode==0){
    //     let time = res.result
    let time = [
      { "startTime": "09:00", "endTime": "10:00", "status": "0" },
      { "startTime": "10:00", "endTime": "11:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "13:00", "endTime": "14:00", "status": "2" },
      { "startTime": "14:00", "endTime": "15:00", "status": "0" },
      { "startTime": "15:00", "endTime": "16:00", "status": "0" },
      { "startTime": "15:00", "endTime": "16:00", "status": "0" },
      { "startTime": "15:00", "endTime": "16:00", "status": "0" },
      { "startTime": "15:00", "endTime": "16:00", "status": "0" },
      { "startTime": "15:00", "endTime": "16:00", "status": "0" },
    ]
    let morning = []
    let afternoon = []
    for (let t of time) {
      if (t.endTime <= "12:00") {
        morning.push(t)
        console.log(t)
      } else {
        afternoon.push(t)
      }

    }
    for (let m of morning) {
      let value
      m.value = m.startTime + "-" + m.endTime

    }
    for (let m of afternoon) {
      let value
      m.value = m.startTime + "-" + m.endTime

    }
    console.log(morning)
    console.log(afternoon)
    _this.setData({
      time: { morning: morning, afternoon: afternoon },
      dateTimes: date[0]
    })
    //   }
    // })
    //   }
    // })



    _this.setData({
      dateShow: false
    })
  },
  onDate(e) {
    console.log(e.currentTarget.dataset.date)
    let date = e.currentTarget.dataset.date
    let _this = this
    // let timejson = {
    //   date
    // }
    //  $.request.inviteTime().getTime(timejson).then(res => {
    // if(res.resCode==0){
    // let time = res.result
    let time = [
      { "startTime": "09:00", "endTime": "10:00", "status": "0" },
      { "startTime": "10:00", "endTime": "11:00", "status": "0" },
      { "startTime": "11:00", "endTime": "12:00", "status": "0" },
      { "startTime": "11:00", "endTime": "12:00", "status": "0" },
      { "startTime": "11:00", "endTime": "12:00", "status": "0" },
      { "startTime": "11:00", "endTime": "12:00", "status": "0" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "11:00", "endTime": "12:00", "status": "1" },
      { "startTime": "13:00", "endTime": "14:00", "status": "2" },
      { "startTime": "14:00", "endTime": "15:00", "status": "0" },
      { "startTime": "15:00", "endTime": "16:00", "status": "0" },
      { "startTime": "15:00", "endTime": "16:00", "status": "0" },
      { "startTime": "15:00", "endTime": "16:00", "status": "0" },
      { "startTime": "15:00", "endTime": "16:00", "status": "0" },
      { "startTime": "15:00", "endTime": "16:00", "status": "0" },
    ]
    let morning = []
    let afternoon = []
    for (let t of time) {
      if (t.endTime <= "12:00") {
        morning.push(t)
        console.log(t)
      } else {
        afternoon.push(t)
      }

    }
    for (let m of morning) {
      let value
      m.value = m.startTime + "-" + m.endTime

    }
    for (let m of afternoon) {
      let value
      m.value = m.startTime + "-" + m.endTime

    }
    console.log(morning)
    console.log(afternoon)
    _this.setData({
      time: { morning: morning, afternoon: afternoon },
      dateTimes: date
    })

    //       }
    //  })
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
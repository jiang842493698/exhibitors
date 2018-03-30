// pages/my/cards/select/send-sms/send-sms.js
let $ = getApp().$;
let group = $.request.group();
let link = $.request.link();
let _this;
let phone = []
let Idnumber = []
let all_selected = all_selected
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    Idnumber = e.detail.value
    if (Idnumber.length == 0) {
      this.onAllSelected()
    }
    console.log(phone.length)
    if (Idnumber.length == _this.data.phone.length) {
      this.onAllSelected()
    }
    _this.setData({
      Idnumber
    })
  },
  onAllSelected: function (e) {
    all_selected = !all_selected;
    console.log(all_selected)
    let phone = _this.data.phone;
    for (let i of phone) {
      i.checked = all_selected
      if (all_selected) {
        Idnumber.push(i.RecordId)
      } else {
          Idnumber = []
      }
    }
    _this.setData({
      all_selected,
      Idnumber,
      phone
    })
  },
  /*
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
    $.request.link().get().then(res => {
      if (res.resCode == 0) {
        let links = res.result
        console.log(links)
        for (let i of links) {
          i.phonenumber = []
          for (let j of i.Phone) {
            if (j.label == "手机") {
              i.phonenumber.push(j.value)
            }
          }
        }
        _this.setData({
          phone: links
        })
        console.log(_this.data.phone)
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
  onNext() {
    wx.redirectTo({ url: '/pages/my/cards/detail/log/edit/edit?Idnumber="' + Idnumber + '"&id=-1' })
  }
})
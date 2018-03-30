// pages/my/cards/select/grouping/grouping.js
let $ = getApp().$;

let group = $.request.group();
let id
let name
let _this
let ContactGroupId
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
    id = options.id;
    name = options.name
    console.log(id)
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
    _this.setData({
      userInfo
    })
    this.onSelecte(userInfo)
  },
  onSelecte: function (e){
    let tenantId = e.TenantId
    let userId = e.UserId
    console.log(tenantId)
    console.log(userId)
    $.request.group().post({ tenantId}).then(res => {
      if (res.resCode == 0) {
        let label = res.result || [];
        console.log(label)
        for( let i of label){
          if(i.Name == name){
            i.checked = 'true'
          }
        }
        _this.setData({
          label
        })
        // $.service.alert({ title: '修改成功', image: '/assets/images/icon/fail.png' });
      }  //  else {
      //   $.service.alert({ title: '修改失败', image: '/assets/images/icon/fail.png' });
      // }
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    ContactGroupId = e.detail.value
  },
  onSave : function(){
    $.request.link().put1(id, ContactGroupId).then(res => {
      if (res.resCode == 0) {
        console.log("修改成功")
        console.log(res.resMsg)
        $.service.alert({ title: '修改成功', image: '/assets/images/icon/fail.png' });
      }else{
        $.service.alert({ title: '修改失败', image: '/assets/images/icon/fail.png' });
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
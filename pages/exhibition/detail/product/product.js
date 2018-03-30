// pages/exhibition/detail/product/product.js
let id
let index
let _this
let $ = getApp().$;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conditionId: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    id = options.id
    index = options.index
    _this = this
    // let info = this.$.gc.get(this.$.KEY.EXHIBITOR) || {};
    console.log(id)
    $.request.SelectExhibitsFromTenantId().get(id).then(res => {
      if (res.resCode == 0) {
        let productList = res.result;
        console.log("展品列表")
        console.log(productList)
        _this.setData({ productList })
      }
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

    // _this.onFile()
  },
  onBreak() {
    wx.navigateBack({ delta: 1 });
  },
  // onFile() {
  //   let match_exs = wx.getStorageSync("MATCH_EXS")
  //   console.log(match_exs)
  //   console.log(id)
  //   console.log(index)

  //   let ma = match_exs.filter(r => r.RecordId == id)[0]
  //   let productList = ma.ProductList
  //   if (index != null) {
  //     productList = [productList[index]]
  //     _this.setData({
  //       conditionId: true
  //     })

  //   }
  //   console.log(productList)
  //   console.log(productList.PicList)
  //   _this.setData({
  //     productList
  //   })
  //   wx.setStorage({
  //     key: 'productList',
  //     data: productList,
  //   })
  //   console.log(_this.data.productList)

  // },

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
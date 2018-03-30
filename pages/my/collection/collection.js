// pages/my/collection/collection.js
let _this
let app = getApp()
let $ = getApp().$
let Collertion = getApp().$.request.Collertion()
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
    _this.onCollertion()
  },
  onCollertion : function(){

    // Collertion.get().then(res => {
    //   if(res.resCode == 0){
    //     let result =  res.result
        let result = [{
          image: "/assets/images/other/not_logo.png",
          companyName : "康尼科技有限公司",
          BoothNo : "H10086",
          title : "电子信息",
          city: "赣州",
          productImage: [
          { image: "/assets/images/other/exhibits_1.png" }, 
          { image: "/assets/images/other/exhibits_1.png" }, 
          { image: "/assets/images/other/exhibits_1.png"}],
          remind : 10086,
          Attention : "78%"

        }, {
          image: "/assets/images/other/not_logo.png",
          companyName: "康尼科技有限公司",
          BoothNo: "H10086",
          title: "电子信息",
          city: "赣州",
          productImage: [
            { image: "/assets/images/other/exhibits_1.png" },
            { image: "/assets/images/other/exhibits_1.png" },
            { image: "/assets/images/other/exhibits_1.png" }],
          remind: 10086,
          Attention: "78%"

        }, {
            image: "/assets/images/other/not_logo.png",
            companyName: "康尼科技有限公司",
            BoothNo: "H10086",
            title: "电子信息",
            city: "赣州",
            productImage: [
              { image: "/assets/images/other/exhibits_1.png" },
              { image: "/assets/images/other/exhibits_1.png" },
              { image: "/assets/images/other/exhibits_1.png" }],
            remind: 10086,
            Attention: "78%"

        }, {
          image: "/assets/images/other/not_logo.png",
          companyName: "康尼科技有限公司",
          BoothNo: "H10086",
          title: "电子信息",
          city: "赣州",
          productImage: [
            { image: "/assets/images/other/exhibits_1.png" },
            { image: "/assets/images/other/exhibits_1.png" },
            { image: "/assets/images/other/exhibits_1.png" }],
          remind: 10086,
          Attention: "90%"

        }, {
            image: "/assets/images/other/not_logo.png",
            companyName: "康尼科技有限公司",
            BoothNo: "H10086",
            title: "电子信息",
            city: "赣州",
            productImage: [
              { image: "/assets/images/other/exhibits_1.png" },
              { image: "/assets/images/other/exhibits_1.png" },
              { image: "/assets/images/other/exhibits_1.png" }],
            remind: 10086,
            Attention: "50%"

        }, {
          image: "/assets/images/other/not_logo.png",
          companyName: "康尼科技有限公司",
          BoothNo: "H10086",
          title: "电子信息",
          city: "赣州",
          productImage: [
            { image: "/assets/images/other/exhibits_1.png" },
            { image: "/assets/images/other/exhibits_1.png" },
            { image: "/assets/images/other/exhibits_1.png" }],
          remind: 10086,
          Attention: "30%"

        }, {
            image: "/assets/images/other/not_logo.png",
            companyName: "康尼科技有限公司",
            BoothNo: "H10086",
            title: "电子信息",
            city: "赣州",
            productImage: [
              { image: "/assets/images/other/exhibits_1.png" },
              { image: "/assets/images/other/exhibits_1.png" },
              { image: "/assets/images/other/exhibits_1.png" }],
            remind: 10086,
            Attention: "10%"

          }]
        for(let r of result){
          let att = Math.ceil(r.Attention.substr(0, r.Attention.length-1)/20)
          console.log("aaaaaaaa")
          console.log(att)
          r.Attention = att
          r.notAttention = 5-r.Attention

        }
        _this.setData({
          result
        })


    //   }
    // })
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
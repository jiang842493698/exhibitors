// pages/my/detail/detail.js
let app = getApp()
let $ = getApp().$
let _this
let pageIndex = 1
let pageSize = 7
let setNoRefresh = false
let name
let phone
let job
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
    console.log("------------------------")
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

    if (setNoRefresh) {
      console.log("++++++++++++++++++++++++++++++")
      setNoRefresh = false;
      return;
    } else {
      _this.onUser();
      _this.onExhibitior()
    }


  },
  onUser: function () {
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLL")
    $.request.ExhibitorContact().getMyContact().then(res => {
      if (res.resCode == 0) {
        let result = res.result[0]
        console.log(result)
        let image
        image = result.Image
        name = result.Name
        job = result.Job
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
    console.log("ggggggggggghhhhhhhh")
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      _this.onLoad();
    }, 1500)
  },
  /**
   * 图片上传
   */
  photograph: function () {
    setNoRefresh = true;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {

        let tempFilePaths = res.tempFilePaths[0]
        _this.setData({
          images: tempFilePaths
        })

        wx.showToast({
          title: '图片上传中',
        })
        console.log("图片上传结束")
        console.log(tempFilePaths)
        wx.uploadFile({
          url: "https://deal.xiaovbao.cn/applet/album/upload",
          filePath: tempFilePaths,
          name: "exhibitor-linkmain-headimg-jiangchao",

          success: function (ress) {
            console.log(ress)
            
            let data = JSON.parse(ress.data)
            console.log(data)
            if (data.code == 0) {
              wx.showToast({
                title: '上传成功',
              })
              wx.showToast({
                title: '修改展商图片',
              })
              _this.setData({
                imageUrl: data.data.imgUrl
              })
            }
          },
          fail: function () {
            wx.showToast({
              title: '上传失败',
            })
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
          }
        })
      },
      complete: function () {
        console.log("图片上传")

      }

    })

    console.log("图片上传完成")
  },
  onName(e) {
    name = e.detail.value
  },
  onJob(e) {
    job = e.detail.value
  },
  onPhone(e) {
    phone = e.detail.value
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onSave() {
    let data = {
      Name: name,
      Job: job,
      Image: _this.data.imageUrl
    }
    $.request.ExhibitorContact().put(data).then(res => {
      if (res.resCode == 0) {
        console.log("gggggggggggggggg")
        wx.switchTab({
          url: "/pages/my/index"
        })
        console.log("gggggggggggggggg")
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
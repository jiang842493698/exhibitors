// pages/match/detail/detail.js
let app = getApp()
let $ = getApp().$
let _this
let id
let status
let fettle
let type

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
    status = options.status
    fettle = options.fettle
    type = options.type



    console.log(options)
    _this = this

    console.log("22222222222222222222222")
    console.log(id)
    console.log(status)
    console.log(fettle)
    console.log(type)
    console.log(_this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  onData(){
    console.log(id)
    let messageJson={}
    if (fettle=="展商"){
      let Exhibitors = wx.getStorageSync("Exhibitors")
      let details = Exhibitors.filter(e=>e.RecordId==id)[0]
      console.log(details)
      if (status=="0"){
        messageJson.Name = details.ReceiverChild[0].Name
        messageJson.Job = details.ReceiverChild[0].Job
        messageJson.Mob = details.ReceiverChild[0].Phone
        messageJson.Image = details.ReceiverChild[0].Image
        messageJson.City = details.Receiver[0].City
        messageJson.CompanyName = details.ReceiverChild[0].CompanyName
        messageJson.Email = details.ReceiverChild[0].Email
        messageJson.Industry = details.Receiver[0].Categories
        
        messageJson.CompAddr = details.ReceiverChild[0].Address
      }
      if (status == "1") {
        messageJson.Name = details.InitatorChild[0].Name
        messageJson.Job = details.InitatorChild[0].Job
        messageJson.Mob = details.InitatorChild[0].Phone
        messageJson.Image = details.InitatorChild[0].Image
        messageJson.City = details.Initator[0].City
        messageJson.CompanyName = details.InitatorChild[0].CompanyName
        messageJson.Email = details.InitatorChild[0].Email
        messageJson.Industry = details.Initator[0].Categories

        messageJson.CompAddr = details.InitatorChild[0].Address
      }
      
    }
    if (fettle=="观众"){
      let Exhibitorss = wx.getStorageSync("Audience")
      console.log(id)
      Exhibitorss.filter(e => console.log(e))
      let Exhibitors = Exhibitors = Exhibitorss.filter(e => e.RecordId == id)[0]

      console.log("bbbbbbbbbbbbbbb")
      console.log(Exhibitors)
      if (type == "1"&&status == "0") {
        messageJson.Name = Exhibitors.VisitorReceiver[0].Name
        messageJson.Job = Exhibitors.VisitorReceiver[0].Job
        messageJson.Mob = Exhibitors.VisitorReceiver[0].Mob
        messageJson.Image = Exhibitors.VisitorReceiver[0].CardPath
        messageJson.City = Exhibitors.VisitorReceiver[0].City
        messageJson.CompanyName = Exhibitors.VisitorReceiver[0].CompanyName
        messageJson.Email = Exhibitors.VisitorReceiver[0].Email
        messageJson.Industry = Exhibitors.VisitorReceiver[0].Categories

        messageJson.CompAddr = Exhibitors.VisitorReceiver[0].CompAddr
      }
      if (type == "1" && status == "1") {
        messageJson.Name = Exhibitors.InitatorChild[0].Name
        messageJson.Job = Exhibitors.InitatorChild[0].Job
        messageJson.Mob = Exhibitors.InitatorChild[0].Mob
        messageJson.Image = Exhibitors.InitatorChild[0].CardPath
        messageJson.City = Exhibitors.InitatorChild[0].City
        messageJson.CompanyName = Exhibitors.InitatorChild[0].CompanyName
        messageJson.Email = Exhibitors.InitatorChild[0].Email
        messageJson.Industry = Exhibitors.InitatorChild[0].Categories

        messageJson.CompAddr = Exhibitors.InitatorChild[0].Address
      }
      if (type == "0" && status == "0") {
        messageJson.Name = Exhibitors.ReceiverChild[0].Name
        messageJson.Job = Exhibitors.ReceiverChild[0].Job
        messageJson.Mob = Exhibitors.ReceiverChild[0].Mob
        messageJson.Image = Exhibitors.ReceiverChild[0].CardPath
        messageJson.City = Exhibitors.ReceiverChild[0].City
        messageJson.CompanyName = Exhibitors.ReceiverChild[0].CompanyName
        messageJson.Email = Exhibitors.ReceiverChild[0].Email
        messageJson.Industry = Exhibitors.ReceiverChild[0].Categories

        messageJson.CompAddr = Exhibitors.ReceiverChild[0].Address
      }
      if (type == "0" && status == "1") {
        console.log(Exhibitorss)
        for (let i of Exhibitorss){
          if (i.VisitorInitator != undefined && i.VisitorInitator[0].RecordId == id){
            console.log(i)
              this.setData({
                i
              })
              break;
            }
        }
        let Exhibitors = this.data.i
        console.log(Exhibitors)
        messageJson.Name = Exhibitors.VisitorInitator[0].Name
        messageJson.Job = Exhibitors.VisitorInitator[0].Job
        messageJson.Mob = Exhibitors.VisitorInitator[0].Mob
        messageJson.Image = Exhibitors.VisitorInitator[0].CardPath
        messageJson.City = Exhibitors.VisitorInitator[0].City
        messageJson.CompanyName = Exhibitors.VisitorInitator[0].CompanyName
        messageJson.Email = Exhibitors.VisitorInitator[0].Email
        messageJson.Industry = Exhibitors.VisitorInitator[0].Categories

        messageJson.CompAddr = Exhibitors.VisitorInitator[0].Address
      }
    }
    console.log("aaaaaaaaaa")
    _this.setData({
      visitors: messageJson
    })
    console.log(_this.data.visitors)

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    _this.onData()
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
  onMore() {
    console.log("aaaa")
    this.setData({
      isMore: !this.data.isMore
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  OnCall(e) {
    wx.showModal({
      title: 'Call他手机',
      content: '是否确认拨打此电话',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: _this.data.visitors.Mob
          })
        }
      }
    })

  },
  onSendSms(e) {
    console.log(e)
    // console.log(info)
    console.log(_this.data.visitors.Mob)
    let data = [];
    // let phone = info.Phone.filter(f => f.label === '手机')[0];
    data.push({
      Phone: _this.data.visitors.Mob,
      Name: _this.data.visitors.Name,
      Company: _this.data.visitors.CompanyName,
      Job: _this.data.visitors.Job,
    })
    let visitors = _this.data.visitors
    let usernotes = {}
    usernotes.CompanyName = visitors.CompanyName
    usernotes.Job = visitors.Job
    usernotes.Mob = visitors.Mob
    usernotes.Name = visitors.Name
    let usernote = JSON.stringify(usernotes)
    console.log(usernote)
    $.gc.set('PageIndex', 0);
    $.gc.set('selectedItems', data);
    $.service.navigateTo('/pages/my/cards/select/send-sms/select-temp/select-temp?usernote=' + usernote, { key: 'selectedItems', url: '/pages/my/cards//index' });
  },




  
})
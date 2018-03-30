// pages/my/invite/customer/customer.js
let app = getApp()
let $ = getApp().$
let _this
let id
let fettle
let status
let type
let matchExLog = $.request.matchExLog();
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
    fettle = options.feet
    _this = this
    status = options.status
    type = options.type
    console.log(options)
  },
  onData() {
    let recordId
    console.log("***************")
    console.log(id)
    let messageJson = {}
    console.log("=======================")
    console.log(fettle)
    if (fettle == "展商") {
      console.log()
      let Exhibitors = wx.getStorageSync("InvitationInfoExhi")
      console.log(Exhibitors)
      console.log("获取缓存")
      console.log(id)
      let details = Exhibitors.filter(e => e.RecordId == id)[0]
      console.log(details)
      console.log("status=" + status)
      if (status == "0") {

        messageJson.Name = details.ReceiverChild[0].Name
        messageJson.Job = details.ReceiverChild[0].Job
        messageJson.Mob = details.ReceiverChild[0].Phone
        messageJson.Image = details.Initator[0].Logo
        messageJson.City = details.Receiver[0].City
        messageJson.CompanyName = details.ReceiverChild[0].CompanyName
        messageJson.Email = details.ReceiverChild[0].Email
        messageJson.Industry = details.Receiver[0].Categories
        messageJson.BoothNo = details.Receiver[0].BoothNo
        messageJson.MeetingPlace = details.MeetingPlace
        messageJson.dateTime = details.MeetingTimeDate + " " + details.MeetingTimeStart + "-" + details.MeetingTimeEnd
        messageJson.ProductList = details.Receiver[0].ProductList
        recordId = details.Receiver[0].RecordId
        messageJson.CompAddr = details.ReceiverChild[0].Address
      }
      if (status == "1") {
        console.log("cccccccccccc")
        messageJson.Name = details.InitatorChild[0].Name
        messageJson.Job = details.InitatorChild[0].Job
        messageJson.Mob = details.InitatorChild[0].Phone
        messageJson.Image = details.Initator[0].Logo
        messageJson.City = details.Initator[0].City
        messageJson.CompanyName = details.InitatorChild[0].CompanyName
        messageJson.Email = details.InitatorChild[0].Email
        messageJson.Industry = details.Initator[0].Categories

        messageJson.BoothNo = details.Initator[0].BoothNo
        messageJson.MeetingPlace = details.MeetingPlace
        messageJson.dateTime = details.MeetingTimeDate + " " + details.MeetingTimeStart + "-" + details.MeetingTimeEnd
        messageJson.ProductList = details.Initator[0].ProductList
        recordId = details.Initator[0].RecordId

        messageJson.CompAddr = details.InitatorChild[0].Address
      }

    }
    if (fettle == "观众") {
      let Exhibitorss = wx.getStorageSync("matchVInfo")
      console.log(id)
      let Exhibitors = Exhibitorss.filter(e => e.RecordId == id)[0]
      console.log(Exhibitorss)
      console.log(Exhibitors)
      console.log("bbbbbbbbbbbbbbb")

      if (type == "1" && status == "0") {
        console.log(Exhibitors)
        messageJson.Name = Exhibitors.VisitorReceiver[0].Name
        messageJson.Job = Exhibitors.VisitorReceiver[0].Job
        messageJson.Mob = Exhibitors.VisitorReceiver[0].Mob
        messageJson.Image = Exhibitors.VisitorReceiver[0].CardPath
        messageJson.City = Exhibitors.VisitorReceiver[0].City
        messageJson.CompanyName = Exhibitors.VisitorReceiver[0].CompanyName
        messageJson.Email = Exhibitors.VisitorReceiver[0].Email
        messageJson.Industry = Exhibitors.VisitorReceiver[0].Categories
        messageJson.MeetingPlace = Exhibitors.MeetingPlace
        messageJson.dateTime = Exhibitors.MeetingTimeDate + " " + Exhibitors.MeetingTimeStart + "-" + Exhibitors.MeetingTimeEnd
        messageJson.ProductList = Exhibitors.VisitorReceiver[0].ProductList
        recordId = Exhibitors.VisitorReceiver[0].RecordId
        messageJson.Categories = Exhibitors.Initator[0].Categories
        messageJson.CompAddr = Exhibitors.VisitorReceiver[0].CompAddr
        messageJson.isSign = Exhibitors.VisitorReceiver[0].isSign
        messageJson.InvitationNumber = Exhibitors.VisitorReceiver[0].InvitationNumber
        messageJson.Logo = Exhibitors.VisitorReceiver[0].Logo
        messageJson.RecordId = Exhibitors.VisitorReceiver[0].RecordId
        messageJson.TenantId = Exhibitors.TenantId
      }
      if (type == "1" && status == "1") {

        messageJson.Name = Exhibitors.InitatorChild[0].Name
        messageJson.Job = Exhibitors.InitatorChild[0].Job
        messageJson.Mob = Exhibitors.InitatorChild[0].Mob
        messageJson.Image = Exhibitors.InitatorChild[0].Image
        messageJson.City = Exhibitors.InitatorChild[0].City
        messageJson.CompanyName = Exhibitors.InitatorChild[0].CompanyName
        messageJson.Email = Exhibitors.InitatorChild[0].Email
        messageJson.Industry = Exhibitors.InitatorChild[0].Categories

        messageJson.BoothNo = Exhibitors.InitatorChild[0].BoothNo
        messageJson.MeetingPlace = Exhibitors.MeetingPlace
        messageJson.dateTime = Exhibitors.MeetingTimeDate + " " + details.MeetingTimeStart + "-" + details.MeetingTimeEnd
        messageJson.ProductList = Exhibitors.InitatorChild[0].ProductList
        messageJson.RecordId = Exhibitors.InitatorChild[0].RecordId
        messageJson.TenantId = Exhibitors.TenantId
        messageJson.CompAddr = Exhibitors.InitatorChild[0].Address
      }
      if (type == "0" && status == "0") {
        messageJson.Name = Exhibitors.VisitorInitator[0].Name
        messageJson.Job = Exhibitors.VisitorInitator[0].Job
        messageJson.Mob = Exhibitors.VisitorInitator[0].Mob
        messageJson.Image = Exhibitors.VisitorInitator[0].Image
        messageJson.City = Exhibitors.VisitorInitator[0].City
        messageJson.CompanyName = Exhibitors.VisitorInitator[0].CompanyName
        messageJson.Email = Exhibitors.VisitorInitator[0].Email 
        messageJson.Industry = Exhibitors.VisitorInitator[0].Categories

        messageJson.BoothNo = Exhibitors.ReceiverChild[0].BoothNo
        messageJson.MeetingPlace = Exhibitors.MeetingPlace
        messageJson.dateTime = Exhibitors.MeetingTimeDate + " " + Exhibitors.MeetingTimeStart + "-" + Exhibitors.MeetingTimeEnd
        messageJson.ProductList = Exhibitors.VisitorInitator[0].ProductList
        messageJson.RecordId = Exhibitors.VisitorInitator[0].RecordId
        messageJson.TenantId = Exhibitors.TenantId
        messageJson.CompAddr = Exhibitors.ReceiverChild[0].Address
      }
      if (type == "0" && status == "1") {
        messageJson.Name = Exhibitors.VisitorInitator[0].Name
        messageJson.Job = Exhibitors.VisitorInitator[0].Job
        messageJson.Mob = Exhibitors.VisitorInitator[0].Mob
        messageJson.Image = Exhibitors.VisitorInitator[0].Image
        messageJson.City = Exhibitors.VisitorInitator[0].City
        messageJson.CompanyName = Exhibitors.VisitorInitator[0].CompanyName
        messageJson.Email = Exhibitors.VisitorInitator[0].Email
        messageJson.Industry = Exhibitors.VisitorInitator[0].Categories

        messageJson.BoothNo = Exhibitors.VisitorInitator[0].BoothNo
        messageJson.MeetingPlace = Exhibitors.MeetingPlace
        messageJson.dateTime = Exhibitors.MeetingTimeDate + " " + Exhibitors.MeetingTimeStart + "-" + Exhibitors.MeetingTimeEnd
        messageJson.ProductList = Exhibitors.VisitorInitator[0].ProductList
        messageJson.RecordId = Exhibitors.VisitorInitator[0].RecordId
        messageJson.TenantId = Exhibitors.TenantId
        messageJson.CompAddr = Exhibitors.VisitorInitator[0].Address
      }
    }
    console.log("aaaaaaaaaa")
    console.log(messageJson)
    _this.setData({
      visitors: messageJson
    })


  },
  onlogs: function () {
    let data = {
      ExhibitionId: _this.data.visitors.TenantId,
      ExhibitorId: _this.data.visitors.RecordId
    }
    $.request.matchExLog().get(data).then(res => {
      if (res.resCode == 0) {
        let logs = res.result || [];
        console.log(logs)
        logs.sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
        for (let i of _this.data.logs) {
          let d = i.CreatedAt.substr(i.CreatedAt.indexOf("-") + 1).replace("-", "/")
          let dd = d.substr(0, d.indexOf("/"))
          let cc = d.substr(d.indexOf("/"))
          cc = cc.substr(1, cc.indexOf(":") - 3)
          let ee = d.substr(d.indexOf(":") - 3)
          if (Number(dd) < 10) {
            dd = "0" + dd
          }
          if (Number(cc) < 10) {
            cc = "0" + cc
          }
          i.CreatedAt = dd + "/" + cc + ee
        }
        _this.setData({
          logs
        })
        console.log(_this.data.logs)
      }

      // _this.setData({
      //   logs
      // })
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
    this.onData()
    this.onlogs()
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
  onAddLinkLog: function () {
    console.log(_this.data.visitors)
    console.log("456789")
    console.log(id)
    
    $.service.navigateTo('/pages/exhibition/detail/log/edit/edit', { id: _this.data.visitors.RecordId, exhibitionId: _this.data.visitors.TenantId });
  },
  onCall(e){
    wx.showModal({
      title: 'Call他手机',
      content: '是否确认拨打此电话',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.tel
          })
        }
      }
    })
  },
  onSendSms(e){
    let visitors = _this.data.visitors
    let usernotes = {}
    usernotes.CompanyName = visitors.CompanyName
    usernotes.Job = visitors.Job
    usernotes.Mob = visitors.Mob
    usernotes.Name = visitors.Name
    let usernote = JSON.stringify(usernotes)
    console.log(usernote)
    $.gc.set('PageIndex', 0);
    $.service.navigateTo('/pages/my/cards/select/send-sms/select-temp/select-temp?usernote=' + usernote, { key: 'selectedItems', url: '/pages/my/cards//index' });
  },

})
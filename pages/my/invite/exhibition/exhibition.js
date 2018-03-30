// pages/my/invite/exhibition/exhibition.js
let id
let tenantId
let _this
let app = getApp()
let $ = getApp().$
let exhibitors = $.request.exhibitors()
let fettle
let dataArray
let Type
let status
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
    _this = this
    id = options.id
    status = options.status
    fettle = options.feet
    // type = options.type
    tenantId = options.tenantId
    
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
      console.log("status="+status)
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
        messageJson.Introduction = details.Initator[0].Introduction
        messageJson.PVNumber = details.Initator[0].PVNumber
        messageJson.TenantId = details.TenantId

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
        messageJson.Introduction = details.Initator[0].Introduction
        messageJson.PVNumber = details.Initator[0].PVNumber
        messageJson.TenantId = details.TenantId

    }
    // if (fettle == "'观众'") {
    //   let Exhibitorss = wx.getStorageSync("matchVInfo")
    //   console.log(id)
    //   let Exhibitors = Exhibitorss.filter(e => e.RecordId == id)[0]

    //   console.log("bbbbbbbbbbbbbbb")
    //   if (type == "1" && status == "0") {
    //     console.log(Exhibitors)
    //     messageJson.Name = Exhibitors.VisitorReceiver[0].Name
    //     messageJson.Job = Exhibitors.VisitorReceiver[0].Job
    //     messageJson.Mob = Exhibitors.VisitorReceiver[0].Mob
    //     messageJson.Image = Exhibitors.VisitorReceiver[0].CardPath
    //     messageJson.City = Exhibitors.VisitorReceiver[0].City
    //     messageJson.CompanyName = Exhibitors.VisitorReceiver[0].CompanyName
    //     messageJson.Email = Exhibitors.VisitorReceiver[0].Email
    //     messageJson.Industry = Exhibitors.VisitorReceiver[0].Categories
    //     messageJson.BoothNo = details.VisitorReceiver[0].BoothNo
    //     messageJson.MeetingPlace = details.MeetingPlace
    //     messageJson.dateTime = details.MeetingTimeDate + " " + details.MeetingTimeStart + "-" + details.MeetingTimeEnd
    //     messageJson.ProductList = details.VisitorReceiver[0].ProductList
    //     recordId = details.VisitorReceiver[0].RecordId

    //     messageJson.CompAddr = Exhibitors.VisitorReceiver[0].CompAddr
    //   }
    //   if (type == "1" && status == "1") {

    //     messageJson.Name = Exhibitors.InitatorChild[0].Name
    //     messageJson.Job = Exhibitors.InitatorChild[0].Job
    //     messageJson.Mob = Exhibitors.InitatorChild[0].Mob
    //     messageJson.Image = Exhibitors.InitatorChild[0].Image
    //     messageJson.City = Exhibitors.InitatorChild[0].City
    //     messageJson.CompanyName = Exhibitors.InitatorChild[0].CompanyName
    //     messageJson.Email = Exhibitors.InitatorChild[0].Email
    //     messageJson.Industry = Exhibitors.InitatorChild[0].Categories

    //     messageJson.BoothNo = details.InitatorChild[0].BoothNo
    //     messageJson.MeetingPlace = details.MeetingPlace
    //     messageJson.dateTime = details.MeetingTimeDate + " " + details.MeetingTimeStart + "-" + details.MeetingTimeEnd
    //     messageJson.ProductList = details.InitatorChild[0].ProductList
    //     recordId = details.InitatorChild[0].RecordId

    //     messageJson.CompAddr = Exhibitors.InitatorChild[0].Address
    //   }
    //   if (type == "0" && status == "0") {
    //     messageJson.Name = Exhibitors.ReceiverChild[0].Name
    //     messageJson.Job = Exhibitors.ReceiverChild[0].Job
    //     messageJson.Mob = Exhibitors.ReceiverChild[0].Mob
    //     messageJson.Image = Exhibitors.ReceiverChild[0].Image
    //     messageJson.City = Exhibitors.ReceiverChild[0].City
    //     messageJson.CompanyName = Exhibitors.ReceiverChild[0].CompanyName
    //     messageJson.Email = Exhibitors.ReceiverChild[0].Email
    //     messageJson.Industry = Exhibitors.ReceiverChild[0].Categories

    //     messageJson.BoothNo = details.ReceiverChild[0].BoothNo
    //     messageJson.MeetingPlace = details.MeetingPlace
    //     messageJson.dateTime = details.MeetingTimeDate + " " + details.MeetingTimeStart + "-" + details.MeetingTimeEnd
    //     messageJson.ProductList = details.ReceiverChild[0].ProductList
    //     recordId = details.ReceiverChild[0].RecordId

    //     messageJson.CompAddr = Exhibitors.ReceiverChild[0].Address
    //   }
    //   if (type == "0" && status == "1") {
    //     messageJson.Name = Exhibitors.VisitorInitator[0].Name
    //     messageJson.Job = Exhibitors.VisitorInitator[0].Job
    //     messageJson.Mob = Exhibitors.VisitorInitator[0].Mob
    //     messageJson.Image = Exhibitors.VisitorInitator[0].Image
    //     messageJson.City = Exhibitors.VisitorInitator[0].City
    //     messageJson.CompanyName = Exhibitors.VisitorInitator[0].CompanyName
    //     messageJson.Email = Exhibitors.VisitorInitator[0].Email
    //     messageJson.Industry = Exhibitors.VisitorInitator[0].Categories

    //     messageJson.BoothNo = details.VisitorInitator[0].BoothNo
    //     messageJson.MeetingPlace = details.MeetingPlace
    //     messageJson.dateTime = details.MeetingTimeDate + " " + details.MeetingTimeStart + "-" + details.MeetingTimeEnd
    //     messageJson.ProductList = details.VisitorInitator[0].ProductList
    //     recordId = details.VisitorInitator[0].RecordId

    //     messageJson.CompAddr = Exhibitors.VisitorInitator[0].Address
    //   }
    }
    console.log("aaaaaaaaaa")
    console.log(messageJson)
    _this.setData({
      visitors: messageJson
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
    this.onfile()
    this.OnVisitors()
    this.onlogs()
    // this.onlogs()
  },
  onfile(){
    console.log("9876543211111111111111111111")
    console.log(id)  
  },
  OnVisitors: function () {
    // let data = {
    //   TenantId : id
    // }
    // visitors.get(data).then(res=>{
    //   if(res.resCode==0){
    // let result = res.result
    // let result = [
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   },
    //   {
    //     name: "aaa", image: ""
    //   }]
    // _this.setData({
    //   visitors: result
    // })

    // console.log(_this.data.visitors)
    // //   }
    // })
  },
  onlogs: function () {
    let TenantId = _this.data.visitors.TenantId
    $.request.matchExLog().get(TenantId).then(res => {
      // $.request.matchExLog().get(info.TenantId).then(res => {
      if (res.resCode == 0) {
        let logs = res.result || [];
        console.log(logs)
        logs.sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
        for (let i of logs) {
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
    })
  },
  onAddLinkLog: function () {
    // console.log("456789")
    // console.log(info)
    // console.log(info.TenantId)
    // console.log(exhibitionId)
    $.service.navigateTo('/pages/exhibition/detail/log/edit/edit', { id: _this.data.exhibitorsResult.RecordId, exhibitionId: _this.data.exhibitorsResult.TenantId });
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
    console.log("456789")
    console.log(id)
    $.service.navigateTo('/pages/exhibition/detail/log/edit/edit', { id, exhibitionId: _this.data.visitors.TenantId });
  },
})
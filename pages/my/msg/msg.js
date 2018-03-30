let app = getApp();
let $ = getApp().$;
let MsgInfo = getApp().$.request.MsgInfo()
let MsgInfoCount = getApp().$.request.MsgInfoCount()
let matchVInfo = getApp().$.request.matchVInfo()
let inviteCount = getApp().$.request.inviteCount()
let tool = getApp().$.tool
let _this
let pageIndex = 1;
let pageSize = 5;
let show = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    count: []
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
    _this.setData({
      count: []
    })
    _this.ondata();

    _this.onInvite()


  },
  setTimeout: function () {
    setInterval(_this.onSelect, 10000)
  },


  onSelect: function () {
    let dataZhuban = {
      type: "4"
    }
    let zhanshangData = {
      type: "2"
    }
    let yueqingData = {
      type: "5"
    }
    let huodongData = {
      type: "6"
    }
    let page = {
      pageIndex: 1,
      pageSize: 1
    }

    let organizer = MsgInfo.get(dataZhuban, page)
    let Exhibitors = MsgInfo.get(zhanshangData, page)
    let yueqing = MsgInfo.get(yueqingData, page)
    let huodong = MsgInfo.get(huodongData, page)

    let aaa = Promise.all([organizer, Exhibitors, yueqing, huodong])
    return aaa
    
  },
  ondata: function () {
    _this.onSelect().then(a => {
      let resultArray = a
      let result = []

      for (let r of resultArray) {
        let dataJsons = {}
        let results = r.result
        if (results.length > 0) {
          dataJsons = results[0]
          result.push(dataJsons)
        }

      }

      let countMsgArray = []
      for (let re of result) {
        let data = {
          type: re.Type,
          State: "1"
        }


        let date = new Date(re.CreatedAt)
        let time = tool.comparisonTime(date, new Date())
        re.time = time

        re.image = "/assets/images/icon/msg/notice.png"

        MsgInfoCount.get(data).then(e => {
          if (e.resCode == 0) {
            let count = e.result
            let show
            if (count == 0) {
              show = true
            }
            let countJson = {
              count,
              type: re.Type,
              show
            }
            let countArray = []
            countArray.push(countJson)

            let countData = _this.data.count == null ? [] : _this.data.count
            let countDataArray = countData.concat(countArray)
            _this.setData({
              count: countDataArray
            })
          }
        })


      }


      // Promise.all(countMsgArray).then(a=>{
      //   console.log(a)
      // })
      _this.setData({
        message: result
      })
    });
  },

  onInvite: function () {
    let inviteArray = []
    let data = {}
    let page = {
      pageIndex: pageIndex,
      pageSize: pageSize
    }

    matchVInfo.get(data, page).then(res => {
      if (res.resCode == '0') {
        let invite = res.result
        for (let i of invite) {
          let date = new Date(i.createAt)
          let time = tool.comparisonTime(date, new Date())
          i.time = time
          console.log(i.value.indexOf("的约请"))
          let value = i.value.substr(i.value.indexOf("的约请"))
          i.value = value
        }


        console.log("1111111111")
        let dataInvite = _this.data.invite == null ? [] : _this.data.invite
        inviteArray = dataInvite.concat(invite)
        console.log(inviteArray)
        _this.setData({
          invite: inviteArray
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
    pageIndex = 1
    _this.onShow()
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      _this.onLoad();
    }, 1500)
  },
  onInviteCount() {
    // inviteCount.get().then(res => {
    //   if(res.resCode==0){
    //     let count = res.result
    let count = 30
    _this.setData({
      count: count
    })
    //   }
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // let dataCount = _this.data.count + 3
    // let pageNumIndex = (dataCount-1)/pageSize+1
    let pageNumIndex = 5
    if (pageIndex >= pageNumIndex) {
      wx.stopPullDownRefresh();
    } else {
      pageIndex++
      _this.onInvite();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onCancel(e) {
    console.log(e.currentTarget.dataset.bing)
    let $ = getApp().$;
    wx.showModal({
      content: '确认取消吗？',
      success: function (res) {
        if (res.confirm) {
          let data = {
            id: e.currentTarget.dataset.bing,
            status: 1
          }
          inviteQuery.post(data).then(res => {
            _this.onShow()
          })
        }
      }
    })
  },
  onAgree(e) {
    console.log(e.currentTarget.dataset.bing)
    let $ = getApp().$;
    wx.showModal({
      content: '确认同意吗？',
      success: function (res) {
        if (res.confirm) {
          let data = {
            id: e.currentTarget.dataset.bing,
            status: 0
          }
          inviteQuery.post(data).then(res => {
            _this.onShow()
          })
        }
      }
    })
  }



})
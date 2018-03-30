// pages/schedule/index.js
let app = getApp()
let $ = getApp().$
let _this
let pageIndex = 1
let pageSize = 7
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
    pageIndex = 1
    _this.setData({
      results: []
    })
    _this.setData({
      InvitationInfoExhi: []
    })
    _this.setData({
      matchVInfo: []
    })
    // _this.onLink();
    _this.setData({
      type: -1
    })
    _this.onDateTime()
    // _this.onAll()
    _this.onContent(-1)
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
  /**
   * 查询主办日程
   * 
   */
  onDateTime() {

    //获取日程的所有数据

    $.request.inviteTime().getDate().then(res => {
      if (res.resCode == 0) {
        // 当连接完数据正确返回后调用res.result[0]获取body
        let re = res.result[0]
        let dateArray = []
        console.log("日程信息")
        console.log(re)
        //CalendarTime表示所有的时间段
        let CalendarTime = re.CalendarTime
        //将re.RecordId存起来修改时调用
        _this.setData({
          recordId: re.RecordId
        })
        //将获得的CalendarTime时间段中的所有值存储
        _this.setData({
          CalendarTime
        })
        //遍历CalendarTime获取天数的值
        console.log(CalendarTime)
        for (let c of CalendarTime) {
          let times = c.StartTime.substr(0, c.StartTime.indexOf(" "))
          if (dateArray.indexOf(times) == -1) {
            dateArray.push(times)
          }
        }
        //原来的数据是[2018-2-27,2018-2-27,2018-2-28]
        //dateArray=[2018-2-27,2018-2-28]
        let dateTimeArray = []
        //上面没有完全处理好数据就是转换一下，
        for (let d of dateArray) {
          let dates = d.substr(d.indexOf("-") + 1).replace("-", "/")
          dateTimeArray.push(dates)
        }
        _this.setData({
          dateArray
        })
        console.log("")
        //dateTimeArray值为[2/27,2/28]
        //将dateTimeArray存到data里面
        console.log("{----------------------------------------------}")
        console.log(dateTimeArray)
        let dateTimeArrays = []
        // for (let d of dateTimeArray){
        //   let dd =  d.substr(0,d.indexOf("/"))
        //   console.log(dd)
        //   let cc = d.substr(d.indexOf("/"))
        //   if(Number(dd)<10){
        //     dd="0"+dd
        //   }
        //   if (Number(cc) < 10) {
        //     cc = "0" + cc
        //   }
        //   dateTimeArrays.push(dd+""+cc)
        // }

        _this.setData({
          date: dateTimeArray
        })
        //获取dateTimeArray数组中的第一条数据
        // let datess = dateTimeArray[0]
        //datess值为2/27

        _this.setData({
          initialTime: -1
        })



        // _this.setData({
        //   dateTime: dateTimeArra
        // })
        // _this.onTime(datess)


      }
    })

  },

  oninviteByDate(data) {

  },
  /**
   * 
   * 参数处理和查询的数据处理
   * 
   */
  onContent(dates) {



    /**
     * 查询数据的参数
     */
    let data = {
      State: { "$gte": "4" }
    }
    /**
     * 
     * 判断传入的参数为-1的话查询参数中就不给任何数据
     * 
     */
    if (dates != -1) {
      let dateArray = _this.data.dateArray
      let date = dates.replace("/", "-")
      let calendar
      console.log(date)
      let dateTimesGet = date.substr(0, 1)
      if (Number(dateTimesGet) == 0) {
        date = date.substr(1)
      }
      console.log("kkkkkkkkkkkkkkkkkkkkkk")
      for (let d of dateArray) {

        if (d.indexOf(date) >= 0) {
          calendar = d
        }
      }
      console.log(calendar)
      let startdate = new Date(calendar)
      // let entTime = startdate.getFullYear() + "-" + startdate.getMonth(startdate.setMonth(startdate.getMonth()+1)) + "-" + startdate.getDate(startdate.setDate(startdate.getDate()+1))
      console.log(date)
      data.MeetingTimeDate = calendar



    }
    let pageJson = {
      pageIndex,
      pageSize
    }
    let newStartDate = new Date().getTime()
    // $.request.InvitationInfoExhi().getAll(data, pageJson).then(res => {

    //   if (res.resCode == 0 || res.resCode == 10000) {

    //     let result = res.result
    //     let user = wx.getStorageSync("userInfo")

    //     let InvitationInfoExhi = (_this.data.InvitationInfoExhi == null ? [] : _this.data.InvitationInfoExhi).concat(result)
    //     for (let i of InvitationInfoExhi) {
    //       i.fettle = "展商"
    //       if (user.ContactRecordId == i.InitatorChild[0].RecordId) {
    //         i.status = "0"
    //       }
    //       if (user.ContactRecordId == i.ReceiverChild[0].RecordId) {
    //         i.status = "1"
    //       }
    //     }

    //     for (let i of InvitationInfoExhi) {
    //       let d = i.MeetingTimeDate.substr(i.MeetingTimeDate.indexOf("-") + 1).replace("-", "/")
    //       let dd = d.substr(0, d.indexOf("/"))
    //       console.log(dd)
    //       let cc = d.substr(d.indexOf("/"))
    //       if (Number(dd) < 10) {
    //         dd = "" + dd
    //       }
    //       if (Number(cc) < 10) {
    //         cc = "0" + cc
    //       }
    //       i.MeetingTimeDate = (dd + "" + cc)

    //       i.MeetingTimeStart = i.MeetingTimeStart.substr(i.MeetingTimeStart.indexOf(":") - 2)

    //     }
    //     _this.setData({
    //       InvitationInfoExhi
    //     })
    //     console.log("pppppppppppppppppppppppppppppppp")
    //     console.log(_this.data.InvitationInfoExhi)
    //     wx.setStorageSync("Exhibitors", _this.data.InvitationInfoExhi)
    //   }
    //   let newEndDate = new Date().getTime();
    //   console.log("YYYYYYYYYYYYYYYYYYYYYYYYYY")
    //   console.log(newEndDate - newStartDate)
    // })
    // $.request.matchVInfo().getDate(data, pageJson).then(res => {
    //   let newEndDates = new Date().getTime();
    //   console.log("LLLLLLLLLLLLLLLLLLLLLLLLL")
    //   console.log(newEndDates - newStartDate)
    //   if (res.resCode == 0 || res.resCode == 10000) {
    //     let user = wx.getStorageSync("userInfo")
    //     let result = res.result
    //     console.log("aaaaaaaaaaaaa")
    //     console.log(result)
    //     let matchVInfo = (_this.data.matchVInfo == null ? [] : _this.data.matchVInfo).concat(result)

    //     let matchVInfoArray = []
    //     console.log("bbbbbbbbbbbbbbbbbbbbbbbbb")
    //     console.log(matchVInfo)
    //     for (let i of matchVInfo) {
    //       if (i.VisitorReceiver.length != 0) {
    //         i.fettle = "观众"
    //         if (i.Type === '1') {
    //           if (i.InitatorChild[0].RecordId == user.ContactRecordId) {
    //             i.status = "0"

    //           }
    //           if (i.VisitorReceiver[0].RecordId == user.ContactRecordId) {
    //             i.status = "1"
    //           }
    //         } else {
    //           if (i.VisitorInitator[0].RecordId == user.ContactRecordId) {
    //             i.status = "0"
    //           }
    //           if (i.ReceiverChild[0].RecordId == user.ContactRecordId) {
    //             i.status = "1"
    //           }
    //         }
    //         if (i.MeetingTimeDate.length == 10){
    //           i.MeetingTimeDate = i.MeetingTimeDate.substr(5).replace("-", "/");
    //         }
    //         i.MeetingTimeStart = i.MeetingTimeStart.substr(i.MeetingTimeStart.indexOf(":")-2)
    //         matchVInfoArray.push(i)
    //       }
    //     }
    //     // for (let i of matchVInfo) {
    //     //   let d = i.MeetingTimeDate.substr(i.MeetingTimeDate.indexOf("-") + 1).replace("-", "/")
    //     //   console.log(d)
    //     //   let dd = d.substr(0, d.indexOf("/"))
    //     //   console.log(dd)
    //     //   let cc = d.substr(d.indexOf("/"))
    //     //   console.log(dd)
    //     //   if (Number(dd) < 10) {
    //     //     // dd = "0" + dd
    //     //   }
    //     //   if (Number(cc) < 10) {
    //     //     cc = "0" + cc
    //     //   }
    //     //   i.MeetingTimeDate = (dd + "" + cc)
    //     //   i.MeetingTimeStart = i.MeetingTimeStart.substr(0, 5)
    //     // }
    //     _this.setData({
    //       matchVInfo: matchVInfoArray
    //     })
    //     console.log("观众")
    //     console.log(matchVInfoArray)
    //     wx.setStorageSync("Audience", _this.data.matchVInfo)
    //   }
    //   let newEndDate = new Date().getTime();
    //   console.log("YYYYYYYYYYYYYYYYYYYYYYYYYY")
    //   console.log(newEndDate - newStartDate)
    // })
    let InvitationInfoExhi = $.request.InvitationInfoExhi().getAll(data, pageJson)
    let matchVInfo = $.request.matchVInfo().getDate(data, pageJson)
    let promise = Promise.all([InvitationInfoExhi, matchVInfo])
    promise.then(res =>{
      console.log(res)
      if (res[0].resCode == 0 || res[0].resCode == 10000){
        let result = res[0].result
        let user = wx.getStorageSync("userInfo")

        let InvitationInfoExhi = (_this.data.InvitationInfoExhi == null ? [] : _this.data.InvitationInfoExhi).concat(result)
        for (let i of InvitationInfoExhi) {
          i.fettle = "展商"
          if (user.ContactRecordId == i.InitatorChild[0].RecordId) {
            i.status = "0"
          }
          if (user.ContactRecordId == i.ReceiverChild[0].RecordId) {
            i.status = "1"
          }
        }

        for (let i of InvitationInfoExhi) {
          let d = i.MeetingTimeDate.substr(i.MeetingTimeDate.indexOf("-") + 1).replace("-", "/")
          let dd = d.substr(0, d.indexOf("/"))
          console.log(dd)
          let cc = d.substr(d.indexOf("/"))
          if (Number(dd) < 10) {
            dd = "" + dd
          }
          if (Number(cc) < 10) {
            cc = "0" + cc
          }
          i.MeetingTimeDate = (dd + "" + cc)

          i.MeetingTimeStart = i.MeetingTimeStart.substr(i.MeetingTimeStart.indexOf(":") - 2)

        }
        _this.setData({
          InvitationInfoExhi
        })
        console.log("pppppppppppppppppppppppppppppppp")
        console.log(_this.data.InvitationInfoExhi)
        wx.setStorageSync("Exhibitors", _this.data.InvitationInfoExhi)
      }
      if (res[1].resCode == 0 || res[1].resCode == 10000) {
        let user = wx.getStorageSync("userInfo")
        let result = res[1].result
        console.log("aaaaaaaaaaaaa")
        console.log(result)
        let matchVInfo = (_this.data.matchVInfo == null ? [] : _this.data.matchVInfo).concat(result)

        let matchVInfoArray = []
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbb")
        console.log(matchVInfo)
        for (let i of matchVInfo) {
          i.fettle = "观众"
          if (i.MeetingTimeDate.length == 10) {
            i.MeetingTimeDate = i.MeetingTimeDate.substr(5).replace("-", "/");
          }
          
          i.MeetingTimeStart = i.MeetingTimeStart.substr(i.MeetingTimeStart.indexOf(":") - 2)
          if (i.VisitorReceiver != undefined) {
            if (i.Type === '1') {
              if (i.InitatorChild[0].RecordId == user.ContactRecordId) {
                i.status = "0"

              }
              if (i.VisitorReceiver[0].RecordId == user.ContactRecordId) {
                i.status = "1"
              }
            } else {
              if (i.VisitorInitator[0].RecordId == user.ContactRecordId) {
                i.status = "0"
              }
              if (i.ReceiverChild[0].RecordId == user.ContactRecordId) {
                i.status = "1"
              }
            }
            matchVInfoArray.push(i)
          } else if (i.VisitorInitator != undefined){
            if (i.Type === '1') {
              if (i.InitatorChild[0].RecordId == user.ContactRecordId) {
                i.status = "0"

              }
              if (i.VisitorReceiver[0].RecordId == user.ContactRecordId) {
                i.status = "1"
              }
            } else {
              if (i.VisitorInitator[0].RecordId == user.ContactRecordId) {
                i.status = "0"
              }
              if (i.ReceiverChild[0].RecordId == user.ContactRecordId) {
                i.status = "1"
              }
            }
            matchVInfoArray.push(i)
          }
        }
        // for (let i of matchVInfo) {
        //   let d = i.MeetingTimeDate.substr(i.MeetingTimeDate.indexOf("-") + 1).replace("-", "/")
        //   console.log(d)
        //   let dd = d.substr(0, d.indexOf("/"))
        //   console.log(dd)
        //   let cc = d.substr(d.indexOf("/"))
        //   console.log(dd)
        //   if (Number(dd) < 10) {
        //     // dd = "0" + dd
        //   }
        //   if (Number(cc) < 10) {
        //     cc = "0" + cc
        //   }
        //   i.MeetingTimeDate = (dd + "" + cc)
        //   i.MeetingTimeStart = i.MeetingTimeStart.substr(0, 5)
        // }
        _this.setData({
          matchVInfo: matchVInfoArray
        })
        console.log("观众")
        console.log(matchVInfoArray)
        wx.setStorageSync("Audience", _this.data.matchVInfo)
      }
      let newEndDate = new Date().getTime();
      console.log("YYYYYYYYYYYYYYYYYYYYYYYYYY")
      console.log(newEndDate - newStartDate)
    })

  },
  // onLink() {

  //   $.request.matchVisitor().getAll().then(res => {
  //     if (res.resCode == 0) {
  //       let link = res.result

  //       _this.setData({
  //         link
  //       })
  //     }
  //   })
  // },
  // onInvitationInfo(result) {
  //   console.log(result)
  //   let match = wx.getStorageSync("MATCH_VISITORS")
  //   let user = wx.getStorageSync("userInfo")
  //   console.log("//////////////////////////////")
  //   console.log(user)
  //   let link = _this.data.link
  //   console.log(link)
  //   for (let r of result) {
  //     console.log(r.Receiver)
  //     let linkName = (link.filter(e => e.RecordId == r.Receiver)[0] || match.filter(e => e.RecordId == r.Receiver)[0])
  //     if (linkName) {
  //       let name = linkName.Name
  //       let job = linkName.JobTitle
  //       let phone = linkName.Mob
  //       let compName = linkName.CompName
  //       let BootNo = user.BoothNo
  //       console.log(BootNo)
  //       r.name = name
  //       r.job = job
  //       r.phone = phone
  //       r.compName = compName
  //       r.BootNo = BootNo
  //     } else {
  //     }
  //   }

  //   console.log(result)
  //   _this.setData({
  //     result
  //   })
  //   console.log(_this.data.result)

  // },
  /**
   * 
   * 选择日程
   * 
   */
  onAll(e) {
    _this.setData({
      InvitationInfoExhi: []
    })
    _this.setData({
      matchVInfo: []
    })

    let type = e.currentTarget.dataset.type
    _this.setData({
      type
    })
    pageIndex = 1
    _this.setData({
      results: []
    })
    if (type == -1) {
      _this.onContent(-1);
    } else {

      _this.onContent(type);
    }
  },
  onCount() {
    let types = _this.data.type
    let data = {}
    if (types != -1) {
      data.type = types
    }

    $.request.inviteMyQueryCount().get(data).then(res => {
      if (res.resCode == 0) {
        _this.setdata({
          count: res.result
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
    let count = _this.data.count
    let pageNumIndex = Math.floor((count - 1) / count) + 1


    pageIndex++
    _this.onContent(_this.data.type)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
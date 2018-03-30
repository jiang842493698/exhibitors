// component/invite.js
let $ = getApp().$
let name = "${受邀人}"
let job = "${受邀人职务}"
let companName = "${邀请人公司}"
let invite = "${邀请人}"
let inviteJob = "${邀请人职务}"
let inviteDateStart = "${邀请开始时间}"
let address = "${见面地点}"
let contents
Component({

  properties: {
    data: Object,
    //标题
    title: {
      type: String,
      value: '约TA'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dateShow: true,
    isShow: false,
    dateTime: null,
    endTime: null,
    satrtTime: ""
  },

  ready(e) {
    console.log("aaaaaaaaaaa")
    console.log(this)
    this.setData({
      dateTime: "",
      startTime: "",
      endTime: ""
    })
    console.log("bbbbbbbbbbb")
    let content_1 = () => {
      let data = this.data.data;
      contents = data.result.replace("${见面地点}", address).replace("${受邀人}", name).replace("${受邀人职务}", job).replace("${邀请人公司}", companName).replace("${邀请人}", invite).replace("${邀请人职务}", inviteJob).replace("${邀请开始时间}", inviteDateStart).replace("${见面地点}", address)
      this.setData({
        contents
      })
    }
    let _init_0 = () => {
      let data = this.data.data;
      console.log(data)
      data.links = data.links || [];
      //如果联系人没有设选中 则默认选中第一个
      let selected_link = data.links.filter(f => f.checked);
      name = selected_link[0].name
      job = selected_link[0].job
      companName = data.companyName
      data.addrs = data.addrs || [];
      let selected_addr = data.addrs.filter(f => f.checked);
      console.log(selected_addr)
      address = selected_addr[0].value
      invite = data.inviteName
      inviteJob = data.inviteJob
      let invitationfirm = data.invitationfirm
      console.log(invitationfirm)
      content_1()
      this.setData({ invitationfirm})
    }
    _init_0();
  },
  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 取消按钮
     * 
     */
    _onCancel() {
      this.triggerEvent('cancel');
      console.log("取消")
      console.log(this.data)

      inviteDateStart = "${邀请开始时间}"
      this.content_s()
      this.setData({
        data: {
          isShow: true
        }
      })
    },



    /**
     * 确定按钮
     * 
     */
    _onConfirm() {
      let _this = this

      console.log("--------------------------")
      let dateTime = _this.data.dateTime
      let endTime = _this.data.endTime
      // let startTime = _this.data.startTime
      console.log(dateTime)
      let date = dateTime.substr("0", dateTime.indexOf(" "))
      console.log(date)

      let start = dateTime.substr(dateTime.indexOf(" ")+1)
      console.log(start)
      let end = endTime
      let datatype = _this.data.data.type
      if (datatype == 0) {
        if (dateTime == null || dateTime == "") {
          wx.showToast({
            title: "请选择约请时间",
            icon: 'loading'
          })
        } else {

          let dataJson = this.data.data;
          // let content = dataJson.content.substr(6).replace("${见面地点}", _this.data.addr)
          let _content = this.data.content
          let id = dataJson.id
          console.log()

          let link = dataJson.links
          let links
          let tenantId = dataJson.tenantId
          let recordId = dataJson.recordId
          let LinksName
          for (let l = 0; l < link.length; l++) {
            console.log(l)
            if (link[l].checked && link[l].checked == true) {
              LinksName = link[l].name
            }
          }

          // 根据选择的展商获取当前展商的联系人的RecordId
          console.log("sdasdasdadadad")
          console.log(this.data)
          $.request.ExhibitorContact().get(tenantId).then(res => {
            if (res.resCode == 0) {
              let resultss = res.result
              let linkJson = resultss.filter(e => e.Name == LinksName)[0]
              // _this.triggerEvent('confirm', { data: this.data.data });

              let userInfo = wx.getStorageSync("userInfo")
              let data = {
                "Type": "1",
                "State": "0",
                "Initator": userInfo.RecordId,
                "InitatorChild": userInfo.ContactRecordId,
                "Receiver": recordId,
                "ReceiverChild": linkJson.RecordId,
                "MeetingTimeDate": date,
                "MeetingTimeStart": start,
                "MeetingTimeEnd": end,
                "MeetingPlace": address,
                "InvitationMsgContent": contents
              }

              $.request.InvitationInfoExhi().post(data).then(ress => {
                if (ress.resCode == 0) {
                  // $.request
                  console.log("约请已发送")
                  $.service.showToast({ title: '约请已发送' });
                  _this.setData({
                    data: {
                      isShow: true
                    }
                  })

                  this.onupdate()
                }
                // if (ress.resCode == 400001) {
                //   wx.showToast({
                //     title: '约请重复提交',
                //     icon: "loading"
                //   })
                // }
                // if (ress.resCode == 400002) {
                //   wx.showToast({
                //     title: '不能约请自己',
                //     icon: "loading"
                //   })
                // }
                // if (ress.resCode == 400000) {
                //   console.log(data)
                //   wx.showToast({
                //     title: '参数错误',
                //     icon: "loading"
                //   })
                // }
              })
            }
          })
        }
      } else {
        if (dateTime == null || dateTime == "") {
          wx.showToast({
            title: "请选择约请时间",
            icon: 'loading'
          })
        } else {
          let _content = this.data.content
          let dataJson = this.data.data;
          // let content = dataJson.content.substr(6).replace("${见面地点}", _this.data.addr)
          let id = dataJson.id
          let link = dataJson.links
          let userInfo = wx.getStorageSync("userInfo")
          console.log("ttttttttttttt")
          console.log(userInfo)

          let data = {
            "Type": "1",
            "State": "0",
            "VisitorReceiver": id,
            "MeetingTimeDate": date,
            "Initator": userInfo.RecordId,
            "InitatorChild": userInfo.ContactRecordId,
            "MeetingTimeStart": start,
            "MeetingTimeEnd": endTime,
            "MeetingPlace": address,
            "InvitationMsgContent": contents
          }
          $.request.matchVInfo().post(data).then(res => {
            if (res.resCode == 0) {
              $.service.showToast({ title: '约请已发送' });

              _this.setData({
                data: {
                  isShow: true
                }
                
              })
              this.onupdate()

              // this.triggerEvent('confirm', { data: this.data.data });
            }
            // if (res.resCode == 400000) {
            //   console.log(data)
            //   wx.showToast({
            //     title: '参数错误',
            //     icon: "loading"
            //   })
            // }
            // if (ress.resCode == 400001) {
            //   wx.showToast({
            //     title: '约请重复提交',
            //     icon: "loading"
            //   })
            // }
          })
        }
      }
      // let dateTimes = _this.data.dateTimes

    },

    /**
     * 改变联系人的选中值
     * 
     * @param {any} e 
     */

    content_s() {
      let data = this.data.data;
      contents = data.result.replace("${见面地点}", address).replace("${受邀人}", name).replace("${受邀人职务}", job).replace("${邀请人公司}", companName).replace("${邀请人}", invite).replace("${邀请人职务}", inviteJob).replace("${邀请开始时间}", inviteDateStart).replace("${见面地点}", address)
      this.setData({
        contents
      })
    },
    _onLink(e) {
      let data = this.data.data;
      let index = e.currentTarget.dataset.index;
      let last = data.links.find(e => e.checked)

      data.links.forEach((v, i) => {

        v.checked = i === index;
      });

      name = data.links[index].name
      job = data.links[index].job
      this.content_s()
      this.setData({ data })
    },
    _onAddr(e) {
      let data = this.data.data;
      let value = e.detail.value;
      console.log(e)
      const lastName = data.addrs.find(e => e.checked).value
      data.addrs.forEach((v, i) => {
        v.checked = v.value === value;
      })

      const currentName = value
      address = currentName
      this.content_s()
      this.setData({ data })
    },
    closeDatetime() {
      this.setData({
        dateShow: !this.data.dataShow
      })
    },
    onTime(e) {
      console.log("pppppppppppppp")
      console.log(e)
      let _this = this
      _this.setData({
        dateShow: false
      })

      let fettle = _this.data.data.fettle
      if (fettle == "观众") {
        let VisitorId = _this.data.data.id
        let data = {
          Type: "1",
          RecordId: VisitorId,

        }
        $.request.inviteTime().get(data).then(res => {
          if (res.resCode == 0) {
            let re = res.result[0]
            console.log(re)
            let dateArray = []
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
            //dateTimeArray值为[2/27,2/28]
            //将dateTimeArray存到data里面
            _this.setData({
              date: dateTimeArray
            })
            //获取dateTimeArray数组中的第一条数据
            let datess = dateTimeArray[0]
            //datess值为2/27

            _this.setData({
              initialTime: datess
            })
            _this.onTimes(datess)

          }
        })
      }
      if (fettle == "展商") {
        console.log("11111111111111111aaaaaaaaaaaaaa")
        let dataJson = this.data.data;
        console.log(dataJson)
        let content = dataJson.content
        let link = dataJson.links
        let recordId = _this.data.data.recordId
        let LinksName
        for (let l = 0; l < link.length; l++) {
          console.log(l)
          if (link[l].checked && link[l].checked == true) {
            LinksName = link[l].name
          }
        }
        console.log()
        console.log(link)

        $.request.ExhibitorContact().getAll(dataJson.tenantId).then(res => {
          if (res.resCode == 0) {
            let resultss = res.result
            let linkJson = resultss.filter(e => e.Name == LinksName)[0]
            console.log("++++++++++++++++++++++++++++++++++")
            console.log(linkJson)
            let data = {
              Type: "2",
              RecordId: linkJson.RecordId,
            }
            console.log(linkJson.RecordId)
            _this.onCalendar(data)
          }
        })

      }

    },
    onCalendar(data) {
      let _this = this
      $.request.inviteTime().getExhibition(data).then(res => {
        if (res.resCode == 0) {
          console.log("99999999999")
          let re = res.result[0]
          console.log(re)
          let dateArray = []
          //CalendarTime表示所有的时间段
          let CalendarTime = re.CalendarTime
          console.log("8888888888")
          console.log(CalendarTime)
          //将re.RecordId存起来修改时调用
          _this.setData({
            recordId: re.RecordId
          })
          console.log("66666666666")
          //将获得的CalendarTime时间段中的所有值存储
          _this.setData({
            CalendarTime
          })
          console.log("222222222222")
          //遍历CalendarTime获取天数的值
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
          console.log("333333333333333333333")
          for (let d of dateArray) {
            let dates = d.substr(d.indexOf("-") + 1).replace("-", "/")
            dateTimeArray.push(dates)
          }
          //dateTimeArray值为[2/27,2/28]
          //将dateTimeArray存到data里面
          _this.setData({
            date: dateTimeArray
          })
          //获取dateTimeArray数组中的第一条数据
          let datess = dateTimeArray[0]
          //datess值为2/27

          console.log("444444444444444444")
          _this.setData({
            initialTime: datess
          })
          _this.onTimes(datess)
          console.log(datess)
        }
      })
    },
    onTimes(dates) {
      let _this = this
      //判断获取的值是否为"2/27"这种格式如果是的话转化成2-27格式
      if (dates.indexOf("/") >= 0) {
        dates = dates.replace("/", "-")
      }
      //取出获取的所有时间段
      let calendarTimes = _this.data.CalendarTime

      let startEndJson = []
      //找出时间段中符合当前时间的数组
      startEndJson = calendarTimes.filter(c => c.StartTime.indexOf(dates) >= 0)
      console.log("77777777777777777777777")
      console.log(startEndJson)
      for (let s of startEndJson) {
        let startTimeRest = s.StartTime.replace(/-/g, "/")
        //遍历数组判断当前json里面的时间段是上午还是下午
        if (new Date(startTimeRest) <= new Date(new Date(startTimeRest).setHours("12"))) {
          s.type = "morning"
        } else {
          s.type = "afternoon"
        }
        //将开始时间和结束时间转换一下显示到页面上
        let startss = s.StartTime.substring(s.StartTime.indexOf(" ") + 1)
        let end = s.EndTime.substring(s.EndTime.indexOf(" ") + 1)
        console.log(startss)
        // console.log(end)
        s.start = startss
        s.end = end

      }
      /**
* 判断自己的时间段是否忙碌
*/
      //获取自己日程的所有数据
      $.request.inviteTime().getMyDate().then(res => {
        if (res.resCode == 0) {
          // 当连接完数据正确返回后调用res.result[0]获取body
          let re = res.result[0]
          //CalendarTime表示所有的时间段
          console.log("88989898989")
          let mydateTimeArray = re.CalendarTime
          console.log(mydateTimeArray)
          let startEndJson = _this.data.dateTimes
          for (let i of startEndJson) {
            for (let j of mydateTimeArray) {
              if (i.name == j.name && i.StartTime == j.StartTime) {
                i.myState = j.State
              }
            }
          }
          _this.setData({
            dateTimes: startEndJson
          })
          console.log("11111111111111111111111")
          console.log(_this.data.dateTimes)
        }
      })
      //页面上显示的值
      _this.setData({
        dateTimes: startEndJson
      })
      console.log(_this.data.dateTimes)
    },

    onDate(e) {
      let _this = this
      let date = e.currentTarget.dataset.date
      let dates = date.replace("/", "-")
      _this.onTimes(dates)
      _this.setData({
        initialTime: date
      })

    },
    onDateTime(e) {
      let _this = this
      /**选择值的名字 */
      let name = e.currentTarget.dataset.name

      let dates = _this.data.initialTime
      /**获取个人缓存数据 */
      let user = wx.getStorageSync("userInfo")
      /**查询data里面的 dateTimes数组*/
      let dateTimes = _this.data.dateTimes

      let dateJson = dateTimes

      let dateTimesss = dateJson.filter(e => e.name == name)[0]

      if (dateTimesss.State == 1 || dateTimesss.myState == 1) {
        wx.showToast({
          title: '该时间断不可约请',
          icon: 'loading'
        })
      } else {
        _this.setData({
          calName: name
        })
        _this.setData({
          dateTis: dateTimesss
        })

        _this.onUpdateCalendarTime(dateTimesss)
      }
    },
    onUpdateCalendarTime(dateTimesss) {
      let _this = this
      console.log("aaaaaaaaaa")
      let startDate = new Date(dateTimesss.SatrtTime).getTime()
      let endDate = new Date(dateTimesss.EndTime).getTime()

      $.request.inviteTime().getMyDate().then(ress => {
        if (ress.resCode == 0) {
          console.log("111111111111111")
          let result = ress.result[0]
          let calendarTime = result.CalendarTime
          _this.setData({
            MyCalendarTime: calendarTime
          })
          console.log(calendarTime)
          /**新增的属性 myName*/
          let myName = []
          for (let c of calendarTime) {
            let cSatrt = c.StartTime
            let cEnd = c.EndTime
            if ((startDate >= cSatrt && startDate <= cEnd) || (endDate >= cSatrt && endDate <= cEnd)) {
              if (c.State == 1) {
                wx.showToast({
                  title: '您当前时间忙碌',
                })
              } else {
                myName.push(c.name)
              }
            }
          }
          let dateJson = this.data.dateTis
          let endTime = dateJson.EndTime.substr(dateJson.EndTime.indexOf(" "))
          console.log(dateJson)
          _this.setData({
            dateTime: dateJson.StartTime,
            dateJson,
            endTime
          })
          console.log(this.data.myName)
          // console.log(this.content)
          // let _content = this.content.replace('${邀请开始时间}', dateJson.StartTime )
          // _this.setData({ content: _content });
          // console.log(_this.data.content)
          inviteDateStart = dateJson.StartTime
          this.content_s()
          _this.setData({
            dateShow: true
          })

        }
      })
    },
    onupdate() {
      let _this = this
      console.log("修改日程")
      console.log(this.data.dateJson)
      let dateJson = this.data.dateJson
      let dataTime = this.data.MyCalendarTime
      console.log(dataTime)
      for (let dt of dataTime) {
        if (dateJson.StartTime == dt.StartTime && dateJson.EndTime == dt.EndTime) {
          dt.State = "1"
        }
      }

      let recordId = wx.getStorageSync("userInfo").ContactRecordId

      console.log(dataTime)
      console.log(recordId)

      $.request.inviteTime().updateTime(dataTime, recordId).then(res => {
        if (res.resCode == 0) {
          console.log("222222222")
          console.log("日程锁定成功")
          console.log(res)
        }
      })
    },
  },
})

// pages/my/settings/schedule/schedule.js
let app = getApp()
let $ = getApp().$
let _this

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
    // this.onTime();
    this.onDateTime();
     
    // if (_this.data.initialTime==null){
      
    //   this.onDateTime();
    // }else{
    //   let initialTime = _this.data.initialTime
    //   console.log("rrrrrrrrrrrrrrrrrrrrr")
    //   console.log(initialTime)
    //   _this.onTime(initialTime)
    // }

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

  //首次加载
  onDateTime() {
    //获取日程的所有数据
    $.request.inviteTime().getMyDate().then(res => {
      console.log(res.resMsg)
      console.log(res.resCode)
      if (res.resCode == 0) {
        // 当连接完数据正确返回后调用res.result[0]获取body
        let re = res.result[0]
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
        console.log("===========================")
        console.log(dateArray)
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
        console.log("{----------------------------------------------}")
        console.log(dateTimeArray)
        // let dateTimeArrays = []
        // for (let d of dateTimeArray) {
        //   console.log(d)
        //   let dd = d.substr(0, d.indexOf("/"))
        //   console.log(dd)
        //   let cc = d.substr(d.indexOf("/"))
        //   if (Number(dd) < 10) {
        //     dd = "0" + dd
        //   }
        //   dateTimeArrays.push(dd + "" + cc)
        //   console.log(dateTimeArrays)
        // }
        _this.setData({
          date: dateTimeArray
        })
        //获取dateTimeArray数组中的第一条数据
        let datess = dateTimeArray[0]
        //datess值为2/27

        _this.setData({
          initialTime: datess
        })
        
        _this.onTime(datess)

      
      }
    })
  },

  //后面加载时间
  onDate(e) {
    let date = e.currentTarget.dataset.date
    let dates = date.replace("/","-")
    _this.onTime(dates)
    _this.setData({
      initialTime: date
    })
  },
  onTime(dates){
    
    //判断获取的值是否为"2/27"这种格式如果是的话转化成2-27格式
    if (dates.indexOf("/")>=0){
       dates = dates.replace("/", "-")
    }
    //取出获取的所有时间段
    let calendarTimes = _this.data.CalendarTime
    
    let startEndJson = []
    //找出时间段中符合当前时间的数组
    startEndJson = calendarTimes.filter(c => c.StartTime.indexOf(dates) >= 0)
    console.log(startEndJson)
    for (let s of startEndJson) {
      //遍历数组判断当前json里面的时间段是上午还是下午
      let startTimeRest = s.StartTime.replace(/-/g, "/")
      if (new Date(startTimeRest) <= new Date(new Date(startTimeRest).setHours("12"))) {
        s.type = "morning"
      } else {
        s.type = "afternoon"
      }
      //将开始时间和结束时间转换一下显示到页面上
      let startss = s.StartTime.substring(s.StartTime.indexOf(" ") + 1, s.StartTime.lastIndexOf(":")+3)
      let end = s.EndTime.substring(s.EndTime.indexOf(" ") + 1, s.EndTime.lastIndexOf(":")+3)
      s.start = startss
      s.end = end
      
    }
    //页面上显示的值
    _this.setData({
      dateTimes: startEndJson
    })
    console.log(startEndJson)

  },
  
  suoDing(e){
    let dateTimes = _this.data.CalendarTime
    let starttime = e.currentTarget.dataset.starttime
    let endtime = e.currentTarget.dataset.endtime
    let status = e.currentTarget.dataset.status
    let name = e.currentTarget.dataset.name 
    console.log(status)
    //判断当前状态是否锁定 
    if (status == 1){
      //如果锁定那么就解锁
      wx.showModal({
        title: '解锁',
        content: '该时间段已经锁定，确定解锁吗',
        confirmText: "解锁",
        success: function (res) {
          //如果处于锁定的状态
          if (res.confirm) {
          //处理值（可以提取出来）
          for (let d of dateTimes) {
            delete d.start
            delete d.end
            delete d.type
            if (d.name == name ) {
              d.State = "0"
            }
          }
          _this.onsuoding(dateTimes)
          }
        }
      })
    }
    if (status == 0){

      wx.showModal({
        title: '锁定',
        content: '您确定要将该时间锁定吗',
        confirmText: "锁定",
        success: function (res) {
          if (res.confirm) {
            //处理值（冗余可以提取出来）
            console.log("777777777777777777777")
            console.log(dateTimes)
            console.log(name)
            for (let d of dateTimes) {
              delete d.start
              delete d.end
              delete d.type
              if (d.name == name) {
                // console.log(d)
                console.log("cccccccccccccccccc")
                console.log(d)
                d.State = "1"
              }
            }
            console.log(dateTimes)
            //将处理完的值放到onsuoding()方法中
            _this.onsuoding(dateTimes)
          }
        }
      })
    }
    
  },
  onsuoding(dateTimes){
    
    let recordId = _this.data.recordId
    //获取处理后的值和recordId，当做参数调用编辑状态的接口
    $.request.inviteTime().updateTime(dateTimes, recordId).then(ress => {
      if(ress.resCode==0){
        let exInfo = wx.getStorageSync("userInfo")
        let user = wx.getStorageSync("userInfo")
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(user)
        //获取当前页数刷新页面
        let initialTime = _this.data.initialTime
        _this.onTime(initialTime)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
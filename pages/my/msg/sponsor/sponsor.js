let app = getApp()
let request = getApp().$.request
let $ = getApp().$
let MsgInfo = $.request.MsgInfo()
let pageIndex = 1
let pageSize = 10;
let id
let _this
let tool = $.tool
// let result = [{
//   "id": "0",
//   "title": "报告",
//   "createAt": "2018-2-8 5:17:00",
//   "value": "贵公司的妹子很漂亮",
//   "isStatus": "1"//0为已读1为未读
// }, {
//   "id": "1",
//   "title": "报告",
//   "createAt": "2018-2-8 5:17:00",
//   "value": "贵公司的妹子很漂亮",
//   "isStatus": "1"//0为已读1为未读
// }, {
//   "id": "2",
//   "title": "报告",
//   "createAt": "2018-2-8 5:17:00",
//   "value": "贵公司的妹子很漂亮",
//   "isStatus": "1"//0为已读1为未读
// }, {
//   "id": "3",
//   "title": "报告",
//   "createAt": "2018-2-8 5:17:00",
//   "value": "贵公司的妹子很漂亮",
//   "isStatus": "0"//0为已读1为未读
// }, {
//   "id": "4",
//   "title": "报告",
//   "createAt": "2018-2-8 5:17:00",
//   "value": "贵公司的妹子很漂亮",
//   "isStatus": "0"//0为已读1为未读
// }, {
//   "id": "5",
//   "title": "报告",
//   "createAt": "2018-2-8 5:17:00",
//   "value": "贵公司的妹子很漂亮",
//   "isStatus": "0"//0为已读1为未读
// }, {
//   "id": "6",
//   "title": "报告",
//   "createAt": "2018-2-8 19:17:00",
//   "value": "贵公司的妹子很漂亮",
//   "isStatus": "0"//0为已读1为未读
// }]
let inviteArray = []
Page({
  data: {
    items: [],
    startX: 0, //开始坐标
    startY: 0
  },
  onLoad: function (options) {

    id = options.id
    _this= this
    if (id == 2) {
      wx.setNavigationBarTitle({
        title: '主办消息',
      })
    }
    if (id == 5) {
      wx.setNavigationBarTitle({
        title: '约请消息',
      })
    }
    if (id == 6) {
      wx.setNavigationBarTitle({
        title: '活动消息',
      })
    }
    pageIndex = 1
    _this.setData({
      message: []
    })
    _this.onSelect();
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.message.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    
    that.data.message.forEach(function (v, i) {
      
      v.isTouchMove = false
      
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      message: that.data.message
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  onShow: function () {

  },
  onSelect: function () {
    
    let data={
      type : id
    }
    let page = {
      pageIndex : pageIndex,
      pageSize : pageSize
    }

    MsgInfo.get(data, page).then(res=>{
      
      if (res.resCode == "0" || res.resCode == "10000"){
        
        let result = res.result
        for (let r of result) {
          let CreatedAt = r.CreatedAt.replace(/-/g,"/")
          let date = new Date(CreatedAt)
          let time = tool.comparisonTime(date, new Date())

          if (time.length > 7) {
            let d = time.substr(time.indexOf("/") + 1)
            console.log("22222222222222222")
            console.log(d)
            let dd = d.substr(0, d.indexOf("/"))
            console.log(dd)
            let cc = d.substr(d.indexOf("/") + 1)
            console.log(cc)
            if (Number(dd) < 10) {
              dd = "0" + dd
            }
            if (Number(cc) < 10) {
              cc = "0" + cc
            }
            console.log(dd + cc)
            r.time = dd + "/" + cc
          } else {
            r.time = time
          }
            console.log(r)

          var timestamp =new Date()
          console.log(timestamp)
          var date = $.wxHelper.DateFormat(timestamp,"yyyy-MM-dd HH:mm:ss")
            console.log(date)
          let user = wx.getStorageSync("userInfo");
          let f = true
          if (r.Group != undefined){
              for (let i of r.Group){
                if (i.UserName == user.UserName){
                  f = false
                }
              }
          }
            if (f) {
              
              let data = {
                "params": {
                  "recordId": r.RecordId,
                  "setValue": {
                    "Group": {
                      "UserName": user.UserName, "CompanyName": user.CompanyName, "Job": user.Job, "Name": user.Name, "State": "1", "Delete": false, "Date": date}
                  }
                }
              }
              console.log("222222222222222222222222222")
              console.log(data)
              MsgInfo.Update(data).then(res => {
                if (res.resCode == "0") {
                  _this.onShow();
                }
              })
            }
        }
    
        let dataInvite = _this.data.message == null ? [] : _this.data.message
        inviteArray = dataInvite.concat(result)
        

        _this.setData({
          message: inviteArray
        })
        let updatearrayal= []
        for (let r of result){
          if(r.State==1){
            updatearrayal.push({ recordId: r.RecordId,setValue:{State:"0"}})
          }
        }
        let updateData = { updatearrayal }
        MsgInfo.put(updateData).then(ress => {
          if (ress.resCode == "0") {
            console.log("修改成功")
          }
        })
      }
    })
  },
  
  onDelete(e){
    console.log("单机删除")
    console.log(e)
    let message = _this.data.message;
    console.log(message)
    let id = e.currentTarget.dataset.del
    for (let i of message){
      if (i.RecordId == id){
        if (i.ExhibitorReceiver == "000000000000000000000002") {
          let user = wx.getStorageSync("userInfo")
          let data ={
            "params":{
              "recordId":id,
                "condition":{ "Group.UserName":user.UserName },
              "updateValue": {
                  "Group.$.Delete": true
              }
            }
          }
          MsgInfo.Update(data).then(res => {
            if (res.resCode == "0") {
              _this.onShow();
            }
          })
        } else {
          let date = {
            id
          }
          console.log("删除单反信息")
          MsgInfo.delete(date).then(res => {
            if (res.resCode == "0") {
              _this.onShow();
            }
          })
        }
      }
    }
  },
  onReachBottom: function () {
    // let dataCount = _this.data.count + 3
    // let pageNumIndex = (dataCount-1)/pageSize+1
    let pageNumIndex = 5
    if (pageIndex >= pageNumIndex) {
      wx.stopPullDownRefresh();
    } else {
      pageIndex++
      _this.onSelect();
    }
  },
  onPullDownRefresh: function () {
    pageIndex = 1
    _this.onShow()
  },

})
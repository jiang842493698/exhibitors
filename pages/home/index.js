let app = getApp();
let $ = getApp().$;
let matchVInfo = $.request.matchVInfo()
let InvitationInfoExhi = $.request.InvitationInfoExhi()
let MsgInfo = $.request.MsgInfo()
let MsgInfoCount = $.request.MsgInfoCount()
let inviteCount = $.request.inviteCount()
let tool = $.tool
let _this
let pageIndex = 1;
let pageSize = 5;
let show = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show : false,
    count : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    pageIndex = 1
    // _this.setData({
    //   count: []
    // })
    // _this.setData({
    //   InvitationInfoExhi: []
    // })
    // _this.setData({
    //   matchVInfo: []
    // })
    // _this.setData({
    //   InvitationInfo: []
    // })
    // _this.ondata();

    // _this.onInvite()
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
    pageIndex = 1
    _this.setData({
      count: []
    })
    _this.setData({
      InvitationInfoExhi: []
    })
    _this.setData({
      matchVInfo: []
    })
    _this.setData({
      InvitationInfo: []
    })
    _this.ondata();
    _this.onInvite();
    _this.onInviteCount();
  },

  onSelect:function(){
    let dataZhuban = {
      type: "4"
    }
    let zhanshangData={
      type: "2"
    }
    let yueqingData = {
      type: "5"
      
    }
    let huodongData = {
      type: "6"
    }
    let page = {
      pageIndex : 1,
      pageSize : 5
    }
    
    let organizer = MsgInfo.get(dataZhuban, page)
    let Exhibitors = MsgInfo.get(zhanshangData, page)
    let yueqing = MsgInfo.get(yueqingData, page)
    let huodong = MsgInfo.get(huodongData, page)
    
    let aaa = Promise.all([organizer, Exhibitors, huodong, yueqing])
    return aaa
    
  },
  ondata: function () {
    _this.onSelect().then(a => {
      let resultArray = a
      let result = []
      console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
      for (let r of resultArray){
        let dataJsons = {}
        console.log(r)
        let results = r.result
        if (results.length>0){
          dataJsons = results[0]
          result.push(dataJsons)
        }

      }
     
      let countMsgArray = []
      for (let re of result){
        let data = {
          type : re.Type,
          State :"0"
        }

        let datTime = re.CreatedAt.replace(/-/g,'/')
        /**
         * 时间处理有问题
         */
        let time = tool.comparisonTime(datTime, new Date())
        if(time.length>7){
          let y = time.substr(0, time.indexOf("/"))
        let d = time.substr(time.indexOf("/")+1)
        console.log("22222222222222222")
        console.log(d)
            let dd = d.substr(0, d.indexOf("/"))
            console.log(dd)
            let cc = d.substr(d.indexOf("/")+1)
            console.log(cc)
            if(Number(dd)<10){
              dd="0"+dd
            }
            if(Number(cc)<10) {
              cc = "0" + cc
            }
            console.log(dd + cc)
            re.time =y+"/"+dd +"/"+ cc
        }else{
          re.time = time
        }
        if (re.Type == 4){
          re.image = "/assets/images/icon/msg/notice.png"
          
        }
        if (re.Type == 0 || re.Type == 1||re.Type == 2) {
          re.image = "/assets/images/icon/msg/settings.png"
        }
        if (re.Type == 5) {
          re.image = "/assets/images/icon/msg/invite.png"
        } 
        if (re.Type == 6) {
          re.image = "/assets/images/icon/msg/activity.png"
        }
        MsgInfoCount.get(data).then(e=>{
          if(e.resCode==0){
            let count = e.result
            let show
            if (count==0){
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
              count:countDataArray
            })
          }
        })
      }
      _this.setData({
        message: result
      })
    });
  },
  invite(e){
    let type = e.currentTarget.datatset.type
    _this.inviteData(type)
  },
  inviteData(type){
    if(type==0){
      
    }
  },
  onInvite :function(){
    let inviteArray = []
    let data = { "serchType": "1"}
    let page={
      pageIndex : pageIndex,
      pageSize: 5
    }

    // $.request.InvitationInfoExhi().getAlls(data, page).then(res=>{
    //   if (res.resCode == 0 || res.resCode == 10000) {
    //     let result = res.result
    //     let InvitationInfoExhi = (_this.data.InvitationInfoExhi == null ? [] : _this.data.InvitationInfoExhi).concat(result)
    //     console.log("展商")
    //     console.log(InvitationInfoExhi)
    //     for (let re of InvitationInfoExhi) {

    //       let datTime = re.CreatedAt.replace(/-/g, '/')
    //       /**
    //        * 时间处理有问题
    //        */
    //       let time = tool.comparisonTime(datTime, new Date())
    //       re.time = time
    //     }
    //     // for (let d of dateTimeArray){
    //     //   let dd =  d.substr(0,d.indexOf("/"))
    //     //   console.log(dd)
    //     //   let cc = d.substr(d.indexOf("/"))
    //     //   if(Number(dd)<10){
    //     //     dd="0"+dd
    //     //   }
    //     //   if (Number(cc) < 10) {
    //     //     cc = "0" + cc
    //     //   }
    //     //   dateTimeArrays.push(dd+""+cc)
    //     // }
    //     _this.setData({
    //       InvitationInfoExhi
    //     })
    //   }
    // })
    // $.request.matchVInfo().get(data, page).then(res=>{
    //   if(res.resCode == 0 || res.resCode == 10000) {
    //     let result = res.result
    //     let matchVInfo = (_this.data.matchVInfo == null ? [] : _this.data.matchVInfo).concat(result)
    //     for (let re of matchVInfo){
    //       let datTime = re.CreatedAt.replace(/-/g, '/')
    //       /**
    //        * 时间处理有问题
    //        */
    //       let time = tool.comparisonTime(datTime, new Date())
    //       re.time = time
    //     }
    //     _this.setData({
    //       matchVInfo
    //     })
    //   }
    // })
    let InvitationInfoExhi = $.request.InvitationInfoExhi().getAlls(data, page)
    let matchVInfo = $.request.matchVInfo().get(data, page)
    let promise = Promise.all([InvitationInfoExhi, matchVInfo])
    promise.then(res => {
      console.log("约请信息")
      console.log(res)
      _this.setData({
        InvitationInfo: []
      })
        if (res[0].resCode == 0 || res[0].resCode == 10000) {
          let result = res[0].result
          let InvitationInfoExhi = []
            InvitationInfoExhi = (_this.data.InvitationInfoExhi == null ? [] : _this.data.InvitationInfoExhi).concat(result)
            console.log("展商")
            console.log(InvitationInfoExhi)
            for (let re of InvitationInfoExhi) {

              let datTime = re.CreatedAt.replace(/-/g, '/')
              /**
               * 时间处理有问题
               */
              let time = tool.comparisonTime(datTime, new Date())
              re.time = time
            };
            _this.setData({
              InvitationInfoExhi: []
            });
            _this.setData({
              InvitationInfoExhi
            });

        }
        if (res[1].resCode == 0 || res[1].resCode == 10000) {
          let result = res[1].result
          let matchVInfo = []
          matchVInfo = (_this.data.matchVInfo == null ? [] : _this.data.matchVInfo).concat(result)
          for (let re of matchVInfo) {
            let datTime = re.CreatedAt.replace(/-/g, '/')
            /**
             * 时间处理有问题
             */
            let time = tool.comparisonTime(datTime, new Date())
            re.time = time
          };
          _this.setData({
            matchVInfo: []
          });
          _this.setData({
            matchVInfo
          });
        }
      })
  },
    // Promise.all([InvitationInfoExhi, matchVInfo]).then(e=>{
    //   console.log("各查10条数据")
    //   console.log(e)
    //   let resultArray = [] 
    //   let result = []
    //   for(let ee of e){
    //      result.push(ee.result)
    //   }
    //   let r = result.map(e => e == {});
    //   console.log("ttttttttttttttttttttt")
    //   console.log(result)
      
    //   // console.log(r)
    //   // for (let r of result){
    //   //   let array = []
    //   //   for(let rr of r){
    //   //     array.push(array)
    //   //   }

    //   // }
    
    //   let Invitation = _this.data.InvitationInfo.concat(result)
    //   _this.setData({
    //     InvitationInfo: Invitation
    //   })
    //   console.log(Invitation)
    // })
  
  // onInvites: function () {
  //   _this.setData({
  //     InvitationInfoExhi:[]
  //   })
  //   let inviteArray = []
  //   let data = { "serchType": "1" }

  //   let page = {
  //     pageIndex: 1,
  //     pageSize: 5
  //   }
  //   console.log("gggggggggggggggggggggggggggg")
  //   $.request.InvitationInfoExhi().getAlls(data, page).then(res => {
  //     if (res.resCode == 0 || res.resCode == 10000) {
  //       let result = res.result
  //       let InvitationInfoExhi = (_this.data.InvitationInfoExhi == null ? [] : _this.data.InvitationInfoExhi).concat(result)
  //       console.log("展商")
  //       console.log(InvitationInfoExhi)
  //       for (let re of InvitationInfoExhi) {

  //         let datTime = re.CreatedAt.replace(/-/g, '/')
  //         /**
  //          * 时间处理有问题
  //          */
  //         let time = tool.comparisonTime(datTime, new Date())
  //         re.time = time
  //       }
  //       _this.setData({
  //         InvitationInfoExhi
  //       })
  //     }
  //   })
  //   $.request.matchVInfo().get(data, page).then(res => {
  //     if (res.resCode == 0 || res.resCode == 10000) {
  //       let result = res.result
  //       let matchVInfo = (_this.data.matchVInfo == null ? [] : _this.data.matchVInfo).concat(result)
  //       for (let re of matchVInfo) {
  //         let datTime = re.CreatedAt.replace(/-/g, '/')
  //         /**
  //          * 时间处理有问题
  //          */
  //         let time = tool.comparisonTime(datTime, new Date())
  //         re.time = time + "00"
  //       }
  //       _this.setData({
  //         matchVInfo
  //       })
  //     }
  //   })
  //   // Promise.all([InvitationInfoExhi, matchVInfo]).then(e=>{
  //   //   console.log("各查10条数据")
  //   //   console.log(e)
  //   //   let resultArray = [] 
  //   //   let result = []
  //   //   for(let ee of e){
  //   //      result.push(ee.result)
  //   //   }
  //   //   let r = result.map(e => e == {});
  //   //   console.log("ttttttttttttttttttttt")
  //   //   console.log(result)

  //   //   // console.log(r)
  //   //   // for (let r of result){
  //   //   //   let array = []
  //   //   //   for(let rr of r){
  //   //   //     array.push(array)
  //   //   //   }

  //   //   // }



  //   //   let Invitation = _this.data.InvitationInfo.concat(result)
  //   //   _this.setData({
  //   //     InvitationInfo: Invitation
  //   //   })
  //   //   console.log(Invitation)
  //   // })

  // },
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
    // pageIndex = 1
    // _this.onShow()
    wx.showNavigationBarLoading()
    setTimeout(function(){
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      _this.onShow();
    },1500)

  },
  onInviteCount(){
    inviteCount.post().then(res => {
      if(res.resCode==0){
        console.log("查询未读消息数量")
        console.log(res)
        let count = res.result
        // let count = 30
        _this.setData({
          count: count
        })
      }
    })
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // let dataCount = _this.data.count + 3
    // let pageNumIndex = (dataCount-1)/pageSize+1
    let pageNumIndex = 5
    if (pageIndex >= pageNumIndex){
      wx.stopPullDownRefresh();
    }else{
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
    console.log(e)
    console.log(e.currentTarget.dataset)
    let id = e.currentTarget.dataset.item.RecordId
    console.log(id)
    let feet = e.currentTarget.dataset.feet
    let reject_invite = {
      isShow: true,//是否显示
      value: '',
      list: ['敏感词', '身份不匹配'],
      feet,
      id
    }
    this.setData({ reject_invite });
  },
  reject_inviteCancel() {
    let reject_invite = this.data.reject_invite;
    reject_invite.isShow = false;
    this.setData({ reject_invite });
    console.log("取消")
  },
  reject_inviteConfirm(e) {
    // e.detail = {
    //   value: "身份不匹配",//选择常用（或输入的值）
    //   index: 1,//选择常用实返回
    // }
    let reject_invite = this.data.reject_invite;
    reject_invite.isShow = false;
    this.setData({ reject_invite });
    console.log("完成")
    _this.onShow();
  },
  onAgree(e){
    console.log(e)
    wx.showModal({
      content: '确认同意吗？',
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          let data = {
            recordId: e.currentTarget.dataset.bing,
            setValue: {
              State: "4",
              Remark:"同意"
            }
          }
          console.log(data)
          if (e.currentTarget.dataset.feet == "观众"){
            matchVInfo.put(data).then(res => {
              console.log(res)
              if (res.resCode == 0) {
                _this.onShow();
              }
            })
          } else if (e.currentTarget.dataset.feet == "展商"){
            InvitationInfoExhi.puts(data).then(res => {
              console.log(res)
              if (res.resCode == 0) {
                _this.onShow();
              }
            })
          }
        }
      }
    })
  }



})
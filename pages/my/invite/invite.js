// pages/my/invite/invite.js

let app = getApp()
let $ = getApp().$
let _this
let pageIndex = 1
let pageSize = 5
let inviteQuery = getApp().$.request.inviteQuery()
let inviteCount = getApp().$.request.inviteCount()
const STATE = {
  '0': { text: '未审核', class: 'cell-state-unanswered' },
  '1': { text: '审核未通过', class: 'cell-state-rejected' },
  '2': { text: '未答复', class: 'cell-state-unanswered' },
  '3': { text: '拒绝', class: 'cell-state-rejected' },
  '4': { text: '同意', class: 'cell-state-agreed' },
  '5': { text: '赴约', class: 'cell-state-agreed' },
  '6': { text: '爽约', class: 'cell-state-rejected' },
  '7': { text: '取消', class: 'cell-state-unanswered' },
  '8': { text: '删除', class: 'cell-state-rejected' },
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: "待处理",
    filter: '已完成',
    // filter_open:'filter-open':显示条件下拉
    'filter_open': ''
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
    let index = _this.data.tab_index
    _this.setData({
      InvitationInfoExhi: [],
      STATE
    })
    _this.setData({
      matchVInfo: []
    })
    _this.filter(index)
  },
  filter(index) {

    let page = {
      pageIndex,
      pageSize
    }
    let data = {}
    if (index == "待处理") {
      data = {
        "$or": [{ "State": "0" }, { "State": "2" }]
      }
    } else if (index == "已完成") {
      data = { 
        "State": { "$nin": ["0", "2"] }
      }
    }
    let user = wx.getStorageSync("userInfo")
    $.request.InvitationInfoExhi().getAll(data, page).then(res => {
      if (res.resCode == 0 || res.resCode == 10000) {
        let user = wx.getStorageSync("userInfo")
        let result = res.result
        console.log(user)
        let InvitationInfoExhi = (_this.data.InvitationInfoExhi == null ? [] : _this.data.InvitationInfoExhi).concat(result)
        for (let i of InvitationInfoExhi) {
          if (user.ContactRecordId == i.InitatorChild[0].RecordId) {
            
            i.status = "0"
          }
          if (user.ContactRecordId == i.ReceiverChild[0].RecordId) {
           
            i.status = "1"
          }
        }
        for (let i of InvitationInfoExhi) {
          let d = i.MeetingTimeDate.substr(i.MeetingTimeDate.indexOf("-") + 1).replace("-", "/")
          // let dd = d.substr(0, d.indexOf("/"))
          // console.log(dd)
          // let cc = d.substr(d.indexOf("/"))
          // if (Number(dd) < 10) {
          //   dd = "0" + dd
          // }
          // if (Number(cc) < 10) {
          //   cc = "0" + cc
          // }
          // i.MeetingTimeDate = (dd + "" + cc)
          i.MeetingTimeDate = d
          i.MeetingTimeStart = i.MeetingTimeStart.substr(i.MeetingTimeStart.indexOf(":") - 2 )
          if (i.MeetingTimeEnd.length < 3) {
            i.MeetingTimeEnd = i.MeetingTimeEnd + ":00"
          }
        }
        console.log(InvitationInfoExhi)
        _this.setData({
          InvitationInfoExhi
        })
        wx.setStorageSync('InvitationInfoExhi', InvitationInfoExhi)
      }
    })
    
    $.request.matchVInfo().getDate(data, page).then(res => {

      if (res.resCode == 0 || res.resCode == 10000) {
        let user = wx.getStorageSync("userInfo")
        let result = res.result
        console.log(user)
        let matchVInfo = (_this.data.matchVInfo == null ? [] : _this.data.matchVInfo).concat(result)
        console.log(matchVInfo)
        let matchVInfoArray = []
        for (let i of matchVInfo) {
          console.log(i)
          if (i.VisitorReceiver != undefined) {
            i.fettle = "观众"

            if (i.InitatorChild[0].RecordId == user.ContactRecordId) {
              // console.log("ggggggggggggggggggggg")
              i.status = "0"
            }
            if (i.VisitorReceiver[0].RecordId == user.ContactRecordId) {
              i.status = "1"
            }
            matchVInfoArray.push(i)
          } else if (i.VisitorInitator != undefined) {
            i.fettle = "观众"

            if (i.ReceiverChild[0].RecordId == user.ContactRecordId) {
              // console.log("ggggggggggggggggggggg")
              i.status = "0"
            }
            if (i.VisitorInitator[0].RecordId == user.ContactRecordId) {
              i.status = "1"
            }
            matchVInfoArray.push(i)
          }
        }
        for (let i of matchVInfoArray) {
          let d = i.MeetingTimeDate.substr(i.MeetingTimeDate.indexOf("-") + 1).replace("-", "/")
          // let dd = d.substr(0, d.indexOf("/"))
          // console.log(dd)
          // let cc = d.substr(d.indexOf("/"))
          // if (Number(dd) < 10) {
          //   dd = "0" + dd
          // }
          // if (Number(cc) < 10) {
          //   cc = "0" + cc
          // }
          // i.MeetingTimeDate = (dd + "" + cc)
          i.MeetingTimeDate = d
          i.MeetingTimeStart = i.MeetingTimeStart.substr(0, 5)
          if (i.MeetingTimeEnd.length < 3){
            i.MeetingTimeEnd = i.MeetingTimeEnd + ":00"
          }
        }
        console.log(matchVInfoArray)
        _this.setData({
          matchVInfo: matchVInfoArray
        })
        console.log("3333333333333")
        console.log(_this.data.matchVInfo)
        wx.removeStorageSync("matchVInfo")
        wx.setStorageSync("matchVInfo", matchVInfo)
      }
    })

  },
  onDataProcessing() {

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
  onTabSwitch: function (e) {
    _this.setData({
      tab_index: e.currentTarget.dataset.index
    })
    _this.setData({
      InvitationInfoExhi: []
    })
    _this.setData({
      matchVInfo: []
    })
    let index = _this.data.tab_index
    _this.filter(index)
  },
  /**
   * 取消已发送约请
   */
  // onCountermand: function () {
  //   wx.showModal({
  //     title: "确定取消该约请吗?",
  //     cancelText: "考虑一下",
  //     confirmText: "确定取消",
  //     success: function (res) {
  //       if (res.confirm) {
          
  //       } else if (res.cancel) {

  //       }
  //     }
  //   })
  // },
  /**
   * 拒绝
   * 
   * @param {any} e 
   */
  // onReject(e) {
  //   let reject_invite = {
  //     id: e.currentTarget.dataset.id,
  //     isShow: true,//是否显示
  //     value: '',
  //     list: ['敏感词', '身份不匹配']
  //   }
  //   // this.setData({ reject_invite });
  // },
  // onAccept(e) {
  //   let id = e.currentTarget.dataset.id;
  //   let State = "4";
  //   this.setState(id, { State });
  // },
  // setState(id, setValue) {
  //   this.$.wxRequest.update().invitationInfo(id, setValue).then(res => {
  //     if (res.resCode === 0) {
  //       _this.getFun();
  //     } else {
  //       this.$.service.showToast({ title: '操作失败！' });
  //     }
  //   })
  // },
  /**
 * 取消约请
 * 
 * @param {any} e 
 */
  // onCancel(e) {
  //   let id = e.currentTarget.dataset.id;
  //   let State = "7";
  //   this.setState(id, { State });
  // },
  // onDelete(e) {
  //   let id = e.currentTarget.dataset.id;
  //   this.$.wxRequest.delete().invitationInfo(id).then(res => {
  //     if (res.resCode === 0) {
  //       _this.getFun();
  //     } else {
  //       this.$.service.showToast({ title: '删除失败！' });
  //     }
  //   })
  // },
  // onDetail(e) {
  //   let id = e.currentTarget.dataset.id;
  //   let info = this.list.filter(f => f.RecordId === id)[0];
  //   this.$.gc.set(this.$.KEY.INVITE, info || {});
  //   wx.navigateTo({ url: '/pages/match/detail/detail' })
  // },
  reject_inviteCancel() {
    let reject_invite = this.data.reject_invite;
    reject_invite.isShow = false;
    this.setData({ reject_invite });
  },
  // reject_inviteConfirm(e) {
  //   // e.detail = {
  //   //   value: "身份不匹配",//选择常用（或输入的值）
  //   //   index: 1,//选择常用实返回
  //   // }
  //   let reject_invite = this.data.reject_invite;
  //   let id = e.detail.inviteId;
  //   let State = "3";
  //   let Remark = e.detail.value;
  //   this.setState(id, { State, Remark });
  //   reject_invite.isShow = false;
  //   this.setData({ reject_invite });

  // },
  /**
   * 拒绝
   */
  onReject(e) {
    // let dataJson = {}
    // dataJson.id = e.currentTarget.dataset.id;
    // dataJson.State = "3";
    console.log(e)
    // console.log(dataJson)
    let reid = e.currentTarget.dataset.id
    console.log(_this.data.InvitationInfoExhi)
    console.log(_this.data.matchVInfo)
    let fettle
    for (let i of _this.data.InvitationInfoExhi){
      if (i.RecordId == reid){
        fettle = "展商"
      }
    }
    for (let i of _this.data.matchVInfo) {
      if (i.RecordId == reid) {
        fettle = "观众"
      }
    }
    let reject_invite = {
      id: reid,
      isShow: true,//是否显示
      value: '',
      list: ['敏感词', '身份不匹配'],
      feet: fettle
    }
    console.log(reject_invite)
    this.setData({ reject_invite });
    // this.setState(dataJson);
  },
/**
 * 接受
 */
  onAccept(e) {
    let dataJson  = {}
    dataJson.id = e.currentTarget.dataset.id;
    dataJson.State = "4";
    console.log(e)
    console.log(dataJson)
    this.setState(dataJson);
  },
  /**
   * 取消
   */
  onCancel(e) {
    let dataJson = {}
    dataJson.id = e.currentTarget.dataset.id;
    dataJson.State = "7";
    console.log(e)
    console.log(dataJson)
    this.setState(dataJson);
  },
  /**
   * 删除
   */
  onDelete(e) {
    let dataJson = {}
    dataJson.id = e.currentTarget.dataset.id;
    dataJson.State = "8";
    console.log(e)
    console.log(dataJson)
    this.setState(dataJson);
  },
  setState(dataJson) {
    $.request.InvitationInfoExhi().put(dataJson).then(res=>{
      if (res.resCode == 0) {
        console.log(res)
      _this.onShow()
      }
    })
  },


})
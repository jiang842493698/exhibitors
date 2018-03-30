// pages/my/cards/detail/detail.js
let $ = getApp().$;
let linkLog = $.request.linkLog();
let linkRemind = $.request.linkRemind();
let matchExLogDelete = $.request.matchExLogDelete()
let id;
let info;
let group
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: 'log',
    icons: {
      'Phone': 'icon_col_mob',
      'Address': 'icon-dizhi',
      'Email': 'icon-email',
      'Department': '',
      'Company': '',
      'Job': '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id;
    group = options.group;
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
    this.setData({
      group
    })
    console.log(id)

    $.wxDataStorage.GET('LINKS', (res) => {
      console.log("=================================")
      let links = res;
      let link = links.filter(p => p.RecordId === id)[0];

      console.log(link)
      try {
        
        let mob = link.Phone.filter(f => f.label === '手机')[0];
        if (mob) {
          link.Phone = link.Phone.filter(f => f.label !== '手机');
          link.Phone.splice(0, 0, mob);
          if (/^1[3|4|5|7|8][0-9]{9}$/.test(mob.value)) {
            link.isHaveSendMsg = true;
          }
        }
      } catch (error) {

      }
      info = link;
      console.log("link===")
      console.log(link)
      this.setData({
        link: link
      })
      this.load_logs();
      this.load_reminds();
    })
  },
  /*获取日志*/
  load_logs: function () {
    let _this = this;
    console.log("获取日志")
    console.log(id)
    linkLog.post(id).then(res => {
      if (res.resCode == 0) {
        console.log("bbbbbbbbbbbb")
        _this.setData({
          logs: res.result
        })
      }
    });
  },
  load_reminds() {
    let _this = this;
    linkRemind.post(id).then(res => {
      if (res.resCode == 0) {
        console.log("7777777777777777")
        console.log(res.result)
        let result = res.result
        let reminds = result.sort((a, b) => new Date(b.RemindDate) > new Date(a.RemindDate))
        let remindsArray=[]
        for(let r of reminds){
          if (new Date(r.RemindDate).getTime()>new Date().getTime()){
            remindsArray.push(r)
          }
        }
        console.log(remindsArray)
        _this.setData({
          reminds: reminds
        })
      }
    })
  },
  onTabSwitch: function (e) {
    var index = e.currentTarget.dataset.index;

    this.setData({
      tab_index: index
    })
  },
  onAddLinkLog: function () {

    $.gc.set('links', [this.data.link]);
    $.service.navigateTo('/pages/customer/link-log/edit/edit', { key: 'links' });

    // let layer = new Layer(this);
    // layer.addlog(res => {
    //     console.log(res);
    //     if (res.type === 'voice') {
    //     } else {
    //       //{info:'日志信息':level:1,ContactInfo:'联系人Id'}
    //         let data = {};
    //         data.ContactInfo = id;
    //         data.level = 1;
    //         data.info = res.value;
    //         if (!data.info) {
    //             $.service.modal({
    //                 title: '提示',
    //                 content: '添加日志内容不能为空',
    //             })
    //             return;
    //         }
    //         linkLog.post(data).then(res=>{
    //           if(res.StatusCode===1){
    //             $.service.alert({
    //               title: '添加成功'
    //           })
    //             this.load_logs();
    //           }
    //         })
    //     }
    // })
  },
  onAddLinkRemind() {
    $.service.navigateTo('/pages/customer/link-remind/edit/edit', { linkId: id });
  },
  onEditRemind(e) {
    var index = e.currentTarget.dataset.index;
    console.log("获取单个提醒")
    console.log(index)
    var remind = this.data.reminds[index];
    console.log(remind)
    $.service.navigateTo('/pages/customer/link-remind/edit/edit', { type: 'update', linkId: id, remind: remind.RecordId });
  },

  OnCall(e) {
    wx.showModal({
      title: 'Call他手机',
      content: '是否确认拨打此电话',
      success : function(res){
        if(res.confirm){
          wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.tel
          })
        }
      }
    })
    
  },
  touchStart(e) {
    console.log()
  },

  onExhibitorLog(e) {

    let _this = this
    let index = e.currentTarget.dataset.type;
    console.log(this.data.logs)
    let logJson = this.data.logs[index]
    let startTime = new Date().getTime();
    wx.showModal({
      title: '提示',
      content: '是否删除',
      confirmText: "确认删除",//确认
      cancelText: "取消",//取消
      success: function (e) {
        console.log("删除提示")
        console.log(e)
        if (e.confirm) {
          console.log(1111)
          matchExLogDelete.post(logJson.RecordId).then(res => {
            if (res.resCode == 0) {
              wx.showToast({
                title: '删除成功',
                success: function () {
                  _this.onShow()
                }
              });

            } else {
              wx.showToast({
                title: '删除失败',
              });
            }
          })
        } else {
          return
        }
        return
      }
    })
  },
  onSendSms(e) {
    console.log(e)
    console.log(info)
    console.log(e.currentTarget.dataset.tel)
    // let data = [];
    let phone = info.Phone.filter(f => f.label === '手机')[0];
    // data.push({
    //   Phone: phone,
    //   Name: info.Name,
    //   Company: info.Company,
    //   Job: info.Job,

    // })
    // console.log(data)
    // console.log(data[0])
    let usernotes = {}
    usernotes.CompanyName = info.Company[0].value
    usernotes.Job = info.Job[0].value
    usernotes.Mob = phone.value
    usernotes.Name = info.Name
    let usernote = JSON.stringify(usernotes)
    console.log(usernote)
    $.gc.set('PageIndex', 0);
    // $.gc.set('selectedItems', data);
    $.service.navigateTo('/pages/my/cards/select/send-sms/select-temp/select-temp?usernote='+usernote, { key: 'selectedItems', url: '/pages/my/cards//index' });
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
  onDelete(e){
    wx.showModal({
      title: '删除名片',
      content: '确认删除该名片？',
      success : function(es){
        if(es.confirm){
          let index = e.currentTarget.dataset.type;
          let data = {
            id: index
          }
          $.request.link().delete(data).then(res=>{
            if(res.resCode==0){
              wx.navigateBack({
                delta : -1
              })
            }
          })
        }
      }
    })
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
  OnTouchStart(e) {
    this.startY = e.touches[0].clientY;
  },
  OnTouchEnd(e) {
    let endY = e.changedTouches[0].clientY;
    if (endY - this.startY > 50 && !this.data.isMask) {
      this.setData({
        isMask: true
      })
    } else if (this.startY - endY > 50 && this.data.isMask) {
      this.setData({
        isMask: false
      })
    }
  },
  onMore() {
    this.setData({
      isMore: !this.data.isMore
    });
  }
})
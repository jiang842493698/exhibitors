// pages/match/search/search.js

let $ = getApp().$;
let app = getApp();
let request = $.request
let matchEx = $.request.matchEx();
let matchExCount = $.request.matchExCount();
let _this;
let pageIndex = 1
let pageSize = 5
let value
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filter: ''
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
      list: []
    })
    let data = {}
    this.Filter(data);
  },
  onFilterInput: function (e) {
    value = e.detail.value;
    _this.setData({
      list: []
    })
    let data = {
      Name: `/${value}/`
    }
    this.Filter(data);
  },


  Filter: function (data, page) {
    let list = []
    $.request.matchVisitor().post(data, page).then(res => {
      if (res.resCode == 0) {
        list = res.result


        let listData = _this.data.list == null ? [] : _this.data.list
        let listArray = list.concat(listData)

        console.log(list)
        _this.setData({
          list: listArray,
          count: listArray.length
        })
        console.log("bbbbbbbbbbb")
      }

    })

  },
  onTapSearch: function () {
    _this.setData({
      list: []
    })
    if (value.trim() == "") {
      $.service.alert({ title: '请输入搜索内容', image: '/assets/images/icon/fail.png' });
      return
    } else {
      let data = {
        Name: `/${value}/`
      }
      let page = {
        pageIndex,
        pageSize
      }
      console.log("******************---------------")
      console.log(data)
      this.Filter(data, page);
    }
  },
  onReachBottom: function () {
    let count = _this.data.count
    let pages = Math.floor((count - 1) / pageSize + 1)
    let filter = _this.data.filter
    console.log(pageIndex)
    console.log(pages)
    if (pageIndex >= pages) {
      wx.stopPullDownRefresh()
    } else {
      ++pageIndex
      let data = {
        "$or": [{ "CompanyName": `/${filter}/` }, { Name: `/${filter}/` }]
      }
      let page = {
        pageIndex,
        pageSize
      }
      this.Filter(data, page);
    }
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
  onInviteTa(e) {
    let userInfo = wx.getStorageSync('userInfo')
    var index = e.currentTarget.dataset.index;
    let infos = _this.data.list
    console.log("abcd")
    console.log(infos)
    let info = _this.data.list[index];
    let links = []

    links.push({ name: info.Name, job: info.Job })
    let data = {
      name: "ETV"
    }
    console.log(links)
    let exinfo = wx.getStorageSync("exInfo")
    $.request.getTemplate().getName(data).then(ress => {
      if (ress.resCode == 0) {
        let result = ress.result[0].Content
        console.log("PPPPPPPPPPP")
        console.log(result)
        let content = result.replace("${邀请人公司}", info.CompanyName).replace("${邀请人}", userInfo.Name).replace("${受邀人}", links[0].name).replace("${展会名称}", exinfo.ExName).replace("${见面地点}", userInfo.BoothNo).replace("${受邀人职务}", info.Job).replace("${邀请人职务}", userInfo.Job)
        console.log(content)
        links[0].checked = true
        let invite = {
          data: {
            type: 1,//0展商 1买家
            companyName: info.CompanyName,
            id: info.RecordId,
            links: links,
            addrs: [{ value: userInfo.BoothNo, checked: true }],
            fettle: "观众",
            content,
          },
          isShow: true,//控制弹层是否显示

        }
        console.log(invite)

        _this.setData({
          invite: invite
        })

      }

    })


  },
  inviteCancel() {
    let invite = this.data.invite;
    invite.isShow = false;
    this.setData({ invite });
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

  }
})
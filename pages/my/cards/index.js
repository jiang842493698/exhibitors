// pages/customer/index.js

let $ = getApp().$;

let group = $.request.group();

let link = $.request.link();
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //操作下拉列表是否显示
    cao_zuo: false,
    //当前展开组的序号
    group_index: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    $.wxDataStorage.Refresh('LINKS');
    $.wxDataStorage.Refresh('LINK_GROUPS');
    

    let _groups, _links;
    let _not_group = { name: '无标签', id: '', list: [] };
    var groups = [];

    let cellFun = () => {
      console.log("000000000000000000000000000000000000000000000000")
      console.log(_groups)
      if (_groups && _links) {
        console.log("===================")
        console.log(_groups)
        console.log(_links)
        var a = [];
        _groups.forEach(g => {
          let item = {
            name: g.Name,
            id: g.RecordId,
            list: []
          };
          groups.push(item);
        });
      }
      console.log("groups111")
      console.log(groups)

      _links.forEach(l => {
        // console.log("aaaaaa")
        // console.log(l)
        // console.log(l.ContactGroupId)
        if (l.ContactGroupId && l.ContactGroupId.length > 0) {
          console.log("888888888")
          l.ContactGroupId.forEach(m => {
            console.log(m)
            console.log(111111111)
            console.log(groups.filter(f => console.log(f.id)))
            let g = groups.filter(f => f.id == m);
            console.log(g)
            if (g && g.length > 0) {
              g[0].list.push(l);
            } else {
              _not_group.list.push(l);
            }
          })

        } else {
          _not_group.list.push(l);
        }

      });
      groups.splice(0, 0, _not_group)
      console.log("11111111111111111111111111")
      console.log(groups)
      wx.setStorageSync('CUSTOMERS', groups);
      _this.setData({
        groups
      });
      wx.stopPullDownRefresh();
    }

    $.wxDataStorage.GET('LINKS', (res) => {
      _links = res;
      $.wxDataStorage.GET('LINK_GROUPS', (data) => {
        console.log("9999999999999999999999999999999999999999999")
        console.log(data)
        _groups = data;
        cellFun();
      })
    })
    _this.setData({
      cao_zuo: false
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
    $.wxDataStorage.Refresh('LINKS');
    $.wxDataStorage.Refresh('LINK_GROUPS');
    _this.onShow();
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
  /**
   * 操作点击 显示/隐藏 下拉
   * 
   */
  onCaoZuoDorpdown: function () {
    this.setData({
      cao_zuo: !this.data.cao_zuo
    })
  },
  /**
   * 客户分组 显示/隐藏
   * 
   */
  onGroupPull: function (e) {
    let group_index = this.data.group_index;
    let index = e.currentTarget.dataset.index;
    if (group_index === index) {
      index = -1;
    }
    this.setData({
      group_index: index
    })
  },
  InviteOk: function (res) {
    console.log(res);
  }
})

let _this;
let $ = getApp().$;
let matchVisitor = $.request.matchVisitor();

let matach_list;
// 约请弹窗参数
let invite_ta = {
  type: 2,
  contact: '',
  job: '',
  company: '',
  addr: '',
  msg: '',
  show: false
}
let pageSize = 7
let pageIndex = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    filter_dropdown: {
      area: false,
      type: false,
      order: false,
    },
    matach_list: [],
    filter: {
      area: '',
      type: '',
      order: {},
      list: {
        areas: [],//区域
        types: [],//分类
        orders: [{ name: '姓名', value: 'Name' }, { name: '公司名称', value: 'CompanyName' }],
      }
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;

    this.setData({
      matach_list: []
    })
    pageIndex = 1;
    this.matchVisitorCount()
    this.matchVisitorData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  inviteCancel() {
    let invite = this.data.invite;
    invite.isShow = false;
    this.setData({ invite });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  matchVisitorCount: function () {
    let data = {}
    $.request.matchVisitorCount().post(data).then(res => {
      console.log(res)
      if (res.resCode == 0) {
        _this.data.count = res.result
      }
    })

  },
  onInvita(){
    
  },
  matchVisitorData: function () {
    let _this = this
    let filter = _this.data.filter;
    console.log("拉客信息")
    console.log(filter)
    invite_ta.show = false;
    console.log(pageIndex)
    let data = {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
    console.log(data)
    matchVisitor.post(data).then(resd => {
      matach_list = resd.result;
      matach_list.forEach(e => {

        if (filter.list.areas.filter(f => f === e.Province).length === 0) {
          if (e.Province) {
            filter.list.areas.push(e.Province);
          }
        }

        if (filter.list.types.filter(f => f === e.Industry).length === 0) {
          if (e.Industry) {
            filter.list.types.push(e.Industry);
          }

        }
      });
      this.setData({ invite_ta, filter })
      // this.filter();
      console.log("两个比较")
      let matach_listArray = _this.data.matach_list.concat(matach_list)
      console.log(matach_listArray)
      wx.removeStorageSync("MATCH_VISITORS")
      this.setData({
        matach_list: matach_listArray
      })

      wx.setStorage({
        key: 'MATCH_VISITORS',
        data: matach_listArray,
      })
      console.log(_this.data.matach_list)
      console.log(111)
      console.log(_this.data.matach_list)
      // wx.stopPullDownRefresh();
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
    // $.wxDataStorage.Refresh('MATCH_VISITORS');
    _this.filter(pageIndex);
    --pageIndex
    this.matchVisitorData();
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
    // _this.filter(++pageIndex);
    let pageCount = _this.data.count
    let pageIndexSum = (pageCount - 1) / pageSize + 1
    ++pageIndex
    if (pageIndexSum <= pageIndex) {
      pageIndex = Math.floor(pageIndexSum)
      wx.showToast({
        title: '下面没有了',
        icon: "loading"
      })
    } else {
      _this.matchVisitorData();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {


  },
  /**
   * 条件 下拉 显示/隐藏
   * 
   * @param {any} e 
   */
  onFilterPull: function (e) {
    let type = e.currentTarget.dataset.type;
    let filter_dropdown = this.data.filter_dropdown;
    if (type == "area"){
      this.setData({
        filter_dropdown: {
          area: !filter_dropdown[type],
          type: false,
          order: false,
        }
      })
    }
    if (type == "type"){
      this.setData({
        filter_dropdown: {
          area: false,
          type: !filter_dropdown[type],
          order: false,
        }
      })
    }
    if (type == "order"){
      this.setData({
        filter_dropdown: {
          area: false,
          type: false,
          order: !filter_dropdown[type],
        }
      })
    }
  },
  a: function () {
    this.setData({
      filter_dropdown: {
        area: false,
        type: false,
        order: false,
      }
    })
  },

  /**
   * 条件选择事件
   * 
   * @param {any} e 
   */
  onFilterSelect: function (e) {
    console.log("条件选择事件")
    let filter = this.data.filter;
    let filter_dropdown = this.data.filter_dropdown;
    let type = e.currentTarget.dataset.type;
    let value = e.currentTarget.dataset.value;
    console.log(type)
    console.log(value)
    console.log(filter_dropdown)
    filter_dropdown[type] = false;

    if (type === 'order') {
      filter[type] = { name: e.currentTarget.dataset.name, value };
    } else {
      filter[type] = value;
    }
    let list = [];
    matach_list.forEach(e => {
      if ((filter.area === '' || filter.area === e.Province) && (filter.type === '' || filter.type === e.Industry)) {
        list.push(e);
      }
    });

    if (filter.order.value) {
      list.sort((a, b) => {
        return b[filter.order.value].localeCompare(a[filter.order.value]);
      })
    }

    this.setData({
      filter,
      filter_dropdown
    })
    this.filter();
  },

  filter(pageIndex = 1) {
    console.log("pageIndex")
    console.log(pageIndex)
    let filter = this.data.filter;
    let list = [];
    console.log(filter)
    matach_list.forEach(e => {
      if ((filter.area === '' || filter.area === e.Province) && (filter.type === '' || filter.type === e.Industry)) {
        list.push(e);
      }
    });
    console.log(matach_list)
    if (filter.order.value) {
      list.sort((a, b) => {
        return b[filter.order.value].localeCompare(a[filter.order.value]);
      })
    }
    console.log(list)
    this.setData({
      matach_list: list.slice(0, 10 * pageIndex)
    })
  },
  /**
   * 约请
   * 
   * @param {any} e 
   */


  // onInviteTa: function (e) {
  //   console.log("11111111111111111111111111111111111111111111111111111")
  //   let userInfo = wx.getStorageSync('userInfo')
  //   var index = e.currentTarget.dataset.index;
  //   let infos = _this.data.matach_list
  //   console.log("abcd")
  //   console.log(infos)
  //   let info = _this.data.matach_list[index];
  //   let links=[]
    
  //   links.push({ name: info.Name, job: info.Job})
  //   let data = {
  //     name : "ETV"
  //   }
  //   console.log(links)
  //   let exinfo = wx.getStorageSync("exInfo")
  //   $.request.getTemplate().getName(data).then(ress=>{
  //     if (ress.resCode == 0){
  //       let result = ress.result[0].Content

  //       let content = result.replace("${邀请人公司}", info.CompanyName).replace("${邀请人}", userInfo.Name).replace("${受邀人}", links[0].name).replace("${展会名称}", exinfo.ExName).replace("${见面地点}", userInfo.BoothNo).replace("${受邀人职务}", info.Job).replace("${邀请人职务}", userInfo.Job)
  //       console.log(content)
  //       links[0].checked = true
  //       let invite = {
  //         data: {
  //           type: 1,//0展商 1买家
  //           companyName: info.CompanyName,
  //           id: info.RecordId,
  //           links: links,
  //           addrs: [{ value: userInfo.BoothNo, checked: true }],
  //           fettle : "观众",
  //           content,
  //         },
  //         isShow: true,//控制弹层是否显示

  //       }
  //       console.log(invite)

  //       _this.setData({
  //         invite: invite
  //       })

  //     }

  //   })

    
  // },
  onInviteTa: function (e) {
    console.log("11111111111111111111111111111111111111111111111111111")
    let userInfo = wx.getStorageSync('userInfo')
    var index = e.currentTarget.dataset.index;
    let infos = _this.data.matach_list
    console.log("abcd")
    console.log(infos)
    let info = _this.data.matach_list[index];
    let links = []

    links.push({ companyName: info.CompanyName, name: info.Name, job: info.Job })
    let data = {
      name: "ETV"
    }
    console.log(links)
    let exinfo = wx.getStorageSync("exInfo")
    $.request.getTemplate().getName(data).then(ress => {
      if (ress.resCode == 0) {
        let result = ress.result[0].Content

        let content = result.replace("${邀请人公司}", info.CompanyName).replace("${邀请人}", userInfo.Name).replace("${受邀人}", links[0].name).replace("${展会名称}", exinfo.ExName).replace("${见面地点}", userInfo.BoothNo).replace("${受邀人职务}", info.Job).replace("${邀请人职务}", userInfo.Job)
        console.log(content)
        links[0].checked = true
        let invite = {
          data: {
            type: 1,//0展商 1买家
            invitationfirm: links[0].companyName,
            companyName: userInfo.CompanyName,
            id: info.RecordId,
            links: links,
            addrs: [{ value: userInfo.BoothNo, checked: true }],
            fettle: "观众",
            content,
            result,
            inviteName: userInfo.Name,
            inviteJob: userInfo.Job
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
  /**
   * 约请确认
   * 
   * @param {any} e 
   */
  InviteOk: function (e) {
    console.log("约请确认")
    console.log(invite_ta)
    console.log(invite_ta.id)
    $.request.matchVInfo().post({ "Type": "1", "Receiver": invite_ta.id, "State": "0" }).then(res => {
      if (res.resCode == 0) {
        $.service.showToast({ title: '约请已发送' });
      }
    })
  },
  
  // onNavigator : function(e){
  //   console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
  //   console.log(e)
  //   console.log(e.currentTarget.dataset.bing)
  //   let item = e.currentTarget.dataset.bing
  //   if (item){
  //     wx.setStorage({
  //       key: 'MATCH_VISITORS',
  //       data: item,
  //     })
  //   }
  // }

})


let _this;
let $ = getApp().$;
let matchEx = $.request.matchEx();
let matchExCount = $.request.matchExCount();
let match_exs;
let pageIndex = 1;
let pageSize = 5
let data = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filter_dropdown: {
      area: false,
      type: false,
      order: false,
    },
    filter: {
      area: '',
      type: '',
      order: {},
      list: {
        areas: [],
        types: [],
        orders:[{ name: '9-18', value: '1' }, { name: '18-27', value: '2' }, { name: '27-54', value: '3' }, { name: '>54', value: '4' }],
      }
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    _this.setData({
      match_exs: []
    })
    this.filterCount(data)
    this.filter(data);
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
   * 查询展商数量
   * 条件 data = {}
   *
   */
  filterCount(data) {
    matchExCount.get(data).then(res => {
      if (res.resCode == 0) {
        _this.setData({
          count: Number(res.result)
        })
      }
    })
  },

  /**
   * 条件 下拉 显示/隐藏
   * 
   * @param {any} e 
   */
  a: function () {
    this.setData({
      filter_dropdown: {
        area: false,
        type: false,
        order: false,
      }
    })
  },
  onFilterPull: function (e) {
    let type = e.currentTarget.dataset.type;
    let filter_dropdown = this.data.filter_dropdown;
    if (type == "area") {
      this.setData({
        filter_dropdown: {
          area: !filter_dropdown[type],
          type: false,
          order: false,
        }
      })
    }
    if (type == "type") {
      this.setData({
        filter_dropdown: {
          area: false,
          type: !filter_dropdown[type],
          order: false,
        }
      })
    }
    if (type == "order") {
      this.setData({
        filter_dropdown: {
          area: false,
          type: false,
          order: !filter_dropdown[type],
        }
      })
    }
  },
  // /**
  //  * 条件选择事件
  //  * 
  //  * @param {any} e 
  //  */
  // onIsSelect : function(){

  // },
  onFilterSelect: function (e) {
    console.log("查询数据")
    console.log(e);
    _this.setData({
      match_exs:[]
    })
    pageIndex = 1;
    let filter = this.data.filter;
    let filter_dropdown = this.data.filter_dropdown;
    let type = e.currentTarget.dataset.type;
    let value = e.currentTarget.dataset.value;
    filter[type] = { name: e.currentTarget.dataset.name, value };
    filter_dropdown[type] = false;

    if (type === 'order') {
      if (value.length == 0){
        delete data.ShowArea;
      }else{
        data.ShowArea = value;
      }
    }

    if (type == 'area') {
      if (value.length == 0) {
        delete data.Province;
      } else {
        data.Province = "/" + value + "/";
      }
    }

    if (type == "type") {
      if (value.length == 0) {
        delete data.Categories;
      } else {
        data.Categories = "/" + value + "/";
      }
    }
    this.setData({
      filter,
      filter_dropdown
    })
    this.filter(data);
  },
  
  filter(data) {
    console.log("当前的页面")
    console.log(pageIndex)
    let page = {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
    let filter = _this.data.filter;
    console.log("abcdefg")
    console.log(filter)
    console.log(page)
    console.log(data)
    matchEx.get(data, page).then(res => {
      match_exs = res.result;
      console.log("1111")
      console.log(match_exs)
      match_exs.forEach(e => {
        e.Imgs = [];
        if (!e.logo) {
          e.logo = '/assets/images/other/not_logo.png'
        }
        if (e.ProductList && Array.isArray(e.ProductList)) {
          e.ProductList.forEach(p => {
            if (e.Imgs.length < 3) e.Imgs.push(p.PicList[0].PicPath)
          })
        }
        if (filter.list.areas.filter(f => f === e.Province).length === 0) {
          if (e.Province) {
            filter.list.areas.push(e.Province);
          }
        }
        if (filter.list.types.filter(f => f === e.Categories).length === 0) {
          if (e.Categories) {
            filter.list.types.push(e.Categories);
          }
        }
      });
    

      if (!_this.data.match_exs) {
        _this.setData({ match_exs });
        // wx.setStorage({
        //   key: 'MATCH_EXS',
        //   data: match_exs,
        // })
      } else {
        let datamatch_exs = _this.data.match_exs
        let match_exsArray = datamatch_exs.concat(match_exs)
        // wx.removeStorageSync("MATCH_EXS")
        _this.setData({ match_exs: match_exsArray });
        // wx.setStorage({
        //   key: 'MATCH_EXS',
        //   data: match_exsArray,
        // })
      }

      _this.setData({ filter });
    })
  },
 

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // _this.filter(++pageIndex);
    let PageCount = _this.data.Count
    let pageIndexNum = Math.floor((PageCount - 1) / pageSize + 1)
    console.log(PageCount)
    console.log(pageIndexNum)
    console.log("上拉")
    if (pageIndex >= pageIndexNum) {
      wx.showToast({
        title: '下面没有了',
      })
    } else {
      ++pageIndex
      _this.filter(data);
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      _this.onLoad();
    }, 1500)
  },
})
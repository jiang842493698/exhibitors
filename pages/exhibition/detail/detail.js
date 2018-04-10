let $ = getApp().$;
let _this;
let id;
let tenantId;
let matchExLog = $.request.matchExLog();
let visitors = $.request.Visitors()
let productList = {}
let aaa = 222
console.log(`${aaa}`)
// 约请弹窗参数
let invite_ta = {
  type: 3,
  contact: '',
  job: '',
  company: '',
  addrs: [],
  msg: '',
  show: false
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: 'log',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    id = options.id;
    _this.onFuilter();
    _this.vis
  },
  onFuilter() {
    console.log(id)
    $.request.ExhibitorInfo1().get(id).then(res => {

      if (res.resCode == 0) {
        console.log("展商详情数据")
        console.log(res.result)
        let info = res.result[0];
        console.log(info)
        tenantId = info.TenantId
        console.log(tenantId)
        _this.setData({
          info
        })

        /**
         * 添加浏览信息
         */
        let dataJson = { ExhibitorId: id }
        $.request.insert().visitInfo(dataJson);
      }
      let info = _this.data.info
      console.log(info.RecordId)
      $.request.SelectVisitorByRecord().get(info.RecordId, info.ExhibitionId).then(res => {
        if (res.resCode == 0) {
          console.log("访客列表")
          console.log(res.result)
          _this.setData({ visitInfo: res.result });
        }
      })
      console.log(tenantId)
      $.request.SelectExhibitsFromTenantId().get(tenantId).then(res => {
        if (res.resCode == 0) {
          productList = res.result;
          console.log("展品列表")
          console.log(productList)
          _this.setData({ productList })
        }
      })

      let data = {
        ExhibitionId: tenantId,
        ExhibitorId: id
      }
      console.log("data数据")
      console.log(data)
      $.request.matchExLog().get(data).then(res => {
        if (res.resCode == 0) {
          console.log("展商日志信息")
          console.log(data)

          let logs = res.result || [];
          console.log(logs)
          logs.sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
          _this.setData({
            logs
          })
          console.log(_this.data.logs)
        }
        let logs = res.result || [];
        for (let i of _this.data.logs) {
          let d = i.CreatedAt.substr(i.CreatedAt.indexOf("-") + 1).replace("-", "/")
          let dd = d.substr(0, d.indexOf("/"))
          let cc = d.substr(d.indexOf("/"))
          cc = cc.substr(1, cc.indexOf(":") - 3)
          let ee = d.substr(d.indexOf(":") - 3)
          // if (Number(dd) < 10) {
          //   dd = "0" + dd
          // }
          // if (Number(cc) < 10) {
          //   cc = "0" + cc
          // }
          i.CreatedAt = dd + "/" + cc + ee
        }
        _this.setData({
          logs
        })
      })

      // let productList = info.ProductList;
      if (productList.length > 4) {
        productList = productList.splice(4, productList.length - 4);
      }
      console.log("\\\\\\\\\\\\\\\\\\\\")
      // console.log(info)
      // console.log(info.logo)
      // console.log(info)
      console.log(productList)
      _this.setData({
        image: info.Logo == '' ? '/assets/images/other/not_logo.png' : info.Logo
      })

      _this.setData({ info, productList })
      let title = info.ShortName
      if (title == "" && title == null) {
        let title = info.CompanyName
      }
      wx.setNavigationBarTitle({
        title: title,
      })

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  photograph: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths[0]
        _this.setData({
          image: tempFilePaths
        })
        console.log("==============================")
        console.log(tempFilePaths)
        wx.showToast({
          title: '图片上传中',
        })
        wx.uploadFile({
          url: "https://deal.xiaovbao.cn/applet/album/upload",
          filePath: tempFilePaths,
          name: "jiangchao",
          success: function (ress) {
            var data = ress.data
            if (data.code == 0) {
              wx.showToast({
                title: '上传成功',
              })
              wx.showToast({
                title: '修改展商图片',
              })

            }
          },
          fail: function () {
            wx.showToast({
              title: '上传失败',
            })
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
          }
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    _this.onlogs()

    // _this.OnVisitors()
  },

  onlogs: function () {
    // let info = _this.data.info
    // console.log(info)
    // console.log(info.TenantId)
    // console.log(info.RecordId)


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
  onContentMore: function () {
    _this.setData({
      isContentMore: !_this.data.isContentMore || false
    })
  },

  onInviteTa: function (e) {
    let userInfo = wx.getStorageSync('userInfo')
    var index = e.currentTarget.dataset.index;
    let info = _this.data.info
    console.log("ppppppppppppppppppp")
    console.log(info)
    let infos = _this.data.info.ExhibitorContact;
    let datas = {
      ExhibitorId: id
    }

    let links = []
    let userInfos = _this.data.info
    console.log(infos)
    for (let inf of infos) {
      console.log(inf)
      links.push({ CompanyName: inf.CompanyName, name: inf.Name, job: inf.Job != null ? inf.Job : "经理", mob: inf.Phone, Linkid: inf.LinkId, id: inf.RecordId })
    }
    console.log("联系人")
    console.log(links)
    let data = {
      name: "ETE"
    }
    let exinfo = wx.getStorageSync("exInfo")
    $.request.getTemplate().getName(data).then(ress => {
      if (ress.resCode == 0) {
        let result = ress.result[0].Content
        let content = result.replace("${邀请人公司}", userInfo.CompanyName).replace("${邀请人}", userInfo.Name).replace("${受邀人}", links[0].name).replace("${展会名称}", exinfo.ExName).replace("${见面地点}", userInfo.BoothNo).replace("${受邀人职务}", infos[0].Job).replace("${邀请人职务}", userInfo.Job)

        links[0].checked = true
        console.log(content)
        let invite = {
          data: {
            type: 0,//0展商 1买家
            invitationfirm: links[0].CompanyName,
            companyName: userInfo.CompanyName,
            links: links,
            tenantId: userInfos.TenantId,
            recordId: userInfos.RecordId,
            addrs: [{ value: userInfo.BoothNo, checked: true }, { value: info.BoothNo }],
            fettle: "展商",
            content,
            result,
            inviteName: userInfo.Name,
            inviteJob: userInfo.Job
          },
          isShow: true,//控制弹层是否显示
        }

        _this.setData({
          invite: invite
        })
        console.log(this.data.invite)
      }
    })


  },
  // onInviteTa: function (e) {

  //   console.log("约请信息")
  //   console.log(e)
  //   let userInfo = wx.getStorageSync('userInfo')
  //   var index = e.currentTarget.dataset.index;
  //   let info = _this.data.info
  //   console.log(info)
  //   let infos = _this.data.info.LinkList;
  //   let datas = {
  //     ExhibitorId: id
  //   }
  //   let links = []
  //   let userInfos = _this.data.info
  //   console.log(userInfos)
  //   console.log(infos)
  //   for (let inf of infos) {
  //     console.log(inf)
  //     links.push({ name: inf.LinkName, job: inf.Job != null ? inf.Job : "经理", mob: inf.LinkMob, Linkid: inf.LinkId, id: inf.RecordId })
  //   }
  //   console.log("联系人")
  //   console.log(links)
  //   let data = {
  //     name: "ETE"
  //   }
  //   let exinfo = wx.getStorageSync("exInfo")

  //   $.request.getTemplate().getName(data).then(ress => {
  //     if (ress.resCode == 0) {
  //       let result = ress.result[0].Content
  //       console.log(result)
  //       let content = result.replace("${邀请人公司}", userInfo.CompanyName).replace("${邀请人职务}", userInfo.Job).replace("${邀请人}", userInfo.Name).replace("${受邀人}", links[0].name).replace("${受邀人职务}", links[0].job).replace("${展会名称}", exinfo.ExName).replace("${见面地点}", userInfo.BoothNo)

  //       links[0].checked = true
  //       console.log(content)
  //       let invite = {
  //         data: {
  //           type: 0,//0展商 1买家
  //           companyName: info.CompanyName,
  //           links: links,
  //           tenantId: userInfos.TenantId,
  //           recordId: userInfos.RecordId,
  //           addrs: [{ value: userInfo.BoothNo, checked: true }, { value: info.BoothNo }],
  //           fettle: "展商",
  //           content,
  //           result,
  //         },
  //         isShow: true,//控制弹层是否显示
  //       }

  //       _this.setData({
  //         invite: invite
  //       })
  //       console.log(this.data.invite)
  //     }
  //   })


  // },
  /**
   * 约请确认
   * 
   * @param {any} e 
   */
  InviteOk: function (e) {
    console.log(invite_ta)
    $.request.matchVInfo().post({ "Type": "1", "Receiver": invite_ta.id, "State": "1" }).then(res => {
      if (res.resCode == 0) {
        $.service.showToast({ title: '约请已发送' });
      }
    })
  },
  addrsRadioChange(e) {
    let userInfo = wx.getStorageSync('userInfo')
    let addrs = [{ name: userInfo.BoothNo, value: userInfo.BoothNo }, { name: info.BoothNo, value: info.BoothNo }];
    if (userInfo.BoothNo === info.BoothNo) {
      addrs.splice(1, 1);
    }
    if (e.detail.value === addrs[0].value) {
      addrs[0].checked = true;
    } else {
      addrs[1].checked = true;
    }
    invite_ta.addrs = addrs;
    invite_ta.msg = `${info.companyName}，您于${$.wxHelper.DateFormat(new Date(), 'MM月dd日')}收了${userInfo.CompanyName}的约请，TA希望在展位${e.detail.value}上会面，请登录智慧会展系统（微信小程序）接受或拒绝。`;
    this.setData({ invite_ta })
  },
  onTabSwitch: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      tab_index: index
    })
  },
  onExhibitorLog(e) {

    let _this = this
    let index = e.currentTarget.dataset.index;
    console.log(this.data.logs)
    let logJson = this.data.logs[index]
    console.log("删除成功")
    console.log(logJson)
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
          matchExLog.delete(logJson.RecordId).then(res => {
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
  onAddLinkLog: function () {
    console.log("456789")
    // console.log(info)
    // console.log(info.TenantId)
    // console.log(id)
    console.log(id)
    console.log(tenantId)
    $.service.navigateTo('/pages/exhibition/detail/log/edit/edit', { id: id, exhibitionId: tenantId });
  },
  inviteCancel() {
    let invite = this.data.invite;
    invite.isShow = false;
    this.setData({ invite });
  },
})
// import Auth from './../../utils/authorize'
var $ = getApp().$;
var app = getApp();
let verCode = $.request.verCode();
var _this;
let mob = '';//18651685925
let code;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    wxUserInfo: null,
    isjy: false,
    isload: false,
    btn_getCode: '获取验证码',
    isExpire: false, //判断项目是否已过期
    isCancelAuth: false//是否取消授权
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.clearStorageSync();
    _this = this;
    if (app.globalData.wxUserInfo) {
      _this.setData({
        wxUserInfo: app.globalData.wxUserInfo
      })
    } else {
      //获取微信用户授权
      wx.getUserInfo({
        success: res => {
          app.globalData.wxUserInfo = res.userInfo
          _this.setData({
            wxUserInfo: res.userInfo,
            isCancelAuth: false
          })
        },
        //如果用户取消授权，则提示授权失败
        fail: function (fail) {
          console.log(fail);
          _this.setData({
            isCancelAuth: true
          })
        }
      })

    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  //手机号输入
  onMobInput: function (e) {
    mob = e.detail.value;
  },
  //验证码输入
  onCodeInput: function (e) {
    code = e.detail.value;
  },
  /**
   * 验证手机号码
   * 
   * @param {any} mob 
   * @returns 
   */
  varMob: (mob) => {
    var reg = /^1[34578][0-9]{9}$/;      //************** */
    return reg.test(mob);
  },
  //获取验证码
  onGetCode: function (e) {

    if (this.varMob(mob)) {
      let isjy = _this.data.isjy;
      if (!isjy) {
        _this.setData({
          isload: true,
          isjy: true,
          btn_getCode: '发送中'
        })
        verCode.post1(mob).then(res => {
          console.log(res)
          if (res.resCode === 0) {
            let s = 60;
            let index = setInterval(() => {
              s--;
              let btn_getCode;
              let gb = false;
              if (s <= 0) {
                btn_getCode = "获取验证码"
                gb = true;
              } else {
                btn_getCode = `${s}s`
              }
              _this.setData({
                btn_getCode,
                isjy: !gb
              })
              if (gb) {
                clearInterval(index);
              }

            }, 1000)
            _this.setData({
              code: res.result,
              isload: false
            })
            $.service.showToast({ title: '发送成功' });
          }
        }, err => {
          _this.setData({
            isload: false,
            isjy: false
          })
        })
      }

    } else {
      $.service.alert({ title: '手机号码错误', image: '/assets/images/icon/fail.png' });
    }

  },

  onLogin: function () {




    let _this = this
    if (!this.varMob(mob)) {
      $.service.alert({ title: '手机号码错误', image: '/assets/images/icon/fail.png' });
      return;
    }
    if (code == "" || code == null) {
      $.service.alert({ title: '验证码不能为空', image: '/assets/images/icon/fail.png' });              //************** */
      return;
    }

    let userInfo, exInfo;

    let cellFun = () => {
      if (userInfo && exInfo) {


        // $.request.exLogin().put(userInfo.SignToken, exInfo.RecordId).then(res => {
        //     userInfo = res.Data;
        //     $.service.setStorage({
        //         key: 'userInfo',
        //         data: userInfo
        //     })
        // });
        $.service.switchTab('/pages/home/index')
      }
    }
    verCode.post(mob, code).then(ress => {                                                                 //************** */
      if (ress.resCode == 0) {
        $.request.exLogin().post(mob).then(res => {

          if (res.resCode == 0) {
            console.log(res)
            userInfo = res.result[0];
            console.log(329)
            console.log(userInfo)
            wx.setStorage({
              key: 'userInfo',
              data: userInfo
            })
            $.service.setStorage({ key: 'PHONE_NUMBER', data: mob });
            let data = {
              tenantId: userInfo.TenantId,
              UserId: userInfo.UserId,
              params: {}
            }
            console.log(777)
            console.log(data)
            $.request.exInfo().post(data).then(r => {
              // res.resCode = 0
              if (r.resCode === 0) {
                  exInfo = r.result[0];
                  $.service.setStorage({
                    key: 'exInfo',
                    data: exInfo
                  });
                  $.service.setStorage({ key: 'PHONE_NUMBER', data: mob });
                  cellFun();
              }
            })
          } else {
            $.service.alert({ title: '用户名不存在', image: '/assets/images/icon/fail.png' });
          }
        })
      } else {
        $.service.alert({ title: '验证码错误', image: '/assets/images/icon/fail.png' });                     //************** */
      }
    })

    // console.log(444)
    // let a = wx.getStorage({
    //   key: 'userInfo'
    // })
    // console.log(a)

    // } 
    // else {
    //     $.service.alert({ title: '验证码错误', image: '/assets/images/icon/fail.png' });
    // }
    // })

  },
  onShareAppMessage: function (e) {
    return {
      path: '/pages/customer/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
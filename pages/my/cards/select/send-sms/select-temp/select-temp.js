// pages/my/cards/select/send-sms/select-temp/select-temp.js
let $ = getApp().$
let _this
let switchs
let usernote
let phonenum = [];
let contentid
let buyername = "${专业买家姓名}"
let job = "${专业买家职务}"
let companName = "${专业买家公司}"
let invite = "${展商名称}"
let address = "${展位号}"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    console.log(options)
    this.onLoadding(options)
    
  },
  onLoadding: function (options){
    phonenum = [];
    if (options.usernote == undefined) {
      let phonenums = options.phonenum.split(",");
      // $.request.link().get().then(res => {
      //   if (res.resCode == 0) {
      //     let links = res.result
      let links = wx.getStorageSync("LINKS")
          console.log(links)
          _this.setData({
            links
          })
          for (let i of links) {
            i.phonenumber = []
            for (let j of i.Phone) {
              if (j.label == "手机") {
                i.phonenumber.push(j.value)
              }
            }
            for (let k of phonenums) {
              console.log(k)
              console.log(i.RecordId)
              if (i.RecordId == k) {
                let usernt = {}
                usernt.CompanyName = i.Company[0].value
                usernt.Job = i.Job[0].value
                usernt.Mob = i.phonenumber[0]
                usernt.Name = i.Name
                phonenum.push(usernt);
                console.log(usernt)
              }
            }
          }

          console.log("群发短信")
          console.log(phonenum)
          this.onCmsgTemp()
      //   }
      // })
    } else {
      usernote = JSON.parse(options.usernote);
      phonenum.push(usernote)
      console.log("单个发送短信")
      console.log(phonenum)
      this.onCmsgTemp()
    }


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
  onCmsgTemp(){
    $.request.cmsgTemp().get().then(res=>{
      if(res.resCode == 0){
        console.log(res)
        let results = res.result
        let result = []
        for(let i of results){
          if (i.Name == 'ETE' || i.Name == 'ETV' || i.Name == 'VTE' || i.Name == 'code' || i.Name == '验证码模板'){
          }else{
            result.push(i)
          }
        }
        console.log(result)
        let name = result[0].Name
        let contents = result[0].Content
        contentid = result[0].RecordId
        let content = _this.onUpdata(contents)
        this.setData({
          content,
          name,
          result,
        })
      }
    })
  },
  onSelected(e){
    console.log(e.currentTarget.dataset)
    let value = e.currentTarget.dataset.index
    let result = _this.data.result
    let name = e.currentTarget.dataset.name
    let contents = result[value].Content
    contentid = result[value].RecordId
    let content = _this.onUpdata(contents)
    this.setData({
      content,
      name
    })
    console.log(content)
  },
  /**
   * 发送短信
   */
  onUpdata: function(content){
    let userInfo = wx.getStorageSync("userInfo")
    invite = userInfo.CompanyName
    address = userInfo.BoothNo
    console.log(phonenum)
    if (phonenum.length > 0){
      buyername = phonenum[0].Name
      companName = phonenum[0].CompanyName
      job = phonenum[0].Job
    }
      content = content.replace("${专业买家姓名}", buyername).replace("${专业买家职务}", job).replace("${专业买家公司}", companName).replace("${展商名称}", invite).replace("${展位号}", address)
      return content
  },
  onSend() {
    let content = []
    for (let i of phonenum){
      console.log(i)
      let userInfo = wx.getStorageSync("userInfo")
      invite = userInfo.CompanyName
      address = userInfo.BoothNo
      buyername = i.Name
      companName = i.CompanyName
      job = i.Job
      let data = {
        "phone": i.Mob, 
        "code": {
          '展商名称': invite,
          '展位号': address,
          '专业买家姓名': buyername,
          '专业买家职务': job,
          '专业买家公司': companName} 
          }
      content.push(data)
    }
    console.log(content)
    let smsTemplateId = contentid
    $.request.cMsgSendList().post(content, smsTemplateId).then(res => {
      if (res.resCode == 0) {
        console.log("发送短信成功")
      }
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
})
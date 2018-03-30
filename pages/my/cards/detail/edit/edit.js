
let _this;
// //基础属性名
// let _options = {
//   'Phone': ['手机', '工作电话', '住宅电话', '工作传真', '住宅传真'],
//   'Email': ['工作邮箱', '私人邮箱'],
//   'Company': ['公司'],
//   'Department': ['部门'],
//   'Job': ['职务', '职位'],
//   'Address': ['工作地址', '家庭地址']
// }
let app = getApp()
let $ = getApp().$
let id;
let group;
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
    id = options.id
    
    
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
    _this.onLink()
    this.onlabels()
  },
  onlabels(){
    this.setData({
      phoneLabel: ["电话", "手机"],
      
      emailLabel: ["邮箱", "电子邮箱"],
      companyLabel: ["公司", "公司2"],
      departmentLabel: ["部门", "部门2"],
      jobLabel: ["职业", "职业2"],
      addressLabel: ["地址", "地址2"],
    })
  },
  onLabel(e){
    console.log(e.detail.value)
    console.log(e.currentTarget.dataset.type)
    console.log(e.currentTarget.dataset.index)
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    if (type=="phone"){
      let phone = this.data.phone
      let phoneLabel = this.data.phoneLabel
      phone[index].label = phoneLabel[value]

      this.setData({
        phone,
        phoneLabels: phoneLabel[value]
      })
    }
    if (type == "email") {
      let email = this.data.email
      let emailLabel = this.data.emailLabel
      email[index].label = emailLabel[value]
      this.setData({
        email,
        emailLabels: emailLabel[value]
      })
    }
    if (type == "company") {
      let company = this.data.company
      let companyLabel = this.data.companyLabel
      company[index].label = companyLabel[value]
      this.setData({
        company,
        companyLabels: companyLabel[value]

      })
    }
    if (type == "department") {
      let department = this.data.department
      let departmentLabel = this.data.departmentLabel
      department[index].label = departmentLabel[value]
      this.setData({
        department,
        departmentLabels: departmentLabel[value]
      })
    }
    if (type == "job") {
      let job = this.data.job
      let jobLabel = this.data.jobLabel
      job[index].label = jobLabel[value]
      this.setData({
        job,
        jobLabels: jobLabel[value]
      })
    }
    if (type == "address") {
      let address = this.data.address
      let addressLabel = this.data.addressLabel
      address[index].label = addressLabel[value]
      this.setData({
        address,
        addressLabels: addressLabel[value]
      })
    }
    
  },
  
  onLink(){
    $.wxDataStorage.GET('LINKS', (res) => {
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
      
      console.log("link===")
      console.log(link)
      this.setData({
        link: link,
        phone: link.Phone,
        email: link.Email,
        company: link.Company,
        department: link.Department,
        job: link.Job,
        address : link.Address,
        image: link.Image,
        backImage: link.BackImage,
        name: link.Name,
      })
    })
  },
  onNameInput(e){
    console.log(e.detail.value)
    let name = e.detail.value
    this.setData({
      name
    })

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  onImage(e){
    console.log(e.currentTarget.dataset.img)
    let img = e.currentTarget.dataset.img
    if (img==1){
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (res) {
          let tempFilePaths = res.tempFilePaths[0]
          _this.setData({
            image: tempFilePaths
          })
          
          wx.showToast({
            title: '图片上传中',
          })
          wx.uploadFile({
            url: "https://deal.xiaovbao.cn/applet/album/upload",
            filePath: tempFilePaths,
            name: "jiangchao",
            success: function (ress) {
              // console.log(ress)
              var data = ress.data
              
              let dataJson = JSON.parse(data)
              if (dataJson.code == 0) {
                console.log(dataJson)
                
                _this.setData({
                  image: dataJson.data.imgUrl
                })
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
              
            }
          })
        }

      })
    }else{
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (res) {
          let tempFilePaths = res.tempFilePaths[0]
          _this.setData({
            image: tempFilePaths
          })

          wx.showToast({
            title: '图片上传中',
          })
          wx.uploadFile({
            url: "https://deal.xiaovbao.cn/applet/album/upload",
            filePath: tempFilePaths,
            name: "jiangchao",
            success: function (ress) {
              // console.log(ress)
              var data = ress.data

              let dataJson = JSON.parse(data)
              if (dataJson.code == 0) {

                _this.setData({
                  backImage: dataJson.data.imgUrl
                })
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

            }
          })
        }

      })
    }
    
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  onItemInput:function(e){
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    let value = e.detail.value
    if (type == "Phone"){
      let phone = this.data.phone
      phone[index].value = value
      this.setData({
        phone
      })
      
    }
    if (type == "Email") {
      let email = this.data.email
      email[index].value = value
      this.setData({
        email
      })

    }
    if (type == "Department") {
      let department = this.data.department
      department[index].value = value
      this.setData({
        department
      })

    }
    if (type == "Company") {
      let company = this.data.company
      company[index].value = value
      this.setData({
        company
      })

    }
    if (type == "Job") {
      let job = this.data.job
      job[index].value = value
      this.setData({
        job
      })

    }
    if (type == "Address") {
      let address = this.data.address
      address[index].value = value
      this.setData({
        address
      })
    }
  },
  onSave(){
    let link = _this.data.link
    let id = link.RecordId
    let data = {
      Address: this.data.address,
      BackImage: this.data.backImage,
      Company: this.data.company,
      Department: this.data.department,
      Email : this.data.email,
      Name : this.data.name,
      Image : this.data.image,
      Job: this.data.job,
      Phone: this.data.phone,
    }
    $.request.link().put(id, data).then(res=>{
      if(res.resCode==0){
        console.log("/////////////////////////////")
        wx.navigateBack({
          delta : -1
        })
      }
    })

  },
  onAddItem(e){
    console.log(e.currentTarget.dataset.type)
    let type = e.currentTarget.dataset.type
    
    if (type=="phone"){
      let phone = this.data.phone
      phone.push({label:"手机"})
      this.setData({
        phone
      })
    }
    if (type == "email") {
      let email = this.data.email
      email.push({label: "邮件"})
      this.setData({
        email
      })
    }
    if (type == "company") {
      let company = this.data.company
      company.push({label: "公司"})
      this.setData({
        company
      })
    }
    if (type == "department") {
      let department = this.data.department
      department.push({ label: "部门"})
      this.setData({
        department
      })
    }
    if (type == "job") {
      let job = this.data.job
      job.push({ label: "职位"})
      this.setData({
        job
      })
    }
    if (type == "address") {
      let address = this.data.address
      address.push({ label: "地址"})
      this.setData({
        address
      })
    }
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
  onItemDelete(e){
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    if (type=="Phone"){
      let phone = this.data.phone
      phone.splice(index,1)
      this.setData({
        phone
      })
    }
    if (type == "Email") {
      let email = this.data.email
      email.splice(index, 1)
      this.setData({
        email
      })
    }
    if (type == "Company") {
      let company = this.data.company
      company.splice(index, 1)
      this.setData({
        company
      })
    }
    if (type == "Department") {
      let department = this.data.department
      department.splice(index, 1)
      this.setData({
        department
      })
    }
    if (type == "Job") {
      let job = this.data.job
      job.splice(index, 1)
      this.setData({
        job
      })
    }
    if (type == "Address") {
      let address = this.data.address
      address.splice(index, 1)
      this.setData({
        address
      })
    }
    
    console.log(e)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
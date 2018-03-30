// component/reject-invite/reject-invite.js
let app = getApp();
let $ = getApp().$
let matchVInfo = getApp().$.request.matchVInfo()
let InvitationInfoExhi = getApp().$.request.InvitationInfoExhi()
let value 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,//文本框的默认值
    list: Array,//常用敏感词
    feet: String,
    inviteId: String,
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onFilterInput(e) {
      console.log(e.detail.value)
      value = e.detail.value
    },
    _onCancel() {
      
      this.triggerEvent('cancel');
    },
    _onSelected(e){
console.log(e)
let value = e.currentTarget.dataset.value
    this.setData({
      value
    })
    },
    _onCancel(){
      this.triggerEvent('cancel');
    },
    _onConfirm() {
      console.log(this)
      console.log(this.data)
      console.log(this.data.inviteId)
      if (this.data.feet == "展商") {
        let data = {
          recordId: this.data.inviteId,
          setValue: {
            State: "3",
            Remark: value
          }
        }
        console.log(data)
        InvitationInfoExhi.puts(data).then(res => {
          if (res.resCode == 0) {
            this.triggerEvent('confirm');
          }
        })

      } else if (this.data.feet == "观众") {
        console.log("aaaaaaaaaaaaaaaaaaaaaa")
        let data = {
          recordId: this.data.inviteId,
          setValue: {
            State: "3",
            Remark: value
          }
        }
        matchVInfo.put(data).then(res => {
          if (res.resCode == 0) {
            this.triggerEvent('confirm');
          }
        })
      }
      
    }
  }
})

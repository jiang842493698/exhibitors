import Http from './HttpResource';

/**
 * 构建请求
 *
 * @param {any} controller_Name 控制器名称 /users/:id
 * @param {any} paramDefaults 默认参数
 * @param {any} actions 添加请求方法
 * @param {any} options 可选配置
 * @returns
 */
let _structure = (controller_Name, paramDefaults, actions, options) => {
  let http = new Http(controller_Name, paramDefaults, actions, options);
  return http;
}
/**
 * 获取缓存中的用户信息
 * userInfo.TenantId :展商;
 * exInfo.TenantId :主办;
 *
 * @returns
 */
let _getUserInfo = (cell) => {

  let userInfo = wx.getStorageSync('userInfo');
  console.log(userInfo)
  let exInfo = wx.getStorageSync('exInfo');
  console.log(exInfo)
  console.log(typeof cell == 'function')
  if (userInfo && cell && typeof cell == 'function') {
    console.log(131313)

    cell(userInfo, exInfo)
    console.log("jiangchao222")
    return true;
  } else {
    wx.removeStorage({ key: 'userInfo' });
    wx.reLaunch({ url: '/pages/login/index' })
  }
}

let _getToken = (cell) => {
  console.log(101010)
  let func = () => {
    let mob = wx.getStorageSync('PHONE_NUMBER');

    if (!mob) {
      wx.reLaunch({
        url: '/pages/login/index'
      });
    }
    _structure('/data/exhibitorLogin').post({ UserName: mob }).then(res => {
      if (res.resCode === 0) {
        wx.setStorageSync('userInfo', res.result);
        _getToken(cell);
      } else {
        wx.reLaunch({
          url: '/pages/login/index'
        });
      }
    });
  }
  let userInfo = wx.getStorageSync('userInfo');
  if (userInfo) {
    let expire = new Date('1970/1/1');
    expire.setSeconds(expire.getSeconds() + userInfo.ExpireTime);
    expire.setHours(expire.getHours() + 8);
    if (expire < new Date(new Date().toDateString())) {
      func();
    } else {
      typeof cell === 'function' && cell(userInfo.SignToken);
      return true;
    }
  } else {
    func();
  }

}


/**
 * 请求工厂
 *
 * @author TooClian
 * @class wxRequestHelper
 */
class wxRequestHelper {
  constructor() { }

  /**
   * 展商登录
   *
   * @returns
   * @memberof wxRequestHelper
   */
  exLogin() {
    var http = _structure('/data/exhibitorLogin');//v2
    return {

      post: (userName) => {
        return http.post({ params: { UserName: userName } })//v2

      },
      put: (token, extibitionId) => {
        let data = { token, extibitionId };
        return http.put(data);
      }
    };
  }
  // upload(){
  //   let http = _structure('data/upload')
  //   return{
  //     post:()=>{

  //     }
  //   }

  // }
  Collertion() {
    let http = _structure('/data/queryList/MsgInfo')
    return {
      get: () => {
        let data = {

        }
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {

          return http.post(data);
        }
      }
    }
  }
  Visitors() {
    let http = _structure('/data/queryList/MsgInfo')
    return {
      get: (dataVisitors) => {
        let data = {
          TenantId: dataVisitors.TenantId
        }
        // if (_getUserInfo((userInfo, exInfo) => {
        //   data.tenantId = userInfo.TenantId;
        //   data.userId = userInfo.UserId;
        // })) {

        return http.post(data);
        // }
      }
    }
  }
  exhibitors() {
    let http = _structure('/data/queryList/MsgInfo')
    return {
      get: (dataVisitors) => {
        let data = {
          TenantId: dataVisitors.TenantId
        }
        // if (_getUserInfo((userInfo, exInfo) => {
        //   data.tenantId = userInfo.TenantId;
        //   data.userId = userInfo.UserId;
        // })) {

        return http.post(data);
        // }
      }
    }
  }
  /**获取日程 */
  inviteTime() {
    let http = _structure('/data/queryCalendar/Calendar')
    let httpGet = _structure('/data/queryCalendar/Calendar')
    let httpUpdate = _structure('/data/update/Calendar')
    let httpDate = _structure('/data/queryCalendar/Calendar')
    return {
      get: (dataJson) => {
        let data = {}
        data.params = {
          "SerchType": "2",
          ...dataJson,
          condition: {
            VisitorId: dataJson.RecordId
          }
        }
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.params.ExhibitionId = exInfo.RecordId
        })) {
          return http.post(data)
        }
      },
      getExhibition: (dataJson) => {
        let data = {}
        data.params = {
          "SerchType": "2",
          ...dataJson,
          condition: {
            ExhibitorContactId: dataJson.RecordId
          }
        }
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId
          data.params.ExhibitionId = exInfo.RecordId
        })) {
          return http.post(data)
        }
      },
      getDate: () => {
        let data = {
          params: {

          }
        }
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = exInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params.ExhibitionId = exInfo.RecordId;
          data.params.SerchType = "1";
          data.params.Type = "2";
          data.params.RecordId = userInfo.ContactRecordId;
          data.params.ExhibitionId = exInfo.RecordId;
          data.params.condition = {
            "ExhibitorContactId": userInfo.ContactRecordId
          };


        })) {
          return http.post(data);
        }
      },
      getMyDate: () => {
        let data = {
          params: {

          }
        }
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params.RecordId = userInfo.ContactRecordId;
          data.params.ExhibitionId = exInfo.RecordId;
          data.params.SerchType = "1";
          data.params.Type = "2";
          data.params.condition = {
            ExhibitorContactId: userInfo.ContactRecordId
          };

        })) {
          return http.post(data);
        }
      },
      getTime: (pageDate) => {
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;

          console.log("date---------")
          console.log(data)
        })) {

          return http.post(data);
        }
      },
      updateTime: (pageDate, id) => {
        let data = { params: {} }
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.params.recordId = id
          data.params.setValue = {
            CalendarTime: pageDate
          }

        })) {

          return httpUpdate.post(data);
        }
      }
    }


  }
  ExhibitorContact() {
    let http = _structure('/data/queryList/ExhibitorContact')
    // let httpGet = _structure('/data/queryCalendar/Calendar')
    let httpUpdate = _structure('/data/update/ExhibitorContact')
    return {
      get: (datas, recordId) => {
        let data = {
          tenantId: datas,
          params: {
            condition: { ...recordId }
          }
        }
        //获取用户Id/ExId
        // if (_getUserInfo((userInfo, exInfo) => {
        //   data.tenantId = exInfo.TenantId;
        //   // data.userId = userInfo.UserId;
        //   data.params.ExhibitionId = exInfo.RecordId;

        // })) {
        return http.post(data);
        //   }
      },
      getAll: (datas, recordId) => {
        let data = {
          tenantId: datas,
          params: {
            condition: { ...recordId }
          }
        }
        //获取用户Id/ExId
        // if (_getUserInfo((userInfo, exInfo) => {
        //   data.tenantId = exInfo.TenantId;
        //   // data.userId = userInfo.UserId;
        //   data.params.ExhibitionId = exInfo.RecordId;

        // })) {
        return http.post(data);
        //   }
      },
      getMyContact: () => {
        let data = {
          params: {

          }
        }
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params.condition = {
            "RecordId": userInfo.ContactRecordId
          }
        })) {
          return http.post(data);
        }
      },
      put: (dataJson) => {
        let data = {
          params: {
            setValue: { ...dataJson }
          }
        }
        if (_getUserInfo((userInfo, exInfo) => {
          data.params.recordId = userInfo.ContactRecordId,
            data.tenantId = userInfo.TenantId;
        })) {
          return httpUpdate.post(data);
        }
      }
    }

  }
  inviteCount() {
    let http = _structure('/data/queryList/MsgInfo')
    return {
      post: (pageDate) => {
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {
            condition: {
              pageIndex: pageDate.pageIndex,
              pageSize: pageDate.pageSize
            }
          }
          console.log("date---------")
          console.log(data)
        })) {

          return http.post(data);
        }
      }
    }
  }
  /**
   * 查询自己发送的约请的数量
   */
  inviteMyQueryCount() {
    let http = _structure('/data/queryList/MsgInfo')
    return {
      post: (pageDate) => {
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {
            condition: {
              pageIndex: pageDate.pageIndex,
              pageSize: pageDate.pageSize
            }
          }
          console.log("date---------")
          console.log(data)
        })) {

          return http.post(data);
        }

      },
    }
  }
  inviteMyQuery() {
    let http = _structure('/data/queryList/MsgInfo')
    return {
      post: (pageDate) => {
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {
            condition: {
              pageIndex: pageDate.pageIndex,
              pageSize: pageDate.pageSize
            }
          }
          console.log("date---------")
          console.log(data)
        })) {

          return http.post(data);
        }

      },
    }
  }
  inviteQuery() {
    let http = _structure('/data/queryList/MsgInfo')
    return {
      post: (pageDate) => {
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {
            condition: {
              pageIndex: pageDate.pageIndex,
              pageSize: pageDate.pageSize
            }
          }
          console.log("date---------")
          console.log(data)
        })) {

          return http.post(data);
        }

      },
    }
  }
  MsgInfoCount() {
    let http = _structure('/data/queryCount/MsgInfo')
    return {
      get: (countdate) => {
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.params = {
            condition: {
              ExhibitorReceiver: userInfo.RecordId,
              ExhibitionId: exInfo.RecordId,
              Type: countdate.type,
              State: countdate.State
            }
          }
        })) {
          return http.post(data);
        }

      },
    }
  }
  MsgInfo() {
    // let http = _structure('/data/queryList/MsgInfo')
    let httpGet = _structure('/data/queryList/MsgInfo')
    // let httpDelete = _structure('/data/queryList/MsgInfo')
    let httpPut = _structure('/data/updateList/MsgInfo')
    let httpDelete = _structure('/data/delete/MsgInfo')
    let httpPost = _structure('/data/insert/MsgInfo')
    let httpUpdate = _structure('/data/updateArray/MsgInfo')
    return {
      post: (dataJson, page) => {
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          // data.tenantId = userInfo.TenantId;
          // data.userId = userInfo.UserId;
          data.params = {
            condition: {
              Receiver: userInfo.RecordId,
              ExhibitionId: exInfo.RecordId,
              Type: dataJson.type
            },
            options: {
              pageIndex: page.pageIndex,
              pageSize: page.pageSize
            }
          }
          console.log("date---------")
          console.log(data)
        })) {

          return http.post(data);
        }

      },
      get: (dataJson, page) => {
        let data = {}

        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {

          data.params = {
            condition: {

              ExhibitionId: exInfo.RecordId,
              Type: dataJson.type,
              "$or": [{ "ExhibitorReceiver": "000000000000000000000002" }, { "ExhibitorReceiver": userInfo.ContactRecordId }],

            },
            // "properties": ["ExhibitorReceiver.Exhibitor.___all"],
            options: {
              pageIndex: page.pageIndex,
              pageSize: page.pageSize
            }
          }
        })) {
          console.log("查询消息")
          console.log(data)
          return httpGet.post(data);
        }
      },
      delete: (canshu) => {
        let data = {}
        data.params = {
          recordId: canshu.id
        }
        return httpDelete.post(data);

      },
      Update: (data) => {
        return httpUpdate.post(data);
      },
      put: (dataJson) => {
        let data = {
          params: dataJson.updatearrayal
        }
        if (_getUserInfo((userInfo, exInfo) => {

        })) {
          console.log(data)
          return httpPut.post(data);
        }

      },
      insert: (dataJson) => {
        return httpPost.post(dataJson)
      }
    }
  }


  /**
   * 短信获取/校验
   *
   * @returns
   * @memberof wxRequestHelper
   */
  verCode() {

    //v2版本
    var http = _structure('/data/getsmscode');
    var codehttp = _structure('/data/valismscode');

    return {
      /**
       * 获取短信
       *
       * @param {any} mob
       * @returns
       */
      //v2
      post1: (mob) => {
        return http.post({ params: { phoneNumber: mob } });
      },
      // get: (mob) => {
      //   return http.get({phoneNumber : mob });
      // },
      /**
       * 校验短信验证码
       *
       * @param {any} mob
       * @param {any} code
       * @returns
       */
      post: (mob, code) => {
        return http.post({ params: { phoneNumber: mob, verifyCode: code } })
      }
    }
  }
  /**
   * 获取展会信息（会展人接口-获取展会Id）
   *
   * @returns
   * @memberof wxRequestHelper
   */
  exInfo() {
    var http = _structure('/data/query/Exhibition');
    return {
      /**
       * 获取展会信息（会展人接口-获取展会Id）
       *
       * @param {any} userName 手机号码
       * @returns
       */
      post: (data) => {
        return http.post(data);
      }
    }
  }
  /**
   * 短信模板
   *
   * @returns
   * @memberof wxRequestHelper
   */
  cmsgTemp() {
    let http = _structure('/data/queryList/SmsTemplate');
    let insertHttps = _structure('/data/insert/SmsTemplate')
    return {
      /**
       * 获取短信模板
       *
       * @returns
       */
      get: () => {
        let data = {};
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {
            condition: {

            }
          }
        })) {
          return http.post(data);
        }
      },
      /**
       * 新增短信模板
       *
       * @param {any} record = {"Name": "模板一","TemplateId": "7551562a1592ed268698f83955d2eb9b","Type": "","Content": "aaaaaa","isActive": true}
       * @returns
       */
      post: (record) => {
        let data = {
          params: {
            record
          }
        };

        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params.record.ExhibitionId = exInfo.RecordId;
          console.log("新增用户")
          console.log(data)
        })) {
          return insertHttps.post(data);
        }
      }
    }
  }
  InvitationInfoExhi() {
    let http = _structure('/data/queryList/InvitationInfoExhi');
    let httpPut = _structure('/data/update/InvitationInfoExhi');
    let httppost = _structure('/data/insert/InvitationInfoExhi');
    return {
      get: () => {
        let data = {};
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.TenantId = userInfo.TenantId;
          data.UserId = userInfo.UserId;
          data.params = {
            condition: {
              ExhibitorId: userInfo.RecordId,
              ExhibitionId: exInfo.RecordId
            }
          }
        })) {
          console.log(22222222)
          return http.post(data);
        }
      },
      getAll: (dataJson, page) => {
        let data = {};


        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.TenantId = userInfo.TenantId;
          data.UserId = userInfo.UserId;
          data.params = {
            condition: {
              ExhibitorId: userInfo.RecordId,

              ExhibitionId: exInfo.RecordId,
              ...dataJson
            },
            options: { ...page }
          }
        })) {
          console.log(22222222)
          return http.post(data);
        }
      },
      getAlls: (dataJson, page) => {
        let data = {
          params: {
          }
        };

        data.params = { ...dataJson }
        data.params.condition = {}
        console.log("data数据")

        console.log(data)
        console.log(data)
        if (_getUserInfo((userInfo, exInfo) => {

          data.tenantId = userInfo.TenantId,
            // data.userId = userInfo.UserId
            data.params.condition.ExhibitionId = exInfo.RecordId;
          data.params.condition.ExhibitorId = userInfo.RecordId;
          data.params.options = {
            ...page
          };
          data.params.condition.State = "2";
        })) {
          return http.post(data);
        }
      },
      put: (dataJson) => {
        let data = {
          params: {
            recordId: dataJson.id,
            setValue: {
              State: dataJson.State
            }
          }
        }
        return httpPut.post(data)
      },
      puts: (dataJson) => {
        let data = {
          params: {
            ...dataJson
          }
        }
        return httpPut.post(data)
      },
      post: (dataJson) => {
        console.log("jiangcchao")
        let data = {

          params: {
            record: dataJson
          }
        }
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.params.record.ExhibitionId = exInfo.RecordId;
          data.params.record.Initator = userInfo.RecordId;
          data.params.record.InitatorChild = userInfo.ContactRecordId;

        })) {
          console.log(22222222)
          return httppost.post(data);
        }
      }
    }

  }
  /**获取短信模板 */
  getTemplate() {
    let http = _structure('/data/queryList/SmsTemplate')
    return {
      get: () => {
        let data = {}
        data.params = {
          "condition": {
            "Type": "1"
          }
        }
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {
          return http.post(data);
        }
      },
      getName: (dateJosn) => {
        let data = {}
        data.params = {
          "condition": {
            Name: dateJosn.name
          }
        }
        if (_getUserInfo((userInfo, exInfo) => {
          // data.tenantId = userInfo.TenantId;
          // data.userId = userInfo.UserId;
        })) {
          return http.post(data);
        }
      },
      post: () => {
        let data = {}
        data.params = {
          "condition": {
            "Type": "1"
          }
        }
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {
          return http.post(data);
        }
      },
    }

  }
  //#region 联系人客户

  /**
   * 联系人
   *
   * @returns
   * @memberof wxRequestHelper
   */
  link() {
    var http = _structure('/data/queryList/Contact');
    var httpPut = _structure('/data/update/Contact');
    var deleteHttp = _structure('/data/delete/Contact');
    return {
      /**
       * 获取所有联系人及其日志（会展接口—查询联系人（带联系人日志））
       *
       * @returns
       */
      get: () => {
        let data = {};
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          console.log(1111)
          console.log(userInfo)
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;

          data.params = {
            condition: {
              ExhibitionId: exInfo.RecordId,
              ExhibitorId: userInfo.RecordId
            }
          }
          console.log(data)
        })) {
          console.log(22222222)
          return http.post(data);
        }
      },


      getContact: (dataJson) => {
        let data = {};
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {

          data.TenantId = userInfo.TenantId;
          // data.UserId = userInfo.UserId;

          data.params = {
            condition: {
              ExhibitionId: exInfo.RecordId,
              ...dataJson
            }
          }
        })) {

          return http.post(data);
        }
      },
      /**
       * 新增联系人【带分组】（会展接口——新增联系人（带分组））
       *
       * @param {any} options
       * @returns
       */
      post: (options) => {
        let data = {};
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.joinId = userInfo.TenantId;
          data.UserId = userInfo.UserId;
          options.ExhibitionInfo = exInfo.RecordId;
        })) {
          console.log(options)
          data.record = options;
          return http.post(data);
        }
      },
      /**
       * 修改联系人信息
       *
       * @param {any} id 联系人id
       * @param {any} options 要修改的数据
       * @returns
       */
      put: (id, options) => {
        // let data = { Id: id };
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {
            recordId: id,
            setValue: options
          }
        })) {
          return httpPut.post(data);
        }
      },
      /**修改联系人分组 */
      put1: (id, options) => {
        let data = {
          "tenantId": "",
          "userId": "",
          "params": {
            "recordId": id,
            "setValue": {
              "ContactGroupId": [
                options
              ]
            }
          }
        }
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {
          return httpPut.post(data);
        }
      },
      /**删除联系人 */
      delete: (dataJson) => {
        // let data = { Id: id };
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          // data.userId = userInfo.UserId;s
          data.params = {
            recordId: dataJson.id,
          }
        })) {
          return deleteHttp.post(data);
        }
      }
    }
  }
  /**
   * 批量修改分组:（会展接口：批量编辑联系人（修改分组））
   *
   * @memberof wxRequestHelper
   */
  linkGroup() {
    var http = _structure('/data/update/ContactGroup');

    return {
      /**
       *
       *
       * @param {any} list [
       * {
       *  "recordId": 联系人Id,
       *       "setValue": {
       *           "Name": 联系人姓名,
       *           "ExhibitionInfo": "59c8e107b8f8c72ce247ae18",
       *           "GroupInfo": 组id
       *       }
       *   }
       * ]
       * @returns
       */
      put: (list) => {
        let data = {};
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          // list.map(m => {
          //   m.setValue.ExhibitionInfo = exInfo.RecordId;
          //   m.setValue.Name = m.setValue.Name || '';
          // });
        })) {
          data.params = list[0];
          return http.post(data);
        }
      }
    }
  }
  /**
   * 批量新增日志（会展接口：批量新增联系人日志）
   *
   * @returns
   * @memberof wxRequestHelper
   */
  linkLogs() {
    var http = _structure('/data/insert/ContactLog');

    return {
      /**
       * 批量新增日志（会展接口：批量新增联系人日志）
       *
       * @param {any} recordlist {"info" : "星期天111","level" : 1,"ContactInfo":"59db2d2fd36983f437255a94"} ContactInfo:联系人id
       * @returns
       */
      post: (recordlist) => {
        let data = { params: { record: recordlist } };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          console.log(data)
        })) {
          return http.post(data);
        }
      }
    }
  }
  /**
   * 分组
   *
   * @memberof wxRequestHelper
   */
  group() {
    var http = _structure('/data/queryList/ContactGroup/');
    var https = _structure('/data/insert/ContactGroup/')
    let httpput = _structure('/data/update/ContactGroup')
    return {
      /**
       * 分组查询（会展人接口—查询分组）
       *
       * @returns
       */
      post: (data) => {
        return http.post(data);
      },
      /**
       * 添加分组
       *
       * @param {any} name 分组名称
       */
      post1: (name) => {
        let data = {
          "tenantId": "",
          "userId": "",
          "params": {
            "record": {
              "Name": name,
              "ExhibitionId": ""
            }
          }
        };
        // let params = {};
        // let record = { Name: name };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params.record.ExhibitionId = exInfo.RecordId;
        })) {
          return https.post(data);
        }
      },
      /**
       * 修改分组名称
       *
       * @param {any} id 分组Id
       * @param {any} name 分组名称
       */
      put: (dataJson) => {
        let data = {
          "tenantId": "",
          "userId": "",
          "params": {
          }
        }
        // let data = { Id: id };
        // let setValue = { Name: name };
        let setValue = dataJson
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.Userid;
          // data.params = {
          //   recordId :
          // }
          // data.UserId = userInfo.UserId;
        })) {
          data.params = setValue;
          return httpput.post(data);
        }
      }
    }
  }
  /**
   * 联系人日志
   *
   * @returns
   * @memberof wxRequestHelper
   */
  linkLog() {
    var http = _structure('/data/queryList/ContactLog');
    var httpPost = _structure('/data/insert/ContactLog');

    return {
      /**
       * 获取联系人日志
       *
       * @param {any} linkId 联系人id
       * @returns
       */
      post: (linkId) => {

        let data = {};
        if (linkId == "" || linkId == null) {
          data.params = {}
        } else {
          data.params = { condition: { contactId: linkId } }
        }
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          console.log("获取联系人日志")
          console.log(data)
        })) {
          return http.post(data);
        }
      },
      /**
       * 添加联系人日志
       *
       * @param {any} record {info:'日志信息':level:1,ContactInfo:'联系人Id'}
       */
      post1: (record) => {
        let data = { params: { record } };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {
          return httpPost.post(data);
        }
      }
    }

  }

  /**
   * 联系人提醒
   *
   * @returns
   * @memberof wxRequestHelper
   */
  linkRemind() {
    var http = _structure('/data/queryList/Remind');
    var httpInsert = _structure('/data/insert/Remind')
    var httpUpdate = _structure('/data/update/Remind')
    return {
      /**
       * 获取联系人提醒
       *
       * @param {any} linkId 联系人id
       * @returns
       */
      post: (linkId) => {
        let data = { params: { condition: { ContactId: linkId } } };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          console.log("获取联系人提醒")
          console.log(data)
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          // data.userId = userInfo.UserId;
        })) {
          return http.post(data);
        }
      },
      /**
       * 新增提醒
       *
       * @param {any} record {RemindContent:'提醒内容',RemindDate:'2017-9-15 16:00:00',ContactInfo:'联系人id'}
       * @returns
       */
      post1: (record) => {
        let data = { params: { record } };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          console.log("新增提醒")
          console.log(data)
        })) {
          return httpInsert.post(data);
        }
      },
      /**
       * 修改提醒
       *
       * @param {any} remindId 提醒id
       * @param {any} content 内容
       * @returns
       */
      put: (remindId, content) => {
        var data = {
          params: {
            recordId: remindId,
            setValue: {
              RemindContent: content
            }
          }

        };
        //获取用户Id/ExId

        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          console.log("修改提醒的内容")
          console.log(data)
        })) {
          return httpUpdate.post(data);
        }
      }
    }
  }
  /**
   * 发送短信
   *
   * @returns
   * @memberof wxRequestHelper
   */
  cMsgSend() {
    let http = _structure('/data/smsSend');
    return {
      /**
       *
       *
       * @param {any} data {"mob" : "18651685925","smsContent" : "【慕渊智能】尊敬的用户XXXX","exhibitionId" : "a2684bb4d0083308553fc89ece94d9d2"}
       * @returns
       */
      post: (data) => {
        if (_getUserInfo((userInfo, exInfo) => {
          data.ExhibitionId = exInfo.RecordId;
          console.log("===================")
          console.log(data)
        })) {
          return http.post(data);
        }
      }
    }
  }

  cMsgSendList() {
    let http = _structure('/data/smsSend');

    return {
      post: (content, smsTemplateId) => {
        let data = { params: { content, recordId: smsTemplateId } };

        if (_getUserInfo((userInfo, exInfo) => {
          console.log(userInfo)
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          console.log(data)
        })) 
        {
          console.log("发送短信数据")
          console.log(data)
          return http.post(data);
        }
      }
    }
  }
  //#endregion

  //#region 拉客

  /**
   * 获取拉客列表（观众列表）
   *
   * @returns
   * @memberof wxRequestHelper
   */
  matchVisitor() {
    var http = _structure('/data/get/recvisitor');

    return {
      post: (recvisitorData) => {
        let data = {};
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {

            condition: {
              ExhibitionId: exInfo.RecordId,
              Province: recvisitorData.Province,
              Objective: recvisitorData.Objective,
              Name: recvisitorData.Name
            },
            options: {
              pageIndex: recvisitorData.pageIndex,
              pageSize: recvisitorData.pageSize
            }
          }
          console.log(data)
        })) {
          return http.post(data);
        }
      },
      getAll: () => {
        let data = {};
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {

            condition: {

            }
          }
          console.log(data)
        })) {
          return http.post(data);
        }
      }
    }
  }


  /**
   * 获取拉客总数
   */
  matchVisitorCount() {
    var http = _structure('/data/queryCount/Visitor');

    return {
      post: (recvisitorData) => {
        let data = {};
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {

            condition: {
              ExhibitionId: exInfo.RecordId,
              Province: recvisitorData.Province,
              Objective: recvisitorData.Objective,
              Name: recvisitorData.Name
            },
            options: {
              pageIndex: recvisitorData.pageIndex,
              pageSize: recvisitorData.pageSize
            }
          }
          console.log(data)
        })) {
          return http.post(data);
        }
      }
    }
  }
  /**
   * 获取拉客列表的数量
   */
  matchVisitorCount() {
    var http = _structure('/data/queryCount/Visitor')
    return {
      post: (recvisitorData) => {
        let data = {}
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId,
            data.userId = userInfo.UserId,
            data.params = {
              condition: {
                ExhibitionId: exInfo.RecordId,
                Province: recvisitorData.Province,
                Objective: recvisitorData.Objective,
                Name: recvisitorData.Name
              }
            }
        })) {
          return http.post(data)
        }
      }
    }
  }

  /**
   * 约请
   *
   * @returns
   * @memberof wxRequestHelper
   */
  matchVInfo() {
    //查询展商约请信息
    var http = _structure('/data/queryList/InvitationInfo');
    let httppost = _structure('/data/insert/InvitationInfo');
    let https = _structure('/data/queryList/InvitationInfoExhi');
    let httpPut = _structure('/data/update/InvitationInfo');
    return {
      get: (dataJson, page) => {

        let data = {


        };

        data.params = { ...dataJson }
        data.params.condition = {}
        data.params.options = { ...page }
        console.log("data数据")

        console.log(data)
        console.log(data)
        if (_getUserInfo((userInfo, exInfo) => {
          console.log(userInfo)
          console.log(exInfo)
          data.tenantId = userInfo.TenantId,
            // data.userId = userInfo.UserId
            data.params.condition.ExhibitionId = exInfo.RecordId;
          data.params.condition.ExhibitorId = userInfo.RecordId;
          data.params.condition.State = "2";
        })) {
          return http.post(data);
        }

      },
      put: (dataJson) => {

        let data = {

          params: {

          }
        };
        data.params = { ...dataJson }
        // data.params.condition = { ...dataJson }
        return httpPut.post(data);


      },
      getDate: (dataJson, page) => {

        let data = {

          params: {


          }
        };

        data.params = {}
        data.params.condition = { ...dataJson }
        data.params.options = { ...page }
        console.log(page)
        if (_getUserInfo((userInfo, exInfo) => {
          console.log(userInfo)
          console.log(exInfo)
          data.tenantId = userInfo.TenantId,
            // data.userId = userInfo.UserId
            data.params.condition.ExhibitionId = exInfo.RecordId;
          data.params.condition.ExhibitorId = userInfo.RecordId;
        })) {
          return http.post(data);
        }

      },
      getAlls: (dataJson, page) => {
        let data = {
          params: {
          }
        };

        data.params = { ...dataJson }
        data.params.condition = {}


        console.log(data)
        console.log(data)
        if (_getUserInfo((userInfo, exInfo) => {

          data.tenantId = userInfo.TenantId,
            // data.userId = userInfo.UserId
            data.params.condition.ExhibitionId = exInfo.RecordId;
          data.params.condition.ExhibitorId = userInfo.RecordId;
        })) {
          return http.post(data);
        }
      },
      getmatchVInf: (dataJson, page) => {
        let data = {
          params: {
            condition: {

            },
            options: { ...page }
          }
        };

        data.params.condition = { ...dataJson }

        console.log(data)
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = exInfo.TenantId,
            data.userId = userInfo.UserId
          data.params.condition.ExhibitionId = exInfo.RecordId;
          data.params.condition.ExhibitorId = userInfo.RecordId;
        })) {
          return https.post(data);
        }

      },
      /**
       * 新增拉客约请
       *
       * @param {any} records { "ExhibitionId": "5a1d12f0fce99c7421e9b6b6","Type": "1","Initator": "5a1ce462fce99c7421e9b5c2","Receiver": "5a278dfc6d326a0415d8dfe8","State": "1" }
       * @returns
       */
      post: (records) => {

        console.log("约请确认")
        console.log(records)
        var data = {
          params: {
            record: { ...records }
          }
        };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;

          data.params.record.ExhibitionId = exInfo.RecordId;
          data.params.record.Initator = userInfo.RecordId;
          data.params.record.InitatorChild = userInfo.ContactRecordId;

        })) {
          return httppost.post(data);
        }
      },
      /**
       * 编辑约请
       *
       * @param {any} mId
       * @param {any} state
       * @returns
       */
      // put: (mId, state) => {
      //   var data = { mId, state };
      //   return http.put(data);
      // },
      /**
       * 删除约请
       *
       * @param {any} mId
       */
      detele: (mId) => {
        var data = { mId };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.joinId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {
          return http.detele(data);
        }
      }
    }

  }
  /**
   * 获取约请列表
   *
   * @memberof wxRequestHelper
   */
  vMatchList() {
    var http = _structure('/vmatchlist');

    return {
      get: () => {
        var data = {};
        //获取用户Id/itemId
        if (_getUserInfo((userInfo, exInfo) => {
          data.exhibitionId = exInfo.RecordId;
          data.exId = userInfo.ExhibitorId;
          // data.exId = '5a1ce462fce99c7421e9b5c2';
          // data.itemId = '5a1d12f0fce99c7421e9b6b6';
        })) {
          return http.get(data);
        }
      }
    }
  }
  /**
   * 查询联系人
   */
  contact() {
    var http = _structure('/data/queryList/ContactLog');
    return {

      get: (contactId) => {
        let data = { contactId };

        // if (_getUserInfo((userInfo, exInfo) => {
        //   data.contactId = userInfo.TenantId;
        //   data.userId = userInfo.UserId;
        // })) {
        return http.post(data);
        // }
      },

    }
  }
  /**
   * 拉客日志
   *
   * @returns
   * @memberof wxRequestHelper
   */
  mLog() {
    //查询拉客信息的url
    var http = _structure('/data/queryList/ContactLog');
    let hpptPost = _structure('/data/insert/ContactLog')
    return {
      /**
       * 获取拉客日志
       *
       * @param {any} vId
       * @returns
       */
      get: (vId) => {
        let data = { params: { condition: { contactId: vId } } };
        //获取用户Id/itemId
        if (_getUserInfo((userInfo, exInfo) => {
          // data.exhibitionId = userInfo.TenantId;
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {
          return http.post(data);
        }
      },
      /**
       * 添加日志
       *
       * @param {any} records {"info": "系统: 扫描名片并保存成功","level": 3,"ContactInfo": "5a1ce461fce99c7421e9b550"}
       * @returns
       */
      post: (records) => {
        var data = { params: { record: records } };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {
          return hpptPost.post(data);
        }
      },
      /**
       * 删除日志
       *
       * @param {any} logId
       * @returns
       */
      detele: (logId) => {
        var data = { logId };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.joinId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {
          return http.detele(data);
        }
      }
    }
  }
  //#endregion
/**
 * 获取访客列表
 */
  SelectVisitorByRecord(){
    let http = _structure("/data/querylist/VisitInfo")
    return {
      get:(RecordId, exhibitionId) => {
        var data = {
          params: {
            condition: { ExhibitorId: RecordId, ExhibitionId: exhibitionId}, "properties": ["VisitorId.Visitor.___all"], options: { pageIndex: 1, pageSize: 10 }
      }
    }
       {
          return http.post(data);
        }
      },
    }
  }
  //#region 展商

  /**
   * 获取展商详情
   */
  ExhibitorInfo() {
    let http = _structure("/data/queryList/Exhibitor")
    return {
      get: () => {
        let data = { params: { condition: {} } }
        if (_getUserInfo((userInfo, exInfo) => {
          data.params.condition.RecordId = userInfo.RecordId;
        })) {
          return http.post(data)
        }
      }
    }
  }
  ExhibitorInfo1() {
    let http = _structure("/data/queryList/Exhibitor")
    return {
      
      get: (id) => {
        let data = {
          "params": {
            "condition": { "RecordId": id }, childObjects: [
              {
                "fieldName": "ExhibitorContact",
                "reference": {
                  "object": "ExhibitorContact",
                  "field": "ExhibitorId"
                }
              }],} }
        {
          return http.post(data)
        }
      }
    }
  }
  /**
   * 获取展品列表
   */
  SelectExhibitsFromTenantId() {
    let http = _structure("/data/queryList/Product")
    return {
      get: (id) => {
        let data = { "tenantId": id, "params": { "condition": {} } }
        { return http.post(data) }
      }
    }
  }
  /**
   * 获取展商列表
   *
   * @returns
   * @memberof wxRequestHelper
   */
  matchEx() {
    let http = _structure('/data/queryList/Exhibitor');
    // let https = 

    return {

      get: (matchExData, page) => {

        let data = {
          params: {
            condition: { ...matchExData },
            childObjects: [
              {
                "fieldName": "ExhibitorContact",
                "reference": {
                  "object": "ExhibitorContact",
                  "field": "ExhibitorId"
                }
              }],
            options: {
              ...page
            }
          }
        };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.params.ExhibitorId = userInfo.RecordId;
          data.params.condition.ExhibitionId = exInfo.RecordId;
        })) {
          return http.post(data);
        }
      },
      getAll: (matchExData, page) => {

        let data = {
          params: {
            condition: { ...matchExData },

          }
        };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.params.ExhibitorId = userInfo.RecordId;
          data.params.condition.ExhibitionId = exInfo.RecordId;
        })) {
          return http.post(data);
        }
      },
      getExhibitor: (dataJson) => {
        let data = { params: { condition: { dataJson } } }
        return http.post(data)
      }
    }
  }


  VisitInfo() {
    let http = _structure("/data/queryCount/VisitInfo")
    return {
      getCount: () => {
        let data = {
          params: {
            condition: {}
          }
        }
        if (_getUserInfo((userInfo, exInfo) => {
          data.params.condition.ExhibitorId = userInfo.RecordId;
          data.params.condition.ExhibitionId = exInfo.RecordId;
        })) {
          return http.post(data)
        }
      }
    }

  }
  matchExCount() {
    let http = _structure('/data/queryCount/Exhibitor');

    return {

      get: (matchExData) => {

        let data = {
          params: {
            condition: { ...matchExData }
          }
        };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params.condition.ExhibitionId = exInfo.RecordId;
        })) {
          return http.post(data);
        }
      }
    }
  }
  /**
   * 展商约请
   *
   * @returns
   * @memberof wxRequestHelper
   */
  matchExInfo() {
    let http = _structure('/matchexinfo');

    return {

      get: (exId) => {
        var data = { exId };
        return http.get(data);
      },

      /**
       * 新增约请
       *
       * @param {any} records { "ExhibitionId": "5a1d12f0fce99c7421e9b6b6","Type": "1","Initator": "5a1ce462fce99c7421e9b5c2","Receiver": "5a278dfc6d326a0415d8dfe8","State": "1" }
       * @returns
       */
      post: (records) => {
        var data = {};
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.joinId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          records.ExhibitionId = exInfo.RecordId;
          records.Initator = userInfo.UserId;
          data.records = records;
        })) {
          return http.post(data);
        }
      },
      /**
       * 编辑约请
       *
       * @param {any} mId
       * @param {any} state
       * @returns
       */
      put: (mId, state) => {
        var data = { mId, state };
        return http.put(data);
      },
      /**
       * 删除约请
       *
       * @param {any} mId
       */
      detele: (mId) => {
        var data = { mId };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.joinId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {
          return http.detele(data);
        }
      }
    }
  }
  /**
   * 获取展商约请列表
   *
   * @returns
   * @memberof wxRequestHelper
   */
  exMatchList() {
    let http = _structure('/exmatchlist');

    return {

      get: () => {
        var data = {};
        //获取用户Id/itemId
        if (_getUserInfo((userInfo, exInfo) => {
          data.exhibitionId = exInfo.RecordId;
          data.exId = userInfo.ExhibitorId;
          // data.exId = '5a1ce462fce99c7421e9b5c2';
          // data.itemId = '5a1d12f0fce99c7421e9b6b6';
        })) {
          return http.get(data);
        }
      }
    }
  }
  matchExLogDelete() {
    let http = _structure('/data/delete/ContactLog');
    return {
      post: (logId) => {
        var data = { params: { recordId: logId } };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          console.log("删除日志参数")
          console.log(data)
        })) {
          return http.post(data);
        }
      }
    }
  }
  matchExLog() {
    //删除日志的http
    let http = _structure('/data/queryList/ExhibitorLog');
    let httpPost = _structure('/data/insert/ExhibitorLog')
    let httpDelete = _structure('/data/delete/ExhibitorLog')

    return {

      get: (datajson) => {
        let data = {};

        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {
            condition: {
              "ExhibitionId": datajson.ExhibitionId,
              "ExhibitorId": datajson.ExhibitorId
            }
          }
          console.log("查询日志数据")
          console.log(data)
        })) {
          return http.post(data);
        }
      },
      /**
       * 添加日志
       *
       * @param {any} records {"info": "系统: 扫描名片并保存成功","level": 3,"ContactExhibitionInfo": "5a1ce461fce99c7421e9b550"}
       * @returns
       */
      post: (records) => {
        var data = { params: { record: records } };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          console.log("添加日志数据")
          console.log(data)
        })) {
          return httpPost.post(data);
        }
      },
      /**
      * 删除日志
      *
      * @param {any} logId
      * @returns
      */
      delete: (logId) => {
        var data = { params: { recordId: logId } };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          console.log("删除日志参数")
          console.log(data)
        })) {
          return httpDelete.post(data);
        }
      }
    }
  }
  //#endregion

  //#region 我的


  aComp() {
    let http = _structure('/data/query/Exhibitor');

    return {
      get: () => {
        let data = {}
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.UserId = userInfo.userId;
          data.params = {
            recordId: userInfo.RecordId
          }
        })) {
          return http.post(data)
        }
        // let data = {};
        // _getToken((res) => {
        //   data.token = res;
        //   fun(http.get(data));
        // })
      },
      post: (PicId, fun) => {
        let data = { PicId };
        data.expires_in = new Date().getTime();
        data.sign = '123';
        _getToken((res) => {
          data.token = res;
          fun(http.post(data));
        })
      },
      put: (data, fun) => {
        data.expires_in = 15120999130;
        data.sign = '123';
        _getToken((res) => {
          data.token = res;
          fun(http.put(data));
        })
      }
    }
  }

  aProduct() {
    let http = _structure('/aproduct');
    return {
      get: (fun) => {
        let data = {};
        _getToken((res) => {
          data.token = res;
          fun(http.get(data));
        })
      },
      post: (data, fun) => {
        data.expires_in = new Date().getTime();
        data.sign = '123';
        _getToken((res) => {
          data.token = res;
          fun(http.post(data));
        })
      },
      put: (data, fun) => {
        data.expires_in = new Date().getTime();
        data.sign = '123';
        _getToken((res) => {
          data.token = res;
          fun(http.put(data));
        })
      },
      delete: (id, fun) => {
        data.expires_in = new Date().getTime();
        data.sign = '123';
        let data = { id };
        _getToken((res) => {
          data.token = res;
          fun(http.delete(data));
        })
      }
    }
  }

  uploadImg(path, fun) {
    _getToken((res) => {
      wx.uploadFile({
        url: 'http://app.huizhanren.cn/api/upload/imgupload?token=' + res, //仅为示例，非真实的接口地址
        // url: 'http://localhost:1094/api/upload/imgupload?token=' + res, //仅为示例，非真实的接口地址
        filePath: path,
        name: 'file',
        success: (res) => {
          fun(JSON.parse(res.data));
        },
      })
    })

  }
  //#endregion


  //#region 基础

  city() {
    let http = _structure('/city');
    return {
      get: (parentId) => {
        let data = {};
        if (parentId) {
          data.parentId = parentId;
        }
        return http.get(data);
      }
    }
  }

  industry() {
    let http = _structure('/industry');
    return {
      get: (fun) => {
        let data = {};
        _getToken((res) => {
          data.token = res;
          fun(http.get(data));
        })
      }
    }
  }
  category() {
    let http = _structure('/category');
    return {
      get: (fun, parentId) => {
        let data = {};
        if (parentId) {
          data.parentId = parentId;
        }
        _getToken((res) => {
          data.token = res;
          fun(http.get(data));
        })
      }
    }
  }
  /**
   * 业务性质
   *
   * @returns
   * @memberof wxRequestHelper
   */
  nature() {
    let http = _structure('/nature');
    return {
      get: (fun) => {
        let data = {};
        _getToken((res) => {
          data.token = res;
          fun(http.get(data));
        })
      }
    }
  }


  //#endregion
}

export default wxRequestHelper
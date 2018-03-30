import Http from './wxRequestHelper'


class wxTokenHelper {
    constructor() {
        this.http = new Http();
        this._init();
    }
    _init() {
        let _getToken = (cell) => {
            let userInfo = wx.getStorageSync('userInfo');
            if (userInfo) {
              
                let expire = new Date('1970/1/1');
                expire.setSeconds(expire.getSeconds() + userInfo.ExpireTime);
                expire.setHours(expire.getHours() + 8);
                if (expire < new Date(new Date().toDateString())) {
                    let mob = wx.getStorageSync('PHONE_NUMBER');
                    if (!mob) {
                        wx.reLaunch({
                            url: '/pages/login/index'
                        });
                    }
                    
                    wx.setStorageSync('userInfo', res.result[0]);
                    http.exInfo().post().then(res => {
                        if (res.resCode === 0) {
                            wx.setStorageSync('userInfo', res.result[0]);
                        }
                    })

                } else {
                    typeof cell === 'function' && cell(userInfo.SignToken);
                }
            } else {
                wx.reLaunch({
                    url: '/pages/login/index'
                });
            }

        }

        
    }
}

export default wxTokenHelper
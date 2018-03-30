/**
 * 微信小程序 - 配置
 * 
 * @author TooClian
 */
module.exports = {
    /**
     * 小程序 配置
     */
    WEAPP: {

        /**
         * 小程序唯一标识
         */
      APPID: 'wx2521a399d73bb872',
        /**
         * 小程序的 app secret
         */
        SECRET: 'bc2c775925ff8a74de1535358ca9a009',
        /**
         * 微信端 API 接口
         */
        API: {
            /**
             * 获取会话密钥接口地址
             * 通过wx.login 登录获取CODE 在通过CODE的获取OPENID
             * https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
             */
            SESSION: 'https://api.weixin.qq.com/sns/jscode2session',
            /**
             * 获取ACCESS_TOKEN 接口
             * https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
             */
            ACCESS_TOKEN: 'https://api.weixin.qq.com/cgi-bin/token',
            /**
             * 获取小程序页面小程序二维码
             * 接口：https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN
             * 文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/qrcode.html
             */
            QRCODE: 'https://api.weixin.qq.com/wxa/getwxacode',
            /**
             * 获取小程序页面普通二维码
             * 接口：https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=ACCESS_TOKEN
             * 文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/qrcode.html
             */
            QRCODE_ORDINARY: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode'
        }
    },
    /**
     * 服务器配置
     */
    SERVER: {
        // /**
        //  * 服务端提供对应应用接口KEY值
        //  */
        // APIKEY: 'IEKF38FW9O0KJEU73JFI93D2',
        /**
         * 主机/域名
         */
        // HOST: 'http://localhost:3012',
        HOST: 'https://deal.xiaovbao.cn',
        // HOST: 'http://192.168.1.4:3013',//z张寒那边的v2版本

    }
}
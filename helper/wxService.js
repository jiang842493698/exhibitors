import Tools from './Tools'
import es6 from './es6-promise.min'

/**
 * 微信小程序 - 接口服务
 * 
 * @class Service
 */
class Service {
    constructor() {
        this.__init()
    }

    /**
     * __init
     */
    __init() {
        this.tools = new Tools
        this.__initDefaults()
        this.__initMethods()
    }


    /**
     * __initDefaults
     */
    __initDefaults() {
        // 缓存非异步方法
        this.noPromiseMethods = [
            'stopRecord',
            'pauseVoice',
            'stopVoice',
            'pauseBackgroundAudio',
            'stopBackgroundAudio',
            'showNavigationBarLoading',
            'hideNavigationBarLoading',
            'createAnimation',
            'createContext',
            'hideKeyboard',
            'stopPullDownRefresh',
        ]

        // 缓存wx接口方法名
        this.instanceSource = {
            method: Object.keys(wx)
        }
    }

    /**
     * 遍历wx方法对象，判断是否为异步方法，是则构造promise
     */
    __initMethods() {
        for (let key in this.instanceSource) {
            this.instanceSource[key].forEach((method, index) => {
                this[method] = (...args) => {
                    // 判断是否为非异步方法或以 wx.on 开头，或以 Sync 结尾的方法
                    if (this.noPromiseMethods.indexOf(method) !== -1 || method.substr(0, 2) === 'on' || /\w+Sync$/.test(method)) {
                        return wx[method](...args)
                    }
                    return this.__defaultRequest(method, ...args)
                }
            })
        }

        /**
         * 保留当前页面，跳转到应用内的某个页面
         * 
         * @param {String} url  路径
         * @param {Object} params 参数
         */
        this.navigateTo = (url, params) => {
            const $$url = this.tools.buildUrl(url, params)
            return new es6.Promise((resolve, reject) => {
                wx.navigateTo({
                    url: $$url,
                    success: res => resolve(res),
                    fail: res => reject(res),
                })
            })
        }

        /**
         * 关闭当前页面，跳转到应用内的某个页面
         * 
         * @param {String} url  路径
         * @param {Object} params 参数
         */
        this.redirectTo = (url, params) => {
            const $$url = this.tools.buildUrl(url, params)
            return new es6.Promise((resolve, reject) => {
                wx.redirectTo({
                    url: $$url,
                    success: res => resolve(res),
                    fail: res => reject(res),
                })
            })
        }
        /**
         * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
         * 
         * @param {String} url  路径
         * @param {Object} params 参数
         */
        this.switchTab = (url, params) => {
            const $$url = this.tools.buildUrl(url, params)
            return new es6.Promise((resolve, reject) => {
                wx.switchTab({
                    url: $$url,
                    success: res => resolve(res),
                    fail: res => reject(res),
                })
            })
        }
        /**
         * 关闭所有页面，打开到应用内的某个页面
         * 
         * @param {String} url  路径
         * @param {Object} params 参数
         */
        this.reLaunch = (url, params) => {
            const $$url = this.tools.buildUrl(url, params)
            return new es6.Promise((resolve, reject) => {
                wx.reLaunch({
                    url: $$url,
                    success: res => resolve(res),
                    fail: res => reject(res),
                })
            })
        }

        this.alert = (options) => {
            let _option = {
                mask: true,
                duration: 1000
            }
            Object.assign(_option, options);
            wx.showToast(_option);
        },

            this.modal = (options) => {
                let _opt = {
                    title: options.title || '提示',
                    confirmColor: '#6288d5'
                }
                Object.assign(_opt, options);
                wx.showModal(_opt);
            }
    }

    /**
     * 构造异步调用微信接口
     * 
     * @param {string} [method=''] 方法名
     * @param {any} [obj={}] 接收参数
     * @returns {Promise}
     * 
     * @memberof Service
     */
    __defaultRequest(method = '', obj = {}) {
        return new es6.Promise((resolve, reject) => {
            obj.success = (res) => resolve(res)
            obj.fail = (res) => reject(res)
            wx[method](obj)
        })
    }
}

export default Service
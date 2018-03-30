18651685925/**
 * 微信小程序 - 帮助
 * @version 0.1
 * 
 * @lastUpdateDate 2017.05.12
 * @author TooClian
 */
class wxHelper {

    /**
     * 时间戳转换时间的格式
     * 
     * @param {any} source json 时间戳
     * @param {string} [format='yyyy年MM月dd日'] format 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例如 format:输出格式  yyyy-MM-dd, yyyy/MM/dd, yyyy年MM月dd日, yyyy-MM-dd hh:mm:s
     * @returns {string} 格式化后的字符串时间
     * 
     * @memberof wxHelper
     */
    TimeStampFormat(source, format = 'yyyy/MM/dd/') {
        try {
            var num = source.replace("/Date(", "").replace(")/", "");
            var date = new Date(parseInt(num));
            var o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)); //格式化年份
            for (var k in o) //循环获取上面定义的月、日、小时等，格式化对应的数据。
                if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return format;
        } catch (e) {
            console.log(e.description);
            return source;
        }
    }
    formatTime(number, format) {

      var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
      var returnArr = [];

      var date = new Date(number * 1000);
      returnArr.push(date.getFullYear());
      returnArr.push(formatNumber(date.getMonth() + 1));
      returnArr.push(formatNumber(date.getDate()));

      returnArr.push(formatNumber(date.getHours()));
      returnArr.push(formatNumber(date.getMinutes()));
      returnArr.push(formatNumber(date.getSeconds()));

      for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
      }
      return format;
    }  
    /**
     * 判断时间的格式，闹钟
     * 
     */
    // AlarmClock(setUpTime){
    //   let date = new Date().getTime();
    //   let setUpDateTime = new Date(setUpTime).getTime();
      
    // }

    /**
     * 格式化时间
     * 
     * @param  {Date} source 时间对象
     * @param  {string} format 格式
     * @return {string} 格式化后的字符串时间
     * 
     * @memberof wxHelper
     */
    DateFormat(source, format) {
        const o = {
            'M+': source.getMonth() + 1, // 月份
            'd+': source.getDate(), // 日
            'H+': source.getHours(), // 小时
            'm+': source.getMinutes(), // 分
            's+': source.getSeconds(), // 秒
            'q+': Math.floor((source.getMonth() + 3) / 3), // 季度
            'f+': source.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (source.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return format
    }

    /**
     * 计算开始的时间在当前时间的描述
     * 
     * @param {Date} originDate 开始时间
     * @return {string} 该时间在当前时间的描述
     * 
     * @memberof wxHelper
     */
    SmarDate(originDate) {
        let nowDate = new Date(),
            isToday = false,
            isYesterday = false,
            isPastYear = false,
            isPreviousYear = false,
            originYear, originMonth, originDay, diffMinute, formatedDate;

        
        originDate = new Date(originDate);
        diffMinute = Math.round((nowDate.getTime() - originDate.getTime()) / (1000 * 60));
        console.log("kkkkkkkkkkkkkkkkkkkkk")
        console.log(diffMinute)
        originYear = originDate.getFullYear();
        originMonth = originDate.getMonth() + 1;
        originDay = originDate.getDate();

        if (diffMinute <= nowDate.getSeconds() * 60) {
            isToday = true;
        }
        if (nowDate.getDate() - originDay == 1) {
            isYesterday = true;
        }
        if (nowDate.getFullYear() - originYear == 1) {
            isPreviousYear = true;
        } else if (nowDate.getFullYear() - originYear > 1) {
            isPastYear = true;
        }

        if (diffMinute < 30 && isToday) {
            formatedDate = '刚刚';
        } else if (diffMinute < 60 && isToday) {
            formatedDate = `${diffMinute} 分钟前`;
        } else if (diffMinute < 60 * 24 && isToday) {
            formatedDate = `${Math.floor(diffMinute / 60)} 小时前`;
        } else if (diffMinute < 60 * 24 * 2 && isYesterday) {
            formatedDate = '昨天';
        } else if (isPreviousYear) {
            formatedDate = '去年';
        } else if (isPastYear) {
            formatedDate = `${originYear} /`;
        } else {
            formatedDate = `${originMonth} / ${originDay} /`;
        }

        return formatedDate;
    }

    /**
     * 计算对象的大小
     * 
     * @param {object} object 药计算的对象
     * @return {number} 对象的大小
     * 
     * @memberof wxHelper
     */
    SizeOf(object) {
        var objects = [object];
        var processed = [];
        var size = 0;

        for (var index = 0; index < objects.length; ++index) {
            var _object = objects[index];
            switch (typeof _object) {
                case 'boolean':
                    size += 4;
                    break;
                case 'number':
                    size += 8;
                    break;
                case 'string':
                    size += 2 * _object.length;
                    break;
                case 'object':
                    if (_object === null) {
                        size += 4; // assume null is the same size as a boolean
                        break;
                    }

                    // if it's an array, the keys add no size. if it's an object, keys
                    // add size based on their length (keys must be strings according to spec)
                    var keySizeFactor = Array.isArray(_object) ? 0 : 1;

                    // coerces even array indices to strings, so we can use key.length safely
                    for (var key in _object) {
                        size += keySizeFactor * 2 * key.length;
                        if (processed.indexOf(_object[key]) === -1) {
                            objects.push(_object[key]);
                            if (typeof _object[key] === 'object') {
                                processed.push(_object[key]);
                            }
                        }
                    }
                    break;
            }
        }

        return size;
    }

    /**
     * 深拷贝
     * 
     * @param {any} p 
     * @param {any} c 
     * @returns 
     */
    deepCopy(p, c) {
        var c = c || {};
        var _this = this;
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (Array.isArray(p[i])) ? [] : {};
                _this.deepCopy(p[i], c[i]);　　　　　　
            } else {
                c[i] = p[i];
            }
        }
        return c;　　
    }
}

export default wxHelper
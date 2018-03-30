var kv = [];
/**
 * 全局缓存
 * 
 * @class GlobalCache
 */
class GlobalCache {
    constructor() {
        kv = [];
    }
    set(key, value) {
        kv[key] = value;
    }
    get(key) {
        if (typeof key === 'string') {
            return kv[key];
        }
    }
    remove(key) {
        if (typeof key === 'string' && kv.hasOwnProperty(key)) {
            delete kv[key];
        }
    }
    removeAll() {
        kv = [];
    }
}

export default GlobalCache
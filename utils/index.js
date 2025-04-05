//获取缓存 sync true 异步 false 同步
export default {
    get(key, sync = true) {
        try {
            if (sync) {
                return JSON.parse(uni.getStorageSync(key));
            } else {
                let data = '';
                uni.getStorage({
                    key: key,
                    success: function (res) {
                        data = JSON.parse(res.data);
                    }
                });
                return data;
            }
        } catch (e) {
            return false;
        }
    },
    set(key, value, sync = true) {
        try {
            if (sync) {
                return uni.setStorageSync(key, JSON.stringify(value));
            } else {
                uni.setStorage({
                    key: key,
                    data: JSON.stringify(value)
                });
            }
        } catch (e) {
            return false
        }
    },
    del(key, sync = true) {
        try {
            if (sync) {
                return uni.removeStorageSync(key);
            } else {
                uni.removeStorage({
                    key: key
                });
            }
        } catch (e) {
            return false;
        }
    },
    clear(sync = true) {
        try {
            if (sync) {
                return uni.clearStorageSync();
            } else {
                uni.clearStorage();
            }
        } catch (e) {
            return false;
        }
    }
}
//赋值 sync true 异步 false 同步

//移除

//清空

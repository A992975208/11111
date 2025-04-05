import Request from 'luch-request'
import {globalData} from './url'
const http = new Request({
    baseURL:globalData.devBaseUrl, //设置请求的base url
    timeout: 120000, //超时时长2分钟,
    header: {
        'Content-Type': 'application/json;charset=UTF-8;'
    }
})
// 显示加载状态的计数器
let loadingCount = 0;

const showLoading = () => {
    if (loadingCount === 0) {
        uni.showLoading({
            title: '加载中',
            mask: true,
        });
    }
    loadingCount++;
};

const hideLoading = () => {
    if (loadingCount <= 0) return;
    loadingCount--;
    if (loadingCount === 0) {
        setTimeout(() => {
            uni.hideLoading();
        }, 300)
    }
};
//请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
    const token = uni.getStorageSync('token');
    if (token) {
        config.header={
            // "Authorization":'Bearer ' + token
            "Authorization":token,
            "X-Access-Token":token
        }
    }
    if (config.method === 'POST') {
        config.data = JSON.stringify(config.data);
    }
    showLoading()
    return config
}, error => {
    hideLoading()
    return Promise.resolve(error)
})
// 响应拦截器
http.interceptors.response.use((response) => {
    hideLoading()
    // console.log(response)
    const {code, msg} = response.data
    if (code === 200 ) {
        return response.data
    } else if (code === 510) {
        uni.clearStorage()
        uni.reLaunch({url: '/minePages/login'});
    } else {
        return response.data
        // uni.showToast({
        //     title: msg || '请求失败，请稍后再试',
        //     icon: 'none',
        // });
    // return Promise.reject(response.data);
    }
}, (error) => {
    hideLoading()
    const {statusCode} = error
    let msg = '请求出错，请稍后再试';
    if (statusCode === 401|| 510) {
        uni.clearStorage()
        setTimeout(() => {
            uni.reLaunch({
                url: "/minePages/login"
            })
        }, 2000)
    } else if (statusCode === 404) {
        msg = '请求地址不存在';
    }else if(statusCode=== 500){
        msg = '服务器错误，请稍后再试';
    }
    uni.showToast({ title: msg, icon: 'none' });
    return Promise.resolve(error)
})
export default http;

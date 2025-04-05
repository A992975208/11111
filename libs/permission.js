// //只要是未登录状态，想要跳转到名单内的路径时，直接跳到登录页
// // 页面白名单，不受拦截
// const whiteList = [
//    '/pages/index',
// ]
// function hasPermission (url) {
//     console.log(url,'url')
//     // let islogin = uni.getStorageSync('isLogin');//在这可以使用token、vuex
//     // islogin = Boolean(Number(islogin));//返回布尔值
//     // 在白名单中或有登录判断条件可以直接跳转
//     if(whiteList.indexOf(url) !== -1 ) {
//         console.log('通过')
//         return true
//     }
//     console.log('失败')
//     return false
// }
// uni.addInterceptor('navigateTo', {
//     // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
//     invoke (e) {
//         // debugger
//         if(!hasPermission(e.url)){
//             uni.reLaunch({
//                 url: '/minePages/login'
//             })
//             return false
//         }
//         return true
//     },
//     success (e) {
//     }
// })
//
// uni.addInterceptor('switchTab', {
//     // tabbar页面跳转前进行拦截
//     invoke (e) {
//         if(!hasPermission(e.url)){
//             uni.reLaunch({
//                 url: '/minePages/login'
//             })
//             console.log('不在白名单内')
//             return false
//         }
//         console.log('在白名单内')
//         return true
//     },
//     success (e) {
//     }
// })

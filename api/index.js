import http from './httpload'
// API集合
export default {
    //账号密码登录
    loginBySms(data) {
        return http.post("/sys/login", data)
    },
    //获取验证码
    sendLoginCaptcha(data) {
        return http.post('/sys/sms', data)
    },
    //手机号验证码登录
    phoneLogin(data) {
        return http.post('/sys/phoneLogin', data)
    },
    //账号注册
    accountRegister(data) {
        return http.post('/sys/user/register', data)
    },
    //忘记密码
    forgetPassword(data) {
        return http.post('/sys/user/forgetPassword', data)
    },
    //游客账号登录
    visitorLogin(data) {
        return http.post('/sys/login',data)
    },
    //获取用户信息
    getUserInfo(id) {
        return http.get(`/mobile/mobileCustomer/queryBySysUserId?id=${id}`)
    },
    //编辑用户信息
    editUserInfo(data) {
        return http.post('/mobile/mobileCustomer/edit', data)
    },
    //注销账号
    logout(id) {
        return http.delete(`/mobile/mobileCustomer/writeOffUser?id=${id}`)
    },
    //获取首页分类
    getHomeCategorys() {
        return http.get("/sys/category/homeCategory")
    },
    //发送验证码校验
    sendCaptcha(data) {
        return http.post('/sys/user/phoneVerification', data)
    },
    //更改密码
    changePassword(data) {
        return http.get(`/sys/user/passwordChange?username=${data.username}&password=${data.password}&smscode=${data.smscode}&phone=${data.phone}`)
    },
    //地址查询
    getAddressList(data) {
        return http.get(`/mobile/customerAddress/list?customerId=${data.customerId}&pageNo=1&pageSize=10`)
    },
    //添加收货地址
    addAddress(data) {
        return http.post('/mobile/customerAddress/add', data)
    },
    //编辑收货地址
    editAddress(data) {
        return http.post('/mobile/customerAddress/edit', data)
    },
    //删除收货地址
    deleteAddress(data) {
        return http.delete(`/mobile/customerAddress/delete?id=${data.id}`)
    },
    //首页顶部板块分类
    getHomeIconsCategorys(data) {
        return http.get(`/goods/homePlate/list?izUse=${data.izUse}`)
    },
    //获取首页展示商品
    getHomeGoods(data) {
        return http.get(`/goods/goods/homeGoods?homeCategoryId=${data.homeCategoryId}`)
    },
    //获取商品详情
    getGoodsDetail(data) {
        return http.get(`/goods/goods/queryById?id=${data.id}`)
    },
    //获取板块分类获取数据列表
    getIconGoodsList(data) {
        return http.get(`/goods/goods/listGoods4Plate?plateId=${data.plateId}&homeCategoryId=${data.homeCategoryId}`)
    },
    //获取分类全部数据
    getCategoryGoodsList(data) {
        return http.get(`/goods/goods/listGoods4Category?homeCategoryId=${data.homeCategoryId}&goodsCategory=${data.goodsCategory}&pageNo=${data.pageNo}&pageSize=${data.pageSize}`)
    },
    //用户隐私协议
    getPrivacy(code) {
        return http.get(`/agree/agreement/queryByCode?agreementCode=${code}`)
    },
    //查询购物车
    getShoppingCart(data) {
        return http.get(`/order/cart/queryListByUser?customerId=${data.customerId}`)
    },
    //添加到购物车
    addShoppingCart(data) {
        return http.post('/order/cart/add', data)
    },
    //购物车编辑
    editShoppingCart(data) {
        return http.post('/order/cart/edit', data)
    },
    //购物车删除
    deleteShoppingCart(data) {
        return http.post(`/order/cart/delete?id=${data.id}`)
    },
    // 商品立即下单
    goodsOrderNow(data) {
        return http.post(`/order/order/createOrder?goodsId=${data.goodsId}&quantity=${data.quantity}&customerId=${data.customerId}`)
    },
    // 商品加入购物车下单
    goodsOrderCart(data,params) {
        return http.post(`/order/order/createOrderByCart?customerId=${data.customerId}`,params)
    },
    //订单分页查询
    getOrderList(data) {
        return http.get(`/order/order/list?customerId=${data.customerId}&status=${data.status}&pageNo=${data.pageNo}&pageSize=${data.pageSize}`)
    },
    //订单确认
    orderConfirm(data) {
        return http.post(`/order/order/confirmOrder`,data)
    },
    //支付方式
    getPayType(data) {
        return http.post(`/order/order/pay?orderId=${data.orderId}&paymentType=${data.paymentType}`)
    },
    //订单取消
    cancelOrder(data) {
        return http.post(`/order/order/cancelOrder?orderId=${data.orderId}`)
    },
    //首页广告管理
    getHomeAdvert(data) {
        return http.get(`/ad/adManager/queryListByPosition?position=${data.position}`)
    },
    //全局搜索
    searchGoods(data) {
        return http.get(`/goods/goods/search?keyword=${data.keyword}`)
    },
    //根据id去查这条订单
    getOrderBuyId(data) {
        return http.get(`/order/order/queryById?id=${data.orderId}`)
    },
    //获取课程列表
    getCourseList(data) {
        return http.get(`/course/course/listCourseByCustomer?customerId=${data.customerId}`)
    },
    //获取课程小节列表
    getCourseSectionList(data) {
        return http.get(`/course/course/listCourseSections?courseId=${data.courseId}&courseType=${data.courseType}`)
    },
    //获取动态列表
    getCommunitytList(data) {
        return http.get(`/community/communityPosts/list?customerId=${data.customerId}&pageNo=${data.pageNo}&pageSize=${data.pageSize}`)
    },
    //根据id获取动态详情
    getCommunityBuyIdDetail(data) {
        return http.get(`/community/communityPosts/queryById?id=${data.id}`)
    },
    //发布动态
    publishCommunity(data) {
        return http.post(`/community/communityPosts/add`,data)
    },
    //编辑动态
    editCommunity(data) {
        return http.put(`/community/communityPosts/edit`,data)
    },
    //删除动态
    deleteCommunity(data) {
        return http.delete(`/community/communityPosts/delete?id=${data.id}`)
    },
    //上传
    uploadFile(data) {
        return http.post(`/sys/common/upload`,data)
    },
    //点赞动态
    likeCommunity(data) {
        return http.post('/community/communityLikes/likeOrCancel',data)
    },
    //获取评论列表
    getRootComments(data) {
        return http.get(`/community/communityComments/getRootComments?postId=${data.postId}&pageNo=${data.pageNo}&pageSize=${data.pageSize}`)
    },
    //添加评论
    addComment(data) {
        return http.post(`/community/communityComments/add`,data)
    },
    //获取子评论
    getSubCommentList(data) {
        return http.get(`/community/communityComments/getAllChildComments?parentId=${data.parentId}`)
    },
    //获取导师列表
    getTeacherList() {
        return http.get('/study/studyTutor/listTutor')
    },
    //获取导师详情
    getTeacherBuyId(data){
        return http.get(`/study/studyTutor/queryById?id=${data.id}`)
    },
    //收藏帖子 / 商品  / 课程
    addCollect(data) {
        return http.post(`/mobile/favorites/add`,data)
    },
    //取消收藏
    cancelCollect(data) {
        console.log(data)
        return http.get(`/mobile/favorites/cancelFavorites?itemId=${data.itemId}&type=${data.type}&customerId=${data.customerId}`)
    },
    //收藏列表查询
    getCollectList(data){
        return http.get(`/mobile/favorites/listByType?pageNo=${data.pageNo}&pageSize=${data.pageSize}&type=${data.type}&customerId=${data.customerId}`)
    },
    //删除收藏列表
    deleteCollect(data) {
        return http.delete(`/mobile/favorites/deleteBatch?id=${data.id}`)
    },
    //根据商品id查询列表
    getGoodsBuyId(data) {
        return http.post('/goods/goods/listByIds',data)
    },
    //根据课程id查询课程
    getCourseBuyId(data) {
        return http.post('/course/course/listCourseMediaByIds',data)
    },
    //根据动态id查询动态
    getCommunityBuyId(data) {
        return http.post('/community/communityPosts/listPostsByIds',data)
    },
    //批量删除收藏
    deleteCollectBatch(data) {
        return http.delete(`/mobile/favorites/deleteBatch?ids=${data.ids}`)
    },
    //用户反馈
    feedback(data) {
        return http.post(`/mobile/feedback/add`,data)
    },
    //获取用户隐私协议
    privacyPolicy(data){
        return http.get(`/agree/agreement/queryByCode?agreementCode=${data.agreementCode}`)
    },
    getDictionary(type){
        return http.get(`/sys/dict/dictItems/${type}`)
    },
    //消息推送记录
    getPushRecord(data){
        return http.get(`/mobile/msgPushLog/msgList?msgType=${data.msgType}&customerId=${data.customerId}&pageNo=${data.pageNo}&pageSize=${data.pageSize}`)
    },
    //会员套餐类型
    getMemberPackageType(){
        return http.get(`/goods/goods/list?goodsType=99`)
    },
    //会员开通记录
    addMemberRecord(data){
        return http.post(`/mobile/vipRecord/add`,data)
    },
    //查询会员信息
    getMemberInfo(data){
        return http.get(`/mobile/vipInfo/queryByCustomerId?customerId=${data.customerId}`)

    }
}

import http from "@/api/httpload";

export default {
    state: {
        shopListData:[]|| uni.getStorageSync('shoppingList'),
        selectList: [],
        userInfo:{}||uni.getStorageSync('userInfo'),
        createTime:'',
        address:''||uni.getStorageSync('address')
    },
    getters: {
        shopListData: state => state.shopListData,
        selectList: state => state.selectList,
        userInfo: state => state.userInfo,
        createTime: state => state.createTime,
        address: state => state.address,
        checkedAll(state) {
            return state.shopListData.length === state.selectList.length
        },
        //合计价钱+数量
        totalShopPrice(state) {
            let total = {
                totalPrice: 0,
                totalCount: 0
            }
            state.shopListData.map(v => {
                total.totalPrice += Number(v.goodsInfo.goodsPrice) * Number(v.quantity);
                // console.log('总价',total.totalPrice)
                total.totalCount = state.selectList.length;
            })
            return total
        }
    },
    mutations: {
        SHOP_LIST(state, data) {
            state.shopListData = data
        },
        // TODO 个人信息保存
        USER_INFO(state, data) {
            state.userInfo = data
        },
        SET_ADDRESS(state, data) {
            console.log('store',data)
            state.address = data
        },
        SELECT_LIST(state, data) {
            state.selectList = data
        },
        CREATE_TIME(state, data) {
            state.createTime = data
        },
        //全选按钮控制
        checkAll(state) {
            state.selectList = state.shopListData.map(v => {
                v.checked = true
                return v;
            })
            state.selectedItems = [...state.shopListData];
            uni.setStorageSync('selectedItems', state.selectedItems)
            console.log('全选', state.selectedItems)
        },
        //全不选
        UncheckAll(state) {
            state.shopListData.forEach(item => {
                item.checked = false;
            })
            state.selectList = []
            uni.setStorageSync('selectedItems', [])
            console.log('全不选',state.selectList)
        },
        selectItem(state, index) {
            const item = state.shopListData[index];
            const id = item.id;
            const isSelected = state.selectList.some(selectedItem => selectedItem.id === id);

            item.checked = !item.checked; // 切换商品的选中状态

            if (item.checked) {
                console.log('选中', item.checked);
                if (!isSelected) {
                    // 如果未选中，将商品添加到 selectList
                    state.selectList.push(item);
                }
            } else {
                console.log('取消选中', item.checked);
                // 如果取消选中，从 selectList 中移除
                state.selectList = state.selectList.filter(selectedItem => selectedItem.id !== id);
            }

            // 更新本地存储
            uni.setStorageSync('selectList', state.selectList);
            console.log('选中商品:', state.selectList);
        },


        //删除选中的数据
        delCheck(state) {
            state.shopListData = state.shopListData.filter(v => {
                return state.selectList.indexOf(v.id) === -1;
            })
        },
        //加入购物车
        addShopCar(state,goods){
            console.log("goods", goods)
            state.shopListData.push(goods)
            uni.setStorageSync('shopData',state.shopListData)
        }
    },
    actions: {
        saveShopList({commit},data){
            commit('SHOP_LIST', data)
        },
        saveUserInfo({commit},data){
            commit('USER_INFO', data)
        },
        checkedAllFn({commit, getters}) {
            getters.checkedAll ? commit('UncheckAll') : commit('checkAll')
        },
        delChecked({commit}) {
            commit("delCheck");
            commit('UncheckAll')
            uni.showToast({
                title: '删除成功',
                icon: "none",
                duration: 2000,
            })
        },
        //购物车下单
        shoppingOrder({commit, state}) {
            let params = state.selectList.map((item, index) => {
                return {
                    ...item,
                    totalPrice: item.price * item.quantity,
                }
            })
            let customerId = uni.getStorageSync('userId')
            http.post(`/order/order/createOrderByCart?customerId=${customerId}`,params).then(res => {
                if (res.code === 200) {
                    console.log(res,'购物车下单')
                    uni.setStorageSync('carOrderData',res.result)
                    uni.setStorageSync('orderId',res.result.id)
                    uni.showToast({
                        title: '下单成功',
                        icon: "none",
                        duration: 2000,
                    })
                }
            })
        },
        //删除购物车所选商品
        delSelectShopCar({commit, state}) {
            let ids = state.selectList.map(item=>item.id)
            if(ids==[]||ids==null||ids==''){
                uni.showToast({
                    title: '请选择要删除的商品',
                    icon: "none",
                    duration: 2000,
                })
                return
            }
            http.delete(`/order/cart/deleteBatch?ids=${ids}`).then(res => {
                if (res.code === 200) {
                    uni.showToast({
                        title: '删除成功',
                        icon: "none",
                        duration: 2000,
                    })
                }
                state.selectList = [];
            })
        },
        getUserInfo({commit}){
            let id = uni.getStorageSync('id')
            http.get(`/mobile/mobileCustomer/queryBySysUserId?id=${id}`).then(res => {
                if (res.code === 200) {
                    commit('SET_USERINFO', res.result)
                }
            })
        }
    }
}

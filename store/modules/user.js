import http from '@/common/http/httpload.js';
const user = {
	state: {
		token: uni.getStorageSync("token"),
		userInfo: uni.getStorageSync("userInfo"),
	},
	getters: {
		token: state => state.token,
		userInfo: state => state.userInfo,
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
	},
	actions: {
		// 获取用户信息
		getUserInfo({
			commit
		}) {
			http.get('/v1/sysUser/userInfo').then(user => {
				uni.setStorageSync('userInfo', user.data)
				commit('SET_USERINFO', user.data)
			})
		}
	}
}
export default user

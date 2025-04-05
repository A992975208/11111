<script>
	import Vue from 'vue'
	import store from './store/index.js'
	import updateCustomBarInfo from './tuniao-ui/libs/function/updateCustomBarInfo.js'
  import setPermissions from '@/utils/setPermissions.js'
	let hasNavigatedToLogin = false;
	export default {
		onLaunch: function() {
      const isLoggedIn = uni.getStorageSync('userId');
      const targetUrl = isLoggedIn ? '/pages/index' : '/miePages/login';
      // 提前判断目标页并直接跳转
      uni.reLaunch({ url: targetUrl });
			uni.getPushClientId({
				success(res) {
          uni.setStorageSync('cid',res.cid)
				},
				fail(err) {
					console.log(err)
				}
			})
      // TODO uni-push推送的消息
			uni.onPushMessage((res) => {
				console.log("收到推送消息：", res) //监听推送消息
			})
			uni.getSystemInfo({
				success: function(e) {
					console.log(e)
					uni.setStorageSync('systemInfo', e)
					// #ifndef H5
					// 获取手机系统版本
					const system = e.system.toLowerCase()
					const platform = e.platform.toLowerCase()
					// 判断是否为ios设备
					if (platform.indexOf('ios') !== -1 && (system.indexOf('ios') !== -1 || system.indexOf(
							'macos') !== -1)) {
						Vue.prototype.SystemPlatform = 'apple'
					} else if (platform.indexOf('android') !== -1 && (system.indexOf('android') !== -1)) {
						Vue.prototype.SystemPlatform = 'android'
					} else {
						Vue.prototype.SystemPlatform = 'devtools'
					}
					// #endif
				}
			})

			// 获取设备的状态栏信息和自定义顶栏信息
			// store.dispatch('updateCustomBarInfo')
			updateCustomBarInfo().then((res) => {
				store.commit('$tStore', {
					name: 'vuex_status_bar_height',
					value: res.statusBarHeight
				})
				store.commit('$tStore', {
					name: 'vuex_custom_bar_height',
					value: res.customBarHeight
				})
			})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import './tuniao-ui/index.scss';
	@import './tuniao-ui/iconfont.css';
</style>

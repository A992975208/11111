<template>
  <view class="template-mine tn-safe-area-inset-bottom">
    <tn-nav-bar fixed alpha customBack>
      <view slot="right" class=" tn-flex tn-padding-right" style="width: 100%">
        <view class="tn-icon-notice tn-color-black tn-margin-right-sm" style="font-size: 50rpx"
              @click="toNotice"></view>
        <view class="tn-icon-install tn-color-black" style="font-size: 50rpx" @click="toSet"></view>
      </view>
    </tn-nav-bar>
    <view class="top-backgroup">
      <image src='/static/images/mybg.png' mode='widthFix' class='backgroud-image'></image>
    </view>
    <button @click="navThanks">
      <view class="dong">
        <view class="monster">
          <view class="monster__face">
            <view class="monster__eye avatar-eye avatar-eye--green eye--left">
              <view class="avatar-eye-pupil pupil--green"><span class="avatar-eye-pupil-blackThing"><span
                  class="avatar-eye-pupil-lightReflection"></span></span></view>
            </view>
            <view class="monster__eye avatar-eye avatar-eye--violet eye--right">
              <view class="avatar-eye-pupil pupil--pink"><span class="avatar-eye-pupil-blackThing"><span
                  class="avatar-eye-pupil-lightReflection"></span></span></view>
            </view>
            <view class="monster__noses">
              <view class="monster__nose"></view>
              <view class="monster__nose"></view>
            </view>
            <view class="monster__mouth">
              <view class="monster__top"></view>
              <view class="monster__bottom"></view>
            </view>
          </view>
        </view>
      </view>
    </button>
    <view class="about__wrap">
      <!-- 图标logo/头像 -->
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-bottom">
        <view v-if="userId" class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left" @click="tn('/minePages/personal')">
            <view class="logo-pic tn-shadow">
              <view class="logo-image">
                <view class="tn-shadow-blur" style="width: 110rpx;height: 110rpx;background-size: cover;"
                      :style="'background-image:url('+userInfo.avatar+')'">
                </view>
              </view>
            </view>
            <view class="tn-padding-right">
              <view class="tn-padding-right tn-padding-left-sm tn-text-xl tn-text-bold">
                <view class="tn-flex tn-flex-col-center">
                  <view class="" style="color: #4e1800">{{ userInfo.nickName }}</view>
                  <image v-if="userInfo.sex===1" class="tn-margin-left-xs" src="/static/images/man.png"
                         style="width: 30rpx;height: 30rpx"></image>
                  <image v-else class="tn-margin-left-xs" src="/static/images/woman.png"
                         style="width: 30rpx;height: 30rpx"></image>
                </view>
              </view>
              <view class="tn-padding-right tn-padding-top-xs tn-padding-left-sm tn-text-ellipsis">

                <text class="tn-text-sm" style="opacity: 0.5;color: #4e1800">亲子教育原来如此简单</text>
<!--                <text class="tn-text-bold tn-padding-left-sm" style="color: #4e1800">{{ vipType }}</text>-->
              </view>
            </view>
          </view>
        </view>
        <view v-else class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left" @click="toLogin">
            <view class="logo-pic tn-shadow">
              <view class="logo-image">
                <view class="tn-shadow-blur" style="width: 110rpx;height: 110rpx;background-size: cover;"
                      :style="'background-image: url(' + require('@/static/logo.png') + ')'">
                </view>
              </view>
            </view>
            <view class="tn-padding-right">
              <view class="tn-padding-right tn-padding-left-sm tn-text-xl tn-text-bold">
                <text class="tn-color-black">登录/注册</text>
              </view>
              <view class="tn-padding-right tn-padding-top-xs tn-padding-left-sm tn-text-ellipsis">
                <text class="tn-color-black" style="opacity: 0.5;">亲子教育原来如此简单</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="vipType===1" class="vip-content">
        <view class="tn-flex tn-flex-row-between tn-flex-col-center" @click="toMemberCenter">
          <view>
            <view class="tn-flex tn-flex-col-center">
              <image src="/static/images/v.png" style="width:50rpx;height: 50rpx;margin-left: 5rpx;"></image>
              <view class="tn-text-xl tn-text-bold tn-margin-left-xs" style="color: #8d826e;letter-spacing: 0.1em;">普通会员</view>
            </view>
            <view class="tn-padding-top" style="color: #bcac8d;letter-spacing: 0.1em;">有效时间: {{vipEndTime}}</view>
          </view>
          <view class="tn-flex tn-flex-col-center tn-round" style="background:#fee5b1;padding: 15rpx 30rpx;">

            <view class="tn-text-bold" style="color: #5d3d05" @click="toMemberCenter">立即查看</view>
            <view class="tn-icon-right-fill tn-text-xl tn-margin-left-sm" style="color: #5d3d04"></view>
          </view>
        </view>
      </view>
      <view v-else class="vip-content">
        <view class="tn-flex tn-flex-row-between tn-flex-col-center">
          <view>
            <view class="tn-flex tn-flex-col-bottom">
              <view class="tn-text-bold" style="color: #8d826e;letter-spacing: 0.3em;">升级</view>
              <image src="/static/images/vip.png" style="width:150rpx;height: 34rpx;margin-left: 20rpx;"></image>
            </view>
            <view class="tn-padding-top" style="color: #bcac8d;letter-spacing: 0.3em;">
              立享单单减
              <text class="tn-text-bold">15元</text>
              优惠权益
            </view>
          </view>
          <view class="tn-flex tn-flex-col-center tn-round" style="background:#fee5b1;padding: 15rpx 30rpx;">
            <view class="tn-text-bold" style="color: #5d3d05" @click="toMemberCenter">立即开通</view>
            <view class="tn-icon-right-fill tn-text-xl tn-margin-left-sm" style="color: #5d3d04"></view>
          </view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-padding-top">
<!--        <view-->
<!--            class="tn-flex tn-flex-row-between tn-flex-col-center about-shadow tn-bg-white tn-margin-right-sm icon-content"-->
<!--            @click="flowerShopping">-->
<!--          <view>-->
<!--            <view class="tn-text-xl tn-text-bold" style="color: #111315">-->
<!--              会员权益-->
<!--            </view>-->
<!--            <view class="tn-text-sm tn-padding-top-sm" style="color: #808080">领取升级福利</view>-->
<!--          </view>-->
<!--          <view class="tn-margin-left-sm">-->
<!--            <image src="/static/images/vip-icon.png" style="width: 84rpx;height: 64rpx"></image>-->
<!--          </view>-->
<!--        </view>-->
<!--        <view-->
<!--            class="tn-flex tn-flex-row-between tn-flex-col-center about-shadow tn-bg-white icon-content"-->
<!--            @click="flowerShopping">-->
<!--          <view>-->
<!--            <view class="tn-text-xl tn-text-bold" style="color: #111315">-->
<!--              积分商城-->
<!--            </view>-->
<!--            <view class="tn-text-sm tn-padding-top-sm" style="color: #808080">赚积分分享福利</view>-->
<!--          </view>-->
<!--          <view class="tn-margin-left-sm">-->
<!--            <image src="/static/images/scout-icon.png" style="width: 84rpx;height: 64rpx"></image>-->
<!--          </view>-->
<!--        </view>-->
      </view>
      <!-- 更多信息-->
      <view class="about-shadow tn-margin-top tn-padding-top-sm tn-padding-bottom-sm tn-bg-white">
        <view class="tn-flex tn-flex-row-between tn-flex-wrap tn-radius tn-padding-top">
          <view class="tn-padding-sm tn-margin-xs tn-radius more-item" @click="myOrder">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orange">
                <view class="tn-icon-order" style="color: #080808;"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis icon-text">我的订单</text>
              </view>
            </view>
          </view>
          <view class="tn-padding-sm tn-margin-xs tn-radius more-item" @click="myCollection">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orange">
                <view class="tn-icon-star" style="color: #080808;"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis icon-text">我的收藏</text>
              </view>
            </view>
          </view>
          <!--          <view class="tn-padding-sm tn-margin-xs tn-radius more-item" @click="tn('/minePages/integral')">-->
          <view class="tn-padding-sm tn-margin-xs tn-radius more-item">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orange">
                <view class="tn-icon-ticket" style="color: #080808;"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis icon-text">调换课程</text>
              </view>
            </view>
          </view>
          <view class="tn-padding-sm tn-margin-xs tn-radius more-item" @click="myShoppingCar">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orange">
                <view class="tn-icon-cart" style="color: #080808;"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis icon-text">购物车</text>
              </view>
            </view>
          </view>
          <!--          <view class="tn-padding-sm tn-margin-xs tn-radius more-item" @click="tn('/preferredPages/order')">-->
          <view class="tn-padding-sm tn-margin-xs tn-radius more-item" @click="toMyCoupons">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orange">
                <view class="tn-icon-coupon" style="color: #080808;"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis icon-text">优惠卡券</text>
              </view>
            </view>
          </view>
          <view class="tn-padding-sm tn-margin-xs tn-radius more-item" @click="toCoupon">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orange">
                <view class="tn-icon-coupon" style="color: #080808;"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis icon-text">抖音卡劵</text>
              </view>
            </view>
          </view>
          <view class="tn-padding-sm tn-margin-xs tn-radius more-item" @click="navAddress">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orange">
                <view class="tn-icon-map" style="color: #080808;"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis icon-text">老生报名</text>
              </view>
            </view>
          </view>
          <view class="tn-padding-sm tn-margin-xs tn-radius more-item" @click="allSet">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orange">
                <view class="tn-icon-set" style="color: #080808;"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis icon-text">全部设置</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 更多信息-->
      <view class="about-shadow tn-margin-top tn-margin-bottom-lg tn-padding-top-sm tn-padding-bottom-sm">
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
          <view class="tn-flex tn-flex-col-center">
            <view
                class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-15 tn-color-white">
              <view class="tn-icon-link"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1 icon-text" @click="tn('/minePages/about')">关于千果家庭教育</view>
            <view class="tn-color-cyan--light tn-icon-link"></view>
          </view>
        </tn-list-cell>
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
          <view class="tn-flex tn-flex-col-center">
            <view
                class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-15 tn-color-white">
              <view class="tn-icon-comment-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1 icon-text" @click="feedBack">问题反馈</view>
            <view class="tn-color-green--light tn-icon-edit"></view>
          </view>
        </tn-list-cell>

        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" data-number="18219126666">
          <view class="tn-flex tn-flex-col-center">
            <view
                class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-9 tn-color-white">
              <view class="tn-icon-phone-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1 icon-text">技术支持</view>
            <view
                class="tn-margin-left-sm tn-color-orangered tn-text-sm tn-padding-left-xs tn-padding-right-xs tn-bg-orange--disabled tn-round">
              1911*****89
            </view>
          </view>
        </tn-list-cell>
      </view>
    </view>

    <!--通知权限弹框-->
    <tn-popup v-model="show" mode="center" width="80%" style="border-radius: 20rpx" border-radius="30">
      <view style="position:relative;">
        <image src="/static/images/notice_bg.png"></image>
        <view style="position:absolute;top: -20rpx;left: 50%; transform: translateX(-50%)">
          <image src="/static/images/notice_ld.png" style="width: 172rpx;height: 141rpx"></image>
        </view>
      </view>
      <view class="tn-text-center">
        <view class="tn-text-lg tn-text-bold tn-padding-bottom">开启消息通知</view>
        <view style="color: #606060">“通知”可能包括提醒、声音和图标标记。</view>
        <view class="tn-padding-bottom" style="color: #606060">这些可在“设置”中配置</view>
        <view class="notice_btn tn-text-bold tn-text-lg tn-color-white" @click="openSettings">马上开启</view>
        <view class="tn-padding" style="color: #acacac" @click="closePopup">暂不开启</view>
      </view>
    </tn-popup>
  </view>
</template>
<script>
export default {
  name: 'Mine',
  data() {
    return {
      show: false,
      userId: uni.getStorageSync('userId') || '',
      userInfo: {},
      areNotificationsEnabled: '',
      vipEndTime:'',
      vipType:''
    }
  },
  computed: {
    // ...mapState({
    //   userInfo: state => state.car.userInfo
    // })
  },
  created() {
    // TODO 判断用户是否开启通知权限
    this.setPermissions()
    this.getUserInfo()
    setTimeout(() => {
      this.getMemberInfo()
    },100)
    uni.$on('editSuccess', () => {
      this.getUserInfo()
    })
  },
  methods: {
    async getMemberInfo() {
      try {
        const res = await this.$API.getMemberInfo({customerId:this.userId})
        if (res.code === 200) {
          this.vipEndTime =this.timeFormat(res.result.expireTime)
        }
      } catch (e) {

      }
    },
    //时间转为年月日
    timeFormat(time) {
      return this.$dayjs(time).format("YYYY-MM-DD")
    },
    toMemberCenter() {
      this.checkLoginAndNavigate('/minePages/memberCenter')
    },
    checkLoginAndNavigate(url) {
      if (!this.userId) {
        this.toLogin()
      } else {
        this.$navTo.togo(url)
      }
    },
    toLogin() {
      uni.clearStorage()
      uni.reLaunch({
        url: '/minePages/login',
      })
    },
    toNotice() {
      this.checkLoginAndNavigate('/minePages/message')
    },
    toSet() {
      this.checkLoginAndNavigate('/minePages/set')
    },
    toCoupon() {
      this.checkLoginAndNavigate('/minePages/couponVerification')
    },
    myOrder() {
      this.checkLoginAndNavigate('/minePages/order')
    },
    myCollection() {
      this.checkLoginAndNavigate('/minePages/checkkd')
    },
    myShoppingCar() {
      this.checkLoginAndNavigate('/minePages/addShoppingCar')
    },
    allSet() {
      this.checkLoginAndNavigate('/minePages/set')
    },
    feedBack() {
      this.checkLoginAndNavigate('/minePages/feedBack')
    },
    toMyCoupons() {
      this.checkLoginAndNavigate('/minePages/myCoupons')
    },
    //获取用户个人信息
    async getUserInfo() {
      try {
        let id = uni.getStorageSync('id')
        const res = await this.$API.getUserInfo(id)
        if (res.code === 200) {
          this.vipType = res.result.izVip
          this.userInfo = res.result
          this.userId = res.result.id
          this.$store.dispatch('saveUserInfo', res.result);
          uni.setStorageSync('userId', res.result.id)
        }
      } catch (e) {
      }
    },
    //刷新页面
    refresh() {
    },
    flowerShopping() {
      this.$t.message.toast('该功能暂未开放')
    },
    goldShopping() {
      this.$t.message.toast('金币商城')
    },
    // 跳转
    tn(e) {
      uni.navigateTo({
        url: e,
      });
    },
    // 收货地址
    navAddress() {
      // uni.chooseAddress({
      // })
    },
    // 震动跳转
    navThanks(e) {
      wx.vibrateShort();
      uni.navigateTo({
        url: '/minePages/thanks'
      })
    },
    // 检查通知权限
    setPermissions() {
      // #ifdef APP-PLUS
      // 检查是否已经显示过弹框
      const permissionChecked = uni.getStorageSync('isShow')

      // 如果已经检查过权限且用户关闭了弹框，不再弹出
      if (permissionChecked === true) {
        return;
      }
      if (plus.os.name == 'Android') { // 判断是 Android
        const main = plus.android.runtimeMainActivity();
        const pkName = main.getPackageName();
        const uid = main.getApplicationInfo().plusGetAttribute("uid");

        let NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
        // android.support.v4 升级为 androidx
        if (!NotificationManagerCompat) {
          NotificationManagerCompat = plus.android.importClass("androidx.core.app.NotificationManagerCompat");
        }

        const areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();

        // 如果没有通知权限，则显示弹框
        if (!areNotificationsEnabled) {
          this.show = true;
        }else{
          this.show=false
        }

      } else if (plus.os.name == 'iOS') { // 判断是 iOS
        let isOn = undefined;
        let types = 0;
        const app = plus.ios.invoke('UIApplication', 'sharedApplication');
        const settings = plus.ios.invoke(app, 'currentUserNotificationSettings');

        if (settings) {
          types = settings.plusGetAttribute('types');
          plus.ios.deleteObject(settings);
        } else {
          types = plus.ios.invoke(app, 'enabledRemoteNotificationTypes');
        }

        plus.ios.deleteObject(app);

        // 如果没有通知权限，则显示弹框
        if (types === 0) {
          this.show = true;
        }
      }
      // #endif
    },
    // 跳转到系统设置页面
    openSettings() {
      if (plus.os.name == 'Android') {
        const main = plus.android.runtimeMainActivity();
        const pkName = main.getPackageName();
        const uid = main.getApplicationInfo().plusGetAttribute("uid");
        let intent;
        const Intent = plus.android.importClass('android.content.Intent');
        const Build = plus.android.importClass("android.os.Build");

        if (Build.VERSION.SDK_INT >= 26) {
          intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
          intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
        } else if (Build.VERSION.SDK_INT >= 21) { // Android 5.0-7.0
          intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
          intent.putExtra("app_package", pkName);
          intent.putExtra("app_uid", uid);
        } else { // (<21) 其他 - 跳转到该应用管理的详情页
          intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
          const Uri = plus.android.importClass("android.net.Uri");
          const uri = Uri.fromParts("package", pkName, null);
          intent.setData(uri);
        }
        // 跳转到该应用的系统通知设置页
        main.startActivity(intent);
      } else if (plus.os.name == 'iOS') {
        const app = plus.ios.invoke('UIApplication', 'sharedApplication');
        const setting = plus.ios.invoke('NSURL', 'URLWithString:', 'app-settings:');
        plus.ios.invoke(app, 'openURL:', setting);
        plus.ios.deleteObject(setting);
        plus.ios.deleteObject(app);
      }
    },
    // 关闭弹框
    closePopup() {
      this.show = false; // 关闭弹框
      uni.setStorageSync('isShow', true); // 设置缓存
    }
  }
}
</script>

<style lang="scss" scoped>
//常用功能字体样式
.icon-text{
  color: #535353;
}
.notice_btn {
  background: url("/static/images/notice_btn.png") no-repeat center;
  background-size: cover;
  width: 100%;
  padding: 40rpx;
}

.vip-content {
  border-radius: 30rpx;
  overflow: hidden;
  background: url("/static/images/vip-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 30rpx;
}

.icon-content {
  padding: 40rpx 35rpx;
}

.template-mine {
  max-height: 100vh;
}

.tn-tabbar-height {
  min-height: 120rpx;
  height: calc(140rpx + env(safe-area-inset-bottom) / 2);
}

/* 自定义导航栏内容 start */
.custom-nav {
  height: 100%;

  &__back {
    margin: auto 5rpx;
    font-size: 40rpx;
    margin-right: 10rpx;
    flex-basis: 5%;
    width: 100rpx;
    position: absolute;
  }
}

/* 自定义导航栏内容 end */

/* 顶部背景图 start */
.top-backgroup {
  height: 450rpx;
  z-index: -1;

  .backgroud-image {
    width: 100%;
    height: 450rpx;
    // z-index: -1;
  }
}

/* 顶部背景图 end */

/* 标题 start */
.nav_title {
  -webkit-background-clip: text;
  color: #0E122A;


  &--wrap {
    position: relative;
    display: flex;
    height: 120rpx;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-image: url(https://resource.tuniaokj.com/images/title_bg/title44.png);
    background-size: cover;
  }
}

/* 标题 end */

/* 用户头像 start */
.logo-image {
  width: 110rpx;
  height: 110rpx;
  position: relative;

  image {
    width: 100%;
    height: 100%;
  }
}

.logo-pic {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border: 8rpx solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 80rpx 0 rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  overflow: hidden;
  // background-color: #FFFFFF;
}

/* 页面 start*/
.about-shadow {
  border-radius: 15rpx;
  box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);

  .more-item {
    width: 22%;
  }
}

.about {

  &__wrap {
    position: relative;
    z-index: 1;
    margin: 20rpx 30rpx;
    margin-top: -230rpx;
  }
}

/* 页面 end*/

/* 图标容器12 start */
.tn-three {
  position: absolute;
  top: 50%;
  right: 50%;
  bottom: 50%;
  left: 50%;
  transform: translate(-38rpx, -16rpx) rotateX(30deg) rotateY(20deg) rotateZ(-30deg);
  text-shadow: -1rpx 2rpx 0 #f0f0f0, -2rpx 4rpx 0 #f0f0f0, -10rpx 20rpx 30rpx rgba(0, 0, 0, 0.2);
}

.icon20 {
  &__item {
    width: 30%;
    background-color: #FFFFFF;
    border-radius: 10rpx;
    padding: 30rpx;
    margin: 20rpx 10rpx;
    transform: scale(1);
    transition: transform 0.3s linear;
    transform-origin: center center;

    &--icon {
      width: 80rpx;
      height: 80rpx;
      font-size: 50rpx;
      border-radius: 50%;
      margin-bottom: 18rpx;
      position: relative;
      z-index: 1;

      &::after {
        content: " ";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        border-radius: inherit;
        opacity: 1;
        transform: scale(1, 1);
        background-size: 100% 100%;
        background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
      }
    }
  }
}

/* 图标容器12 start */
.icon12 {
  &__item {
    width: 30%;
    background-color: #FFFFFF;
    border-radius: 10rpx;
    padding: 30rpx;
    margin: 20rpx 10rpx;
    transform: scale(1);
    transition: transform 0.3s linear;
    transform-origin: center center;

    &--icon {
      width: 15rpx;
      height: 15rpx;
      font-size: 50rpx;
      border-radius: 50%;
      margin-bottom: 38rpx;
      position: relative;
      z-index: 1;

      &::after {
        content: " ";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        border-radius: inherit;
        opacity: 1;
        transform: scale(1, 1);
        background-size: 100% 100%;

      }
    }
  }
}

/* 图标容器1 start */
.icon1 {
  &__item {
    // width: 30%;
    background-color: #FFFFFF;
    border-radius: 10rpx;
    padding: 30rpx;
    margin: 20rpx 10rpx;
    transform: scale(1);
    transition: transform 0.3s linear;
    transform-origin: center center;

    &--icon {
      width: 40rpx;
      height: 40rpx;
      font-size: 28rpx;
      border-radius: 50%;
      position: relative;
      z-index: 1;

      &::after {
        content: " ";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        border-radius: inherit;
        opacity: 1;
        transform: scale(1, 1);
        background-size: 100% 100%;
        background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
      }
    }
  }
}

/* 图标容器1 end */

/* 大嘴鸟*/
.dong {
  z-index: 9999;
  position: fixed;
  top: -40px;
  right: -80px;
  transform: scale(0.24);
  -webkit-transform: scale(0.24);
  -moz-transform: scale(0.24);

}

.monster {
  transform: rotate(-50deg);
  -ms-transform: rotate(-50deg);
  /* IE 9 */
  -moz-transform: rotate(-50deg);
  /* Firefox */
  -webkit-transform: rotate(-50deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(-50deg);
  /* Opera */
  display: flex;
  justify-content: center;
  position: relative;
  width: 170px;
  height: 400px;
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
  background-color: #3C47D7;
  box-shadow: 20px 20px 60px #4650E5;
}

.monster__face {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 14%;
  width: 75%;
  height: 160px;
}

.monster__noses {
  top: 50%;
  display: flex;
  justify-content: space-between;
  width: 28%;
  height: auto;
  margin-bottom: 10px;
}

.monster__nose {
  width: 8px;
  height: 12px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.1);
}

.monster__mouth {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 0%;
  overflow: hidden;
  border: 25px solid #FFC333;
  border-radius: 100px;
  background-color: #810332;
  animation: mouth 1.75s infinite;
  box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.monster__mouth::before {
  content: '';
  position: absolute;
  width: 150px;
  height: 80px;
  border-radius: 100px;
  background-color: #400018;
}

.monster__mouth::after {
  content: '';
  position: absolute;
  bottom: -80px;
  width: 160px;
  height: 80px;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  background-color: #DC1B50;
  animation: tongue 1.75s infinite;
}

.monster__top {
  position: absolute;
  top: -30px;
  width: 170px;
  height: 30px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #ffffff;
  z-index: 100;
  animation: t 1.75s infinite;
}

.monster__bottom {
  position: absolute;
  bottom: 0;
  width: 100px;
  height: 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #ffffff;
  z-index: 100;
  animation: b 1.75s infinite;
}


.avatar-eye {
  position: absolute;
  top: -10%;
  width: 65px;
  height: 65px;
  background: linear-gradient(105deg, white, #cb87f4);
  border-radius: 100%;
  box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
  margin: 3px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}


.avatar-eye--green {
  background: linear-gradient(to bottom, #fdfdfd, #c3efea);
}

.avatar-eye--violet {
  background: linear-gradient(to bottom, #fdfdfd, #e6d6f6);
}


.eye--left {
  left: 10%;
}

.eye--right {
  left: 85%;
}

.eye--center {
  left: 45%;
  top: 10%;
}

.avatar-eye-pupil {
  position: absolute;
  width: 55%;
  height: 55%;
  left: 50%;
  top: 25%;
  -webkit-transform: translate(-50%);
  transform: translate(-50%);
  z-index: 100;
  border-radius: 100%;
}


.pupil--green {
  background: linear-gradient(135deg, rgba(188, 248, 177, 0.7), #2fa38c 75%);
}

.pupil--pink {
  background: linear-gradient(135deg, #f1a183, #8535cd);
}


.avatar-eye-pupil-blackThing {
  position: absolute;
  width: 55%;
  height: 55%;
  left: 50%;
  top: 25%;
  background: #2c2f32;
  -webkit-transform: translate(-50%);
  transform: translate(-50%);
  border-radius: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.avatar-eye-pupil-lightReflection {
  position: absolute;
  width: 7px;
  height: 7px;
  left: 25%;
  top: 10%;
  background: #ebebeb;
  -webkit-transform: translate(-50%);
  transform: translate(-50%);
  border-radius: 100%;
  box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.2);
}

/*大嘴动起来*/
@keyframes t {

  0%,
  10%,
  80%,
  100% {
    top: -30px;
  }

  20% {
    top: 0px;
  }

  30% {
    top: -20px;
  }

  40% {
    top: -0px;
  }

  50% {
    top: -25px;
  }

  70% {
    top: 0px;
  }
}

@keyframes b {

  0%,
  10%,
  80%,
  100% {
    bottom: -30px;
  }

  20% {
    bottom: 0px;
  }

  30% {
    bottom: -20px;
  }

  40% {
    bottom: -0px;
  }

  50% {
    bottom: -25px;
  }

  70% {
    bottom: 0px;
  }
}

@keyframes mouth {

  0%,
  10%,
  100% {
    width: 100%;
    height: 0%;
  }

  15% {
    width: 90%;
    height: 30%;
  }

  20% {
    width: 50%;
    height: 70%;
  }

  25% {
    width: 70%;
    height: 70%;
  }

  30% {
    width: 80%;
    height: 60%;
  }

  35% {
    width: 60%;
    height: 70%;
  }

  40% {
    width: 55%;
    height: 75%;
  }

  45% {
    width: 50%;
    height: 90%;
  }

  50% {
    width: 40%;
    height: 70%;
  }

  55% {
    width: 70%;
    height: 95%;
  }

  60% {
    width: 40%;
    height: 50%;
  }

  65% {
    width: 100%;
    height: 60%;
  }

  70% {
    width: 100%;
    height: 70%;
  }

  75% {
    width: 90%;
    height: 70%;
  }

  80% {
    width: 50%;
    height: 70%;
  }

  85% {
    width: 90%;
    height: 50%;
  }

  85% {
    width: 40%;
    height: 70%;
  }

  90% {
    width: 90%;
    height: 30%;
  }

  95% {
    width: 100%;
    height: 10%;
  }
}

@keyframes tongue {

  0%,
  20%,
  100% {
    bottom: -80px;
  }

  30%,
  90% {
    bottom: -40px;
  }

  40% {
    bottom: -45px;
  }

  50% {
    bottom: -50px;
  }

  70% {
    bottom: -80px;
  }

  90% {
    bottom: -40px;
  }
}

</style>

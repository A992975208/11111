<template>
  <view class="template-login" v-if="!isLoggedIn">
    <!-- 顶部自定义导航 -->
    <!--    <tn-nav-bar fixed alpha customBack>-->
    <!--      <view slot="back" class='tn-custom-nav-bar__back'-->
    <!--            @click="goBack">-->
    <!--        <text class='icon tn-icon-left'></text>-->
    <!--        <text class='icon tn-icon-home-capsule-fill'></text>-->
    <!--      </view>-->
    <!--    </tn-nav-bar>-->

    <view class="login">
      <!-- 顶部背景图片-->
      <view class="login__bg login__bg--top">
        <image class="bg" src="/static/images/login-top.png" mode="widthFix"></image>
      </view>

      <view class="login__wrapper">
        <view class="tn-margin-left tn-margin-right tn-padding-bottom-sm tn-text-bold"
              style="font-size: 60rpx;color: #374457">Hi，您好
        </view>
        <view class="tn-margin-left tn-margin-right tn-text-bold" style="font-size: 60rpx;color: #374457">
          欢迎来到千果家庭教育！
        </view>
        <!-- 登录/注册切换 -->
        <!-- <view class="login-sussuspension login__mode tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center">
          <view class="login__mode__item tn-flex-1" :class="[{'login__mode__item--active': currentModeIndex === 0}]" @tap.stop="modeSwitch(0)">
            登录
          </view>
          <view class="login__mode__item tn-flex-1" :class="[{'login__mode__item--active': currentModeIndex === 1}]" @tap.stop="modeSwitch(1)">
            注册
          </view>
          <view class="login__mode__slider tn-cool-bg-color-15--reverse" :style="[modeSliderStyle]"></view>
        </view> -->

        <!-- 输入框内容-->
        <view class="login__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
          <!-- 登录 -->
          <block v-if="currentModeIndex === 0">
            <view
                class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-phone"></view>
              </view>
              <view class="login__info__item__input__content">
                <input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入手机号"
                       v-model="codeParams.mobile"/>
              </view>
            </view>
            <view v-if="showCode"
                  class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-safe"></view>
              </view>
              <view class="login__info__item__input__content login__info__item__input__content--verify-code">
                <input placeholder-class="input-placeholder" placeholder="请输入验证码" v-model="codeParams.captcha"/>
              </view>
              <view class="login__info__item__input__right-verify-code" @tap.stop="getCode">
                <tn-button fontColor="tn-color-gray" size="sm" padding="5rpx 10rpx" width="100%"
                           shape="round">{{ tips }}
                </tn-button>
              </view>
            </view>
          </block>
          <!-- 注册 -->
          <block v-if="currentModeIndex === 1">
            <view
                class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-phone"></view>
              </view>
              <view class="login__info__item__input__content">
                <input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入注册手机号码"
                       v-model="accountParams.phone"/>
              </view>
            </view>

            <view
                class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-safe"></view>
              </view>
              <view class="login__info__item__input__content login__info__item__input__content--verify-code">
                <input placeholder-class="input-placeholder" placeholder="请输入验证码"
                       v-model="accountParams.smscode"/>
              </view>
              <view class="login__info__item__input__right-verify-code" @tap.stop="getCode">
                <tn-button fontColor="tn-color-gray" size="sm" padding="5rpx 10rpx" width="100%"
                           shape="round">{{ tips }}
                </tn-button>
              </view>
            </view>

            <view
                class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-lock"></view>
              </view>
              <view class="login__info__item__input__content">
                <input :password="!showPassword" placeholder-class="input-placeholder" placeholder="请输入登录密码"
                       v-model="accountParams.password"/>
              </view>
              <view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
                <view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
              </view>
            </view>
          </block>
          <!--账号密码登录-->
          <block v-if="currentModeIndex === 2">
            <view
                class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-phone"></view>
              </view>
              <view class="login__info__item__input__content">
                <input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入手机号"
                       v-model="params.phoneNum"/>
              </view>
            </view>
            <view
                class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-lock"></view>
              </view>
              <view class="login__info__item__input__content">
                <input :password="!showPassword" placeholder-class="input-placeholder" placeholder="请输入登录密码"
                       v-model="params.password"/>
              </view>
              <view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
                <view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
              </view>
            </view>
          </block>
          <view class="login__info__item__button tn-bg-fruit tn-color-black" hover-class="tn-hover"
                :hover-stay-time="150" @click="loginHandel">
            {{ currentModeIndex === 0 ? '登录' : currentModeIndex === 1 ? '注册' : '登录' }}
          </view>

          <view v-if="currentModeIndex === 1" :class="[{'login__info__item__tips': currentModeIndex === 0}]">
            <view class="tn-flex tn-flex-row-between tn-padding">
              <view class="login_text_color">已有账号?</view>
              <view class="tn-margin-left-sm tn-color-blue" @tap.stop="modeSwitch(0)">立即登录</view>
            </view>
          </view>
          <view v-if="currentModeIndex === 0" :class="[{'login__info__item__tips': currentModeIndex === 1}]">
            <view class="tn-flex tn-flex-col-center tn-flex-row-between tn-padding">
              <view class="login_text_color" @tap.stop="modeSwitch(1)">新用户注册</view>
              <view class="login_line tn-margin-left-sm tn-margin-right-sm"></view>
              <view class="login_text_color" @click="modeSwitch(2)">账号登录</view>
              <view class="login_line tn-margin-left-sm tn-margin-right-sm"></view>
              <view class="login_text_color" @click="touristsLogin">游客登录</view>
            </view>
          </view>
          <view v-if="currentModeIndex === 2" :class="[{'login__info__item__tips': currentModeIndex === 0}]">
            <view class="tn-flex tn-flex-col-center tn-flex-row-between tn-padding">
              <view class="login_text_color" @tap.stop="modeSwitch(0)">短信验证码登录</view>
              <view class="login_line tn-margin-left-sm tn-margin-right-sm"></view>
              <view class="login_text_color" @click="forgetPassword">忘记密码?</view>
            </view>
          </view>
        </view>

        <view class="tn-flex  tn-padding tn-fixed tn-text-sm">
          <tn-checkbox-group style="margin-top: 8rpx">
            <tn-checkbox v-model="checkValue" shape="circle" activeColor="#fac10d" size="28"
                         @change="checkboxChange"></tn-checkbox>
          </tn-checkbox-group>
          <view class="tn-color-gray"> 我已阅读并同意
            <text class="tn-color-blue" @click="toUserAgreement">《千果家庭教育用户协议》</text>
            ,
            <text class="tn-color-blue" @click="toPersonalAgreement">《用户个人信息保护政策》</text>
            <text class="tn-color-blue" @click="toChildrenAgreement">《儿童个人保护规则》</text>
          </view>
        </view>
      </view>

      <!-- 底部背景图片-->
      <view class="login__bg login__bg--bottom">
        <image src="/static/images/login-bottom.png" mode="widthFix"></image>
      </view>

    </view>

    <!-- 验证码倒计时 -->
    <tn-verification-code
        ref="code"
        uniqueKey="login-demo-4"
        :seconds="60"
        @change="codeChange">
    </tn-verification-code>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
  name: 'login-demo-4',
  mixins: [template_page_mixin],
  data() {
    return {
      isLoggedIn: uni.getStorageSync('userId'),
      showCode: true,
      // 当前选中的模式
      currentModeIndex: 0,
      // 模式选中滑块
      modeSliderStyle: {
        left: 0
      },
      // 是否显示密码
      showPassword: false,
      // 倒计时提示文字
      tips: '获取验证码',
      // 账号登录参数
      params: {
        phoneNum: '',
        password: '',
      },
      // 验证码登录参数
      codeParams: {
        mobile: "",
        captcha: ''    // 0：登录模式，1：注册模式，2：忘记密码模式
      },
      // 注册参数
      accountParams: {
        phone: "",
        password: "",
        smscode: "",
        appFlag: 1
      },
      checkValue: false

    }
  },
  watch: {
    currentModeIndex(value) {
      const sliderWidth = uni.upx2px(476 / 2)
      this.modeSliderStyle.left = `${sliderWidth * value}px`
    }
  },
  methods: {
    async touristsLogin() {
      try {
        const res = await this.$API.visitorLogin({
          username: 'visitor',
          password: '_a123456',
          appFlag: 1,
        });
        if (res.code === 200) {
          uni.setStorageSync('token', res.result.token);
          // uni.setStorageSync('userInfo', res.result.userInfo);
          // uni.setStorageSync('id', res.result.userInfo.id);
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/index'
            })
          }, 1000)
        }
      } catch (error) {
        this.$t.message.toast('登录失败，请重试');
      }
    },
    checkboxChange(e) {
      this.checkValue = e.value
      console.log(e.value)
    },
    // 登录
    loginHandel() {
      if (this.currentModeIndex === 0) {
        //验证码登录
        this.phoneLogin()
      } else if (this.currentModeIndex === 1) {
        // 注册
        this.accountRegister()
      } else {
        console.log('账号密码')
        // 账号密码登录
        this.accountLogin()
      }
    },
    //账号注册
    accountRegister() {
      const {phone, password, smscode} = this.accountParams;
      const errorMessages = [
        {condition: phone === '', message: '请输入手机号'},
        {condition: smscode === '', message: '请输入验证码'},
        {condition: password === '', message: '请输入密码'},
        {condition: !this.checkValue, message: '请勾选用户协议'},
      ];
      for (const {condition, message} of errorMessages) {
        if (condition) {
          this.$t.message.toast(message);
          return;
        }
      }
      let params = {
        phone: this.accountParams.phone,
        password: this.accountParams.password,
        smscode: this.accountParams.smscode,
        appFlag: 1
      }
      this.$API.accountRegister(params).then((res) => {
        console.log(res, 'res')
        if (res.code === 200) {
          this.$t.message.toast(res.message)
        }
      })
    },
    //验证码登录
    async phoneLogin() {
      const {mobile, captcha} = this.codeParams;
      const errorMessages = [
        {condition: mobile === '', message: '请输入手机号'},
        {condition: captcha === '', message: '请输入验证码'},
        {condition: !this.checkValue, message: '请勾选用户协议'},
      ];
      for (const {condition, message} of errorMessages) {
        if (condition) {
          this.$t.message.toast(message);
          return;
        }
      }
      const res = await this.$API.phoneLogin({
        mobile: this.codeParams.mobile,
        captcha: this.codeParams.captcha,
        appFlag: 1
      })
      if (res.code === 200) {
        uni.setStorageSync('token', res.result.token)
        uni.setStorageSync('userInfo', res.result.userInfo)
        uni.setStorageSync('id', res.result.userInfo.id)
        uni.setStorageSync('goodsCategoty', res.result.sysAllDictItems.goods_category)
        uni.reLaunch({
          url: '/pages/index'
        })
      }
    },
    //账号密码登录
    async accountLogin() {
      const {phoneNum, password} = this.params;
      const errorMessages = [
        {condition: phoneNum === '', message: '请输入手机号'},
        {condition: password === '', message: '请输入密码'},
        {condition: !this.checkValue, message: '请勾选用户协议'},
      ];
      for (const {condition, message} of errorMessages) {
        if (condition) {
          this.$t.message.toast(message);
          return;
        }
      }
      try {
        const res = await this.$API.loginBySms({
          username: phoneNum,
          password: password,
          appFlag: 1,
        });
        if (res.code === 200) {
          uni.setStorageSync('token', res.result.token);
          uni.setStorageSync('userInfo', res.result.userInfo);
          uni.setStorageSync('id', res.result.userInfo.id);
          // uni.switchTab({
          //   url: '/pages/index'
          // })
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/index'
            })
          }, 1000)
          // this.$navTo.togo('/pages/index');
          uni.setStorageSync('isLogin', 1);//用于登录拦截判断

        } else {
          this.$t.message.toast(res.message);
        }
      } catch (error) {
        console.error('登录失败', error);
        this.$t.message.toast('登录失败，请重试');
      }
    },
    // 忘记密码
    forgetPassword() {
      this.$navTo.togo('/minePages/forgetPassword')
    },
    // 切换模式
    modeSwitch(index) {
      if (index === 0) {
        this.currentModeIndex = index
        this.showPassword = false
        this.showCode = true
      } else if (index === 1) {
        this.currentModeIndex = index
        this.showPassword = true
      } else if (index === 2) {
        this.currentModeIndex = index//账号登录
        this.showCode = false
        this.showPassword = true
      }
    },
    //获取短信接口
    getMsgCode(data) {
      this.$API.sendLoginCaptcha(data).then((res) => {
        if (res.code === 0) {
          this.$t.message.toast('验证码发送成功')
        }else{
          this.$t.message.toast(res.message)
        }
        console.log(res, 'code')
      })
    },
    // 获取验证码
    getCode() {
      if (this.$refs.code.canGetCode) {
        this.$t.message.loading('正在获取验证码')
        if (this.currentModeIndex === 0) {
          this.getMsgCode({mobile: this.codeParams.mobile, smsmode: 0})
        } else if (this.currentModeIndex === 1) {
          this.getMsgCode({mobile: this.accountParams.phone, smsmode: 1})
        }
        setTimeout(() => {
          this.$t.message.closeLoading()
          // this.$t.message.toast('验证码已经发送')
          // 通知组件开始计时
          this.$refs.code.start()
        }, 2000)
      } else {
        this.$t.message.toast(this.$refs.code.secNum + '秒后再重试')
      }
    },
    // 获取验证码倒计时被修改
    codeChange(event) {
      this.tips = event
    },
    toUserAgreement() {
      this.$navTo.togo('/minePages/userAgreement')
    },
    toPersonalAgreement() {
      this.$navTo.togo('/minePages/content')
    },
    toChildrenAgreement() {
      this.$navTo.togo('/minePages/childPersonalRules')
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/css/custom_nav_bar.scss';

.tn-checkbox {
  display: block;
}

.tn-fixed {
  position: fixed;
  bottom: 20rpx;
}

.login_text_color {
  color: #bbc2c5;
}

.login_line {
  width: 5rpx;
  height: 30rpx;
  background-color: #bbc2c5;
}

/* 悬浮 */
/* .login-sussuspension{
  animation: suspension 3s ease-in-out infinite;
}

@keyframes suspension {
  0%, 100% {
    transform: translate(0 , 0);
  }
  50% {
    transform: translate(0rem , 1rem);
  }
} */

.login {
  position: relative;
  height: 100%;
  z-index: 1;

  /* 背景图片 start */
  &__bg {
    z-index: -1;
    position: fixed;

    &--top {
      top: 0;
      left: 0;
      right: 0;
      width: 100%;

      .bg {
        width: 750rpx;
        will-change: transform;
      }
    }

    &--bottom {
      bottom: -10rpx;
      left: 0;
      right: 0;
      width: 100%;
      // height: 144px;
      margin-bottom: env(safe-area-inset-bottom);

      image {
        width: 750rpx;
        will-change: transform;
      }
    }
  }

  /* 背景图片 end */

  /* 内容 start */
  &__wrapper {
    margin-top: 300rpx;
    width: 100%;
  }

  /* 切换 start */
  &__mode {
    position: relative;
    margin: 0 auto;
    width: 476rpx;
    height: 77rpx;
    margin-top: 100rpx;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
    border-radius: 39rpx;

    &__item {
      height: 77rpx;
      width: 100%;
      line-height: 77rpx;
      text-align: center;
      font-size: 31rpx;
      color: #080808;
      letter-spacing: 1em;
      text-indent: 1em;
      z-index: 2;
      transition: all 0.4s;

      &--active {
        font-weight: bold;
        color: #FFFFFF;
      }
    }

    &__slider {
      position: absolute;
      height: inherit;
      width: calc(476rpx / 2);
      border-radius: inherit;
      box-shadow: 0rpx 18rpx 72rpx 18rpx rgba(0, 195, 255, 0.1);
      z-index: 1;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }

  /* 切换 end */

  /* 登录注册信息 start */
  &__info {
    margin: 40rpx 30rpx 10rpx 30rpx;
    padding-bottom: 0;
    border-radius: 20rpx;

    &__item {

      &__input {
        margin-top: 59rpx;
        width: 100%;
        height: 77rpx;
        border: 1rpx solid #E6E6E6;
        border-radius: 39rpx;

        &__left-icon {
          width: 10%;
          font-size: 44rpx;
          margin-left: 20rpx;
          color: #838383;
        }

        &__content {
          width: 80%;
          padding-left: 10rpx;

          &--verify-code {
            width: 56%;
          }

          input {
            font-size: 24rpx;
            // letter-spacing: 0.1em;
          }
        }

        &__right-icon {
          width: 10%;
          font-size: 44rpx;
          margin-right: 20rpx;
          color: #838383;
        }

        &__right-verify-code {
          width: 34%;
          margin-right: 20rpx;
        }
      }

      &__button {
        margin-top: 75rpx;
        margin-bottom: 39rpx;
        width: 100%;
        height: 77rpx;
        text-align: center;
        font-size: 31rpx;
        font-weight: bold;
        line-height: 77rpx;
        letter-spacing: 1em;
        text-indent: 1em;
        border-radius: 39rpx;
      }

      &__tips {
        margin: 30rpx 0;
        color: #AAAAAA;
      }
    }
  }

  /* 登录注册信息 end */

  /* 登录方式切换 start */
  &__way {
    margin: 0 auto;
    margin-top: 110rpx;

    &__item {
      &--icon {
        width: 85rpx;
        height: 85rpx;
        font-size: 80rpx;
        // border-radius: 100rpx;
        margin-bottom: 18rpx;
        position: relative;
        z-index: 1;

        // &::after {
        //   content: " ";
        //   position: absolute;
        //   z-index: -1;
        //   width: 100%;
        //   height: 100%;
        //   left: 0;
        //   bottom: 0;
        //   border-radius: inherit;
        //   opacity: 1;
        //   transform: scale(1, 1);
        //   background-size: 100% 100%;
        //   background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg5.png);
        // }
      }
    }
  }

  /* 登录方式切换 end */
  /* 内容 end */

}

/deep/ .input-placeholder {
  font-size: 24rpx;
  color: #838383;
}

</style>

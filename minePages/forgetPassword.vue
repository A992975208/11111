<template>
  <view class="template-login">
    <!-- 顶部自定义导航 -->
    <!--    <tn-nav-bar fixed alpha customBack>-->
    <!--      <view slot="back" class='tn-custom-nav-bar__back'-->
    <!--            @click="goBack">-->
    <!--        <text class='icon tn-icon-left'></text>-->
    <!--        <text class='icon tn-icon-home-capsule-fill'></text>-->
    <!--      </view>-->
    <!--    </tn-nav-bar>-->

    <view class="login" v-if="showForget">
      <!-- 顶部背景图片-->
            <view class="login__bg login__bg--top">
              <image class="bg" src="/static/images/login-top.png" mode="widthFix"></image>
            </view>

      <view class="login__wrapper">
        <view class="tn-margin-left tn-margin-right tn-text-bold" style="font-size: 60rpx;">
          忘记密码
        </view>
        <view class="tn-margin tn-color-gray--disabled tn-text-lg">
<!--          你是不是傻，菜的一撇的孜然肉夹馍-->
        </view>
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
                       v-model="forgetParams.phone"/>
              </view>
            </view>
            <view
                class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-safe"></view>
              </view>
              <view class="login__info__item__input__content login__info__item__input__content--verify-code">
                <input placeholder-class="input-placeholder" placeholder="请输入验证码" v-model="forgetParams.smscode"/>
              </view>
              <view class="login__info__item__input__right-verify-code" @tap.stop="getCode">
                <tn-button  fontColor="tn-color-gray" size="sm" padding="5rpx 10rpx" width="100%" shape="round">{{ tips }}</tn-button>
              </view>
            </view>
          </block>
          <view class="login__info__item__button tn-bg-fruit tn-color-black" hover-class="tn-hover"
                :hover-stay-time="150" @click="nextHandel"> 下一步
          </view>
        </view>
        <view>

        </view>
        <view class="tn-flex  tn-padding tn-fixed tn-text-sm">
          <tn-checkbox-group style="margin-top: 8rpx">
            <tn-checkbox v-model="checkValue" shape="circle" size="28" @change="checkboxChange" active-color="#fac10d"></tn-checkbox>
          </tn-checkbox-group>
          <view class="tn-color-gray"> 我已阅读并同意《千果家庭教育用户协议》,《用户个人信息保护政策》 《儿童个人保护规则》
          </view>
        </view>
      </view>
      <!-- 底部背景图片-->
            <view class="login__bg login__bg--bottom">
              <image src="/static/images/login-bottom.png" mode="widthFix"></image>
            </view>
    </view>

    <view class="login" v-else>
      <!-- 顶部背景图片-->
            <view class="login__bg login__bg--top">
              <image class="bg" src="/static/images/login-top.png" mode="widthFix"></image>
            </view>

      <view class="login__wrapper">
        <view class="tn-margin-left tn-margin-right tn-text-bold" style="font-size: 60rpx;">
          修改密码
        </view>
        <view class="tn-margin tn-color-gray tn-text-lg">
          修改密码原有密码无法使用
        </view>
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
                <input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入新的密码"
                       v-model="forgetParams.password"/>
              </view>
            </view>
          </block>
          <view class="login__info__item__button tn-bg-fruit tn-color-black" hover-class="tn-hover" :hover-stay-time="150" @click="finishHandel"> 完成 </view>
        </view>
        <view>
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
      showForget: true,
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
      checkValue: false,
      forgetParams:{
        phone: '',
        smscode: '',
        username: '',
        password: ''
      }
    }
  },
  watch: {
    currentModeIndex(value) {
      const sliderWidth = uni.upx2px(476 / 2)
      this.modeSliderStyle.left = `${sliderWidth * value}px`
    }
  },
  methods: {
    checkboxChange(e) {
      this.checkValue = e.value
    },
    //下一步
    nextHandel(){
      const {phone, smscode} = this.forgetParams
      const errorMessages = [
        {condition: phone === '', message: '请输入手机号'},
        {condition: smscode === '', message: '请输入验证码'},
        {condition: !this.checkValue, message: '请勾选用户协议'},
      ];
      for (const {condition, message} of errorMessages) {
        if (condition) {
          this.$t.message.toast(message);
          return;
        }
      }
      this.checkPhone()
      this.showForget = false
    },
    //完成
    async finishHandel() {
      if (this.forgetParams.password === '') {
        this.$t.message.toast('请输入新的密码')
        return
      }
      try {
        let params = {
          phone: this.forgetParams.phone,
          smscode: this.forgetParams.smscode,
          username: uni.getStorageSync('userInfo').username,
          password: this.forgetParams.password
        }
        const res = await this.$API.changePassword(params)
        if (res.code === 200) {
          this.$t.message.toast('修改密码成功')
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }
      } catch (e) {

      }
    },
    //发送验证码校验
    checkPhone() {
      this.$API.sendCaptcha({phone: this.forgetParams.phone, smscode: this.forgetParams.smscode}).then((res) => {
        console.log(res, '@@@@@@')
      })
    },
    //获取短信接口
    getMsgCode(data) {
      this.$API.sendLoginCaptcha(data).then((res) => {
        console.log(res)
      })
    },
    // 获取验证码
    getCode() {
      if (this.$refs.code.canGetCode) {
        this.$t.message.loading('正在获取验证码')
        this.getMsgCode({mobile: this.forgetParams.phone, smsmode: 2})
        setTimeout(() => {
          this.$t.message.closeLoading()
          this.$t.message.toast('验证码已经发送')
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
    }
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
    margin: 80rpx 30rpx 10rpx 30rpx;
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

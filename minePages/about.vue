<!--关于-->
<template>
  <view class="template-set">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">关于</text>
      </view>
    </tn-nav-bar>
    <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center  tn-padding-top-lg" style="margin-top: 300rpx">
      <image src="/static/logo.png" style="width: 283rpx;height:241rpx"></image>
      <view class="tn-text-lg tn-padding" style="color: #3d3d3d;font-weight: 700">千果家庭教育</view>
      <view class="" style="color: #9f9f9f">V1.0.0</view>
    </view>

    <view class="tn-margin-top" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding tn-margin-top-xs"
            v-for="(item, index) in setList" :key="index" @click="otherPage(item.url)">
        <view class="justify-content-item">
          <view class="tn-text-md" style="color: #3f3f3f">
            {{ item.title }}
          </view>
        </view>

        <view class="justify-content-item tn-text-lg tn-color-gray--dark">
        <view class="tn-flex">
          <view class="tn-text-sm">{{ item.numInfo }}</view>
          <view class="tn-icon-right"></view>
        </view>
        </view>
      </view>
      <tn-modal v-model="show" :title="title" :content="content" :button="button" @click="quitBtn"></tn-modal>
    </view>

    <view class="tn-padding-left-xl tn-padding-right-lg" style="margin-top: 100rpx">
      <view class="tn-text-center tn-color-red--dark">
        <view>
          <text @click="userAgreement(2)">用户协议</text>
          <text class="tn-margin-left-xs tn-margin-right-xs tn-text-justify">|</text>
          <text @click="userAgreement(1)">用户个人信息保护政策</text>
          <text class="tn-margin-left-xs tn-margin-right-xs tn-text-justify">|</text>
          <text @click="userAgreement(3)">培训服务协议</text>
          <text class="tn-margin-left-xs tn-margin-right-xs tn-text-justify">|</text>
          <text @click="userAgreement(4)">儿童个人保护规则</text>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-center tn-margin-top-sm">
        <view class="tn-color-gray--dark">千果家庭教育 版权所有</view>
      </view>
    </view>
    <view class="tn-padding-lg tn-text-center tn-color-gray--dark">
      <view>Copyright © 2024 qianguo.com.All Rights Reserved</view>
      <view class="tn-margin-top-sm">千果家庭教育有限公司 陕ICP备2024044598号</view>
    </view>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
    name: 'TemplateSet',
    mixins: [template_page_mixin],
    data(){
      return {
        show: false,
        title: '退出登录',
        content: '你确定要退出登录吗',
        button: [{
          text: '取消',
          backgroundColor: '#E6E6E6',
          fontColor: '#FFFFFF',
          plain: false,
          shape: 'round'
        },
          {
            text: '确定',
            backgroundColor: 'tn-bg-indigo',
            fontColor: '#FFFFFF'
          }
        ],
        phoneNumber: '',
        setList: [
        	{
        		title: "资质证照公示",
        		url: "/minePages/bussineslicense",
        	},
        	{
        		title: "违法/不良信息举报邮箱",
            numInfo:'qianguojiaoyu@edu.com'
        	},
          {
          	title: "违法/不良信息举报电话",
            numInfo:'010-101019979-6'
          },
        	{
        		title: "违规内容举报电话",
            numInfo:'010-1010146-6'
        	},
          {
        		title: "违规内容举报邮箱",
            numInfo:'qianguojiaoyu@edu.com'
        	},
        ]
      }
    },
  created() {
      //手机号脱敏
      this.phoneNumber = uni.getStorageSync('userInfo').phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  },
    methods: {
      //用户协议跳转
      userAgreement(code) {
        switch (code) {
          case 1:
            this.$navTo.togo('/minePages/content')
            break
          case 2:
            this.$navTo.togo('/minePages/userAgreement')
            break
          case 3:
            this.$navTo.togo('/minePages/trainingAgreement')
            break
          case 4:
            this.$navTo.togo('/minePages/childPersonalRules')
        }
      },
      //账号与安全
      accountSecurity() {
        this.$navTo.togo('/minePages/accountSafety')
      },
      //收货地址
      shippingAddress() {
        this.$navTo.togo('/minePages/shippingAddress')
      },
      //其他富文本页面
      otherPage(url) {
        this.$navTo.togo(url)
      },
      //退出登录
      quitLogin() {
        this.show = true
      },
      quitBtn(e) {
        if (e.index === 1) {
          uni.clearStorageSync()
          uni.reLaunch({url: '/minePages/login'})
        } else {
          this.show = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    /* 胶囊*/
    .tn-custom-nav-bar__back {
      width: 60%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 1000rpx;
      border: 1rpx solid rgba(255, 255, 255, 0.5);
      color: #FFFFFF;
      font-size: 18px;

      .icon {
        display: block;
        flex: 1;
        margin: auto;
        text-align: center;
      }

    }


    /* 间隔线 start*/
    .tn-strip-bottom-min {
      width: 100%;
      border-bottom: 1rpx solid #F8F9FB;
    }

    .tn-strip-bottom {
     width: 100%;
     border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
    }
     /* 间隔线 end*/



  /* 底部悬浮按钮 start*/
  .tn-tabbar-height {
  	min-height: 100rpx;
  	height: calc(120rpx + env(safe-area-inset-bottom) / 2);
  }
  .tn-footerfixed {
    position: fixed;
    width: 100%;
    bottom: calc(30rpx + env(safe-area-inset-bottom));
    z-index: 1024;
    box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);

  }
  /* 底部悬浮按钮 end*/

</style>

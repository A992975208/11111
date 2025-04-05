<template>
  <view class="template-set">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">设置</text>
      </view>
    </tn-nav-bar>

    <view :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" @click="accountSecurity">
        <view class="justify-content-item">
          <view class="tn-text-lg text-color">
            账号与安全
          </view>
        </view>
        <view class="justify-content-item tn-text-lg">
          <view class="tn-flex icon-color">
            <view v-if="phoneNumber">{{ phoneNumber }}</view>
            <view class="tn-icon-right"></view>
          </view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between  tn-padding" @click="toPersonal">
        <view class="justify-content-item">
          <view class="tn-text-lg text-color">
            个人信息
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right icon-color"></view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-padding" @click="shippingAddress">
        <view class="justify-content-item">
          <view class="tn-text-lg text-color">
            收货地址
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right icon-color"></view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between  tn-padding" @click="navTo('/minePages/noticeSet')">
        <view class="justify-content-item">
          <view class="tn-text-lg text-color">
            通知设置
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right icon-color"></view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-padding"  @click="navTo('/minePages/networkSet')">
        <view class="justify-content-item">
          <view class="tn-text-lg text-color">
           网络设置
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right icon-color"></view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-strip-bottom tn-padding"  @click="navTo('/minePages/userSet')">
        <view class="justify-content-item">
          <view class="tn-text-lg text-color">
            用户设置
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right icon-color"></view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding tn-margin-top-xs"
            v-for="(item, index) in setList" :key="index" @click="otherPage(item.url)">
        <view class="justify-content-item">
          <view class="tn-text-lg text-color">
            {{ item.title }}
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right icon-color"></view>
        </view>
      </view>
      <!-- 悬浮按钮-->
      <view class="tn-flex  tn-footerfixed">
        <view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center" @click="quitLogin">
          <tn-button shape="circle" backgroundColor="tn-bg-fruit" size="lg" width="90%" shadow fontBold>
            <!-- <text class="tn-icon-light tn-padding-right-xs tn-color-black"></text> -->
            <text class="tn-color-black">退出登录</text>
            <!-- <text class="tn-icon-light tn-padding-left-xs tn-color-black"></text> -->
          </tn-button>
        </view>
      </view>

      <tn-modal v-model="show" :title="title" :content="content" :button="button" @click="quitBtn"></tn-modal>

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
            backgroundColor: 'tn-bg-fruit',
            fontColor: '#080808'
          }
        ],
        phoneNumber: '',
        setList: [
          {
          	title: "帮助中心",
          	url: "/minePages/help",
          },
        	{
        		title: "版本更新",
        		url: "/minePages/version",
        	},
          {
        		title: "联系我们",
        		url: "/minePages/concatUs",
        	},
          {
        		title: "关于",
        		url: "/minePages/about",
        	},
        ]
      }
    },
  created() {
      //手机号脱敏
      this.phoneNumber = uni.getStorageSync('userInfo').phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  },
    methods: {
      navTo(url){
        this.$navTo.togo(url)
      },
      toPersonal(){
        this.$navTo.togo('/minePages/personal')
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
    .text-color{
      color: #333333;
    }
    .icon-color{
      color:#999999
    }
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

<template>
  <view class="template-help tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack backgroundColor="#ffffff">
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-text-bold tn-text-xl">帮助中心</view>
    </tn-nav-bar>
    <view class="tn-margin-bottom-xl" :style="{paddingTop: vuex_custom_bar_height + 'px'}">

      <view class="tn-flex tn-flex-row-between tn-padding tn-strip-bottom-min tn-margin-top-xs">
        <view class="justify-content-item">
          <view class="tn-text-bold tn-text-lg">
            常见问题
          </view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding tn-margin-top-xs" v-for="(item, index) in helpList" :key="item.id" @click="tn('/minePages/default')">
        <view class="justify-content-item">
          <view class="tn-text-df">
            {{ item.title }}
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right"></view>
        </view>
      </view>

      <view class="tn-flex tn-flex-row-between tn-padding tn-strip-bottom-min tn-strip-top">
        <view class="justify-content-item">
          <view class="tn-text-bold tn-text-lg">
            登录问题
          </view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding tn-margin-top-xs" v-for="(item, index) in helpList1" :key="item.id" @click="tn('/minePages/default')">
        <view class="justify-content-item">
          <view class="tn-text-df">
            {{ item.title }}
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right"></view>
        </view>
      </view>

      <view class="tn-flex tn-flex-row-between tn-padding tn-strip-bottom-min tn-strip-top">
        <view class="justify-content-item">
          <view class="tn-text-bold tn-text-lg">
            其他问题
          </view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding tn-margin-top-xs" v-for="(item, index) in helpList2" :key="item.id" @click="tn('/minePages/default')">
        <view class="justify-content-item">
          <view class="tn-text-df">
            {{ item.title }}
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateHelp',
    mixins: [template_page_mixin],
    data(){
      return {
        helpList: [
        	{
            id:'0',
        		title: "修改了密码还可以登录",
        		name: "",
        	},
        	{
            id:'1',
        		title: "找回密码无法收到验证码",
            name: "",
        	},
        	{
            id:'2',
        		title: "账号无法退出切换账号",
            name: "",
        	},
          {
            id:'3',
          	title: "无法授权微信登录",
            name: "",
          },
        	{
            id:'4',
        		title: "我的账号登录上别人的账号了",
            name: "",
        	},
          {
            id:'5',
          	title: "手机登录无法收到验证码",
            name: "",
          }
        ],
        helpList1: [
        	{
            id:'1132',
        		title: "修改了密码还可以登录",
        		name: "",
        	},
        	{
            id:'54654',
        		title: "找回密码无法收到验证码",
            name: "",
        	},
        	{
            id:'51',
        		title: "账号无法退出切换账号",
            name: "",
        	},
          {
            id:'5456',
          	title: "无法授权微信登录",
            name: "",
          },
        	{
            id:'569',
        		title: "我的账号登录上别人的账号了",
            name: "",
        	},
          {
            id:'7489',
          	title: "手机登录无法收到验证码",
            name: "",
          }
        ],
        helpList2: [
        	{
            id:'7979',
        		title: "修改了密码还可以登录",
        		name: "",
        	},
        	{
            id:'1323',
        		title: "找回密码无法收到验证码",
            name: "",
        	},
        	{
            id:'1616',
        		title: "账号无法退出切换账号",
            name: "",
        	},
          {
            id:'168',
          	title: "无法授权微信登录",
            name: "",
          },
        	{
            id:'496',
        		title: "我的账号登录上别人的账号了",
            name: "",
        	},
          {
            id:'859496',
          	title: "手机登录无法收到验证码",
            name: "",
          }
        ],
      }
    },
    methods: {
      // 跳转
      tn(e) {
        uni.navigateTo({
          url: e,
        });
      },
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

    .tn-strip-top {
     width: 100%;
     border-top: 20rpx solid rgba(241, 241, 241, 0.8);
    }
     /* 间隔线 end*/
</style>

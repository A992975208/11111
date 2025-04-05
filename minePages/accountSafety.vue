<template>
  <view class="template-set">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">账号与安全</text>
      </view>
    </tn-nav-bar>

    <view class="tn-margin-top" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding">
        <view class="justify-content-item">
          <view class="tn-text-lg">
           修改手机
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right"></view>
        </view>
      </view>

<!--      <view class="tn-flex tn-flex-row-between tn-padding" @click="tn('/minePages/safety')">-->
      <view class="tn-flex tn-flex-row-between tn-padding">
        <view class="justify-content-item">
          <view class="tn-text-lg">
           设置密码
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right"></view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-padding" @click="tn('/minePages/logOut')">
        <view class="justify-content-item">
          <view class="tn-text-lg">
           注销账号
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
    name: 'TemplateSet',
    mixins: [template_page_mixin],
    data(){
      return {
        setList: [
        	{
        		title: "版权所属",
        		url: "/minePages/content",
        	},
        	{
        		title: "使用协议",
        		url: "/minePages/content",
        	},
        	{
        		title: "隐私政策",
        		url: "/minePages/content",
        	},
          {
          	title: "帮助中心",
          	url: "/minePages/help",
          },
        	{
        		title: "版本更新",
        		url: "/minePages/version",
        	}
        ]
      }
    },
    methods: {

      tn(url) {
      	try {
      		uni.navigateTo({
      			url,
      		});
      	} catch (e) {
      		console.error(e);
      		uni.showToast({
      			title: "跳转失败",
      			icon: "none",
      			mask: true,
      		});
      	}
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

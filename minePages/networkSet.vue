<template>
  <view class="template-set">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack class="tn-strip-bottom-min">
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">网络设置</text>
      </view>
    </tn-nav-bar>

    <view class="content-shadow" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min  tn-padding">
        <view class="justify-content-item">
          <view class="tn-text-lg">
            仅wifi下使用
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <tn-switch v-model="wifiShow"  active-color="#fac10d"></tn-switch>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-padding">
        <view class="justify-content-item">
          <view class="tn-text-lg">
            切换到4G/5G网络式提醒我
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <tn-switch v-model="otherShow"  active-color="#fac10d"></tn-switch>
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
  data() {
    return {
      wifiShow:false,
      otherShow:false
    }
  },
  onLoad() {
    uni.getNetworkType({
      success: function (res) {
        console.log(res.networkType);
      }
    });

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.content-shadow{
  box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
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

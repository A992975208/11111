<template>
  <view class="template-set">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack class="tn-strip-bottom-min">
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">用户设置</text>
      </view>
    </tn-nav-bar>
    <view class="tn-shadow-gray" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding tn-margin-top-xs"
            v-for="(item, index) in setList" :key="index" @click="otherPage(item.url)">
        <view class="justify-content-item">
          <view class="tn-text-lg">
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
  name: 'TemplateSet',
  mixins: [template_page_mixin],
  data() {
    return {
      setList: [
        {
          title: "个人信息收集清单",
          url: "/minePages/personalInfo",
        },
        {
          title: "第三方信息共享清单",
          url: "/minePages/thirdPartyInfoShareList",
        },
        {
          title: "应用权限说明",
          url: "/minePages/appPermissionsDesc",
        },
        {
          title: "隐私政策",
          url: "/minePages/content",
        },
      ]
    }
  },
  methods: {
    otherPage(url) {
      this.$navTo.togo(url)
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

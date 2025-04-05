<template>
  <view class="template-cart tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">未完成任务</text>
      </view>
    </tn-nav-bar>
    <view>
      <view class="empty-container">
            <tn-empty :imgWidth="width" text="暂无未完成任务" :show="show" icon="/static/images/notask_empty.png"></tn-empty>
          </view>
    </view>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
  mixins: [template_page_mixin],
  data() {
    return {
      show:true,
      width: 200
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
/* 胶囊*/
.tn-custom-nav-bar__back {
  width: 100%;
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

  &:before {
    content: " ";
    width: 1rpx;
    height: 110%;
    position: absolute;
    top: 22.5%;
    left: 0;
    right: 0;
    margin: auto;
    transform: scale(0.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    opacity: 0.7;
    background-color: #FFFFFF;
  }
}

.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

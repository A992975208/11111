<template>
  <view class="template-content">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center">
        <text class="tn-text-bold tn-text-xl tn-color-black">抖音卡券</text>
      </view>
      <view slot="right" class="tn-padding" @click="toVerificationRecord">核销记录</view>
    </tn-nav-bar>
    <view :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-padding content_shadow tn-margin-lg">
        <view class="tn-flex">
          <tn-input class="input_Style" placeholder="请输入卡券码" v-model="coupon" :maxLength="maxLength"
                    showConfirmBar></tn-input>
        </view>
        <tn-button background-color="tn-bg-fruit" font-color="tn-color-black" shape="round" width="100%"
                   @click="couponHandle">核销
        </tn-button>
      </view>
    </view>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
  name: 'TemplateContent',
  mixins: [template_page_mixin],
  data() {
    return {
      coupon: '',
      maxLength: 255,
    }
  },
  onLoad() {
  },
  methods: {
    couponHandle() {
      if (!this.coupon) this.$t.message.toast('请输入卡券码')
    },
   toVerificationRecord(){
     this.$navTo.togo('/minePages/verificationRecord')
   }
  }
}
</script>

<style lang="scss" scoped>
.content_shadow {
  border-radius: 20rpx;
  box-shadow: 0 10rpx 50rpx 0 rgba(0, 3, 72, 0.1);
}

.input_Style {
  background: #F5F5F5;
  color: #000000;
  padding: 10rpx 40rpx!important;
  border-radius: 60rpx;
  margin-bottom: 30rpx;
}

.content {
  .title {
    color: red;
  }
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
</style>

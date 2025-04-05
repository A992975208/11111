<template>
	<view class="template-edit tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>

    <view class="tn-safe-area-inset-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">

      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top tn-margin">
        <view class="tn-flex justify-content-item">
          <view class="tn-color-gray tn-text-center" style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
            <text class="tn-icon-tip tn-color-gray" style="font-size: 30rpx;"></text>
          </view>
          <view class="tn-text-lg tn-padding-right-xs tn-color-grey">当前只支持修改文字内容</view>
        </view>
        <view class="justify-content-item tn-text-df tn-color-grey">
          <text class="tn-padding-xs">500字内</text>
          <text class="tn-icon-keyboard-circle"></text>
        </view>
      </view>

      <!-- <view class="tn-margin tn-bg-gray--light" style="border-radius: 10rpx;padding: 20rpx 30rpx;">
      	<input placeholder="写下一句简短的标题" name="input" placeholder-style="color:#AAAAAA" ></input>
      </view> -->
      <view class="tn-margin tn-bg-gray--light tn-padding" style="border-radius: 10rpx;">
        <textarea maxlength="500" placeholder="说点什么 , 万一火了呢"
                  placeholder-style="color:#AAAAAA" v-model="content"></textarea>
      </view>
      <view class="tn-flex tn-footerfixed">
        <view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center">
          <tn-button backgroundColor="#00FFC6" padding="40rpx 0" width="60%" shadow fontBold @tap="editCommunityDetail">
            <!-- <text class="tn-icon-light tn-padding-right-xs tn-color-black"></text> -->
            <text class="tn-color-black">修改</text>
            <text class="tn-icon-edit-write-fill tn-padding-left-xs tn-color-black"></text>
          </tn-button>
        </view>
      </view>
    </view>
    <view class='tn-tabbar-height'></view>
	</view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
  name: 'TemplateEdit',
  mixins: [template_page_mixin],
  data() {
    return {
      content: '',
      id: '',
    }
  },
  onLoad(options) {
    this.id = options.id
    this.getCommunityBuyIdDetail()
  },
  methods: {
    async getCommunityBuyIdDetail() {
      try {
        const res = await this.$API.getCommunityBuyIdDetail({id: this.id})
        if (res.code === 200 && res?.result) {
          console.log(res)
          this.content = res.result.content
        }
      } catch (e) {
        console.log(e)
      }
    },
    async editCommunityDetail() {
      try {
        if (!this.content) {
          uni.showToast({
            title: '请输入内容',
            icon: 'none'
          })
          return
        }
        let params = {
          customerId:uni.getStorageSync('userId'),
          id: this.id,
          content: this.content,
          izActive:1
        }
        const res = await this.$API.editCommunity(params)
        if(res.code===200){
          uni.navigateBack()
          uni.$emit('refreshCommunityDetail')
        }
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
	.template-edit{
	}

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

  /* 标签内容 start*/
  .tn-tag-content {
    &__item {
      display: inline-block;
      line-height: 45rpx;
      padding: 10rpx 30rpx;
      margin: 20rpx 20rpx 5rpx 0rpx;

      &--prefix {
        padding-right: 10rpx;
      }
    }
  }
  /* 标签内容 end*/

  /* 统一上传后显示的盒子宽高比 */
  .box-mode {
    width: 27vw;
    height: 27vw;

    border-radius: 8rpx;
    overflow: hidden;
  }

  .full {
    width: 100%;
    height: 100%;
  }

  .up-page {
    display: flex;
    flex-wrap: wrap;
    display: flex;
    width: 100%;

    .show-box:nth-child(3n) {
      margin-right: 0;
    }

    .show-box {
      position: relative;
      margin-bottom: 4vw;
      margin-right: 4vw;
      @extend .box-mode;

      .delect-icon {
        height: 40rpx;
        width: 40rpx;
        position: absolute;
        right: 0rpx;
        top: 0rpx;
        z-index: 1000;
      }
    }
  }
</style>

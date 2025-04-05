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
          <view class="tn-bg-black tn-color-white tn-text-center" style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
            <text class="tn-icon-topics" style="font-size: 30rpx;"></text>
          </view>
          <view class="tn-text-lg tn-padding-right-xs tn-text-bold">想说点什么</view>
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
          placeholder-style="color:#AAAAAA" v-model="publicParams.content"></textarea>
      </view>

      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xl tn-margin">
        <view class="tn-flex justify-content-item">
          <view class="tn-bg-black tn-color-white tn-text-center" style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
            <text class="tn-icon-image" style="font-size: 30rpx;"></text>
          </view>
          <view class="tn-text-lg tn-padding-right-xs tn-text-bold">发点什么图咧</view>
        </view>
        <view class="justify-content-item tn-text-df tn-color-grey" @tap="clear">
          <text class="tn-padding-xs">清空上传</text>
          <text class="tn-icon-delete"></text>
        </view>
      </view>

      <view class="tn-margin-left tn-padding-top-xs">
        <!--        <view>-->
        <!--          <tn-image-upload-drag-->
        <!--              ref="imageUpload"-->
        <!--              :action="action"-->
        <!--              :width="236"-->
        <!--              :height="236"-->
        <!--              :formData="formData"-->
        <!--              :header="header"-->
        <!--              :fileList="fileList"-->
        <!--              :disabled="disabled"-->
        <!--              :autoUpload="autoUpload"-->
        <!--              :maxCount="maxCount"-->
        <!--              :showUploadList="showUploadList"-->
        <!--              :showProgress="showProgress"-->
        <!--              :deleteable="deleteable"-->
        <!--              :customBtn="customBtn"-->
        <!--              @sort-list="onSortList"-->
        <!--              @on-success="onSuccess"-->
        <!--          />-->
        <!--        </view>-->
        <uploadMore @uploadCallBack="uploadCallBack"></uploadMore>
      </view>
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xl tn-margin">
        <view class="tn-flex justify-content-item">
          <view class="tn-bg-black tn-color-white tn-text-center" style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
            <text class="tn-icon-tag" style="font-size: 30rpx;"></text>
          </view>
          <view class="tn-text-lg tn-padding-right-xs tn-text-bold">话题标签</view>
        </view>
        <view class="justify-content-item tn-text-df tn-color-grey">
          <text class="tn-padding-xs">选择</text>
          <text class="tn-icon-right"></text>
        </view>
      </view>

      <view class="tn-tag-content tn-margin tn-text-justify tn-padding-bottom">
        <view v-for="(item, index) in tagList" :key="index" class="tn-tag-content__item tn-margin-right tn-round tn-text-sm tn-text-bold" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
          <text class="tn-tag-content__item--prefix">#</text> {{ item.title }}
        </view>
      </view>
      <!-- 悬浮按钮-->
      <view class="tn-flex tn-footerfixed">
        <view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center">
          <tn-button backgroundColor="#00FFC6" padding="40rpx 0" width="60%" shadow fontBold @tap="publishCommunity">
            <!-- <text class="tn-icon-light tn-padding-right-xs tn-color-black"></text> -->
            <text class="tn-color-black">发 布</text>
            <text class="tn-icon-camera tn-padding-left-xs tn-color-black"></text>
          </tn-button>
        </view>
      </view>
    </view>
    <view class='tn-tabbar-height'></view>
	</view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
import uploadMore from '@/components/upload-more/upload-more.vue'
export default {
  name: 'TemplateEdit',
  mixins: [template_page_mixin],
  components: { uploadMore },
  data() {
    return {
      tagList: [
        {
          color: 'red',
          title: "元神",
        },
        {
          color: 'cyan',
          title: "LOL",
        },
        {
          color: 'blue',
          title: "千果",
        },
        {
          color: 'green',
          title: "科技",
        },
        {
          color: 'orange',
          title: "免费",
        },
        {
          color: 'purplered',
          title: "前端",
        },
        {
          color: 'purple',
          title: "后端",
        },
        {
          color: 'brown',
          title: "UI设计",
        },
        {
          color: 'yellowgreen',
          title: "求助",
        },
        {
          color: 'grey',
          title: "吃货",
        },
        {
          color: 'orangered',
          title: "萌宠",
        }
      ],
      action: 'https://10bb-1-86-240-250.ngrok-free.app/sys/common/upload',
      // action: 'http://62.234.12.185:9999/sys/common/upload',
      formData: {
        // file: '',
      },
      header: {
        'X-Access-Token': uni.getStorageSync('token'),
      },
      fileList: [
        // {url: 'https://resource.tuniaokj.com/images/shop/bag1.jpg'},
        // {url: 'https://resource.tuniaokj.com/images/shop/bag2.jpg'},
        // {url: 'https://resource.tuniaokj.com/images/shop/cup1.jpg'},
        // {url: 'https://resource.tuniaokj.com/images/shop/cup2.jpg'}
      ],
      showUploadList: true,
      customBtn: false,
      autoUpload: true,
      showProgress: false,
      deleteable: true,
      customStyle: false,
      maxCount: 9,
      disabled: false,
      publicParams:{
        customerId:uni.getStorageSync('userId'),
        content:'',
        attach:'',
        izActive:1,
      }
    }
  },
  onLoad() {
  },
  methods: {
    uploadMore(e){
      console.log('上传成功',e)
    },
    async publishCommunity() {
      try {
        const {content, attach} = this.publicParams;
        const errorMessages = [
          {condition: content === '', message: '请输入内容'},
          {condition: attach === '', message: '请选择上传的图片或者视频'},
        ];
        for (const {condition, message} of errorMessages) {
          if (condition) {
            this.$t.message.toast(message);
            return;
          }
        }
        const res = await this.$API.publishCommunity(this.publicParams)
        if (res.code == 200&&res?.result) {
          this.$t.message.toast('发布成功')
          console.log(res,'发布成功')
          this.$navTo.togo('/pages/index')
          // setTimeout(() => {
          //   uni.navigateBack()
          // }, 1500)
        }
      } catch (e) {

      }
    },
    uploadCallBack(e){
      this.publicParams.attach = Array.from(e).toString()
      console.log(e,'上传回调')
    },
    // 返回
    goBack() {
      uni.navigateBack()
    },
    // 跳转
    tn(e) {
      uni.navigateTo({
        url: e,
      });
    },
    // 手动上传文件
    upload() {
      this.$refs.imageUpload.upload()
    },
    // 手动清空列表
    clear() {
      this.$refs.imageUpload.clear()
    },
    // 图片拖拽重新排序
    onSortList(list) {
      console.log(list);
    },
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

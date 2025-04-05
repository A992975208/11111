<template>
  <view class="template-edit tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="right" class="tn-padding-right" style="width: 100%">
            <tn-button v-if="userId" size="sm" backgroundColor="#00FFC6" padding="20rpx" shadow fontBold @tap="publishCommunity">
              发布
            </tn-button>
      </view>
    </tn-nav-bar>

    <view v-if="userId">
      <view class="tn-safe-area-inset-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">

        <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top tn-margin">
          <view class="tn-flex justify-content-item">
            <view class="tn-bg-fruit tn-color-white tn-text-center" style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
              <text class="tn-icon-topics" style="font-size: 30rpx;"></text>
            </view>
            <view class="tn-text-lg tn-color-gray tn-padding-right-xs tn-text-bold">写些什么和大家分享....</view>
          </view>
          <view class="justify-content-item tn-text-df tn-color-gray">
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
            <view class="tn-bg-fruit tn-color-white tn-text-center" style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
              <text class="tn-icon-image" style="font-size: 30rpx;"></text>
            </view>
            <view class="tn-text-lg tn-color-gray tn-padding-right-xs tn-text-bold">选择分享的图片或者视频</view>
          </view>
          <view class="justify-content-item tn-text-df tn-color-gray" @tap="clear">
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
          <uploadMore ref="uploadMore" @uploadCallBack="uploadCallBack"></uploadMore>
        </view>
        <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xl tn-margin">
          <view class="tn-flex justify-content-item">
            <view class="tn-bg-fruit tn-color-white tn-text-center" style="border-radius: 100rpx;margin-right: 8rpx;width: 45rpx;height: 45rpx;line-height: 45rpx;">
              <text class="tn-icon-tag" style="font-size: 30rpx;"></text>
            </view>
            <view class="tn-text-lg tn-color-gray tn-padding-right-xs tn-text-bold">话题标签</view>
          </view>
          <view class="justify-content-item tn-text-df tn-color-gray">
            <text class="tn-padding-xs">选择</text>
            <text class="tn-icon-right"></text>
          </view>
        </view>
        <view class="tn-tag-content tn-margin tn-text-justify tn-padding-bottom">
          <view v-for="(item, index) in tagList" :key="index" class="tn-tag-content__item tn-margin-right tn-round tn-text-sm tn-text-bold" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
            <text class="tn-tag-content__item--prefix">#</text> {{ item.title }}
          </view>
        </view>
      </view>
    </view>
    <view v-else class="empty-wrap tn-safe-area-inset-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="empty-content">
        <image src="/static/images/no-login.jpg" style="width: 253rpx;height: 196rpx;"></image>
        <view class="tn-color-gray tn-text-sm tn-text-center">登录后即可发布动态</view>
        <view class="tn-flex tn-flex-row-center tn-padding-top-xl">
          <tn-button shape="round" backgroundColor="tn-bg-fruit" width="100%" shadow fontBold
                     @click="toLogin">
            <text class="tn-color-black">登录/注册</text>
          </tn-button>
        </view>
      </view>
    </view>
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
      userId:uni.getStorageSync('userId'),
      tagList: [
        {
          color: 'purplered',
          title: "休学在家",
        },
        {
          color: 'purple',
          title: "抑郁焦虑",
        },
        {
          color: 'brown',
          title: "不好好学习",
        },
        {
          color: 'yellowgreen',
          title: "沉迷游戏",
        },
        {
          color: 'grey',
          title: "校园早恋",
        },
        {
          color: 'orangered',
          title: "注意力不集中",
        }
      ],
      formData: {
        // file: '',
      },
      header: {
        'X-Access-Token': uni.getStorageSync('token'),
      },
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
    toLogin() {
      uni.reLaunch({
        url: '/minePages/login',
      })
    },
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
          this.publicParams.content = ''
          this.publicParams.attach = ''
          this.$refs.uploadMore.clearImageVideo()
        }
      } catch (e) {

      }
    },
    uploadCallBack(e){
      this.publicParams.attach = Array.from(e).toString()
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
.empty-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 104rpx);
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

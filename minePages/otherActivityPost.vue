<template>
  <view class="template-message">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed :bottomShadow="false" customBack>
      <view slot="back" class="tn-custom-nav-bar__back" @click="goBack">
        <view class="tn-icon-left tn-text-bold"></view>
      </view>
      <view class="">
        <text class="tn-text-lg tn-text-bold">消息通知</text>
      </view>
    </tn-nav-bar>
    <view class="tn-safe-area-inset-bottom tn-margin-bottom-sm" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-padding" v-for="(item,index) in pushRecordList" :key="item.id">
        <view class="tn-text-center tn-color-gray tn-padding">{{item.createTime}}</view>
        <view class="tn-padding content_shadow" style="border-radius: 20rpx">
          <view class="tn-text-bold">{{item.msgBody.title}}</view>
          <view class="tn-color-gray tn-padding-top">
            {{item.msgBody.content}}
          </view>
          <view class="tn-color-gray tn-padding-top">感谢您的支持与配合！</view>
          <view class="tn-color-gray tn-padding-top">【平台运营团队】</view>
          <view class="tn-color-gray tn-padding-top">{{item.createTime}}</view>
        </view>
      </view>

      <tn-load-more class="tn-margin-top tn-text-sm tn-padding" status="nomore" :loadText="loadText"
                    fontColor="tn-color-gray">
      </tn-load-more>
    </view>
  </view>

</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
  name: 'TemplateMessage',
  mixins: [template_page_mixin],
  data() {
    return {
      showSkeleton:true,
      loadText: {
        loadmore: '下拉加载',
        loading: '快速加载中...',
        nomore: '已经没有了啊'
      },
      pushRecordList:[]
    }
  },
  onLoad() {

  },
  created() {
    this.getPushRecordList()
  },
  methods: {
    async getPushRecordList() {
      try {
        const params = {
          pageNo: 1,
          pageSize: 10,
          customerId: uni.getStorageSync('userId'),
          msgType: 1
        }
        const res = await this.$API.getPushRecord(params)
        if(res.code===200&&res?.result?.records){
          this.pushRecordList = res.result.records.map(item=>{
            return{
              ...item,
              createTime:  this.$dayjs(item.createTime).format('YYYY年MM月DD日 HH:mm:ss'),
              msgBody:JSON.parse(item.msgBody)
            }
          })
        }
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.template-message {
  //background: #f6f6f6;
  height: 100%;
}

.content_shadow {
  box-shadow: 0 0 41px 0 rgba(0, 0, 0, 0.07);
  padding: 40rpx;
  margin: 15rpx;
  border-radius: 15px;
}

/* 胶囊*/
.tn-custom-nav-bar__back {
  width: 60%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 1000rpx;
  color: #000000;
  font-size: 18px;
}

.tn-message-fixed {
  position: fixed;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  top: 0;
  width: 100%;
  transition: all 0.25s ease-out;
  z-index: 100;
}

/* 图标容器1 start */
.icon1 {
  &__item {
    width: 30%;
    background-color: #FFFFFF;
    border-radius: 10rpx;
    padding: 30rpx;
    margin: 20rpx 10rpx;
    transform: scale(1);
    transition: transform 0.3s linear;
    transform-origin: center center;

    &--icon {
      width: 90rpx;
      height: 90rpx;
      font-size: 60rpx;
      border-radius: 50%;
      position: relative;
      z-index: 1;

      &::after {
        content: " ";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        border-radius: inherit;
        opacity: 1;
        transform: scale(1, 1);
        background-size: 100% 100%;
        background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
      }
    }
  }
}

/* 用户头像 start */
.logo-image {
  width: 90rpx;
  height: 90rpx;
  position: relative;
}

.logo-pic {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  // box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  overflow: hidden;
  // background-color: #FFFFFF;
}
</style>

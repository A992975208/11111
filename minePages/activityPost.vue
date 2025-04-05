<template>
  <view class="template-message">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed :bottomShadow="false" customBack>
      <view slot="back" class="tn-custom-nav-bar__back" @click="goBack">
        <view class="tn-icon-left tn-text-bold"></view>
      </view>
      <view class="">
        <text class="tn-text-lg tn-text-bold">活动公告</text>
      </view>
    </tn-nav-bar>
    <view class="tn-safe-area-inset-bottom tn-margin-bottom-sm" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-padding" v-for="(item,index) in messageList" :key="index">
        <view class="tn-text-center tn-color-gray">{{ item.time }}</view>
        <view class="content-shadow">
          <view class="tn-bg-white tn-padding" style="border-radius: 20rpx">
            <view class="tn-text-bold">{{ item.title }}</view>
            <view class="tn-color-gray tn-padding-top">
              {{ item.content }}
            </view>
            <view v-if="item.imageUrl" class="image-content">
              <image :src="item.imageUrl" mode="widthFix" class="tn-margin-top"></image>
            </view>
            <view class="tn-color-gray tn-padding-top">{{ item.time }}</view>
            <view class="tn-line"></view>
            <view class="tn-flex tn-flex-row-between tn-flex-col-center">
              <view class="tn-text-sm">查看详情</view>
              <view class="tn-icon-right tn-color-gray"></view>
            </view>
          </view>
        </view>
      </view>
      <tn-load-more class="tn-margin-top tn-text-sm tn-padding" status="nomore" :loadText="loadText" fontColor="tn-color-gray">
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
      loadText: {
        loadmore: '下拉加载',
        loading: '快速加载中...',
        nomore: '已经没有了啊',
      },
      messageList: [
          {

            title: "限时优惠 · 热门课程折扣活动",
            content: "亲爱的用户：\n为回馈广大用户的支持，我们特别推出限时优惠活动！精选热门课程限时折扣，低至5折，助您轻松提升技能。\n活动时间：2024年12月20日 - 2025年1月10日。\n快来参与，开启您的学习新旅程！",
            time: "2024-12-16 17:46",
            author: "课程运营团队",
            imageUrl: "/static/images/job.png"
          },
          {

            title: "新年特惠 · 开启学习新篇章",
            content: "新的一年，新的开始！精选新课程限时上架，限时优惠，赶快抢购！\n活动时间：2025年1月1日 - 2025年1月15日。\n抓住机会，学习提升不等人！",
            time: "2024-12-18 10:00",
            author: "课程团队",
            imageUrl: ""
          },
          {
            title: "热门课程限时免费体验",
            content: "亲爱的用户：\n我们特别推出精选课程限时免费体验活动，零成本获取知识！\n活动时间：2024年12月25日 - 2024年12月31日。\n快来体验，让学习无界限！",
            time: "2024-12-17 14:30",
            author: "运营团队",
            imageUrl: "/static/images/job.png"
          },
          {
            title: "双旦狂欢 · 优惠不停",
            content: "双旦来临，狂欢不停！全场课程低至7折，更有新课限时抢购！\n活动时间：2024年12月24日 - 2025年1月2日。\n更多优惠等您发现！",
            time: "2024-12-19 08:00",
            author: "活动团队",
            imageUrl: ""
          },
          {
            title: "春节预热 · 学习礼包大放送",
            content: "为迎接新春佳节，我们推出学习礼包活动，购买课程即送学习资料礼包！\n活动时间：2025年1月10日 - 2025年2月5日。\n用知识开启新年好运！",
            time: "2024-12-20 12:00",
            author: "教育团队",
            imageUrl: "/static/images/job.png"
          },
          {
            title: "限量课程 · 一元抢购",
            content: "震撼优惠来袭！每日限量课程仅需1元即可抢购，先到先得！\n活动时间：2024年12月22日 - 2024年12月31日。\n让学习更实惠！",
            time: "2024-12-15 18:00",
            author: "活动策划团队",
            imageUrl: "/static/images/job.png"
          }
      ]
    }
  },
  onLoad() {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.content-shadow {
  margin: 30rpx;
  border-radius: 20rpx;
  box-shadow: 0px 0px 41px 0px rgba(0, 0, 0, 0.07);;
}

.image-content {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
  overflow: hidden;
}

.tn-line {
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background-color: #e5e5e5;
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

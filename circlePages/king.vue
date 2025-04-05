<template>
  <view class="template-king tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>

    <!-- 顶部 -->
    <view>
      <view class="tn-strip-bottom">
        <view class="slideshow">
          <view class="slideshow-image"
                :style="'background-image: url('+ personalInfo.demeanour +')'"></view>
          <view class="slideshow-image"
                :style="'background-image: url(' + personalInfo.demeanour + ')'"></view>
        </view>
        <view class="beibei">
          <view class="beibei2" :style="'background-image: url(' + personalInfo.demeanour + ')'"></view>
        </view>
        <view class='tn-margin tn-padding-top-sm'>
          <view class="tn-text-bold">
            <text class='tn-text-xxl tn-padding-right' style="color: #666666">{{ personalInfo.tutorName }}</text>
            <text class='tn-text-lg tn-color-gray'>国家二级心理咨询师</text>
          </view>
          <view class="tn-margin-top-lg">
            <text class="tn-text-lg" style="color: #666666">微信：{{ personalInfo.wechat }}</text>
          </view>
          <view class="tn-margin-top-xs">
            <text class="tn-text-lg" style="color: #666666">电话：{{ personalInfo.phoneNum }}</text>
          </view>
        </view>
      </view>
      <view class="king-list tn-margin-top-sm">
        <view class="king-icon">
          <text class='tn-icon-creative tn-color-white tn-text-lg tn-bg-blue tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>个人简介</text>
        </view>
        <view class='king-item tn-color-red tn-icon-circle-fill'>
          <view class="resume2">
            <text class="">
              {{ personalInfo.intro }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
    name: 'TemplateKing',
    mixins: [template_page_mixin],
    data(){
      return {
        personalInfo: {}
      }
    },
  onLoad(options) {
    this.getTeacherBuyId(options.id)
  },
  methods: {
    async getTeacherBuyId(id) {
      try {
        const res = await this.$API.getTeacherBuyId({id})
        if (res.code === 200) {
          this.personalInfo = res.result
        }
      } catch (e) {
      }
    }
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

/* 主图固定 */
  .beibei{
      width:100%;
      height:1000upx;
  }
  .beibei2{
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 100%;
      width: 100%;
      position: relative;
      background-position: center center;
      background-size: cover;
  }
  /* 相册 */
  .slideshow {
    top: 0;
    position: absolute;
    width: 100vw;
    height: 1000upx;
    overflow: hidden;
  }

  .slideshow-image {
    position: absolute;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50%;
    background-size: cover;
    -webkit-animation-name: kenburns;
    animation-name: kenburns;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-duration: 16s;
    animation-duration: 16s;
    opacity: 1;
    transform: scale(1.2);
  }

  .slideshow-image:nth-child(1) {
    -webkit-animation-name: kenburns-1;
    animation-name: kenburns-1;
    z-index: 3;
  }

  .slideshow-image:nth-child(2) {
    -webkit-animation-name: kenburns-2;
    animation-name: kenburns-2;
    z-index: 2;
  }

  .slideshow-image:nth-child(3) {
    -webkit-animation-name: kenburns-3;
    animation-name: kenburns-3;
    z-index: 1;
  }

  .slideshow-image:nth-child(4) {
    -webkit-animation-name: kenburns-4;
    animation-name: kenburns-4;
    z-index: 0;
  }

  @-webkit-keyframes kenburns-1 {
    0% {
      opacity: 1;
      transform: scale(1.2);
    }

    1.5625% {
      opacity: 1;
    }

    23.4375% {
      opacity: 1;
    }

    26.5625% {
      opacity: 0;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(1.2);
    }

    98.4375% {
      opacity: 0;
      transform: scale(1.2117647059);
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes kenburns-1 {
    0% {
      opacity: 1;
      transform: scale(1.2);
    }

    1.5625% {
      opacity: 1;
    }

    23.4375% {
      opacity: 1;
    }

    26.5625% {
      opacity: 0;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(1.2);
    }

    98.4375% {
      opacity: 0;
      transform: scale(1.2117647059);
    }

    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes kenburns-2 {
    23.4375% {
      opacity: 1;
      transform: scale(1.2);
    }

    26.5625% {
      opacity: 1;
    }

    48.4375% {
      opacity: 1;
    }

    51.5625% {
      opacity: 0;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }

  @keyframes kenburns-2 {
    23.4375% {
      opacity: 1;
      transform: scale(1.2);
    }

    26.5625% {
      opacity: 1;
    }

    48.4375% {
      opacity: 1;
    }

    51.5625% {
      opacity: 0;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }

  @-webkit-keyframes kenburns-3 {
    48.4375% {
      opacity: 1;
      transform: scale(1.2);
    }

    51.5625% {
      opacity: 1;
    }

    73.4375% {
      opacity: 1;
    }

    76.5625% {
      opacity: 0;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }

  @keyframes kenburns-3 {
    48.4375% {
      opacity: 1;
      transform: scale(1.2);
    }

    51.5625% {
      opacity: 1;
    }

    73.4375% {
      opacity: 1;
    }

    76.5625% {
      opacity: 0;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }

  @-webkit-keyframes kenburns-4 {
    73.4375% {
      opacity: 1;
      transform: scale(1.2);
    }

    76.5625% {
      opacity: 1;
    }

    98.4375% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      transform: scale(1);
    }
  }

  @keyframes kenburns-4 {
    73.4375% {
      opacity: 1;
      transform: scale(1.2);
    }

    76.5625% {
      opacity: 1;
    }

    98.4375% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      transform: scale(1);
    }
  }


  /* 简历内容 */
  .king-list {
    display: block;
    background-color: #ffffff;
  }

.king-list .king-icon {
    width: 100%;
    text-align: left;
    padding: 20rpx 0 20rpx 37rpx;
    font-size: 26rpx;
    color: #888;
    display: block;
  }

.king-list>.king-item {
    padding: 30rpx 30rpx 30rpx 120rpx;
    position: relative;
    display: block;
    z-index: 0;
  }

  .king-list>.king-item::after {
    content: "";
    display: block;
    position: absolute;
    width: 1rpx;
    background-color: #E6E6E6;
    left: 60rpx;
    height: 100%;
    top: 0;
    z-index: 8;
  }

  .king-list>.king-item::before {
    display: block;
    position: absolute;
    top: 36rpx;
    z-index: 9;
    background-color: #ffffff;
    width: 50rpx;
    height: 50rpx;
    text-align: center;
    border: none;
    line-height: 50rpx;
    left: 36rpx;
  }


  /* 名片微调 */
  .img-solid {
    border: 2rpx solid #eee;
  }

  .share-img {
    position: fixed;
    /* padding: 10rpx; */
    width: 100rpx;
    height: 100rpx;
    /* top: 680rpx; */
    bottom: 200rpx;
    right: 20rpx;
    z-index: 1024;
    opacity: 0.8;
    box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.3);
    border: none;
    border: 6rpx solid rgba(255, 255, 255, 0);
  }

  .resume {
    display: flex;
    justify-content: space-between;
    padding-top: 10rpx;
    border-radius: 6rpx;
    color: #666;
    line-height: 1.6;
  }

  .resume+.resume {
    margin-top: 20rpx;
  }

  .resume2 {
    padding-top: 10rpx;
    border-radius: 6rpx;
    display: block;
    color: #666;
    line-height: 1.6;
    text-align: justify;
  }

/* 间隔线 start*/
  .tn-strip-bottom {
   width: 100%;
   border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
  }
   /* 间隔线 end*/


  .bg-img-cont {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 350rpx;
    margin: 20rpx 0;
    border-radius: 8rpx;
  }



  // .button-no {
  //   border: none;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0, 0, 0, 0);
  // }


/* 标签内容 start*/
  .tn-tag-content {
    &__item {
      display: inline-block;
      line-height: 45rpx;
      padding: 10rpx 30rpx;
      margin: 0rpx 20rpx 25rpx 0rpx;

      &--prefix {
        padding-right: 10rpx;
      }
    }
  }
  /* 标签内容 end*/

.see {
    display: flex;
    justify-content: space-between;
    padding-top: 10rpx;
    border-radius: 6rpx;
    color: #666;
    line-height: 1.6;
  }
</style>

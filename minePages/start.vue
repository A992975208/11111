<template>
  <view class="template-start">
    <swiper class="card-swiper" :circular="true"
      :autoplay="true" duration="500" interval="5000" @change="cardSwiper">
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <view class="swiper-item image-banner" :style="'background-color: '+ item.color +''">
          <image :src="item.url" mode="aspectFill" v-if="item.type=='image'" style="height: 100vh;width: 100vw;"></image>
        </view>
        <view class="swiper-item-png image-banner">
          <image :src="item.pngurl" mode="widthFix" v-if="item.type=='image'"></image>
        </view>
        <view class="swiper-item-text">
          <view class="tn-text-xxl tn-text-bold tn-color-white">{{item.text}}</view>
          <view class="tn-text-df tn-color-white tn-padding-top-sm">{{item.name}}</view>
        </view>
      </swiper-item>
    </swiper>
    <view class="indication">
        <block v-for="(item,index) in swiperList" :key="index">
            <view class="spot" :class="cardCur==index?'active':''"></view>
        </block>
    </view>
    <view class="go">
      <tn-button :plain="true" shape="round" backgroundColor="#FFFFFF" fontColor="#FFFFFF" width="40vw" height="70rpx" @click="tn('/pages/index')">
        立 即 体 验</tn-button>
    </view>

    <view class="tnwave waveAnimation">
      <view class="waveWrapperInner bgTop">
        <view class="wave waveTop" :style="'background-image: url(' + require('@/static/images/wave-2.png') + ')'"></view>
      </view>
      <view class="waveWrapperInner bgMiddle">
        <view class="wave waveMiddle" :style="'background-image: url(' + require('@/static/images/wave-2.png') + ')'"></view>
      </view>
      <view class="waveWrapperInner bgBottom">
        <view class="wave waveBottom" :style="'background-image: url(' + require('@/static/images/wave-1.png') + ')'"></view>
      </view>
    </view>
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateStart',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          name: '千果家庭教育',
          text: '呵护健康',
          color: '#00C3E3',
          url: '/static/images/guide-bg1.jpg',
          pngurl: '/static/images/start_bg.png'
        }, {
          id: 1,
          type: 'image',
          name: '用爱筑梦',
          text: '用心陪伴',
          color: '#FE5141',
          url: '/static/images/guide-bg2.jpg',
          pngurl: '/static/images/start_bg1.png'
        }, {
          id: 2,
          type: 'image',
          name: '家是教育的起点',
          text: '爱是成长的动力',
          color: '#EF9A01',
          url: '/static/images/guide-bg3.jpg',
          pngurl: '/static/images/start_bg2.png'
        }, {
          id: 3,
          type: 'image',
          name: '陪伴是最长情的告白',
          text: '教育是最珍贵的投资',
          color: '#D960C7',
          url: '/static/images/guide-bg4.jpg',
          pngurl: '/static/images/start_bg3.png'
        }],
      }
    },
    methods: {
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
    }
  }
</script>

<style lang="scss" scoped>

/* 波浪*/
.template-version{
  background-image: linear-gradient(to top, #4C3FAE 20%, #6E26BA 80%);
  width: 100vw;
  height: 100vh;
}
@keyframes move_wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1)
  }
  50% {
    transform: translateX(-25%) translateZ(0) scaleY(1)
  }
  100% {
    transform: translateX(-50%) translateZ(0) scaleY(1)
  }
}
.tnwave {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
.waveWrapperInner {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
}
.wave {
  position: absolute;
  left: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat no-repeat;
  background-position: 0 bottom;
  transform-origin: center bottom;
}

.bgTop {
  opacity: 0.4;
}
.waveTop {
  background-size: 50% 45px;
}
.waveAnimation .waveTop {
  animation: move_wave 4s linear infinite;
}

.bgMiddle {
  opacity: 0.6;
}
.waveMiddle {
  background-size: 50% 40px;
}
.waveAnimation .waveMiddle {
  animation: move_wave 3.5s linear infinite;
}

.bgBottom {
  opacity: 0.95;
}
.waveBottom {
  background-size: 50% 35px;
}
.waveAnimation .waveBottom {
  animation: move_wave 2s linear infinite;
}
    /* 轮播视觉差 start */
    .card-swiper {
      height: 100vh !important;
    }

    .card-swiper swiper-item {
      width: 750rpx !important;
      left: 0rpx;
      box-sizing: border-box;
      overflow: initial;
    }

    .card-swiper swiper-item .swiper-item {
      width: 100%;
      display: block;
      height: 100%;
      border-radius: 0rpx;
      transform: scale(1);
      transition: all 0.2s ease-in 0s;
      will-change: transform;
      overflow: hidden;
    }

    .card-swiper swiper-item.cur .swiper-item {
      transform: none;
      transition: all 0.2s ease-in 0s;
      will-change: transform;
    }

    .card-swiper swiper-item .swiper-item-png {
      margin-top: -85vh;
      display: block;
      border-radius: 0rpx;
      transform: translate(40rpx, 20rpx) scale(0.8, 0.8);
      transition: all 0.6s ease 0s;
      will-change: transform;
      overflow: hidden;
    }

    .card-swiper swiper-item.cur .swiper-item-png {
      margin-top: -85vh;
      transform: translate(0rpx, 0rpx) scale(1, 1);
      transition: all 0.6s ease 0s;
      will-change: transform;
    }

    .card-swiper swiper-item .swiper-item-text {
      margin-top: 0rpx;
      text-align: center;
      width: 100%;
      display: block;
      height: 50%;
      border-radius: 10rpx;
      transform: translate(0rpx, -40rpx) scale(0.7, 0.7);
      transition: all 0.6s ease 0s;
      will-change: transform;
      overflow: hidden;
    }

    .card-swiper swiper-item.cur .swiper-item-text {
      margin-top: -60rpx;
      width: 100%;
      transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
      transition: all 0.6s ease 0s;
      will-change: transform;
    }

    .image-banner{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image-banner image{
      width: 100%;
    }

    /* 轮播指示点 start*/
    .indication{
      z-index: 9999;
      width: 100%;
      height: 36rpx;
      position: fixed;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:center;
    }

    .spot{
      background-color: #FFF;
      opacity: 0.4;
      width: 10rpx;
      height: 10rpx;
      border-radius: 20rpx;
      margin: 0 8rpx !important;
      right: -270rpx;
      top: -180rpx;
      position: relative;
    }

    .spot.active{
      opacity: 1;
      width: 30rpx;
      background-color: #FFF;
    }

    /* 立即体验 start*/
    .go{
      z-index: 9999;
      width: 100%;
      position: fixed;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:center;
      bottom: 10vh;
    }
</style>

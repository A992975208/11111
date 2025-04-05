<!--商品详情-->
<template>
  <view class="template-product tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
<!--图片 goodsType=1-->
    <view v-if="detailInfo.goodsType==0">
      <swiper class="card-swiper" :circular="true"
              :autoplay="true" duration="500" interval="5000" @change="cardSwiper">
        <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
          <view class="swiper-item image-banner">
            <image :src="item.url" mode="aspectFill"></image>
          </view>
        </swiper-item>
      </swiper>
      <view class="indication">
        <block v-for="(item,index) in swiperList" :key="index">
          <view class="spot" :class="cardCur==index?'active':''"></view>
        </block>
      </view>
    </view>
<!--视频 goodsType=0-->
    <view v-if="detailInfo.goodsType==1">
      <video  :src="detailInfo.goodsImg" controls="controls" class="tn-width-full" loop></video>
    </view>
    <view class="tn-margin">
      <view class="tn-flex tn-flex-row-between">
        <view class="justify-content-item tn-text-bold tn-text-xl">
          {{ detailInfo.goodsName }}
        </view>
      </view>
      <view class="tn-margin-top-lg  tn-text-xl tn-color-gray tn-text-ellipsis-2" style="font-size: 28rpx">
        {{ detailInfo.goodsDesc }}
      </view>
      <view class="tn-flex tn-flex-row-between tn-margin-top">
        <view class="justify-content-item tn-text-bold tn-color-red">
          <text class="tn-text-sm tn-color-gray">￥</text>
          <text class="tn-color-gray" style="text-decoration: line-through">{{ detailInfo.originalPrice }}</text>
          <text class="tn-margin-left-lg">
            <text class="tn-text-sm">￥</text>
            <text class="" style="font-size: 50rpx;">{{ detailInfo.goodsPrice }}</text>
          </text>
        </view>

        <view class="justify-content-item tn-color-gray tn-padding-top-xs">
          <view class="">已售 729</view>
        </view>
      </view>
    </view>
    <view v-if="detailInfo.studyTutor!==null"  class="tn-padding-top-sm tn-padding" style="background: #fafafa">
      <view style="font-weight:700">授课老师</view>
      <view class="tn-flex tn-flex-col-center tn-margin-top-sm" style="color: #7D7E80" @click="toTeacherDetail">
        <tn-avatar :src="detailInfo.studyTutor.tutorAvatar"></tn-avatar>
        <view class="tn-color-gray tn-text-sm tn-margin-left-xs">{{detailInfo.studyTutor.tutorName}}</view>
        <view class="tn-text-sm tn-icon-right tn-margin-left-xs"></view>
      </view>
    </view>

    <!-- 边距间隔 -->
    <view class="tn-strip-bottom"></view>
    <!-- 边距间隔 -->
    <view class="tn-strip-bottom"></view>
    <!-- 边距间隔 -->
    <view class="tn-strip-bottom"></view>
    <view class="tn-margin">
      <view class="tn-flex tn-flex-row-between">
        <view class="justify-content-item tn-text-bold tn-text-xl">
          商品详情
        </view>
      </view>
    </view>
    <view class="content-backgroup tn-margin">
      <view v-html="detailInfo.goodsDetail" class="tn-width-full"></view>
      <!--      <image src='https://resource.tuniaokj.com/images/content/rodion.jpg' mode='widthFix' class='backgroud-image'></image>-->
    </view>
    <view class="footerfixed dd-glass tn-padding-left-sm tn-padding-right tn-padding-top-xs tn-padding-bottom-sm">
      <tn-goods-nav :options="collectState===true?activeOptions:countOptions" :buttonGroups="customButtonGroups" buttonType="round" :safeAreaInsetBottom="true" @optionClick="onOptionClick" @buttonClick="onButtonClick"></tn-goods-nav>
    </view>
    <view class='tn-tabbar-height'></view>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
    name: 'TemplateProduct',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [],
        current: 0,
        countOptions: [
          {
          icon: 'star',
          text: '收藏'
        },{
          icon: 'cart',
          text: '购物车',
        }],
        activeOptions:[
          {
            icon: 'star-fill',
            text: '收藏'
          },{
            icon: 'cart',
            text: '购物车',
          }
        ],
        customButtonGroups: [
          {
          text: '加入购物车',
          backgroundColor: 'tn-cool-bg-color-5',
          color: '#FFFFFF'
        },{
          text: '立即购买',
          backgroundColor: 'tn-cool-bg-color-15--reverse',
          color: '#FFFFFF'
        }],
        detailInfo: {
          studyTutor:{}
        },
        id: '',
        collectState:false
      }
    },
  onLoad(options) {
    this.id = options.id
    this.getDetailInfo(options.id)
  },
    methods: {
      toTeacherDetail(id){
        if(this.detailInfo.studyTutor!==null)
        this.$navTo.togo(`/circlePages/king?id=${this.detailInfo.studyTutor.id}`)
      },
      //获取详情信息
      getDetailInfo(id) {
        this.$API.getGoodsDetail({id}).then(res => {
          if (res.code === 200 && res.result) {
            this.swiperList = res.result.goodsImg.split(',').map((item, index) => ({
              url: item, title: `标题${index + 1}`
            }))
            this.detailInfo = res.result
            this.detailInfo.studyTutor = res.result.studyTutor
            console.log(res.result)
          }
        })
      },
      //加入购物车
      onButtonClick(e){
        //加入购物车
        if(e.index===0){
          let params = {
            goodsId: this.detailInfo.id,
            quantity: 1,
            customerId: uni.getStorageSync('userId'),
          }
          this.$API.addShoppingCart(params).then(res => {
            if (res.code === 200) {
              this.$t.message.toast('加入购物车成功！')
              setTimeout(() => {
                this.$navTo.togo('/minePages/addShoppingCar')
              }, 1000)
            }
          })
        }else{
          //立即购买
          this.onBuyNow()
        }
      },
      //立即购买
      async onBuyNow() {
        try {
          let params = {
            goodsId: this.detailInfo.id,
            quantity: 1,
            customerId: uni.getStorageSync('userId'),
          }
          //下单
          const res = await this.$API.goodsOrderNow(params)
          if (res.code === 200) {
            uni.setStorageSync('orderId', res.result.id)
            uni.setStorageSync('carOrderData',res.result)
            this.$t.message.toast('下单成功！')
            setTimeout(() => {
              this.$navTo.togo(`/minePages/confirmOrder?id=${this.id}&status=0&item=${encodeURIComponent(JSON.stringify(res.result))}`)
            }, 1000)
          }
        } catch (e) {

        }
      },
      async onOptionClick(e) {
        if (e.index === 0) {
          this.collectState = !this.collectState
          if (this.collectState) {
            await this.addCollect()
          } else {
            await this.cancelCollect()
          }
        } else {
          this.$navTo.togo('/minePages/addShoppingCar')
        }
      },
      async addCollect() {
        try {
          let params = {
            customerId: uni.getStorageSync('userId'),
            itemId: this.id,
            itemType: 1
          }
          const res = await this.$API.addCollect(params)
          if (res.code === 200) {
            this.$t.message.toast('收藏成功')
            this.collectState = true
          }
        } catch (e) {
        }
      },
      async cancelCollect() {
        try {
          let params = {
            customerId: uni.getStorageSync('userId'),
            itemId: this.id,
            type: 1
          }
          const res = await this.$API.cancelCollect(params)
          if (res.code === 200) {
            this.$t.message.toast('取消收藏')
            this.collectState = false
          }
        } catch (e) {
        }
      },
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
      // tab选项卡切换
      tabChange(index) {
        this.current = index
      },
      getRandomCoolBg() {
        return this.$t.colorUtils.getRandomCoolBgClass()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .template-product{
  }
  .tn-tabbar-height {
  	min-height: 120rpx;
  	height: calc(140rpx + env(safe-area-inset-bottom) / 2);
  }

  /* 用户头像 start */
  .logo-image {
    width: 110rpx;
    height: 110rpx;
    position: relative;
  }

  .logo-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 10rpx;
    overflow: hidden;
    // background-color: #FFFFFF;
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

  /* 轮播视觉差 start */
  .card-swiper {
    height: 750rpx !important;
  }

  .card-swiper swiper-item {
    width: 750rpx !important;
    left: 0rpx;
    box-sizing: border-box;
    // padding: 0rpx 30rpx 90rpx 30rpx;
    overflow: initial;
  }

  .card-swiper swiper-item .swiper-item {
    width: 100%;
    display: block;
    height: 100%;
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
    overflow: hidden;
  }

  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
  }

  .image-banner{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-banner image{
    width: 100%;
    height: 100%;
  }

  /* 轮播指示点 start*/
  .indication{
    z-index: 9999;
    width: 100%;
    height: 36rpx;
    position: absolute;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
  }

  .spot{
    background-color: #FFFFFF;
    opacity: 0.6;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: -60rpx;
    margin: 0 8rpx !important;
    position: relative;
  }

  .spot.active{
    opacity: 1;
    width: 30rpx;
    background-color: #FFFFFF;
  }

  /* 间隔线 start*/
  .tn-strip-bottom-min {
    width: 100%;
    border-bottom: 1rpx solid #F8F9FB;
  }

  /* 间隔线 start*/
  .tn-strip-bottom {
   width: 100%;
   border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
  }
   /* 间隔线 end*/
  /* 标题 start */
  .nav_title {
    -webkit-background-clip: text;
    color: transparent;

    &--wrap {
      position: relative;
      display: flex;
      height: 120rpx;
      font-size: 46rpx;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background-image: url(https://resource.tuniaokj.com/images/title_bg/title44.png);
      background-size: cover;
    }
  }
  /* 标题 end */

  /* 底部tabbar start*/
  .footerfixed{
   position: fixed;
   width: 100%;
   bottom: 0;
   z-index: 999;
   background-color: #FFFFFF;
   box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  }

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

  /* 内容图 start */
  .content-backgroup {
    z-index: -1;

    .backgroud-image {
      border-radius: 15rpx;
      width: 100%;
    }
  }
  /* 内容图 end */

  /* 商家商品 start*/
  .tn-blogger-content {
    &__wrap {
      box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
      border-radius: 20rpx;
      margin: 15rpx;
    }

    &__info {
      &__btn {
        margin-right: -12rpx;
        opacity: 0.5;
      }
    }

    &__label {
      &__item {
        line-height: 45rpx;
        padding: 0 10rpx;
        margin: 5rpx 18rpx 0 0;

        &--prefix {
          color: #E83A30;
          padding-right: 10rpx;
        }
      }

      &__desc {
        line-height: 35rpx;
      }
    }

    &__main-image {
      border-radius: 16rpx 16rpx 0 0;

      &--1 {
        max-width: 690rpx;
        min-width: 690rpx;
        max-height: 400rpx;
        min-height: 400rpx;
      }

      &--2 {
        max-width: 260rpx;
        max-height: 260rpx;
      }

      &--3 {
        height: 212rpx;
        width: 100%;
      }
    }

    &__count-icon {
      font-size: 24rpx;
      padding-right: 5rpx;
    }
  }

  .image-book{
    padding: 150rpx 0rpx;
    font-size: 16rpx;
    font-weight: 300;
    position: relative;
  }
  .image-picbook{
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 15rpx 15rpx 0 0;
  }

  /* 毛玻璃*/
  .dd-glass {
     width: 100%;
     backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
  }
</style>

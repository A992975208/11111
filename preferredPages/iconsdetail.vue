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
    <view v-if="iconGoodsList.length>0">
      <view>
        <swiper class="card-swiper" :circular="true"
                :autoplay="true" duration="500" interval="5000">
          <swiper-item v-for="(item,index) in swiperData" :key="index" :class="cardCur==index?'cur':''">
            <view class="swiper-item image-banner">
              <image :src="item.url" mode="aspectFill"></image>
            </view>
          </swiper-item>
        </swiper>
        <view class="indication">
          <block v-for="(item,index) in swiperData" :key="index">
            <view class="spot" :class="cardCur==index?'active':''"></view>
          </block>
        </view>
      </view>
      <!--视频 goodsType=0-->
      <!--    <view v-if="detailInfo.goodsType==1">-->
      <!--      <video :src="detailInfo.goodsImg" controls="controls" class="tn-width-full" loop></video>-->
      <!--    </view>-->
      <view class="content-backgroup tn-margin">
        <view v-html="detailInfo.goodsDetail" class="tn-width-full"></view>
        <!--      <image src='https://resource.tuniaokj.com/images/content/rodion.jpg' mode='widthFix' class='backgroud-image'></image>-->
      </view>
      <!--商品列表-->
      <view v-for="(item,index) in iconGoodsList" :key="index">
        <view class="nav_title--wrap">
          <view class="nav_title tn-cool-bg-color-15">
            <text class="tn-icon-relation tn-padding-right-sm tn-text-xxl"></text>
            <text class="tn-text-xl">{{categoryType(item.key)}}</text>
            <text class="tn-icon-relation tn-padding-left-sm tn-text-xxl"></text>
          </view>
        </view>
        <!-- 商品1 start-->
        <view class="tn-flex tn-flex-wrap tn-margin-sm">
          <block v-for="(itemCh, indexCh) in item.list" :key="indexCh">
            <view style="width: 50%;" @click="toDetail(itemCh)">
              <view class="tn-blogger-content__wrap">
                <view class="image-picbook" :style="'background-image:url(' + itemCh.goodsImg.split(',')[0] + ')'">
                  <view class="image-book">
                  </view>
                </view>
                <view class="tn-padding-sm ">
                  <view class="tn-blogger-content__label tn-text-justify tn-text-ellipsis tn-padding-bottom-sm">
                    <text class="tn-blogger-content__label__desc tn-text-bold tn-text-lg">{{ itemCh.goodsName }}</text>
                  </view>
                  <view class="tn-blogger-content__label tn-text-justify tn-text-ellipsis tn-padding-bottom-sm">
                    <text class="tn-blogger-content__label__desc tn-color-gray">{{ itemCh.goodsDesc }}</text>
                  </view>
                  <view class="tn-blogger-content__label tn-text-justify">
                    <text class="tn-blogger-content__label__desc tn-text-xl tn-text-bold tn-color-red"
                          v-if="itemCh.goodsPrice===0">免费
                    </text>
                    <text class="tn-blogger-content__label__desc tn-color-red tn-text-bold" v-else>￥{{
                        itemCh.goodsPrice
                      }}
                    </text>
                  </view>
                </view>
              </view>
            </view>
          </block>
        </view>
        <!-- 商品1 end-->
      </view>
    </view>
    <view v-else class="empty-wrap" :style="{top: vuex_custom_bar_height + 20 +'px'}">
      <view class="empty-content">
        <image style="width: 300rpx;" src="/static/images/goods_empty.png" mode="widthFix" class="tn-margin-auto"></image>
        <view class="tn-flex tn-flex-row-center tn-color-gray">暂无商品哦~ </view>
      </view>
    </view>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
import categoryType from '@/libs/mixin/mixins'

export default {
  name: 'TemplateProduct',
  mixins: [template_page_mixin,categoryType],
  data() {
    return {
      cardCur: 0,
      swiperList: [],
      current: 0,
      detailInfo: {},
      iconGoodsList:[],
      swiperData:[]
    }
  },
  onLoad(options) {
    console.log(options)
    this.getIconGoodsList(options.plateId, options.homeCategoryId)
  },
  methods: {
    //获取板块列表数据
    getIconGoodsList(plateId, homeCategoryId) {
      let params = {
        plateId: plateId,
        homeCategoryId: homeCategoryId
      }
      this.$API.getIconGoodsList(params).then(res => {
        if(res.code===200&&res.result.length>0){
          this.iconGoodsList = res.result
          this.swiperData = res.result[0].list[0].goodsImg.split(',').map((item, index) => ({
            url: item, title: `标题${index + 1}`
          }))
          console.log(res, '111111')
          console.log(res.result.key, '111111')
        }
      })
    },
    //跳转到详情页
    toDetail(itemCh){
      console.log(itemCh)
      this.$navTo.togo(`/preferredPages/product?id=${itemCh.id}`)
    },
  }
}
</script>

<style lang="scss" scoped>
.empty-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

.image-banner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-banner image {
  width: 100%;
  height: 100%;
}

/* 轮播指示点 start*/
.indication {
  z-index: 9999;
  width: 100%;
  height: 36rpx;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.spot {
  background-color: #FFFFFF;
  opacity: 0.6;
  width: 10rpx;
  height: 10rpx;
  border-radius: 20rpx;
  top: -60rpx;
  margin: 0 8rpx !important;
  position: relative;
}

.spot.active {
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
.footerfixed {
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

.image-book {
  padding: 150rpx 0rpx;
  font-size: 16rpx;
  font-weight: 300;
  position: relative;
}

.image-picbook {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border-radius: 15rpx 15rpx 0 0;
}

/* 毛玻璃*/
.dd-glass {
  width: 100%;
  backdrop-filter: blur(20rpx);
  -webkit-backdrop-filter: blur(20rpx);
}
</style>

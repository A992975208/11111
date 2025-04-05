<template>
  <view class="template-money tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>

    <view style="padding-top: 100rpx">
      <view class="nav_title--wrap">
        <view class="nav_title tn-cool-bg-color-15">
          <text class="tn-icon-gift tn-padding-right-sm"></text>
          全 / 部 / 商 / 品
          <text class="tn-icon-gift tn-padding-left-sm"></text>
        </view>
      </view>
    </view>
    <!--    全部商品 start-->
  <view>
    <z-paging ref="paging" v-model="dataList" @query="queryList" style="padding-top: 200rpx">
      <template #refresher="{refresherStatus}">
        <custom-refresher :status="refresherStatus" />
      </template>
      <template #loadingMoreNoMore>
        <custom-nomore />
      </template>
      <template #empty>
        <tn-empty :imgWidth="width" text="暂无商品哦~" :show="show" icon="/static/images/order_empty.png"></tn-empty>
      </template>
      <view class="tn-flex tn-flex-wrap tn-margin-sm">
        <block v-for="(item, index) in dataList" :key="index">
          <view class="" style="width: 50%;" @click="toGoodsDetail(item.id)">
            <view class="tn-blogger-content__wrap" style="background-color: rgba(255,255,255,0.6);">
              <view class="image-pic" :style="'background-image:url(' + item.goodsImg.split(',')[0] + ')'">
                <view class="image-year">
                </view>
              </view>
              <view class="tn-padding-sm">
                <view class="tn-blogger-content__label tn-text-justify tn-text-ellipsis tn-padding-bottom-sm">
                  <text class="tn-blogger-content__label__desc tn-text-bold tn-text-lg">{{ item.goodsName }}</text>
                </view>
                <view class="tn-blogger-content__label tn-text-justify tn-text-ellipsis tn-padding-bottom-sm">
                  <text class="tn-blogger-content__label__desc tn-color-gray tn-text-sm">{{ item.goodsDesc }}</text>
                </view>
                <view class="tn-blogger-content__label tn-text-justify">
                  <text class="tn-blogger-content__label__desc tn-text-bold tn-color-red"
                        v-if="item.goodsPrice===0">免费
                  </text>
                  <text class="tn-blogger-content__label__desc tn-color-red tn-text-bold" v-else>￥{{
                      item.goodsPrice
                    }}
                  </text>
                </view>
              </view>
              <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-left-sm tn-padding-right-sm tn-padding-bottom-sm">
                <view class="justify-content-item tn-flex tn-flex-col-center">
                </view>
                <view class="justify-content-item tn-text-center">
                  <view v-for="(label_item,label_index) in item.label" :key="label_index" class="tn-blogger-content__label__item tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
                    <text class="tn-icon-funds tn-padding-right-xs tn-color-indigo"></text> {{ label_item }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </block>
      </view>
    </z-paging>
  </view>
    <!--    全部商品 end-->
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
    name: 'TemplateRedeem',
    mixins: [template_page_mixin],
    data(){
      return {
        width:200,
        show:true,
        dataList: [],
        allGoodsList: [],
        goodsCategory: '',
        homeCategoryId: '',
      }
    },
  onLoad(options) {
    this.goodsCategory = options.goodsCategory
    this.homeCategoryId = options.homeCategoryId
    // this.getAllGoods(options.goodsCategory, options.homeCategoryId)
  },
    methods: {
      toGoodsDetail(id){
        console.log(id)
        this.$navTo.togo(`/preferredPages/product?id=${id}`)
      },
      queryList(pageNo, pageSize) {
        const params = {
          goodsCategory:this.goodsCategory,
          homeCategoryId:this.homeCategoryId,
          pageNo: pageNo,
          pageSize: pageSize,
        }
        this.$API.getCategoryGoodsList(params).then(res => {
          console.log(res,'res')
          this.$refs.paging.complete(res.result.records);
        }).catch(res => {
          this.$refs.paging.complete(false);
        })
      },
      //获取分类全部商品
      getAllGoods(goodsCategory, homeCategoryId) {
        let params = {
          goodsCategory,
          homeCategoryId,
          pageNo: 1,
          pageSize: 10
        }
        this.$API.getCategoryGoodsList(params).then(res => {
          if (res.code === 200) {
            this.allGoodsList = res.result.records
            console.log(res, 'all')
          }
        })
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

    /* 顶部背景图 start */
    .top-backgroup {
      position: fixed;
      height: 100vh;
      z-index: -1;

      .backgroud-image {
        width: 100%;
        height: 100vh;
        // z-index: -1;
      }
    }


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

  /* 文章内容 start*/
  .tn-blogger-content {
    &__wrap {
      box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.12);
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
        padding: 0 20rpx;
        margin: 5rpx 18rpx 0 0;
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
      font-size: 30rpx;
      padding-right: 5rpx;
    }
  }

  .image-year{
    padding: 150rpx 0rpx;
    font-size: 16rpx;
    font-weight: 300;
    position: relative;
  }
  .image-capsule{
    padding: 80rpx 0rpx;
    font-size: 40rpx;
    font-weight: 300;
    position: relative;
  }
  .image-pic{
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 20rpx 20rpx 0 0;
  }

  /* 文章内容 end*/


  /* 底部tabbar start*/
  .footerfixed{
   position: fixed;
   width: 100%;
   bottom: 0;
   z-index: 999;
   background-color: #FFFFFF;
   box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  }

  .tabbar {
    display: flex;
    align-items: center;
    min-height: 110rpx;
    justify-content: space-between;
  	padding: 0;
  	height: calc(110rpx + env(safe-area-inset-bottom) / 2);
  	padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  }

  .tabbar .action {
  	font-size: 22rpx;
  	position: relative;
  	flex: 1;
  	text-align: center;
  	padding: 0;
  	display: block;
  	height: auto;
  	line-height: 1;
  	margin: 0;
  	overflow: initial;
  }

  .bar-center{
    animation: suspension 3s ease-in-out infinite;
  }

  @keyframes suspension {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.8rem);
    }
  }

  .tabbar .action .bar-icon {
  	width: 100rpx;
  	position: relative;
  	display: block;
  	height: auto;
  	margin: 0 auto 10rpx;
  	text-align: center;
  	font-size: 42rpx;
    // line-height: 50rpx;
  }

  .tabbar .action .bar-icon image {
  	width: 50rpx;
  	height: 50rpx;
  	display: inline-block;
  }

  .tabbar .action .bar-circle {
    position: relative;
    display: block;
    margin: 0rpx auto 0rpx;
    text-align: center;
    font-size: 52rpx;
    line-height: 90rpx;
    // background-color: #01BEFF;
    width: 130rpx !important;
    height: 130rpx !important;
    overflow: hidden;
    // border-radius: 50%;
    // box-shadow: 0px 10px 30px rgba(70,23,129, 0.12),
    //   0px -8px 40px rgba(255, 255, 255, 1),
    //   inset 0px -10px 10px rgba(70,23,129, 0.05),
    //   inset 0px 10px 20px rgba(255, 255, 255, 1);
    // box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(1, 190, 255, 0.5);
  }

  .tabbar .action .bar-circle image {
    width: 130rpx;
  	height: 130rpx;
  	display: inline-block;
    margin: 0rpx auto 0rpx;
  }

  /* 流星+悬浮 */
  .nav-index-button {
    animation: suspension 3s ease-in-out infinite;
    z-index: 999999;


    &__content {
      position: absolute;
      width: 130rpx;
      height: 130rpx;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &--icon {
        width: 130rpx;
        height: 130rpx;
        font-size: 60rpx;
        border-radius: 50%;
        margin-bottom: 18rpx;
        position: relative;
        z-index: 1;
        transform: scale(0.85);

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
          background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg6.png);
        }
      }
    }

    &__meteor {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100rpx;
      height: 100rpx;
      transform-style: preserve-3d;
      transform: translate(-50%, -50%) rotateY(75deg) rotateZ(10deg);

      &__wrapper {
        width: 100rpx;
        height: 100rpx;
        transform-style: preserve-3d;
        animation: spin 20s linear infinite;
      }

      &__item {
        position: absolute;
        width: 100rpx;
        height: 100rpx;
        border-radius: 1000rpx;
        left: 0;
        top: 0;

        &--pic {
          display: block;
          width: 100%;
          height: 100%;
          background: url(https://resource.tuniaokj.com/images/cool_bg_image/arc2.png) no-repeat center center;
          background-size: 100% 100%;
          animation: arc 4s linear infinite;
        }
      }
    }
  }


  @keyframes suspension {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.6rem);
    }
  }

  @keyframes spin {
    0% {
      transform: rotateX(0deg);
    }

    100% {
      transform: rotateX(-360deg);
    }
  }

  @keyframes arc {
    to {
      transform: rotate(360deg);
    }
  }
</style>

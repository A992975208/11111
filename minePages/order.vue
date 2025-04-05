<template>
 <view>
   <view class="template-order tn-skeleton">
     <!-- 顶部自定义导航 -->
     <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
       <view slot="back" class='tn-custom-nav-bar__back'
             @click="back">
         <text class='icon tn-icon-left-arrow'></text>
       </view>
       <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
         <text class="tn-text-bold tn-text-xl tn-color-black">我的订单</text>
       </view>
     </tn-nav-bar>
     <view>
       <z-paging ref="paging" v-model="dataList" @query="queryList" :style="{top: vuex_custom_bar_height + 20 +'px'}">
         <template #top>
           <z-tabs :list="tabList" @change="tabsChange" />
         </template>
         <template #refresher="{refresherStatus}">
           <custom-refresher :status="refresherStatus" />
         </template>
         <template #loadingMoreNoMore>
           <custom-nomore />
         </template>
         <template #empty>
           <tn-empty :imgWidth="width" text="暂无历史订单" :show="show" icon="/static/images/order_empty.png"></tn-empty>
         </template>
         <view>
           <view v-for="(item,index) in dataList" :key="index" class="order__item">
             <view class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
               <view class="order__item__head__title">
                 <text class="tn-text-bold tn-skeleton-rect">订单编号：{{ item.orderNo }}</text>
                 <text class="tn-color-blue--disabled tn-padding-left-xs tn-text-df tn-icon-copy"></text>
               </view>
               <view class="tn-color-gray tn-skeleton-rect">
                 {{ item.status_dictText }}
               </view>
             </view>
             <view class="order__item__content tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center">
               <view class="order__item__content__image tn-skeleton-rect" @click="orderDetail(item.id)">
                 <image src="https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699066-assets/web-upload/f7a37b29-506a-4e79-937f-826334902bb4.jpeg" mode="aspectFill"></image>
               </view>
               <view class="order__item__content__title tn-skeleton-rect">
                 初中高中生心里健康教育课程
               </view>
               <view class="order__item__content__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
                 <view class="order__item__content__info__price tn-skeleton-rect">
                   <text class="order__item__content__info__price--unit">￥</text>
                   <text class="order__item__content__info__price__value--integer">{{item.totalAmount}}</text>
                   <text class="order__item__content__info__price__value--decimal">.00</text>
                 </view>
                 <!-- <view class="order__item__content__info__count">
                   <text>共1件</text>
                 </view> -->
               </view>
             </view>
             <view class="order__item__operation tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
               <view class="order__item__operaation__left tn-skeleton-rect">
                 <text class="order__item__operaation__left--text tn-color-gray ">{{item.createTime}}</text>
               </view>
               <view class="order__item__operation__right tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-right">
                 <view class="order__item__operation__right__button tn-skeleton-rect" @click="buyAgain">
                   <tn-button shadow shape="round" fontColor="tn-color-black" backgroundColor="tn-bg-fruit" :fontSize="24" height="auto" padding="10rpx 18rpx">再次购买</tn-button>
                 </view>
               </view>
             </view>
           </view>
           <view class="tn-padding-bottom"></view>
         </view>
       </z-paging>
     </view>
   </view>
   <tn-skeleton :show="showSkeleton"></tn-skeleton>
 </view>

</template>

<script>
import templatePageMixin from '@/libs/mixin/template_page_mixin.js'

export default {
    name: 'TemplateOrder',
    mixins: [templatePageMixin],
    data() {
      return {
        showSkeleton:true,
        width:200,
        show:true,
        dataList: [],
        tabList1: ['全部', '待支付', '进行中', '已完成'],
        tabList: [
          {name: '全部', value: -1},
          {name: '待支付', value: 0},
          {name: '已支付', value: 1},
          {name: '已取消', value: 2},
        ],
        tabIndex: 0,
        tabsIndex: -1,
        orderList: [],
        arr: []
      }
    },
    onLoad() {
      setTimeout(() => {
        this.showSkeleton = false
      }, 3000)
      // this.getOrderList(0)
    },
    onReady() {
    },
    methods: {
      queryList(pageNo, pageSize) {
        const params = {
          status:this.tabIndex,
          pageNo: pageNo,
          pageSize: pageSize,
          customerId: uni.getStorageSync('userId'),
        }
        this.$API.getOrderList(params).then(res => {
          this.arr = res.result.records.sort(function (a, b) {
            return new Date(b.createTime) - new Date(a.createTime);			//inNum是要根据某个字段进行排序的字段名，
          })
          this.$refs.paging.complete(this.arr);
        }).catch(res => {
          this.$refs.paging.complete(false);
        })
      },
      // 标签栏值发生改变
      tabsChange(index) {
        if (index === 0) {
          this.tabIndex = -1
        } else if (index === 1) {
          this.tabIndex = 0
        } else if (index === 2) {
          this.tabIndex = 1
        } else if (index === 3) {
          this.tabIndex = 2
        }
        this.$refs.paging.reload(true);
      },
      //订单详情
      orderDetail(orderId) {
        this.$navTo.togo(`/minePages/cancelOrder?orderId=${orderId}`)
      },
      //再次购买
      buyAgain(){
        this.$navTo.togo('/pages/index')
      },
      // 跳转
      tn(e) {
        uni.navigateTo({
          url: e,
        });
      },
      back(){
        this.$navTo.togo('/pages/index')
      }
    }
  }
</script>

<style lang="scss" scoped>

  .template-order {
    background-color: #FFFFFF;
  }

  /* 胶囊*/
  .tn-custom-nav-bar__back {
    width: 60%;
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

  }

  .order {
    &--wrap {
      position: fixed;
      left: 0;
      right: 0;
      width: 100%;
      background-color: inherit;
    }

    /* 导航栏 start */
    &__tabs {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: inherit;
    }
    /* 导航栏 end */

    /* swiper start */
    &__swiper {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      background-color: inherit;
      // padding: 0 16rpx;
    }
    /* swiper end */

    /* 订单内容 start */
    &__item {
      margin: 30rpx;
      padding: 36rpx 26rpx;
      background-color: #FFFFFF;
      border-radius: 15rpx;
      box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);

      &:first-child {
        margin-top: 40rpx;
      }

      &:last-child {
        margin-bottom: 0;
      }

      /* 头部 start */
      &__head {

        &__title {
          padding-bottom: 10rpx;
          line-height: normal;

          &--right-icon {
            font-size: 24rpx;
            margin-left: 8rpx;
          }
        }

        &__status {
          font-size: 22rpx;
          color: #AAAAAA;
        }
      }
      /* 头部 end */

      /* 内容 start */
      &__content {

        margin-top: 20rpx;

        &__image {
          margin-right: 20rpx;

          image {
            width: 140rpx;
            height: 140rpx;
            border-radius: 10rpx;
          }
        }

        &__title {
          padding-right: 40rpx;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        &__info {

          &__price {
            &--unit {
              font-size: 20rpx;
            }
            &__value--integer, &__value--decimal {
              font-weight: bold;
            }
            &__value--decimal {
              font-size: 20rpx;
            }
          }

          &__count {
            color: #AAAAAA;
            font-size: 24rpx;
          }
        }
      }
      /* 内容 end */

      /* 操作按钮 start */
      &__operation {
        margin-top: 30rpx;

        &__right {
          &__button {
            margin-left: 10rpx;
          }
        }
      }
      /* 操作按钮 end */
    }
    /* 订单内容 end */
  }


</style>

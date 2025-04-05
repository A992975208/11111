<template>
  <view class="template-order">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="transparent">
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="back">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center">
        <text class="tn-text-bold tn-text-xl tn-color-white">订单详情</text>
      </view>
    </tn-nav-bar>

<!--    <view v-if="orderStatus=='待支付'" class="top-backgroup" style="background-image: url('/static/images/my-vip.jpg')">-->
    <view  class="top-backgroup" style="background-image: url('/static/images/my-vip.jpg')">
<!--      <image src='/static/images/my-bg3.png' mode='widthFix' class='backgroud-image'></image>-->
    </view>
    <view class="order--wrap" style="margin-top: -200rpx">
      <view class="tn-padding">
        <view class="tn-flex">
          <view v-if="orderDetailInfo.status==0">
            <image src="/static/images/awaitPay.png" style="width: 60rpx; height: 60rpx"></image>
          </view>
          <view v-else-if="orderDetailInfo.status==1">
            <image src="/static/images/paysucc.png" style="width: 60rpx; height: 60rpx"></image>
          </view>
          <view v-else>
            <image src="/static/images/paycancel.png" style="width: 60rpx; height: 60rpx"></image>
          </view>
          <view class="tn-margin-left-xs">
            <view class="tn-text-bold tn-color-white tn-text-xxl">
              {{ orderStatus(orderDetailInfo.status) }}
            </view>
            <view v-if="status==0" class="tn-color-white tn-text-md tn-padding-top-xs">
              未支付订单会在15分钟后取消
            </view>
          </view>
        </view>
      </view>
      <view class="goods-shadow" v-for="(item,index) in carOrderList" :key="index">
        <view>
          <view class="tn-flex tn-flex-col-center ">
            <view>
              <image :src="item.goodsImg.split(',')[0]"
                     style="width: 200rpx;height: 200rpx;border-radius: 15rpx"></image>
            </view>
            <view class="tn-padding-right-lg tn-padding-left-sm">
              <view class="tn-text-ellipsis-2 tn-padding-top-xs">{{ item.goodsName }}
              </view>
              <view class="tn-text-ellipsis tn-text-xs tn-color-gray tn-padding-top-xs">
                {{ item.goodsDesc }}
              </view>
              <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-sm">
                <view class="tn-text-bold tn-color-red">￥{{ item.goodsPrice }}</view>
              </view>
              <!--          <view class="tn-text-bold tn-color-gray tn-padding-bottom-xs tn-text-xs">￥99999</view>-->
            </view>
            <view class="tn-margin-left-xl tn-padding-right" style="color: #999da8">x{{ item.quantity }}</view>
          </view>
        </view>
      </view>

      <view class="goods-shadow tn-padding-sm">
        <view class="tn-text-bold tn-padding-bottom">订单信息</view>
        <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-bottom">
          <view class="tn-text-bold" style="color: #303030">订单编号:</view>
          <view style="color: #999da8">{{ orderDetailInfo.orderNo }}</view>
        </view>
        <view>
          <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-bottom">
            <view class="tn-text-bold" style="color: #303030">下单时间:</view>
            <view style="color: #999da8">{{ orderDetailInfo.createTime }}</view>
          </view>
        </view>
        <view>
          <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-bottom">
            <view class="tn-text-bold" style="color: #303030">支付方式:</view>
            <view style="color: #999da8">{{ orderDetailInfo.paymentStatus===1?'支付宝':'微信支付' }}</view>
          </view>
        </view>
        <view>
          <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-bottom">
            <view class="tn-text-bold" style="color: #303030">订单备注:</view>
            <view style="color: #999da8">{{ orderDetailInfo.note||'暂无备注' }}</view>
          </view>
        </view>
        <view>
          <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-bottom">
            <view class="tn-text-bold" style="color: #303030">商品总价:</view>
            <view style="color: #999da8">￥{{ orderDetailInfo.totalAmount}}</view>
          </view>
        </view>

      </view>
      <view v-show="orderDetailInfo.status==0" class="tn-flex tn-flex-row-right cancel-footer tn-padding-lg">
          <view class="tn-margin-right-sm">
            <tn-button shape="round" backgroundColor="#E6E6E6" fontColor="#080808" @click="cancelOrderModal">取消订单
            </tn-button>
          </view>
          <view>
            <tn-button shape="round" backgroundColor="tn-bg-fruit" fontColor="#080808" @click="payOrder">立即支付
            </tn-button>
          </view>
        </view>
    </view>

    <tn-modal v-model="show" :title="title" :content="content" :button="button" @click="cancelOrderBtn"></tn-modal>

  </view>
</template>

<script>
import templatePageMixin from '@/libs/mixin/template_page_mixin.js'
import {mapActions, mapGetters} from "vuex";
import orderStatus from '@/libs/mixin/mixins'

export default {
  name: 'TemplateOrder',
  mixins: [templatePageMixin, orderStatus],
  data() {
    return {
      show: false,
      title: '确定取消订单吗？',
      content: '',
      button: [{
        text: '取消',
        backgroundColor: '#E6E6E6',
        fontColor: '#080808',
        shape: 'round'
      },
        {
          text: '确定',
          backgroundColor: '#E83A30',
          fontColor: '#FFFFFF'
        }
      ],
      showMessage: false,
      tabsIndex: 0,
      swiperIndex: 0,
      swiperTop: 0,
      swiperHeight: 0,
      orderList: [],
      value: 1,
      goodsInfo: {},
      status: '',
      messageValue: '',
      carOrderList: uni.getStorageSync('carOrderData').orderItemList,
      orderId: ''||uni.getStorageSync('orderId'),
      orderDetailInfo:{}
    }
  },
  computed: {
    ...mapGetters(['checkedAll', 'totalShopPrice']),

  },
  onLoad(options) {
    this.orderId = options.orderId
    this.getCurrentOrderDetail()
  },
  methods: {
    ...mapActions(['shoppingOrder']),
    //返回上一级
    //获取当前订单的详情
    async getCurrentOrderDetail() {
      try {
        const res = await this.$API.getOrderBuyId({orderId: this.orderId})
        if (res.code === 200) {
          this.orderDetailInfo = res.result
          this.carOrderList = res.result.orderItemList
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      } catch (e) {
        console.log(e, 'error')
      }
    },
    //立即支付
    async payOrder() {
      uni.setStorageSync('orderId',this.orderId)
      this.$navTo.togo('/minePages/checkoutCounter')
    },
    cancelOrderModal() {
      this.show = true
    },
    cancelOrderBtn(e) {
      if (e.index === 0) {
        this.show = false
      } else {
        this.cancelOrder()
        this.show = false
      }
    },
    //取消订单
    async cancelOrder() {
      try {
        const res = await this.$API.cancelOrder({orderId: this.orderId})
        if (res.code === 200) {
          this.$t.message.toast('订单取消成功')
          await this.getCurrentOrderDetail()
          setTimeout(() => {
            this.$navTo.togo('/minePages/order')
          }, 1000)
        }
      } catch (e) {

      }
    },
    back() {
      this.$navTo.togo(`/minePages/order`)
    },
    // 跳转
    tn(e) {
      uni.navigateTo({
        url: e,
      });
    },
    // 切换模式
    modeSwitch(index) {
      this.currentModeIndex = index
      this.showPassword = false
    },
  }
}
</script>

<style lang="scss" scoped>
.cancel-footer {
  width: 100%;
  position: fixed;
  bottom: 0rpx;
  box-shadow: 0 0 54rpx 0 rgba(0, 0, 0, 0.07);
}
.top-backgroup {
  width: 100%;
  height: 400rpx;
  z-index: -1;

  .backgroud-image {
    width: 100%;
    height: 450rpx;
    // z-index: -1;
  }
}
.order-footer {
  width: 100%;
  position: fixed;
  bottom: 0rpx;
  box-shadow: 0 0 54rpx 0 rgba(0, 0, 0, 0.07);
}

.goods-shadow {
  margin: 30rpx;
  //padding: 26rpx 28rpx;
  background-color: #FFFFFF;
  border-radius: 16rpx;
  box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.07);
}

.address-item {
  margin: 30rpx;
  padding: 26rpx 28rpx;
  background-color: #FFFFFF;
  border-radius: 16rpx;
  box-shadow: 0 0 54rpx 0 rgba(0, 0, 0, 0.07);
}

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
    margin-top: 150rpx;
    //position: fixed;
    //left: 0;
    //right: 0;
    //width: 100%;
    //background-color: inherit;
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

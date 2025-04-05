<template>
  <view class="template-order">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center">
        <text class="tn-text-bold tn-text-xl tn-color-black">订单支付</text>
      </view>
    </tn-nav-bar>

    <view class="order--wrap" :style="{top: vuex_custom_bar_height + 20 +'px'}">
      <!--收货地址-->
      <view  @click="choseAddress">
        <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding address-item address_container">
          <view>
            <view class="tn-flex tn-text-xs tn-flex-col-center">
              <view class="tn-margin-right-sm tn-text-ellipsis" style="color: #9b9d9e">{{ addressInfo.detailAddress }}</view>
            </view>
            <view class="tn-margin-top-sm tn-text-bold">{{ addressInfo.region }}</view>
            <view class="tn-margin-top-sm tn-text-sm tn-padding-bottom-sm tn-text-xs" style="color: #2a2c31">{{ addressInfo.consignee }}<text class="tn-margin-left"> {{ formatPhone(addressInfo.phoneNum) }}</text></view>
          </view>
          <view>
            <text class="icon tn-icon-right" style="color: #9b9d9e"></text>
          </view>
        </view>
      </view>
      <!--商品订单详细信息-->
      <view v-if="status==0" class="goods-shadow tn-padding">
        <!--        如果是直接直接商品页面下单的-->
        <view class="tn-flex tn-flex-col-center" v-for="(item,index) in carOrderList" :key="index">
          <view>
            <image :src="item.goodsImg.split(',')[0]"
                   style="width: 200rpx;height: 200rpx;border-radius: 15rpx"></image>
          </view>
          <view class="tn-padding-right-lg tn-padding-left-sm" style="width: 360rpx;">
            <view class="tn-text-ellipsis tn-padding-top-xs">{{ item.goodsName }}
            </view>
            <view class="tn-text-ellipsis tn-text-xs tn-color-gray tn-padding-top-xs">
              {{ item.goodsDesc }}
            </view>
            <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-sm">
              <view class="tn-text-bold tn-color-red">￥{{ item.goodsPrice }}</view>
            </view>
            <!--          <view class="tn-text-bold tn-color-gray tn-padding-bottom-xs tn-text-xs">￥99999</view>-->
          </view>
          <view class="tn-margin-left-xl">x{{ item.quantity }}</view>
        </view>
        <!--        如果是购物车下单的-->
        <view class="tn-flex tn-flex-row-between tn-padding-top-lg">
          <view>留言:</view>
          <view @click="tomMssage">
            <view class="tn-flex">
              <view style="width: 400rpx" class="tn-text-ellipsis">
                方就很舒护服合肥市地方就很舒服服合肥市地方就很舒服服合肥市地方就很舒服服合肥市地方就很舒服服合肥市地方就很舒服服合肥市地方就很舒服
              </view>
              <view>
                <text class="tn-icon-right"></text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="goods-shadow" style="padding-bottom: 50rpx">
        <view>
          <view v-for="(item,index) in carOrderList" :key="index" class="tn-flex tn-flex-col-center tn-padding-bottom-lg">
            <view>
              <image :src="item.goodsImg.split(',')[0]"
                     style="width: 200rpx;height: 200rpx;border-radius: 15rpx"></image>
            </view>
            <view class="tn-padding-right-lg tn-padding-left-sm" style="width: 360rpx;">
              <view class="tn-text-ellipsis tn-padding-top-xs">{{ item.goodsName }}
              </view>
              <view class="tn-text-ellipsis tn-text-xs tn-color-gray tn-padding-top-xs">
                {{ item.goodsDesc }}
              </view>
              <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-sm">
                <view class="tn-text-bold tn-color-red">￥{{ item.goodsPrice }}</view>
              </view>
              <!--          <view class="tn-text-bold tn-color-gray tn-padding-bottom-xs tn-text-xs">￥99999</view>-->
            </view>
            <view class="tn-margin-left-xl">x{{ item.quantity }}</view>
          </view>
        </view>
        <view class="tn-flex tn-flex-row-between tn-padding-top-lg tn-padding">
          <view>留言:</view>
          <view @click="tomMssage">
            <view class="tn-flex">
              <view style="width: 400rpx" class="tn-text-ellipsis">
                方就很舒护服合肥市地方就很舒服服合肥市地方就很舒服服合肥市地方就很舒服服合肥市地方就很舒服服合肥市地方就很舒服服合肥市地方就很舒服
              </view>
              <view>
                <text class="tn-icon-right"></text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="order-footer tn-flex tn-flex-row-between tn-padding-xl tn-bg-white">
      <view v-if="status==0">合计:
        <text class="tn-text-bold tn-color-red">￥{{ directPrice }}</text>
      </view>
      <view v-else>合计:
        <text class="tn-text-bold tn-color-red">￥{{ totalAmount }}</text>
      </view>

      <tn-button size="sm" shape="round" backgroundColor="tn-bg-fruit" fontColor="#080808" @click="payNow">立即支付
      </tn-button>
    </view>
    <!--  选择地址-->
    <tn-popup v-model="show" mode="bottom" border-radius="15" height="800">
      <view>
        <z-paging ref="paging" v-model="dataList" @query="queryList">
          <template #refresher="{refresherStatus}">
            <custom-refresher :status="refresherStatus"/>
          </template>
          <view class="tn-flex tn-flex-row-between tn-color-black tn-flex-col-center tn-padding address-item-ch"
                :class="currentIndex===index?'tn-main-gradient-blue--light':''"
                @click="selectAddress(item,index)"
                v-for="(item,index) in dataList" :key="index">
            <view>
              <view class="tn-flex tn-text-xs tn-flex-col-center">
                <view class="tn-margin-right-sm tn-text-ellipsis" style="color: #9b9d9e">{{ addressInfo.detailAddress }}</view>
              </view>
              <view class="tn-margin-top-sm tn-text-bold">{{ item.region }}</view>
              <view class="tn-margin-top-sm tn-text-sm">{{ item.consignee }} {{ formatPhone(item.phoneNum) }}</view>
            </view>
          </view>
        </z-paging>
      </view>

    </tn-popup>
    <!--  留言-->
    <tn-popup v-model="showMessage" mode="bottom" closeBtn height='60%'>
      <view class="tn-text-center tn-text-bold tn-text-xl tn-padding-top-xl">订单留言</view>
      <view class="tn-padding" style="padding-top: 100rpx">
        <textarea v-model="messageValue" type="textarea" border height="300" placeholder="请输入您的留言" placeholder-class="tn-color-gray" clearable class="tn-padding tn-color-gray tn-width-full" style="border: 1px solid #cccccc"></textarea>
        <view style="padding-top: 50%">
          <tn-button width="100%" @click="tomMssage" background-color="tn-bg-fruit" shape="round" fontColor="#080808">确定
          </tn-button>
        </view>
      </view>
    </tn-popup>
  </view>
</template>

<script>
import templatePageMixin from '@/libs/mixin/template_page_mixin.js'
import {mapActions, mapGetters, mapState} from "vuex";
import formatPhone from '@/libs/mixin/mixins.js'
export default {
  name: 'TemplateOrder',
  mixins: [templatePageMixin,formatPhone],
  data() {
    return {
      show: false,
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
      carOrderList:[],
      directOrderList:[],
      img:'',
      paramsData: [],
      dataList: [],
      directPrice: '',
      currentIndex: 0,
      addressInfo: {},
      totalAmount:''
    }
  },
  computed:{
    ...mapState({
      address: state => state.car.address
    }),
    ...mapGetters(['checkedAll', 'totalShopPrice']),

  },
  onLoad(options) {
    this.selectFirstAddress()
    this.addressInfo = this.address
    console.log('address', this.address)
    this.status = options.status
    if(options.item){
      let data = decodeURIComponent(options.item)
      this.directOrderList = JSON.parse(data)
    }
  },
  created() {
    this.getOrderBuyIdDetail()
  },
  methods: {
    ...mapActions(['shoppingOrder']),
    //获取下单的订单详情
    async getOrderBuyIdDetail() {
      try {
        const res = await this.$API.getOrderBuyId({orderId:uni.getStorageSync('orderId')})
        if(res.code===200){
          if (this.status == 0) {
            this.directPrice = res.result.totalAmount
          }
          this.paramsData = res.result
          this.totalAmount = res.result.totalAmount
          this.carOrderList = res.result.orderItemList

          console.log(res,'订单详情')
        }
      } catch (e) {

      }
    },
    // 立即支付
    async payNow() {
      try {
        let params = {}
        // this.status==0?params=this.directOrderList:params=uni.getStorageSync('carOrderData')
        const res =await this.$API.orderConfirm(this.paramsData)
        if(res.code===200){
          setTimeout(()=>{
            this.$navTo.togo(`/minePages/checkoutCounter`)
          },1000)
        }
      } catch (e) {
      }
    },
    queryList(pageNo, pageSize) {
      const params = {
        customerId: uni.getStorageSync('userId'),
        pageNo: pageNo,
        pageSize: pageSize,
      }
      this.$API.getAddressList(params).then(res => {
        this.$refs.paging.complete(res.result.records);
      }).catch(res => {
        this.$refs.paging.complete(false);
      })
    },
    //首次加载选择第一条地址
    async selectFirstAddress() {
      try {
        const params = {
          customerId: uni.getStorageSync('userId'),
          pageNo: 1,
          pageSize: 10,
        }
        const res = await this.$API.getAddressList(params)
        if (res.code === 200) {
          this.addressInfo = res.result.records[0]
        }
      } catch (e) {

      }
    },
    selectAddress(item, index) {
      this.currentIndex = index
      this.addressInfo = item
      this.show = false
    },
    // 留言
    confirmMessage() {
      this.showMessage = false
    },
    // 留言
    tomMssage() {
      this.showMessage = true
    },
    choseAddress() {
      this.show = true
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
.address_container {
  background: url("/static/images/address_bar.png") no-repeat bottom;
  background-size: 100% 20rpx;
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
  background-color: #FFFFFF;
  border-radius: 16rpx;
  box-shadow: 0 0 54rpx 0 rgba(0, 0, 0, 0.07);
}

.address-item-ch {
  margin: 30rpx;
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

<template>
  <view class="template-pay tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="closePay">
        <text class='tn-icon-close'></text>
      </view>
    </tn-nav-bar>


    <view class="" :style="{paddingTop: vuex_custom_bar_height +50+ 'px'}"
          style="background: linear-gradient(180deg, #D8E5FF, #F9FFF9);">
      <view class="tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-between tn-padding tn-margin-top-xs">
        <text> 收银台</text>
        <view class="tn-text-xl-xxl tn-padding-top-lg tn-text-bold">{{ price }}</view>
        <view class="tn-color-black tn-padding-top-lg"> 支付倒计时
          <tn-count-down :timestamp="timestamp" @end="endTime"></tn-count-down>
        </view>
      </view>
    </view>

<!--   商品名称-->
    <view class="tn-padding-lg">
      <view class="tn-color-gray tn-text-sm">商品名称</view>
      <view class="tn-padding-top-sm tn-text-bold">商品-{{ orderNo }}</view>
    </view>
    <view class="tn-padding-xs tn-padding-left-lg tn-color-gray tn-text-sm">支付方式</view>
    <view class="tn-flex tn-flex-col-center tn-flex-row-between tn-strip-bottom-min tn-padding tn-margin-top-xs"
          @click="selectPayment('alipay')">
      <view class="justify-content-item">
        <view class="tn-text-xxl">
          <text class="tn-icon-payment-alipay tn-color-blue--dark"></text>
          <text class="tn-padding-left-sm tn-text-lg">支付宝</text>
        </view>
      </view>
      <view class="justify-content-item tn-text-xl"
            :class="payType==='alipay'?'tn-color-green--dark':'tn-color-grey--disabled'">
        <view class="tn-icon-success-circle" v-if="payType==='alipay'"></view>
        <view class="tn-icon-circle" v-else></view>
      </view>
    </view>
    <view class="tn-flex tn-flex-col-center tn-flex-row-between tn-strip-bottom-min tn-padding tn-margin-top-xs"
          @click="selectPayment('wechat')">
      <view class="justify-content-item">
        <view class="tn-text-xxl">
          <text class="tn-icon-payment-wechat tn-color-green--dark"></text>
          <text class="tn-padding-left-sm tn-text-lg">微信支付</text>
        </view>
      </view>
      <view class="justify-content-item tn-text-xl"
            :class="payType==='wechat'?'tn-color-green--dark':'tn-color-grey--disabled'">
        <view class="tn-icon-success-circle" v-if="payType==='wechat'"></view>
        <view class="tn-icon-circle" v-else></view>
      </view>
    </view>

    <!-- 悬浮按钮-->
    <view class="tn-flex tn-footerfixed">
      <view class="tn-flex-1 justify-content-item tn-margin tn-text-center">
        <tn-button backgroundColor="tn-bg-fruit" padding="40rpx 0" width="100%" shadow
                   @click="paymentType">
          <text class="tn-color-black">{{ payType === 'alipay' ? '支付宝支付' : '微信支付' }} {{ price }}</text>
        </tn-button>
      </view>
    </view>

    <tn-modal v-model="show" :title="title" :content="content" :button="button" @click="payHandel"></tn-modal>
    <tn-modal v-model="timeoutShow" :title="timeoutTitle" :content="timeoutContent" zoom :button="timeoutButton"
              @click="timeoutHandel"></tn-modal>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
  name: 'TemplatePay',
  mixins: [template_page_mixin],
  data() {
    return {
      show:false,
      timeoutShow: false,
      title: '确认要离开收银台吗？',
      timeoutTitle: '',
      timeoutContent: '订单超时,请重新下单',
      timeoutButton: [{
        text: '查看详情',
        backgroundColor: '#ffffff',
        fontColor: 'red',
        fontWeight: 'bold'
      }
      ],
      content: '您的订单还未完成支付,请尽快支付。',
      button: [{
        text: '确认离开',
        backgroundColor: 'tn-bg-white',
        fontColor: '#838383',
        fontWeight: 'bold'
      },
        {
          text: '继续支付',
          backgroundColor: 'tn-bg-white',
          fontColor: 'red',
          fontWeight: 'bold'
        }
      ],
      payType: 'alipay',
      orderNo: '',
      price: '',
      minutes: '', //倒计时分钟
      seconds: '', //倒计时秒
      isEnd: false, //支付超时
      createTime: '',
      timestamp: 900,
      vipTime: '',
    }
  },
  onLoad() {
  },
  created() {
    this.getOrderBuyIdList()
  },
  methods: {
    //根据订单id查订单
    async getOrderBuyIdList() {
      try {
        const res = await this.$API.getOrderBuyId({orderId: uni.getStorageSync('orderId')})
        if (res.code === 200) {
          uni.setStorageSync('orderId', res.result.id)
          this.orderNo = res.result.orderNo
          this.price = res.result.totalAmount.toFixed(2)
          this.createTime = res.result.createTime
          if(res.result.orderItemList[0].goodsName.includes('会员')){
            switch (res.result.orderItemList[0].goodsName){
              case '会员包月':
                this.vipTime = 31
                break
              case '会员包季':
                this.vipTime = 186
                break
              case '会员包年':
                this.vipTime = 372
                break
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    selectPayment(e) {
      this.payType = e
    },
    closePay(){
      this.show = true
    },
    payHandel(e){
      if(e.index===0){
        this.$navTo.togo(`/minePages/cancelOrder?orderId=${uni.getStorageSync('orderId')}`)
        this.show = false
      }else{
        this.show=false
      }
    },
    //收银台订单支付
    async paymentType() {
      try {
        const res = await this.$API.getPayType({orderId: uni.getStorageSync('orderId'), paymentType: -1})
        if (res.code === 200) {
          this.$t.message.toast(res.message)
          await this.addMemberRecord()
          setTimeout(() => {
            this.$navTo.togo('/minePages/order')
          }, 1000)
        }
      } catch (e) {
        console.log(e)
      }
    },
    //添加会员开通记录
    async addMemberRecord() {
      try{
        const res = await this.$API.addMemberRecord({vipTime: this.vipTime, customerId: uni.getStorageSync('userId')})
      }
      catch (e) {}
    },
    //订单取消
    async cancelOrder() {
      try {
        const res = await this.$API.cancelOrder({orderId: uni.getStorageSync('orderId')})
        if (res.code === 200) { }
      } catch (e) {
      }
    },
    // 倒计时结束
    endTime() {
      this.cancelOrder()
      this.timeoutShow = true
    },
    //订单超时
    timeoutHandel(e) {
        if(e.index===0){
          this.$navTo.togo('/minePages/order')
          this.timeoutShow = false
        }
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


/* 底部悬浮按钮 start*/
.tn-tabbar-height {
  min-height: 100rpx;
  height: calc(120rpx + env(safe-area-inset-bottom) / 2);
}

.tn-footerfixed {
  position: fixed;
  width: 100%;
  bottom: calc(60rpx + env(safe-area-inset-bottom));
  z-index: 1024;
  box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);

}

/* 底部悬浮按钮 end*/

/* 卡 */
.button-vip {
  width: 100%;
  height: 300rpx;
  border-radius: 15rpx;
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
    background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg4.png);
  }
}


/* 间隔线 start*/
.tn-strip-bottom-min {
  width: 100%;
  border-bottom: 1rpx solid #F8F9FB;
}

.tn-strip-bottom {
  width: 100%;
  border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
}

/* 间隔线 end*/

</style>

<template>
  <view class="template-content">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center">
        <text class="tn-text-bold tn-text-xl tn-color-black">会员中心</text>
      </view>
      <view slot="right" class="tn-padding">
        <image src="/static/images/MageMessageDots.png" style="width: 50rpx;height: 50rpx"
               @click="memberMessage"></image>
      </view>
    </tn-nav-bar>
    <view class="vip-content tn-flex tn-flex-col-center">
      <!--      <image src="/static/images/vipcenter-bg.png" mode="widthFix" style="width: 100%;"></image>-->
      <view class="user-content tn-flex tn-flex-col-center" style="margin-top: 100rpx">
        <view class="user-avatar">
          <image :src="userInfo.avatar"></image>
        </view>
        <view>
          <view class="tn-flex tn-flex-row-center tn-flex-col-center">
          <view class="tn-text-lg tn-text-bold" style="color: #b66500">{{ userInfo.nickName }}</view>
            <image v-if="vipMark===1" src="/static/images/v.png" style="width: 40rpx;height: 40rpx"></image>
          </view>
          <view v-if="vipMark===1" class="tn-text-sm" style="color: #c27a1f">有效时间: {{vipEndTime}}</view>
          <view v-else class="tn-text-sm" style="color: #c27a1f">开通会员享好礼</view>
        </view>
      </view>
    </view>
    <view :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-padding" style="margin-top: -220rpx">
        <view class="tn-flex tn-flex-row-between tn-flex-col-center"
              style="background: #fecc88;border-radius: 20rpx; border:4rpx solid #f5bf73;padding: 20rpx 20rpx 50rpx">
          <view style="color: #b86805">享受vip课程，优质心理辅导课程</view>
          <view class="tn-flex tn-flex-col-center">
            <view style="color: #ce8a34">全部会员权益</view>
            <view class="tn-icon-right" style="color: #ce8a34"></view>
          </view>
        </view>
        <view class="tn-padding tn-bg-white tn-radius content_shadow">
          <view class="tn-flex tn-flex-row-between">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center" style="color: #d9b17a">
              <view class="tn-icon-video-fill"></view>
              <view class="tn-padding-top-sm">优质视频</view>
            </view>
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center" style="color: #d9b17a">
              <view class="tn-icon-book"></view>
              <view class="tn-padding-top-sm">优质课程</view>
            </view>
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center" style="color: #d9b17a">
              <view class="tn-icon-shopbag-fill"></view>
              <view class="tn-padding-top-sm">百元礼包</view>
            </view>
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center" style="color: #d9b17a">
              <view class="tn-icon-message-fill"></view>
              <view class="tn-padding-top-sm">专属客服</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!--会员类型-->
    <view class="tn-padding">
      <scroll-view scroll-x="true" class="viptype-content">
        <view class="vip-type" :class="selectIndex===index?'active':'deactive'" v-for="(item,index) in vipType" :key="index" @click="selectVip(index,item)">
          <view class="tn-padding-bottom-sm vip_type">{{ item.goodsName }}</view>
          <view class="tn-padding-bottom-sm vip_price">
            <text>￥</text>
            <text style="font-size: 50rpx">{{ item.goodsPrice }}</text>
          </view>
          <view class="tn-line-through vip-content-originalPrice" style="color: #d3a362">￥{{ item.originalPrice }}
          </view>
          <view class="desc tn-text-sm" style="color: #9a9a9a">{{ item.goodsDesc }}</view>
        </view>
      </scroll-view>
    </view>

    <view class="tn-flex tn-flex-col-center tn-padding-left">
      <tn-checkbox v-model="memberAgreementStatus" shape="circle" active-color="#754e19" @change="changeMemberAgreementStatus">
        <view class="tn-text-sm" style="color: #ababab">
          购买前请仔细阅读<text style="color: #754e19" @click="toVipAgreement">《开通会员协议》</text>
        </view>
      </tn-checkbox>

    </view>
    <!-- 会员常见问题-->
    <view class="tn-padding">
      <view class="problem_shadow tn-padding">
        <view class="tn-text-lg tn-text-bold tn-padding-bottom" style="color:#9d5b27">常见问题</view>
        <view class="" v-for="(item,index) in vipProblem" :key="index">
          <view class="tn-flex tn-flex-col-center" style="color: #54270b">
            <view class="tn-text-lg tn-icon-help-fill tn-margin-right-xs"></view>
            <view class="tn-text-bold tn-padding-top-sm tn-padding-bottom-sm">{{ item.title }}
            </view>
          </view>
          <view class="tn-padding-bottom" style="color: #aba297;border-bottom: 4rpx dashed #e5e5e5">{{ item.content }}
          </view>
        </view>
      </view>
    </view>
    <view>

    </view>
    <!--底部开通会员-->
    <view class="tabbar footerfixed tn-bg-white">
      <view class="tn-padding">
        <view class="tn-flex tn-flex-row-between tn-flex-col-center">
          <view>劵后合计:
            <text style="color: #fe501a">￥</text>
            <text class="tn-text-xl" style="color: #fe501a">{{ price }}</text>
          </view>
          <view class="tn-padding-top-sm tn-padding-bottom-sm tn-padding-left tn-padding-right tn-round tn-text-bold" style="color: #754e19;background: #f5cf9b"
                @click="confirmPay">确认协议并支付
          </view>
        </view>

      </view>
    </view>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
  name: 'TemplateContent',
  mixins: [template_page_mixin],
  data() {
    return {
      memberAgreementStatus: false,
      checked: false,
      coupon: '',
      maxLength: 255,
      vipType: [],
      vipProblem: [
        {
          title: '开通VIP后是否可以退款?',
          content: '会员属于虚拟商品，基于其性质和特征，购买后不支持退款、更换、兑换现金，请知晓并酌情购买。'
        },
        {
          title: 'VIP的权益期限是多久?',
          content: '从购买当日开始计算，会员月卡31天、半年卡186天、全年卡372天。'
        },
        {
          title: '开通了多次VIP怎么办?',
          content: '同一个手机号开通多次VIP，会员权益期限将累计延长，如:购买2次会员月卡后，会员期限将是62天。'
        },
        {
          title: '“课程点读”权益期限如何计算?',
          content: '若已有“课程点读”权益后开通会员，权益期限不与会员累计延长，会同步消耗，且购买后权益开放会有1-5分钟延迟，请知晓并酌情购买。'
        }
      ],
      selectIndex:0,
      price:0,
      goodsId:0,
      userInfo:{},
      vipEndTime:'',
      vipMark:''
    }
  },
  created() {
    this.getVipType()
    this.getMemberInfo()
    this.getUserInfo()
  },
  methods: {
    async getMemberInfo() {
      try {
        const res = await this.$API.getMemberInfo({customerId: uni.getStorageSync('userId')})
        if (res.code === 200) {
          this.vipMark = res.result.vipType
          this.vipEndTime =this.timeFormat(res.result.expireTime)
        }
      } catch (e) {

      }
    },
    timeFormat(time) {
      return this.$dayjs(time).format("YYYY-MM-DD")
    },
    //获取用户个人信息
    async getUserInfo() {
      try {
        let id = uni.getStorageSync('id')
        const res = await this.$API.getUserInfo(id)
        if (res.code === 200) {
          this.userInfo = res.result
        }
      } catch (e) {
      }
    },
    toVipAgreement(){
      this.$navTo.togo('/minePages/vipAgreement')
    },
    async getVipType() {
      try {
        const res = await this.$API.getMemberPackageType()
        if(res?.result?.records){
          this.price= res?.result?.records[0]?.goodsPrice
          this.goodsId = res?.result?.records[0]?.id
          this.vipType = res?.result?.records
        }
      } catch (e) {

      }
    },
    selectVip(index,item) {
      this.goodsId = item.id
      this.price = item.goodsPrice
      this.selectIndex = index
    },
    changeMemberAgreementStatus(){
      this.memberAgreementStatus = !this.memberAgreementStatus
    },
    async confirmPay() {
      if (!this.memberAgreementStatus) {
        this.$t.message.toast('请先同意会员协议')
        return
      }
      try {
        let params = {
          goodsId: this.goodsId,
          quantity: 1,
          customerId: uni.getStorageSync('userId'),
        }
        //下单
        const res = await this.$API.goodsOrderNow(params)
        if (res.code === 200) {
          uni.setStorageSync('orderId', res.result.id)
          setTimeout(() => {
            this.$navTo.togo('/minePages/confirmOrder')
          }, 1000)
        }
      } catch (e) {

      }
    },
    memberMessage() {
      this.$navTo.togo('/minePages/memberMessage')
    }
  }
}
</script>

<style lang="scss" scoped>
.vip-content {
  width: 100%;
  height: 500rpx;
  background: url("/static/images/vipcenter-bg.png") no-repeat;
  background-size: 100% 100%;

  .user-avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .user-content {
    padding: 50rpx 50rpx;
  }
}

.viptype-content {
  white-space: nowrap;
}

.vip-type {
  width: 33%;
  text-align: center;
  display: inline-flex; // item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  border-radius: 20rpx 40rpx 20rpx 20rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1); /* 添加轻微阴影效果 */
  margin-right: 40rpx;

  .desc {
    white-space: wrap;
  }
}

.content_shadow {
  margin-top: -30rpx;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 50rpx 0 rgba(0, 3, 72, 0.1);
}

.problem_shadow {
  margin-bottom: 140rpx;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 50rpx 0 rgba(0, 3, 72, 0.1);
}

.input_Style {
  background: #F5F5F5;
  color: #000000;
  padding: 10rpx 40rpx !important;
  border-radius: 60rpx;
  margin-bottom: 30rpx;
}

.content {
  .title {
    color: red;
  }
}

//未激活样式
.deactive {
  border: 4rpx solid #eaeaea;

  .vip_type {
    color: #121212;
  }

  .vip_price {
    font-weight: bold;
    color: #444444;
  }
}

//激活选中样式
.active {
  position: relative;
  border: 4rpx solid #f3bb6c;
  background: rgb(253,247,237);
  background: linear-gradient(180deg, rgba(253,247,237,1) 0%, rgba(252,242,228,1) 19%, rgba(252,240,223,1) 66%);
  .vip_type {
    color: #754e19;
  }

  .vip_price {
    font-weight: bold;
    color: #754e19;
  }
}
.active::before{
  content: '限时减十元';
  position: absolute;
  top: -4rpx;
  left: -4rpx;
  width: 80%;
  height: 40rpx;
  z-index: 999;
  color: #754e19;
  font-size: 24rpx;
  font-weight: bold;
  line-height: 40rpx;
  background: rgb(243,189,111);
  background: linear-gradient(90deg, rgba(243,189,111,1) 0%, rgba(246,207,152,1) 77%);  border-radius: 20rpx 0 20rpx 0;
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

/* 底部 start*/
.footerfixed {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
}

.tabbar {
  height: calc(130rpx + env(safe-area-inset-bottom) / 2);
  padding-bottom: calc(30rpx + env(safe-area-inset-bottom) / 2);
  padding-left: 10rpx;
  padding-right: 10rpx;
}
</style>

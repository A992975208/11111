<template>
  <view class="template-cart tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">我的课程</text>
      </view>
    </tn-nav-bar>

    <view class="tn-padding-lg tn-padding-bottom-xl tn-bg-white tn-radius"
          :style="{paddingTop: vuex_custom_bar_height + 'px'}">
            <calendar v-model="show" mode="date" @change="getDay" active-bg-color="#fac10d"></calendar>
<!--      <moSimpleDate :fold='true' :active="true" @changeTime="changeTime" @clickTime="clickTime1"/>-->
      <view class="tn-flex tn-flex-row-center tn-flex-col-center" style="padding-top: 200rpx">
        <tn-empty :imgWidth="width" text="暂无安排课程" :show="show" icon="/static/images/class_empty.png"></tn-empty>
      </view>
    </view>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
import calendar from '@/components/calendar/calendar.vue'
import moSimpleDate from '@/components/moSimpleDate/moSimpleDate.vue'

export default {
  components: {calendar, moSimpleDate},
  mixins: [template_page_mixin],
  data() {
    return {
      show: true,
      width: 200
    }
  },
  methods: {
    getDay(e) {
      console.log('点击日历了', e)
    },
    //进入页面初始化会走一次此方法
    changeTime(time) {
      console.log('切换', time.temps)
      //打印出来当天时间戳
    },
    //选中某一日期会走此方法
    clickTime1(time) {
      console.log('点击', this.$dayjs(time.temps).format('YYYY年MM月DD日 HH:mm:ss'),)
      //打印出来选中日期的时间戳
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
</style>

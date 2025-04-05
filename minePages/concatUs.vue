<template>
  <view class="template-content">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center">
        <text class="tn-text-bold tn-text-xl tn-color-black">联系我们</text>
      </view>
    </tn-nav-bar>


    <view :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="map_content">
        <map  :latitude="latitude" :longitude="longitude" :scale="18" :markers="covers" class="tn-width-full" style="height:65vh"></map>
      </view>
      <view class="content-fixed">
        <view class="tn-text-bold tn-margin-bottom-sm">联系我们</view>
        <view class="tn-text-sm tn-margin-bottom-sm">感谢您对我们产品的关注和支持，如果您有任何问题或建议，请随时联系我们。</view>
        <view class="tn-text-sm tn-margin-bottom-sm">电话：<text class="tn-color-blue" @click="makeCallPhone">13272574651</text></view>
        <view class="tn-text-sm tn-margin-bottom-sm">邮箱：qianguojiaoyu@edu.com</view>
        <view class="tn-text-sm tn-margin-bottom-sm">地址：西安市曲江新区旺座E座3102</view>
      </view>
  </view>
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

  export default {
    name: 'TemplateContent',
    mixins: [template_page_mixin],
    data(){
      return {
        scale:18,
        id:0, // 使用 marker点击事件 需要填写id
        title: 'map',
        longitude: 109.0159258246422,//经度
        latitude: 34.21039393981631,//纬度
        covers: [{
          longitude: 109.0159258246422,//经度
          latitude: 34.21039393981631,//纬度
          iconPath: '/static/images/pos.png',
        }]
      }
    },
    created() {
    },
    methods: {
      makeCallPhone(){
        uni.makePhoneCall({
          phoneNumber: '13272574651' //仅为示例
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.map_content{
  width: 100%;
  height: 300px;
}
.content-fixed{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
.content{
  .title{
    color: red;
  }
}
.empty-wrap {
  display: flex;
  height: calc(100vh - 65px);
  align-items: center;
  justify-content: center;
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
</style>

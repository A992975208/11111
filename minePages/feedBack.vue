<template>
  <view>
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back tn-navbg'
            @click="goBack">
        <text class='icon tn-icon-home-smile-fill'></text>
      </view>
      <view class="tn-text-center tn-text-xl tn-text-bold">问题反馈</view>
    </tn-nav-bar>

    <view class="tn-padding" :style="{paddingTop: vuex_custom_bar_height + 20 +'px'}">
      <view class="tn-flex tn-flex-col-center tn-flex-row-between wrap-shadow tn-margin-bottom" @click="showSelect">
        <view class="tn-text-bold">反馈类型</view>
        <view class="tn-flex tn-flex-row-center tn-flex-col-center">
          <view class="tn-padding-right tn-color-gray">{{feedText}}</view>
        <view class="tn-icon-right tn-color-gray"></view>
        </view>
      </view>
      <view class="wrap-shadow tn-margin-bottom">
        <view class="tn-text-bold">问题描述</view>
        <textarea class="tn-margin-top textarea_style" placeholder="请输入反馈内容"
                  v-model="feedParams.content"></textarea>
        <view class="tn-text-bold tn-padding-top-xl">问题截图</view>
        <tn-image-upload ref="imageUpload" :action="action" :autoUpload="true" upload-text="拍照上传"
                         @on-success="uploadImage" :form-data="formData" :header="header"></tn-image-upload>
      </view>
      <view class="tn-padding tn-padding-bottom-xl tn-text-bold">反馈人信息</view>
      <view class="wrap-shadow">
        <view>联系方式(QQ/邮箱/电话号)</view>
        <tn-input class="tn-margin-top tn-padding input_style" type="text" placeholder="请输入联系方式"
                  v-model="feedParams.contactWay"/>
      </view>
      <view class="tn-padding-top-xl">
        <tn-button shape="round" :backgroundColor="colorShow?'tn-bg-fruit':'#ffe3a4'" font-color="tn-color-black"
                   width="100%"
                   @click="submitBack">提交反馈
        </tn-button>
      </view>
    </view>
    <tn-select v-model="show" mode="single" :list="feedType" :searchShow="true" @confirm="confirm"></tn-select>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
import {getDictionary} from "@/utils/getDictionary";

export default {
  mixins: [template_page_mixin],
  data() {
    return {
      show: false,
      colorShow: false,
      action:`${this.$globalData.devBaseUrl}/sys/common/upload`,
      feedType: [],
      feedText:'',
      feedParams: {
        feedbackType: '',
        content: '',
        attach: [],
        contactWay: '',
      },
      formData:{
      biz:'temp'
      },
      header: { 'X-Access-Token': uni.getStorageSync('token') },
    }
  },
  created() {
    this.getDictList()
  },
  watch: {
    feedParams: {
      handler(newVal) {
        if (newVal.feedbackType && newVal.content && newVal.attach.length > 0 && newVal.contactWay) {
          this.colorShow = true
        } else {
          this.colorShow = false
        }
      },
      deep: true
    }
  },
  methods: {
    showSelect() {
      this.show = true
    },
    confirm(e){
      this.feedText = e[0].label
      this.feedParams.feedbackType = e[0].value
    },
    uploadImage(data) {
      this.feedParams.attach.push(data.message)
    },
    async submitBack() {
      try {
        let params = {
          feedbackType: this.feedParams.feedbackType,
          content: this.feedParams.content,
          attach: this.feedParams.attach.toString(),
          contactWay: this.feedParams.contactWay
        }
        const {feedbackType, content, attach, contactWay} = this.feedParams;
        const errorMessages = [
          {condition: feedbackType === '', message: '请选择问题反馈类型'},
          {condition: content === '', message: '请输入反馈内容'},
          {condition: attach === '', message: '请选择上传问题截图'},
          {condition: contactWay === '', message: '请输入联系方式'},
        ];
        for (const {condition, message} of errorMessages) {
          if (condition) {
            this.$t.message.toast(message);
            return;
          }
        }
        const res = await this.$API.feedback(params)
        if (res.code === 200) {
          this.$t.message.toast('反馈成功')
          setTimeout(() => {
            this.$navTo.togo('/pages/index')
          },2000)
        }
      } catch (e) {

      }
    },
    //获取数据字典
    async getDictList() {
      // try {
      //   const res = await this.$API.getDictionary('feedback_type')
      //   console.log(res)
      //   this.feedType = res.result
      // } catch (e) {
      //
      // }
      this.feedType = await getDictionary('feedback_type')
      console.log(this.feedType)
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap-shadow {
  padding: 30rpx 30rpx;
  background-color: #FFFFFF;
  box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  border-radius: 20rpx;
}

.textarea_style {
  width: 100%;
  height: 200rpx;
  padding: 20rpx;
  font-size: 24rpx;
  color: #9b9b9b;
  background: #ececec;
  border-radius: 20rpx;
}

.order {
  &---wrap {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
  }
}

/* 胶囊*/
.tn-custom-nav-bar__back {
  width: 36%;
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
</style>

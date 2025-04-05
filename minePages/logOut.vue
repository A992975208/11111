<template>
  <view class="template-set">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">注销账号</text>
      </view>
    </tn-nav-bar>

    <view class="tn-margin-top" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-padding">
        <view class="tn-text-bold tn-text-xxl">账号注销的风险</view>
        <view class="tn-text-bold tn-text-lg tn-margin-top-xl">无法登录</view>
        <view class="tn-margin-top-lg tn-color-grey">一旦注销，你讲无法使用该账号登录千果家庭教育相关服务平台。</view>
        <view class="tn-text-bold tn-text-lg tn-margin-top-xl">信息抹除，无法恢复</view>
        <view class="tn-margin-top-lg tn-color-grey">
          注销后将永久抹除千果家庭教育相关平台的所有信息，包括但不限于账户余额，金币，优惠劵，已购买课程，个人资料，消费记录等
        </view>
        <view class="tn-flex tn-flex-row-center tn-margin-top-xl">
          <tn-button shape="round" backgroundColor="tn-bg-fruit" padding="40rpx 0" width="40%" shadow fontBold
                     @click="logOutHandel">
            <text class="tn-color-black">注销账号</text>
          </tn-button>
        </view>
      </view>
      <tn-modal v-model="show" :title="title" :content="content" :button="button" @click="cancelOrConfim"></tn-modal>
    </view>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
  name: 'TemplateSet',
  mixins: [template_page_mixin],
  data() {
    return {
      show: false,
      title: '注销账号',
      content: '您确定要注销账号吗',
      button: [{
        text: '取消',
        backgroundColor: 'tn-bg-gray--light',
        fontColor: '#080808',
        plain: false,
        shape: 'round'
      },
        {
          text: '确定',
          backgroundColor: 'tn-bg-fruit',
          fontColor: '#080808'
        }
      ],
      setList: [
        {
          title: "版权所属",
          url: "/minePages/content",
        },
        {
          title: "使用协议",
          url: "/minePages/content",
        },
        {
          title: "隐私政策",
          url: "/minePages/content",
        },
        {
          title: "帮助中心",
          url: "/minePages/help",
        },
        {
          title: "版本更新",
          url: "/minePages/version",
        }
      ]
    }
  },
  methods: {
    //注销账号
    logOutAccount() {
      let id = uni.getStorageSync('id')
      this.$API.logout(id).then(res => {
        if (res.code === 200) {
          this.$t.message.toast('该账号已经注销');
          uni.clearStorageSync()
          uni.redirectTo({
            url: '/minePages/login'
          })
        }
      })
    },
    logOutHandel() {
      this.show=true
    },
    cancelOrConfim(e){
      if(e.index===0){
        this.show=false
      }else{
        this.logOutAccount()
      }
    },
    tn(url) {
      try {
        uni.navigateTo({
          url,
        });
      } catch (e) {
        console.error(e);
        uni.showToast({
          title: "跳转失败",
          icon: "none",
          mask: true,
        });
      }
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


/* 底部悬浮按钮 start*/
.tn-tabbar-height {
  min-height: 100rpx;
  height: calc(120rpx + env(safe-area-inset-bottom) / 2);
}

.tn-footerfixed {
  position: fixed;
  width: 100%;
  bottom: calc(30rpx + env(safe-area-inset-bottom));
  z-index: 1024;
  box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);

}

/* 底部悬浮按钮 end*/

</style>

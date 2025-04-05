<template>
  <view class="template-order">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">{{ titleStatus }}</text>
      </view>
    </tn-nav-bar>

    <view class="order--wrap" :style="{top: vuex_custom_bar_height + 20 +'px'}">
      <view class="tn-padding">
        <view class="content_shadow">
          <tn-form :model="form" ref="form" :errorType="errorType" :labelPosition="labelPosition"
                   :label-style="labelStyle"
                   :labelWidth="labelWidth" :labelAlign="labelAlign">
            <tn-form-item label="收货人" prop="name" :labelPosition="labelPosition"
                          :labelAlign="labelAlign">
              <tn-input v-model="form.consignee" type="text" placeholder="请填写收货人姓名" :border="border"></tn-input>
            </tn-form-item>
            <tn-form-item label="手机号码" prop="phone" rightIcon="phone" :labelPosition="labelPosition"
                          :labelAlign="labelAlign">
              <tn-input v-model="form.phoneNum" type="number" placeholder="请填写收货人手机号"
                        :border="border"></tn-input>
            </tn-form-item>
            <tn-form-item label="所在地区" prop="region" :labelPosition="labelPosition" :labelAlign="labelAlign">
              <tn-input v-model="form.region" type="select" placeholder="省市区县、乡镇等" :border="border"
                        :selectOpen="pickerShow" @click="areaHandel"></tn-input>
            </tn-form-item>
            <tn-form-item label="详细地址" prop="desc" :labelPosition="labelPosition" :labelAlign="labelAlign"
                          :borderBottom="false">
              <tn-input v-model="form.detailAddress" type="textarea" placeholder="街道、楼牌号等"
                        placeholder-style="color:#b3b3b3" style="height: 100%;padding: 20rpx;"></tn-input>
            </tn-form-item>
          </tn-form>
        </view>

        <view class="content_shadow">
          <tn-form :model="form" ref="form" :errorType="errorType" :labelPosition="labelPosition"
                   :label-style="labelStyle"
                   :labelWidth="labelWidthSwitch" :labelAlign="labelAlign">
            <tn-form-item label="设置默认地址" prop="remember" :labelPosition="labelPosition" :labelAlign="labelAlign"
                          :borderBottom="false">
              <tn-switch v-model="form.izDefault" slot="right" @change="changeSwitch" activeColor="#fac10d"></tn-switch>
            </tn-form-item>
          </tn-form>
        </view>
        <view class="footer-btn">
          <tn-button shape="circle" backgroundColor="tn-bg-fruit" width="90%" shadow fontBold
                     @click="saveAddressInfo">
            <text class="tn-color-black">保存</text>
          </tn-button>
        </view>
        <!-- 地区picker -->
        <tn-picker
            v-model="pickerShow"
            mode="region"
            @confirm="regionPickerConfirm"
        ></tn-picker>
      </view>
    </view>
  </view>
</template>

<script>
import templatePageMixin from '@/libs/mixin/template_page_mixin.js'

export default {
  name: 'TemplateOrder',
  mixins: [templatePageMixin],
  data() {
    return {
      list: [
        {name: '全部'},
        {name: '待支付'},
        {name: '进行中', count: 6},
        {name: '已完成'}
      ],
      errorType: ['message', 'border-bottom', 'toast'],
      labelPosition: 'left',
      labelAlign: 'left',
      border: false,
      actionSheetShow: false,
      labelWidth: 150,
      labelWidthSwitch: 200,
      checkboxWidth: 'auto',
      checkboxWrap: false,
      radioWidth: 'auto',
      radioWrap: false,
      selectShow: false,
      pickerShow: false,
      tabsIndex: 0,
      swiperIndex: 0,
      swiperTop: 0,
      swiperHeight: 0,
      form: {
        consignee: "",
        phoneNum: "",
        region: "",
        detailAddress: "",
        customerId: uni.getStorageSync('userId'),
        izDefault: false,
        id: ''
      },
      addressState: true,
      titleStatus: '添加收货地址',
      labelStyle: {
        fontWeight: '600',
        color: '#3d3d3d',
      }
    }
  },
  onLoad(options) {
    if (Object.keys(options).length > 0) {
      this.addressState = false
      this.titleStatus = '编辑收货地址'
    }
    if (options.item) {
      let data = decodeURIComponent(options.item)
      this.form.izDefault = data.izDefault === 1 ? true : false
      Object.assign(this.form, JSON.parse(data))
    }
  },
  onReady() {
    this.$nextTick(() => {
      this.updateSwiperInfo()
    })
  },
  methods: {
    areaHandel() {
      this.pickerShow = true
    },
    changeSwitch(e) {
      this.form.izDefault = e
    },
    // 点击地区选择器
    regionPickerConfirm(event) {
      this.form.region = event.province.label + event.city.label + event.area.label
    },
    addReceiptAddress() {
      this.$navTo.togo('/minePages/addReceiptAddress')
    },
    // 保存按钮区分添加和编辑
    saveAddressInfo() {
      if (this.addressState) {
        this.addressInfo()
      } else {
        this.editAddressInfo()
      }
    },
    //添加地址数据
    async addressInfo() {
      const {consignee, phoneNum, region, detailAddress} = this.form;
      const errorMessages = [
        {condition: consignee === '', message: '请填写收货人'},
        {condition: phoneNum === '', message: '请填写手机号码'},
        {condition: region === '', message: '请选择所在地区'},
        {condition: detailAddress === '', message: '请填写详细地址'},
      ];
      for (const {condition, message} of errorMessages) {
        if (condition) {
          this.$t.message.toast(message);
          return;
        }
      }
      try {
        let params = {
          consignee: this.form.consignee,
          phoneNum: this.form.phoneNum,
          region: this.form.region,
          detailAddress: this.form.detailAddress,
          customerId: this.form.customerId,
          izDefault: this.form.izDefault ? 1 : 0
        }
        const res = await this.$API.addAddress(params)
        if (res.code === 200) {
          this.$t.message.toast('保存成功')
          this.$navTo.togo('/minePages/shippingAddress')
        }
      } catch (e) {
      }
    },
    editAddressInfo() {
      let params = {
        consignee: this.form.consignee,
        phoneNum: this.form.phoneNum,
        region: this.form.region,
        detailAddress: this.form.detailAddress,
        izDefault: this.form.izDefault ? 1 : 0,
        id: this.form.id
      }
      this.$API.editAddress(params).then(res => {
        if (res.code === 200) {
          this.$t.message.toast('编辑成功')
          this.$navTo.togo('/minePages/shippingAddress')
        }
      })
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

    // 计算可滑动区域的高度信息
    updateSwiperInfo() {
      // 获取可滑动菜单的信息
      this._tGetRect('.order__tabs').then(res => {
        if (!res) {
          setTimeout(() => {
            this.updateSwiperInfo()
          }, 10)
          return
        }
        const systemInfo = uni.getSystemInfoSync()
        this.swiperTop = res.bottom - this.vuex_custom_bar_height
        this.swiperHeight = systemInfo.safeArea.height - res.bottom + systemInfo.statusBarHeight
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.uni-page-wrapper {
  background-color: #0E122A !important;
}

.content_shadow {
  box-shadow: 0 0 41px 0 rgba(0, 0, 0, 0.07);
  padding: 0 20rpx;
  border-radius: 15px;
  margin-bottom: 10px;
}

.footer-btn {
  width: 100%;
  justify-content: center;
  position: fixed;
  bottom: 30rpx;
}

.carBtn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

//.template-order {
//  background-color: #F4F4F4;
//}

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

<template>
  <view class="template-order" :key="componentKey">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">收货地址</text>
      </view>
    </tn-nav-bar>

    <view class="order--wrap" :style="{top: vuex_custom_bar_height + 20 +'px'}">
      <view >
        <view class="address-wrap">
          <view v-if="addressList.length>0">
            <view class="address-item" v-for="(item,index) in addressList" :key="index">
              <view>
                <view class="tn-flex tn-flex-col-center tn-flex-row-between">
                  <view class="tn-text-lg" style="color: #282828;font-weight: normal">收货人:{{ item.consignee }}</view>
                  <view class="tn-text-bold tn-margin-left-xs tn-text-lg">{{ formatPhone(item.phoneNum) }}</view>
                </view>
                <view class="tn-margin-top-sm tn-text-sm tn-padding-bottom"
                      style="color: #9e9e9e;border-bottom: 1px solid #efefef;">{{ item.region }}{{ item.detailAddress }}
                </view>
                <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top" style="color: #707070">
                  <view>
                    <view v-if="item.izDefault" class="tn-icon-success-circle-fill" :class="item.izDefault?'tn-color-orange':'tn-color-grey--disabled'"><text class="tn-margin-left-sm">默认地址</text></view>
                    <view v-else class="tn-icon-success-circle-fill" style="color: #707070"><text class="tn-margin-left-sm">默认地址</text></view>
                  </view>
                  <view class="tn-flex tn-flex-col-center">
                    <view class="tn-icon-edit" @click="editAddress(item)">
                      <text>编辑</text>
                    </view>
                    <view class="tn-icon-delete tn-margin-right tn-margin-left" @click="deleteAddress(item.id)">
                      <text class="tn-pr">删除</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view v-else class="empty-wrap tn-text-ellipsis" :style="{top: vuex_custom_bar_height + 20 +'px'}">
            <view class="empty-content">
              <tn-empty :imgWidth="width" text="暂无添加收货地址哦~" :show="showEmpty"
                        icon="/static/images/goods_empty.png"></tn-empty>
              <view class="tn-flex tn-flex-row-center tn-padding-top-xl">
              </view>
            </view>
          </view>
          <view class="footer-btn">
            <tn-button size="lg" shape="circle" backgroundColor="tn-bg-fruit" width="90%" shadow fontBold @click="addReceiptAddress">
              <text class="tn-color-black">添加收货地址</text>
            </tn-button>
          </view>
        </view>
      </view>
    </view>
    <!--    删除收货地址-->
    <tn-modal v-model="showModal" :title="title" :content="content" :button="button" @click="modalHandel"></tn-modal>

  </view>
</template>

<script>
import templatePageMixin from '@/libs/mixin/template_page_mixin.js'
import formatPhone from '@/libs/mixin/mixins'
export default {
    name: 'TemplateOrder',
    mixins: [templatePageMixin,formatPhone],
    data() {
      return {
        width: 200,
        showEmpty: true,
        id: '',
        show: false,
        list: [
          {name: '全部'},
          {name: '待支付'},
          {name: '进行中', count: 6},
          {name: '已完成'}
        ],
        componentKey:1,
        tabsIndex: 0,
        swiperIndex: 0,
        swiperTop: 0,
        swiperHeight: 0,
        addressList: [],
        showModal: false,
        title: '您确定要删除当前地址吗？',
        content: '',
        button: [
          {
            text: '取消',
            backgroundColor: '#E6E6E6',
            fontColor: '#080808',
            plain: false,
            shape: 'round'
          },
          {
            text: '确定',
            backgroundColor: 'tn-bg-fruit',
            fontColor: '#000000'
          }
        ]
      }
    },
    onLoad() {
      this.addressQuery()
    },
    methods: {
      //地址查询
      addressQuery() {
        let params = {
          customerId:uni.getStorageSync('userId'),
          pageNo:1,
          pageSize:10
        }
        this.$API.getAddressList(params).then(res => {
         if(res.code===200){
           this.addressList = res.result.records.map(item => {
             return {
               ...item,
               izDefault: item.izDefault === 1
             }
           })
           console.log(JSON.parse(JSON.stringify(this.addressList)))
           //获取收货地址中的默认地址
           this.addressList.forEach(item => {
             if (item.izDefault === 1) {
               uni.setStorageSync('address',item)
               this.$store.commit('SET_ADDRESS', item)
             }
           })
         }
        })
      },
      addReceiptAddress() {
        this.$navTo.togo('/minePages/addReceiptAddress')
      },
      deleteAddress(id) {
        this.id = id
        this.showModal = true
      },
      modalHandel(e) {
        if (e.index === 1) {
          let params = {
            id: this.id
          }
          this.$API.deleteAddress(params).then(res => {
            if (res.code === 200) {
              this.addressQuery()
              this.showModal = false
              this.$toast.success('删除成功')
            }
          })
        } else {
          this.showModal = false
        }
      },
      // 跳转
      tn(e) {
        uni.navigateTo({
          url: e,
        });
      },
      editAddress(item) {
        this.$navTo.togo('/minePages/addReceiptAddress?item='+encodeURIComponent(JSON.stringify(item)))
      }
    }
  }
</script>

<style lang="scss" scoped>
.empty-wrap {
  display: flex;
  height: 80vh;
  align-items: center;
  justify-content: center;
}
.address-wrap {
  padding: 30rpx;
  .address-item {
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.07);
    padding: 25rpx;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
  }
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

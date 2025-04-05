<template>
  <view class="template-cart tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">购物车</text>
      </view>
      <view v-if="shoppingList.length>0"  slot="right" class="tn-flex tn-flex-col-center tn-flex-row-center tn-padding-right-sm" @click="editHandel">
        <text class="tn-text-bold tn-text-xl tn-color-black">{{ edit ? '编辑' : '完成' }}</text>
      </view>
    </tn-nav-bar>
    <!--购物车有数据-->
    <view v-if="shoppingList.length>0" class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-padding-lg">
        <view v-for="(item, index) in shopListData" :key="index" class="tn-padding-bottom-lg">
          <view class="tn-flex tn-flex-col-center tn-padding-lg car-shadow">
            <view class="tn-flex tn-flex-col-center">
              <view class="tn-padding-right">
                <tn-checkbox-group @change="selectItem(index)">
                  <tn-checkbox v-model="item.checked" size="28" shape="circle" active-color="#fac10d"></tn-checkbox>
                </tn-checkbox-group>
              </view>
              <view class="image-pic" :style="'background-image:url(' + item.goodsInfo.goodsImg.split(',')[0] + ')'"
                    @click="tn('/productPages/details')">
                <view class="image-cart">
                </view>
              </view>
            </view>
            <view class="tn-padding-left-sm">
              <view class="tn-flex tn-flex-row-between tn-flex-col-between">
                <view class="justify-content-item">
                  <view class="tn-color-black tn-text-ellipsis" style="width: 300rpx;">{{ item.goodsInfo.goodsName }}</view>
                </view>
              </view>
                <view class="tn-padding-top-xs" >
                  <view class="tn-color-gray tn-text-xs tn-text-ellipsis" style="width: 300rpx">{{ item.goodsInfo.goodsDesc }}</view>
                </view>
              <view class="tn-padding-top-xs">
                <view class="tn-padding-bottom-xs" style="opacity: 0.6;">
                  <tn-number-box v-model="item.quantity" :min="1" :max="50" :disabledInput="true"></tn-number-box>
                </view>
                <view class="tn-padding-top-xs tn-color-black">
                  <text class="clamp-text-1 tn-text-bold tn-text-xs tn-color-red">￥</text>
                  <text class="clamp-text-1 tn-text-lg tn-text-bold tn-color-red">{{ item.goodsInfo.goodsPrice }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="tabbar footerfixed tn-bg-gray--light">
        <view class="tn-flex tn-flex-row-between tn-flex-col-center">
          <view class="justify-content-item tn-margin-top">
            <view class="tn-flex tn-flex-row-center tn-flex-col-center">
              <view class="tn-flex tn-flex-row-center tn-padding-right tn-padding-left">
                <tn-checkbox-group @change="checkedAllFn">
                  <tn-checkbox v-model="checkedAll" size="28" shape="circle" active-color="#fac10d">全选</tn-checkbox>
                </tn-checkbox-group>
                <!--              <tn-checkbox-group @change="unChangeAll" v-else>-->
                <!--                <tn-checkbox v-model="checkedAll" shape="circle">全不选</tn-checkbox>-->
                <!--              </tn-checkbox-group>-->
              </view>
              <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                <view class="tn-padding-right tn-text-ellipsis">
                  <view class="tn-padding-right tn-padding-left-sm">
                    <text>总价：￥</text>
                    <text class="tn-text-lg tn-text-bold">{{ totalShopPrice.totalPrice }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <!--底部结算-->
          <view v-if="edit" class="justify-content-item tn-flex-row-center tn-margin-top tn-padding-right"
                @click="payNow">
            <tn-button shape="round" backgroundColor="tn-bg-fruit" width="100%">
              <text class="tn-color-black" hover-class="tn-hover" :hover-stay-time="150">
                立即结算
              </text>
            </tn-button>
          </view>
          <view v-else class="justify-content-item tn-flex-row-center tn-margin-top tn-padding-right"
                @click="deleteShop">
            <tn-button shape="round" backgroundColor="tn-bg-red" width="100%">
              <text class="tn-color-white" hover-class="tn-hover" :hover-stay-time="150">
                删除
              </text>
            </tn-button>
          </view>
        </view>
      </view>
    </view>
    <!-- 购物车无数据-->
    <view v-else class="empty-wrap" :style="{top: vuex_custom_bar_height + 20 +'px'}">
      <view class="empty-content">
        <tn-empty :imgWidth="width" text="您还没有添加商品哦~" :show="showEmpty" icon="/static/images/car_empty.png"></tn-empty>
        <view class="tn-flex tn-flex-row-center tn-padding-top-xl">
          <tn-button shape="round" backgroundColor="tn-bg-fruit" width="100%" shadow fontBold
                     @click="toChoseClass">
            <text class="tn-color-black">去挑选商品</text>
          </tn-button>
        </view>
      </view>
    </view>
    <!-- 删除弹框-->
    <tn-modal v-model="show" :content="content" :button="button" @click="showDeleteModal"></tn-modal>
  </view>
</template>

<script>
import templatePageMixin from '@/libs/mixin/template_page_mixin.js'
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  mixins: [templatePageMixin],
  name: 'Cart',
  data() {
    return {
      width:200,
      showEmpty:true,
      value: 1,
      // checkedAll: false,
      shoppingList: [],
      totalPrice: 99999,
      selectIds: [],
      edit: true,
      show: false,
      content: '确定删除所选商品吗?',
      button: [{
        text: '取消',
        backgroundColor: '#efefef',
        fontColor: '#373737',
        plain: true,
        shape: 'round'
      },
        {
          text: '确定',
          backgroundColor: '#f93833',
          fontColor: '#FFFFFF'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      selectList: state => state.car.selectList,
      shopListData: state => state.car.shopListData
    }),
    ...mapGetters(['checkedAll', 'totalShopPrice']),
  },
  onLoad() {
    console.log(this.shopListData,'shopListData')
    // console.log(this.selectList,'selectList')
    this.getCartList()
  },
  created() {
    this.getCartList()
  },
  mounted() {
  },
  methods: {
    ...mapActions(['checkedAllFn', 'delChecked','shoppingOrder','delSelectShopCar']),
    ...mapMutations(['selectItem']),
    editHandel() {
      this.edit = !this.edit
    },
    //获取购物车列表
    getCartList() {
      this.$API.getShoppingCart({customerId: uni.getStorageSync('userId')}).then(res => {
        if (res.code === 200) {
          this.shoppingList = res.result.map((item) => ({
            ...item,
            checked: false
          }))
          this.$store.dispatch('saveShopList',this.shoppingList);
          uni.setStorageSync('shoppingList', this.shoppingList)
        }
      })
    },
    //立即结算
    payNow() {
      this.shoppingOrder()
      setTimeout(()=>{
        this.$navTo.togo(`/minePages/confirmOrder?status=1`)
        // this.$navTo.togo('/minePages/addReceiptAddress?item='+encodeURIComponent(JSON.stringify(item)))
      },1000)
    },
    showDeleteModal(e) {
      console.log(e, 'index')
      if (e.index === 0) {
        this.show = false
      } else {
        this.delSelectShopCar()
        setTimeout(() => {
          this.getCartList()
        }, 500)
        this.show = false
      }
    },
    deleteShop() {
      this.show = true
    },
    //去选课
    toChoseClass() {
      this.$navTo.togo('/pages/index')
    },
    // 跳转
    tn(e) {

    },
  }
}
</script>

<style lang="scss" scoped>
.template-cart {
  //max-height: 100vh;
}

.car-shadow {
  border-radius: 20rpx;
  box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.07);
}
.empty-wrap {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
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

/* 底部安全边距 start*/
.tn-tabbar-height {
  min-height: 120rpx;
  height: calc(140rpx + env(safe-area-inset-bottom) / 2);
  height: calc(140rpx + constant(safe-area-inset-bottom));
}
/* 自定义导航栏内容 start */
.custom-nav {
  height: 100%;

  &__logo {
    margin: auto 5rpx;
    font-size: 50rpx;
    margin-right: 10rpx;
    margin-left: 30rpx;
    flex-basis: 5%;
  }
}

/* 自定义导航栏内容 end */

/* 底部 start*/
.footerfixed {
  position: fixed;
  width: 100%;
  bottom: calc(100rpx + env(safe-area-inset-bottom) / 2);
  z-index: 999;
  // background-color: rgba(255,255,255,1);
  // box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
}

.tabbar {
  align-items: center;
  min-height: 130rpx;
  padding: 0;
  height: calc(130rpx + env(safe-area-inset-bottom) / 2);
  padding-bottom: calc(30rpx + env(safe-area-inset-bottom) / 2);
  padding-left: 10rpx;
  padding-right: 10rpx;
}


.image-cart {
  width: 200rpx;
  height: 200rpx;
  font-size: 16rpx;
  font-weight: 300;
  //position: relative;
}

.image-pic {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  // border-radius: 15rpx 15rpx 0 0;
}

</style>

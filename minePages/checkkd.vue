<template>
  <view class="template-order" :key="key">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">我的收藏</text>
      </view>
      <view slot="right" class="tn-padding">
        <view class="tn-icon-install" style="font-size: 40rpx" @click="manageCollect"></view>
      </view>
    </tn-nav-bar>

    <view class="order--wrap" :style="{top: vuex_custom_bar_height + 20 +'px'}">
      <!-- 顶部标签 -->
      <view class="tn-bg-white">
        <tn-tabs class="order__tabs tn-text-xl" ref="tabs" activeColor="#fac10d" inactiveColor="#080808" :list="list"
                 :current="tabsIndex" :isScroll="false" @change="tabsChange"></tn-tabs>
      </view>
      <view style="margin-top: 80rpx">
        <scroll-view :style="{height: `${swiperHeight}px`}" scroll-y>
          <view v-if="tabsIndex===0">
            <view v-if="contentList.length>0">
              <view v-for="(item,index) in contentList" :key="index" class="order__item"
                    @click="tn('/discoveryPages/form')">
                <view class="tn-flex tn-flex-col-center tn-flex-row-center">
                  <view v-if="installShow">
                    <tn-checkbox-group @change="selectItem(item,index)">
                      <tn-checkbox v-model="item.checked" size="28" shape="circle" activeColor="#fac10d"></tn-checkbox>
                    </tn-checkbox-group>
                  </view>
                  <view class="tn-flex  tn-flex-nowrap tn-flex-col-top">
                    <view class="order__item__content__image" @click="toGoodsDetail(item.id)">
                      <image :src="item.goodsImg.split(',')[0]" mode="aspectFill"></image>
                    </view>
                    <view>
                      <view class="tn-text-ellipsis tn-text-sm" style="width: 400rpx;">
                        {{ item.goodsName }}
                      </view>
                      <view class="tn-padding-top tn-text-bold tn-color-red">
                        <text class="tn-text-sm tn-color-red tn-text-bold">￥</text>
                        {{ item.goodsPrice }}
                      </view>
                      <view class="tn-padding-top tn-text-sm tn-flex tn-flex-row-right tn-padding-right">
                        <tn-button size="sm" backgroundColor="#F3F3F3" color="red">取消收藏</tn-button>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view v-else class="empty-container">
              <tn-empty :imgWidth="width" text="暂无商品收藏" :show="show"
                        icon="/static/images/goods_empty.png"></tn-empty>
            </view>
          </view>
          <view v-if="tabsIndex===1">
            <view v-if="courseList.length>0">
              <view v-for="(item,index) in courseList" :key="index">
                <view class="tn-padding tn-flex tn-flex-col-center tn-flex-row-center">
                  <view v-if="installShow">
                    <tn-checkbox-group @change="selectItem(item,index)">
                      <tn-checkbox v-model="item.checked" size="28" shape="circle" activeColor="#fac10d"></tn-checkbox>
                    </tn-checkbox-group>
                  </view>
                  <view @click="toCourseDetail(item.courseId)">
                    <image :src="item.mediaCover" style="width: 200rpx;height: 200rpx;border-radius: 10rpx"></image>
                  </view>
                  <view class="tn-padding-left">
                    <view style="color: #1c234c;width: 400rpx" class="tn-text-ellipsis">{{ item.mediaName }}</view>
                    <view class="tn-padding-top"><tn-tag shape="circle" backgroundColor="tn-bg-blue" fontColor="tn-color-white">{{ item.mediaType==0?'视频课程':'答题课程' }}</tn-tag></view>
                    <view class="tn-padding-top tn-text-sm" style="color: #a4a7b7">{{item.createTime}}</view>
                  </view>
                </view>
              </view>
            </view>
            <view v-else class="empty-container">
              <tn-empty :imgWidth="width" text="暂无课程收藏" :show="show"
                        icon="/static/images/class_empty.png"></tn-empty>
            </view>
          </view>
          <view v-if="tabsIndex===2">
            <view v-if="communityList.length>0">
              <view v-for="(item,index) in communityList" :key="index">
                <view class="tn-flex tn-flex-col-center tn-padding-lg">
                  <view class="tn-flex-1">
                    <view>
                      <view class="tn-flex tn-flex-col-center tn-flex-row-between">
                        <view class="tn-flex">
                          <tn-avatar size="sm" src="/static/logo.png"></tn-avatar>
                          <view class="tn-text-sm tn-padding-left-sm tn-color-gray">
                            <view>千果家庭教育</view>
                            <view>{{ item.createTime }}</view>
                          </view>
                        </view>
                        <view v-if="installShow">
                          <tn-checkbox-group  @change="selectItem(item,index)">
                            <tn-checkbox v-model="item.checked" size="28" shape="circle"
                                         activeColor="#fac10d"></tn-checkbox>
                          </tn-checkbox-group>
                        </view>
                      </view>
                      <view class="tn-flex tn-flex-row-between tn-padding-top" @click="toDynamicDetail(item)">
                        <view
                            class="tn-padding-top-sm tn-color-gray tn-flex tn-flex-direction-column tn-flex-row-between">
                          <view class="tn-text-sm tn-text-ellipsis">{{ item.content }}</view>
                          <view class="tn-text-sm">9分享 · 7评论 · 150赞</view>
                        </view>
                        <view class="community-image">
                          <image :src="item.attach[0]"></image>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
                <view style="width:100%;height: 7rpx" class="tn-bg-gray--disabled"></view>
              </view>
            </view>
            <view v-else class="empty-container">
              <tn-empty :imgWidth="width" text="暂无课程收藏" :show="show"
                        icon="/static/images/class_empty.png"></tn-empty>
            </view>
          </view>
          <view class="tn-padding-bottom"></view>
        </scroll-view>
      </view>
    </view>
    <!--底部全选按钮-->
    <view v-if="installShow" class="footer-install tn-flex tn-flex-row-between tn-flex-col-center">
      <tn-checkbox v-model="checkedAll" shape="circle" size="28" activeColor="#fac10d" @change="allSelect">
        <text class="tn-color-gray">全选</text>
        <text class="tn-color-gray">(已加载{{ dataLength }}项)</text>
      </tn-checkbox>
      <view class="tn-color-fruit" @click="batchCancelCollect">取消收藏</view>
    </view>
  </view>
</template>

<script>
import templatePageMixin from '@/libs/mixin/template_page_mixin.js'
import type from "@/utils/type";

export default {
    name: 'TemplateOrder',
  computed: {
    type() {
      return type
    }
  },
    mixins: [templatePageMixin],
    data() {
      return {
        key: 0,
        width: 200,
        show: true,
        list: [
          {name: '商品'},
          {name: '课程'},
          {name: '动态'},
        ],
        tabsIndex: 0,
        swiperIndex: 0,
        swiperTop: 0,
        swiperHeight: 0,
        contentList: [],
        communityList: [],
        courseList:[],
        installShow: false,
        checkedAll: false,
        totalNum: 59,
        checked: false,
        collectData: [],
        selectList:[],
        dataLength:''
      }
    },
    onLoad() {
      this.getCollectList(1)
    },
    onReady() {
      this.$nextTick(() => {
        this.updateSwiperInfo()
      })
    },

    methods: {
      toGoodsDetail(id){
          this.$navTo.togo(`/preferredPages/product?id=${id}`)
      },
      toCourseDetail(courseId){
          this.$navTo.togo(`/preferredPages/coursedetail?courseId=${courseId}&courseType=0`)
      },
      toDynamicDetail(item){
        setTimeout(()=>{
          uni.$emit('circleDetail', item)
        },100)
        this.$navTo.togo('/circlePages/details')
      },
      manageCollect() {
        this.installShow = !this.installShow
      },
      selectItem(item, index) {
        item.checked = !item.checked;

        let list;
        if (this.tabsIndex === 0) {
          list = this.contentList;
        } else if (this.tabsIndex === 1) {
          list = this.courseList;
        } else if (this.tabsIndex === 2) {
          list = this.communityList;
        }

        if (list) {
          const selectedItem = list[index];
          if (selectedItem.checked) {
            if (!this.selectList.includes(selectedItem.delId)) {
              this.selectList.push(selectedItem.delId);
            }
          } else {
            this.selectList = this.selectList.filter(id => id !== selectedItem.delId);
          }
        }

        console.log('选中的商品:', this.selectList);
      },
      // 标签栏值发生改变
      tabsChange(index) {
        console.log(index, 'index')
        this.tabsIndex = index
        this.getCollectList(Number(this.tabsIndex) + 1)
      },
      async getCollectList(type) {
        try {
          const params = {
            pageNo: 1,
            pageSize: 10,
            type: type || 1,
            customerId: uni.getStorageSync('userId')
          }
          const res = await this.$API.getCollectList(params)
          if (res.code === 200) {
            this.collectData = res.result.records;
            this.dataLength = res.result.records.length
            console.log(this.collectData, 'collectData')
            const ids = this.collectData.map(item => item.itemId);
            const action = {
              1:this.getGoodsList,
              2:this.getCourseList,
              3:this.getDynamicList
            }
            const actionFunc = action[type]
            if(actionFunc){
              await actionFunc(ids)
            }
          }
        } catch (e) {
        }
      },
      //获取商品列表
      async getGoodsList(ids) {
        try {
          const res = await this.$API.getGoodsBuyId(ids)
          if (res.code === 200) {
            res.result.forEach(v => {
              const match = this.collectData.find(item => item.itemId === v.id);
              if (match) {
                v.delId = match.id; // 为匹配的对象添加 `itemId`
              }
            });
            this.contentList = res.result.map(item => {
              return {
                ...item,
                checked: false
              }
            })
            console.log(this.contentList, 'goods')
          }
        } catch (e) {
        }
      },
      // 获取课程列表
      async getCourseList(ids) {
        try {
          const res = await this.$API.getCourseBuyId(ids)
          if (res.code === 200) {
            res.result.forEach(v => {
              const match = this.collectData.find(item => item.itemId === v.id);
              if (match) {
                v.delId = match.id; // 为匹配的对象添加 `itemId`
              }
            });
            this.courseList = res.result.map(item => {
              return {
                ...item,
                checked: false
              }
            })
            console.log(this.courseList, 'course')
          }
        } catch (e) {

        }
      },
      // 获取动态列表
      async getDynamicList(ids) {
        try {
          const res = await this.$API.getCommunityBuyId(ids)
          if (res.code === 200) {
            res.result.forEach(v => {
              const match = this.collectData.find(item => item.itemId === v.id);
              if (match) {
                v.delId = match.id; // 为匹配的对象添加 `itemId`
              }
            });
            this.communityList = res.result.map(item => {
              return {
                ...item,
                checked: false,
                attach: item.attach.split(',')
              }
            })
            console.log(res, 'dynamic')
          }
        } catch (e) {

        }
      },
      //批量取消收藏
      async batchCancelCollect() {
        await this.batchDelete(this.tabsIndex)
      },
      //批量删除方法传入当前批量删除的ids
      async batchDelete(type) {
        if (this.selectList.length === 0) {
          this.$t.message.toast('请选择要删除的收藏');
          return;
        }
        try {
          const res = await this.$API.deleteCollectBatch({ids: this.selectList.toString()});
          if (res.code === 200) {
            // 根据类型更新对应的列表
            switch (type) {
              case 0: // 商品列表
                this.contentList = this.contentList.filter(item => !this.selectList.includes(item.delId));
                break;
              case 1: // 课程列表
                this.courseList = this.courseList.filter(item => !this.selectList.includes(item.delId));
                break;
              case 2: // 动态列表
                this.communityList = this.communityList.filter(item => !this.selectList.includes(item.delId));
                break;
              default:
                console.error('未知的类型:', type);
            }
            // 清空选择列表
            this.selectList = [];
          } else {
            this.$t.message.toast(res.message || '操作失败');
          }
        } catch (error) {
          console.error('批量删除失败:', error);
          this.$t.message.toast('操作异常，请稍后重试');
        }
      },
      //全选
      allSelect() {
        this.checked = !this.checked
        console.log(1)
        if (this.tabsIndex === 0) {
          this.checked === true ? this.allSelectFun(this.contentList) : this.allUnSelectFun(this.contentList)
        } else if (this.tabsIndex === 1) {
          this.checked === true ? this.allSelectFun(this.courseList) : this.allUnSelectFun(this.courseList)
        } else if (this.tabsIndex === 2) {
          this.checked === true ? this.allSelectFun(this.communityList) : this.allUnSelectFun(this.communityList)
        }
      },
      allSelectFun(data) {
        this.selectList = data.map(item => {
          item.checked = true
          return item.delId
        })
        console.log('全选', this.selectList)
      },
      allUnSelectFun(data) {
        this.selectList = data.map(item => item.checked = false)
        this.selectList = []
        console.log('全不选', this.selectList)
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
      // swiper-item位置发生改变
      swiperTransition(event) {
        this.$refs.tabs.setDx(event.detail.dx)
      },
      // swiper动画结束
      swiperAnimationFinish(event) {
        const current = event.detail.current
        this.$refs.tabs.setFinishCurrent(current)
        this.swiperIndex = current
        this.tabsIndex = current
      }
    }
  }
</script>

<style lang="scss" scoped>
.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 41px - 45px - 40px);
}
  .template-order {
    background-color: #FFFFFF;
  }

  .community-image {
    image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 15rpx;
    }
  }

  .footer-install {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 40rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.07);

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
      background-color: #FFFFFF;
      border-radius: 15rpx;
      //box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);

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
            width: 200rpx;
            height: 200rpx;
            border-radius: 10rpx;
          }
        }

        &__title {
          //padding-right: 40rpx;
          //display: -webkit-box;
          //overflow: hidden;
          //white-space: normal !important;
          //text-overflow: ellipsis;
          //word-wrap: break-word;
          //-webkit-line-clamp: 2;
          //-webkit-box-orient: vertical;
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

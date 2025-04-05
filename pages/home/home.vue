<template>
  <scroll-view scroll-y="true" @scroll="onScroll" style="height: 100vh;overflow-y: auto">
    <view class="template-index tn-safe-area-inset-bottom">
      <!-- 顶部自定义导航 -->
      <tn-nav-bar :z-index="zIndex" fixed :isBack="false" :bottomShadow="false">
        <view class="custom-nav tn-flex tn-flex-col-center" :class="{ 'scrolled': isScrolled }">
          <!-- 选择阶段学习 -->
          <view class="tn-flex tn-flex-col-center custom-nav__back " @click="filterCourseHandel">
            <view class="tn-text-lg tn-text-bold">{{ homeCategoryName }}</view>
            <view class="tn-flex tn-flex-col-center">
              <image src="/static/images/MingcuteDownSmallLine.png" style="width: 50rpx;height: 50rpx"></image>
            </view>
          </view>
          <!-- 搜索 -->
          <view class="custom-nav__search tn-flex tn-flex-col-center tn-flex-row-center"
                @click="tn('/homePages/search')">
            <view class="custom-nav__search__box tn-flex tn-flex-col-center tn-flex-row-left"
                  style="background-color: rgba(230,230,230,0.3);">
              <!--              <view class="custom-nav__search__icon tn-icon-search" :class="isScrolled ?'search-color':'tn-color-white'"></view>-->
              <!--              <view class="custom-nav__search__text tn-padding-left-xs"  :class="isScrolled ?'search-color':'tn-color-white'">人文创作 | 读书+辩论+创作</view>-->
              <view class="custom-nav__search__icon tn-icon-search search-color"></view>
              <view class="custom-nav__search__text tn-padding-left-xs search-color tn-text-ellipsis"
                    style="width:300rpx">请输入要搜索的课程或者老师
              </view>
            </view>
          </view>
          <view class="tn-flex tn-flex-col-center tn-padding-right">
            <image src="/static/images/MageMessageDots.png" style="width: 50rpx;height: 50rpx"
                   @click="memberMessage"></image>
          </view>
        </view>
      </tn-nav-bar>
      <view v-if="isScrolled" class="BarColors"></view>
      <view class="tn-padding" :style="{paddingTop: vuex_custom_bar_height +10+'px'}">
        <tn-swiper :list="adList" :radius="radius" effect3d></tn-swiper>
      </view>
      <view class="home-container">
        <view
            class="tn-flex tn-flex-row-between tn-margin-xs tn-flex-wrap">
          <view class="tn-radius child-content" style="width: 19%;padding: 10rpx"
                @click="getIconsCategoryList(item)"
                v-for="(item,index) in iconsCategorys" :key="index">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center" style="width: 100%">
              <view
                  class="icon10__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-color-white"
                  :class="colorText(item.plateName)">
                <image :src="item.icons" style="width: 50rpx;height: 50rpx"></image>
              </view>
              <view class="tn-color-black tn-text-center">
                <text class="tn-text-ellipsis tn-text-sm" style="color: #555555">{{ item.plateName }}</text>
              </view>
            </view>
          </view>
        </view>
        <!-- 首页顶部板块-->
        <!--      <view v-else class="tn-flex tn-flex-row-between tn-margin-xs tn-padding-top-sm tn-padding-top-xl tn-flex-wrap">-->
        <!--        <view class="tn-padding-sm tn-margin-top-sm tn-radius" @click="getIconsCategoryList(item)"-->
        <!--              v-for="(item,index) in iconsCategorys" :key="index">-->
        <!--          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center" style="width: 100%">-->
        <!--            <view-->
        <!--                class="icon12__item&#45;&#45;icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-purplered&#45;&#45;light tn-color-purplered">-->
        <!--              <view class="tn-icon-fire-fill"></view>-->
        <!--            </view>-->
        <!--            <view class="tn-color-black tn-text-center">-->
        <!--              <text class="tn-text-ellipsis">{{ item.plateName }}</text>-->
        <!--            </view>-->
        <!--          </view>-->
        <!--        </view>-->
        <!--      </view>-->
        <!-- notice-->
        <view class="tn-flex tn-flex-col-center tn-margin-left tn-margin-right tn-margin-top tn-radius"
              style="background:#f6f6f6;">
          <view class="tn-margin-left-xs">
            <image src="/static/images/notice.png" style="width: 231rpx;height: 90rpx"></image>
          </view>
          <view class="noticeBar">
            <swiper class="list" circular="true" vertical="true" autoplay="true" interval="3000" duration="1000">
              <swiper-item v-for="item in noticelist" :key="item.id">
                {{ item.title }}
              </swiper-item>
            </swiper>
          </view>
        </view>
        <!-- banner start-->
        <view class="tn-flex tn-flex-row-center" @click="tn('/circlePages/advertise')">
          <image src="/static/images/banner.png" style="width: 700rpx;height: 202rpx"></image>
        </view>
      </view>
      <!-- banner end-->
      <view>
        <view class="tn-flex tn-flex-row-between" @click="tn('/circlePages/business')">
          <view class="justify-content-item tn-margin-left tn-margin-bottom-sm tn-text-bold tn-text-xxl">
            名师风采
          </view>
          <view class="justify-content-item tn-margin-right tn-margin-bottom-sm tn-text-lg tn-color-gray">
            <text class="tn-padding-xs tn-text-md">查看更多</text>
            <text class="tn-icon-right"></text>
          </view>
        </view>
        <!--名师风采-->
        <swiper class="card-swiper2" :circular="true"
                :autoplay="false" duration="500" interval="5000" @change="resume">
          <swiper-item v-for="(item,index) in teacherList" :key="index" :class="cardCur2==index?'cur':''"
                       @click="toTeacherDetail(item.id)">
            <view class="swiper-item1 image-banner" style="padding: 60rpx 0  40rpx 2rpx;position:relative;">
              <view class="tn-bg-white tn-padding-xl" style="width: 90%;">
                <view>
                  <view style="word-wrap: break-word;width: 300rpx;" class="tn-text-ellipsis-2 tn-color-gray">
                    {{ item.intro }}
                  </view>
                  <view class="tn-margin-top">
                    <image src="/static/images/login_logo.png" style="width: 200rpx;height: 44rpx"></image>
                  </view>
                </view>
              </view>
              <view class="tn-flex" style="position:absolute;bottom: 0;right:0">
                <view
                    :style="'background-image:url('+ item.tutorAvatar +');width: 380rpx;height: 380rpx;background-size: 100% 100%;margin-right: -100rpx;'">
                </view>
                <view class="tn-flex tn-margin-right">
                  <view class="tn-text-bold tn-margin-top-xl" style="width: 40rpx;">{{ item.tutorName }}</view>
                  <view class="tn-text-center tn-text-sm tn-margin-top-xl tn-main-gradient-purple"
                        style="width: 40rpx;height: 280rpx;border-radius: 10rpx">国家二级心理咨询师
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
        <view class="">
<!--          <view class="tn-flex tn-flex-row-between" @click="tn('/activityPages/project')">-->
<!--            <view class="justify-content-item tn-margin-left tn-margin-bottom-sm tn-text-bold tn-text-xxl">-->
<!--              热门课程-->
<!--            </view>-->
<!--            <view class="justify-content-item tn-margin-right tn-margin-bottom-sm tn-text-lg tn-color-gray">-->
<!--              <text class="tn-padding-xs tn-text-md">查看更多</text>-->
<!--              <text class="tn-icon-right"></text>-->
<!--            </view>-->
<!--          </view>-->
          <view class="tn-flex tn-margin-left tn-margin-right" @click="tn('/circlePages/news')">
            <view class="tn-flex-2">
              <view class="image-pic tn-margin-right tn-shadow-blur"
                    :style="'background-image: url(' + require('@/static/images/pencil.jpg') + ')'">
                <view class="image-tuniao1">
                </view>
              </view>
            </view>
            <view class="tn-flex-1">
              <view class="image-pic tn-shadow-blur"
                    :style="'background-image: url(' + require('@/static/images/school.jpg') + ')'">
                <view class="image-tuniao2">
                </view>
              </view>
              <view class="image-pic tn-margin-top tn-shadow-blur"
                    :style="'background-image: url(' + require('@/static/class/c.png') + ')'">
                <view class="image-tuniao2">
                </view>
              </view>
            </view>
          </view>
          <view class="tn-flex tn-flex-row-between tn-margin-top">
            <view class="justify-content-item tn-margin-left tn-text-bold tn-text-xxl">
              课程类型
            </view>
          </view>
          <view
              class="tn-info__container tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-between tn-margin-left tn-margin-right">
            <block v-for="(item, index) in typeData" :key="index">
              <view
                  class="tn-info__item tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between tn-color-white tn-shadow-blur"
                  :style="'background-color:'+ item.color +';'">
                <!--                :style="'background-color:'+ item.color +';'" @click="tn('/homePages/profession')">-->
                <view class="tn-info__item__left tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
                  <!-- <view class="tn-info__item__left--icon tn-flex tn-flex-col-center tn-flex-row-center" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
                    <view :class="[`tn-icon-${item.icon}`]"></view>
                  </view> -->
                  <view class="tn-info__item__left__content">
                    <view class="tn-info__item__left__content--title tn-text-bold" style="font-size: 38rpx;">{{
                        item.title
                      }}
                    </view>
                    <view class="tn-info__item__left__content--data tn-padding-top-xs">
                      {{ item.value }}
                      <text class="tn-icon-right tn-padding-left-xs"></text>
                    </view>
                  </view>
                </view>
                <view class="tn-info__item__right">
                  <view class="tn-info__item__right--icon">
                    <view :class="[`tn-icon-${item.icon}`]"></view>
                  </view>
                </view>
                <view class="tn-info__item__bottom">
                  <view class='name tn-text-sm tn-color-gray' style="margin-left: -10rpx;">
                    <text class="tn-icon-code tn-padding-right-xs" style="opacity: 0;"></text>
                  </view>
                </view>
              </view>
            </block>
          </view>
          <!--免费体验课 精品专题课 系统提升课-->
          <view v-for="(item,index) in homeCategoryList" :key="index">
            <view class="tn-flex tn-flex-col-center tn-flex-row-between">
              <view
                  class="justify-content-item tn-margin-left tn-margin-top-sm tn-margin-bottom-sm tn-text-bold tn-text-xxl">
                {{ categoryType(item.key) }}
              </view>
              <view class="justify-content-item tn-margin-right  tn-margin-bottom-sm tn-text-lg tn-color-gray"
                    @click="allCategoryList(item.key)">
                <text class="tn-padding-xs tn-text-md">查看更多</text>
                <text class="tn-icon-right"></text>
              </view>
            </view>
            <view class="tn-flex tn-flex-wrap tn-margin-left-sm tn-margin-right-sm">
              <block v-for="(itemCh,indexCh) in item.list" :key="indexCh">
                <view class="" style="width: 50%;" @click="toGoodsDetail(itemCh.id)">
                  <view class="tn-blogger-content__wrap" style="background-color: rgba(255,255,255,0.6);">
                    <view class="image-picbook" :style="'background-image:url(' + itemCh.goodsImg.split(',')[0] + ')'">
                      <view class="image-book">
                      </view>
                    </view>
                    <view class="tn-padding-sm">
                      <view class="tn-blogger-content__label tn-text-justify tn-text-ellipsis tn-padding-bottom-sm">
                        <text class="tn-blogger-content__label__desc tn-text-bold tn-text-lg">{{
                            itemCh.goodsName
                          }}
                        </text>
                      </view>
                      <view class="tn-blogger-content__label tn-text-justify tn-text-ellipsis tn-padding-bottom-sm">
                        <text class="tn-blogger-content__label__desc tn-color-gray tn-text-sm">{{
                            itemCh.goodsDesc
                          }}
                        </text>
                      </view>
                      <view class="tn-blogger-content__label tn-text-justify">
                        <text class="tn-blogger-content__label__desc  tn-text-bold tn-color-red"
                              v-if="itemCh.goodsPrice===0">免费
                        </text>
                        <text class="tn-blogger-content__label__desc tn-color-red tn-text-bold" v-else>￥{{
                            itemCh.goodsPrice
                          }}
                        </text>
                      </view>
                    </view>
                  </view>
                </view>
              </block>
            </view>
          </view>
        </view>
        <view class='tn-tabbar-height'></view>
      </view>
      <tn-popup v-model="show" mode="bottom" closeBtn border-radius="15">
        <view class="tn-padding tn-padding-top-lg bg-container">
          <view class="tn-text-xxl tn-text-bold">选择学习阶段</view>
          <view class="tn-text-sm tn-color-gray tn-padding-top-sm">为您匹配更合适的内容</view>
          <view v-for="(item,index) in classCategory" :key="index">
            <view class="tn-padding-top-lg">
              <view class="tn-text-bold">{{ item.title }}</view>
              <view class="tn-flex tn-flex-wrap tn-margin-top-sm tn-flex-row-between round-wrap">
                <view class="round" :class="itemch.selected==true?'active-round':''"
                      @click="changeCurrentIndex(item,itemch)"
                      v-for="(itemch,indexch) in item.children" :key="indexch">{{ itemch.title }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </tn-popup>
    </view>

  </scroll-view>
</template>

<script>
import categoryType from '@/libs/mixin/mixins'
import colorText from '@/libs/mixin/mixins'
import {getDictionary} from "@/utils/getDictionary";

export default {
  mixins: [categoryType, colorText],
  name: 'Index',
  data() {
    return {
      radius:20,
      zIndex: 99,
      isScrolled: false, // 用于控制搜索框样式
      show: false,
      cardCur: 0,
      isAndroid: true,
      cardCur2: 0,
      teacherList: [],
      typeData: [
        {
          title: '免费课程',
          icon: 'image-text-fill',
          color: '#F33F5A',
          value: '免费送好课'
        },
        {
          title: 'VIP课程',
          icon: 'data-fill',
          color: '#FFC32E',
          value: 'vip享优惠'
        },
        {
          title: '父母课堂',
          icon: 'statistics-fill',
          color: '#954FF6',
          value: '和父母学习'
        },
        {
          title: '学习辅导',
          icon: 'bankcard-fill',
          color: '#5177EE',
          value: '人教双课免费'
        }
      ],
      categoryList: [],
      categoryList1: [],
      currentIndex: 0,
      currentIndexPrimary: '',
      iconsCategorys: [],
      homeData: [],
      title: '',
      homeCategoryId: '1860200568218791938',
      homeCategoryList: [],
      list: [
        {image: '/static/images/sw.jpg', title: 'xxx'},
        {image: '/static/images/sw1.jpg', title: 'xxx'},
        {image: '/static/images/sw2.jpg', title: 'xxx'},
        {image: '/static/images/sw.jpg', title: 'xxx'},
      ],
      noticelist: [
        {title: "千果家庭教育即将发布v1.0.0！", id: 1},
        {title: "更多上新好课等你来拿", id: 2},
        {title: "现在购买课程可享更多优惠", id: 3},
        {title: "专业的心里咨询老师", id: 4},
        {title: "解决您孩子的心理问题", id: 5},
      ],
      adList: [],
      classCategory: [],
      dictionaries: [],
      homeCategoryName: '青少年'
    }
  },
  created() {
    this.getHomeAd()
    this.filterCourseList()
    this.getIconsCategorys()
    this.getTeacherList()
    this.getDictList()
    this.getHomeDataByCategory('1860200568218791938')
    const systemInfo = uni.getSystemInfoSync()
    // console.log(systemInfo)
    if (systemInfo.system.toLocaleLowerCase().includes('ios')) {
      this.isAndroid = false
    } else {
      this.isAndroid = true
    }
  },
  onPageScroll(e) {
    console.log(e)
  },

  methods: {
    memberMessage() {
      this.$navTo.togo('/minePages/message')
    },
    refresh() {
      this.getHomeAd()
      this.filterCourseList()
      this.getIconsCategorys()
      this.getHomeDataByCategory('1860200568218791938')
    },
    onScroll(e) {
      const scrollTop = e.detail.scrollTop
      this.isScrolled = scrollTop > 260
    },
    // 顶部板块的全部分类
    getIconsCategoryList(item, homeCategoryId) {
      this.$navTo.togo(`/preferredPages/iconsdetail?plateId=${item.id}&homeCategoryId=${this.homeCategoryId}`)
    },
    changeCurrentIndex(item, items) {
      this.classCategory.forEach(i => {
        i.children.forEach(j => {
          if (j !== items) {
            j.selected = false;
          }
        })
      });
      if (item.key === items.parentId) {
        items.selected = true
      }
      this.homeCategoryId = items.key
      this.homeCategoryName = items.title
      // this.currentIndex = indexch
      this.show = false
      this.getHomeDataByCategory(items.key)
    },
    // 根据分类获取首页数据
    async getHomeDataByCategory(homeCategoryId) {
      try {
        const res = await this.$API.getHomeGoods({homeCategoryId: homeCategoryId})
        if (res.code === 200 && res?.result) {
          this.homeCategoryList = res.result
          //     .map(item=>{
          //   console.log(item)
          //   return{
          //     ...item,
          //     key:this.mapDictionary('value',item.key.toString())
          //   }
          // })
        }
      } catch (e) {
      }
    },
    filterCourseHandel() {
      this.show = true
    },
    //获取首页顶部分类数据
    async getIconsCategorys() {
      try {
        const res = await this.$API.getHomeIconsCategorys({izUse: 1})
        if (res.code === 200) {
          this.iconsCategorys = res.result.records
        }
      } catch (e) {

      }
    },
    //筛选首页课程数据
    async filterCourseList() {
      try {
        const res = await this.$API.getHomeCategorys()
        if (res.code === 200) {
          this.classCategory = res.result.map(item => {
            return {
              ...item,
              children: item.children.map((child, index) => {
                return {
                  ...child,
                  selected: child.title.includes('一年级') ? true : false,
                }
              })
            }
          });
        }
      } catch (e) {
      }
    },
    //获取首页轮播数据
    async getHomeAd() {
      try {
        const res = await this.$API.getHomeAdvert({position: 0})
        if (res.code === 200) {
          this.adList = res.result.map(item => {
            return {
              title: item.redirectLocation,
              image: item.adImages
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    toGoodsDetail(id) {
      this.$navTo.togo(`/preferredPages/product?id=${id}`)
    },
    //跳转分类全部数据
    allCategoryList(goodsCategory) {
      this.$navTo.togo(`/preferredPages/redeem?goodsCategory=${goodsCategory}&homeCategoryId=${this.homeCategoryId}`)
    },
    //获取导师列表数据
    async getTeacherList() {
      try {
        const res = await this.$API.getTeacherList()
        if (res.code === 200) {
          this.teacherList = res.result
        }
      } catch (e) {

      }
    },
    //跳转导师详情
    toTeacherDetail(id) {
      this.$navTo.togo(`/circlePages/king?id=${id}`)
    },
    //获取数据字典
    async getDictList() {
      this.dictionaries = await getDictionary('goods_category')
    },
    // 映射字典值
    mapDictionary(type, key) {
      const item = this.dictionaries.find((d) => d.value == key);
      return item ? item.label : key;
    },
    // cardSwiper
    cardSwiper(e) {
      this.cardCur = e.detail.current
    },
    // resume
    resume(e) {
      this.cardCur2 = e.detail.current
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
.noticeBar {
  width: 690rpx;
  height: 90rpx;
  line-height: 90rpx;
  color: #4c4c4c;
  font-size: 28rpx;
  border-radius: 50rpx;
  display: flex;

  .list {
    width: 100%;
    height: 100%;
  }
}

.BarColors {
  width: 100%;
  height: var(--status-bar-height); // --status-bar-height系统状态栏高度
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

/* 如果最后一行是4个元素 */
.child-content:last-child:nth-child(5n - 1) {
  margin-right: calc(19% + 5% / 4);
}

/* 如果最后一行是3个元素 */
.child-content:last-child:nth-child(5n - 2) {
  margin-right: calc(38% + 10% / 4);
}

/* 如果最后一行是2个元素 */
.child-content:last-child:nth-child(5n - 3) {
  margin-right: calc(57% + 15% / 4);
}

.custom-nav {
  transition: background-color 0.3s ease;
}

.custom-nav.scrolled {
  background-color: #ffffff; /* 背景色变化 */
  box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
}

.search-color {
  color: #838383;
}

.bg-container {
  background: url("/static/images/classbg.png") no-repeat right top;
  background-size: 100% 240rpx;
}

.round {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F4F4F4;
  flex-wrap: wrap;
  border-radius: 1000rpx;
  padding: 15rpx 30rpx;
  margin-bottom: 20rpx;
}

.round:last-child:nth-child(3n - 1) {
  margin-right: calc(30% + 10% / 2);
}

.active-round {
  background-color: #fac10d;
  color: black;
}

/* 图标容器10 start */
.icon10 {
  &__item {
    width: 30%;
    background-color: #FFFFFF;
    border-radius: 10rpx;
    padding: 30rpx;
    margin: 20rpx 10rpx;
    transform: scale(1);
    transition: transform 0.3s linear;
    will-change: transform;
    transform-origin: center center;

    &--icon {
      width: 84rpx;
      height: 65rpx;
      font-size: 45rpx;
      border-radius: 200rpx;
      margin-bottom: 18rpx;
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
        background-image: url("/static/images/icon_bg6.png");
      }
    }
  }
}

.tn-blogger-content {
  &__wrap {
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
    border-radius: 20rpx;
    margin: 15rpx;
  }

  &__info {
    &__btn {
      margin-right: -12rpx;
      opacity: 0.5;
    }
  }

  &__label {
    &__item {
      line-height: 45rpx;
      padding: 0 10rpx;
      margin: 5rpx 18rpx 0 0;

      &--prefix {
        color: #E83A30;
        padding-right: 10rpx;
      }
    }

    &__desc {
      line-height: 35rpx;
    }
  }

  &__main-image {
    border-radius: 16rpx 16rpx 0 0;

    &--1 {
      max-width: 690rpx;
      min-width: 690rpx;
      max-height: 400rpx;
      min-height: 400rpx;
    }

    &--2 {
      max-width: 260rpx;
      max-height: 260rpx;
    }

    &--3 {
      height: 212rpx;
      width: 100%;
    }
  }

  &__count-icon {
    font-size: 24rpx;
    padding-right: 5rpx;
  }
}

.image-book {
  padding: 150rpx 0rpx;
  font-size: 16rpx;
  font-weight: 300;
  position: relative;
}

.image-picbook {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border-radius: 15rpx 15rpx 0 0;
}

.template-index {
  //height: 100vh;
  //overflow-y: auto; /* 确保滚动生效 */
  max-height: 100vh;
  //overflow-y: auto;
}

.tn-tabbar-height {
  min-height: 100rpx;
  height: calc(120rpx + env(safe-area-inset-bottom) / 2);
}


/* 轮播视觉差 start */
.card-swiper {
  height: 400rpx !important;
}

.card-swiper swiper-item {
  width: 750rpx !important;
  left: 0rpx;
  box-sizing: border-box;
  // padding: 0rpx 30rpx 90rpx 30rpx;
  overflow: initial;
}

.card-swiper swiper-item .swiper-item {
  width: 100%;
  display: block;
  height: 100%;
  transform: scale(1);
  transition: all 0.2s ease-in 0s;
  will-change: transform;
  overflow: hidden;
}

.card-swiper swiper-item.cur .swiper-item {
  transform: none;
  transition: all 0.2s ease-in 0s;
  will-change: transform;
}

.card-swiper swiper-item .swiper-item-text {
  margin-top: -320rpx;
  text-align: center;
  width: 100%;
  display: block;
  height: 50%;
  border-radius: 10rpx;
  transform: translate(100rpx, 0rpx) scale(0.9, 0.9);
  transition: all 0.6s ease 0s;
  will-change: transform;
  overflow: hidden;
}

.card-swiper swiper-item.cur .swiper-item-text {
  margin-top: -320rpx;
  width: 100%;
  transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
  transition: all 0.6s ease 0s;
  will-change: transform;
}

.image-banner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-banner image {
  width: 100%;
  height: 100%;
}

/* 轮播指示点 start*/
.indication {
  z-index: 9999;
  width: 100%;
  height: 36rpx;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.spot {
  background-color: #FFFFFF;
  opacity: 0.6;
  width: 10rpx;
  height: 10rpx;
  border-radius: 20rpx;
  top: -60rpx;
  margin: 0 8rpx !important;
  position: relative;
}

.spot.active {
  opacity: 1;
  width: 30rpx;
  background-color: #FFFFFF;
}

.card-swiper2 {
  height: 420rpx !important;
  overflow: hidden;
}

.card-swiper2 swiper-item {
  width: 680rpx !important;
  left: 30rpx;
  box-sizing: border-box;
  overflow: initial;
  padding: 0 0rpx 40rpx 0;
}

.card-swiper2 swiper-item .swiper-item1 {
  width: 100%;
  display: block;
  //height: 100%;
  transform: scale(0.97);
  transition: all 0.2s ease-in 0s;
  will-change: transform;
  border-radius: 30rpx;
  border: 4rpx solid #FFFFFF;
  background: rgb(240, 133, 6);
  background: linear-gradient(90deg, rgba(240, 133, 6, 1) 0%, rgba(241, 169, 78, 1) 38%, rgba(243, 234, 208, 1) 100%);
  //background-color: #E7FAFE;
}

.card-swiper2 swiper-item.cur .swiper-item1 {
  transform: none;
  transition: all 0.2s ease-in 0s;
  will-change: transform;
}

.card-swiper2 swiper-item .swiper-item2 {
  margin-top: -180rpx;
  width: 100%;
  display: block;
  height: 50%;
  border-radius: 50%;
  transform: translate(510rpx, -160rpx) scale(0.9, 0.9);
  transition: all 0.3s ease 0s;
  will-change: transform;
}

.card-swiper2 swiper-item.cur .swiper-item2 {
  margin-top: -180rpx;
  width: 100%;
  transform: translate(510rpx, -150rpx) scale(0.9, 0.9);
  transition: all 0.3s ease 0s;
  will-change: transform;
}

.card-swiper2 swiper-item .swiper-item-text {
  margin-top: -270rpx;
  width: 100%;
  display: block;
  height: 100%;
  border-radius: 10rpx;
  transform: translate(30rpx, -20rpx) scale(0.8, 0.8);
  transition: all 0.6s ease 0s;
  will-change: transform;
  overflow: hidden;
}

.card-swiper2 swiper-item.cur .swiper-item-text {
  margin-top: -270rpx;
  width: 100%;
  transform: translate(20rpx, 0rpx) scale(0.9, 0.9);
  transition: all 0.6s ease 0s;
  will-change: transform;
}


/* 底部tabbar假阴影 start*/
.bg-tabbar-shadow {
  background-image: repeating-linear-gradient(to top, rgba(0, 0, 0, 0.1) 10rpx, #FFFFFF, #FFFFFF);
  position: fixed;
  bottom: 0;
  height: 450rpx;
  width: 100vw;
  z-index: -1;
}

/* 图标容器12 start */
.tn-three {
  position: absolute;
  top: 50%;
  right: 50%;
  bottom: 50%;
  left: 50%;
  transform: translate(-38rpx, -20rpx) rotateX(20deg) rotateY(10deg) rotateZ(-20deg);
  text-shadow: -1rpx 2rpx 0 #f0f0f0, -2rpx 4rpx 0 #f0f0f0, -10rpx 20rpx 30rpx rgba(0, 0, 0, 0.2);
}

.icon12 {
  &__item {
    width: 30%;
    background-color: #FFFFFF;
    border-radius: 10rpx;
    padding: 30rpx;
    margin: 20rpx 10rpx;
    transform: scale(1);
    transition: transform 0.3s linear;
    transform-origin: center center;

    &--icon {
      width: 100rpx;
      height: 100rpx;
      font-size: 60rpx;
      border-radius: 50%;
      margin-bottom: 18rpx;
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
        background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg6.png);


      }
    }
  }
}

/* 自定义导航栏内容 start */
.custom-nav {
  height: 100%;
  display: flex;

  &__back {
    margin: auto 5rpx;
    font-size: 40rpx;
    margin-right: 10rpx;
    margin-left: 30rpx;
    flex-basis: 5%;
  }

  &__search {
    flex-basis: 90%;
    width: 100%;
    height: 100%;

    &__box {
      width: 100%;
      height: 70%;
      padding: 10rpx 0;
      margin: 0 30rpx;
      border-radius: 60rpx 60rpx 0 60rpx;
      font-size: 24rpx;
    }

    &__icon {
      padding-right: 10rpx;
      margin-left: 20rpx;
      font-size: 30rpx;
    }

    &__text {
      // color: #AAAAAA;
    }
  }
}

.logo-image {
  width: 65rpx;
  height: 65rpx;
  position: relative;
}

.logo-pic {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  //border-radius: 50%;
}

/* 自定义导航栏内容 end */


.image-tuniao1 {
  padding: 165rpx 0rpx;
  font-size: 40rpx;
  font-weight: 300;
  position: relative;
}

.image-tuniao2 {
  padding: 75rpx 0rpx;
  font-size: 40rpx;
  font-weight: 300;
  position: relative;
}

.image-tuniao3 {
  padding: 90rpx 0rpx;
  font-size: 40rpx;
  font-weight: 300;
  position: relative;
}

.image-pic {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border-radius: 10rpx;
}

/* 胶囊banner*/
.image-capsule {
  padding: 90rpx 0;
  font-size: 40rpx;
  font-weight: 300;
  position: relative;
}

.image-piccapsule {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border-radius: 20rpx 20rpx 0 0;
}

/* 标题 start */
.nav_title {
  -webkit-background-clip: text;
  color: transparent;

  &--wrap {
    position: relative;
    display: flex;
    height: 120rpx;
    font-size: 46rpx;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-image: url(https://resource.tuniaokj.com/images/title_bg/title00.png);
    background-size: cover;
  }
}

.tn-info {

  &__container {
    margin-top: 10rpx;
  }

  &__item {
    width: 47.7%;
    margin: 15rpx 0rpx 30rpx 0rpx;
    padding: 40rpx 30rpx;
    border-radius: 10rpx;


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
      background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/2.png);
    }

    &__left {

      &--icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        font-size: 40rpx;
        margin-right: 20rpx;
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
          background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
        }
      }

      &__content {
        font-size: 25rpx;

        &--data {
          color: rgba(255, 255, 255, 0.5);
          margin-top: 5rpx;
          // font-weight: bold;
        }
      }
    }

    &__right {
      &--icon {
        position: absolute;
        right: 0rpx;
        top: 50rpx;
        font-size: 100rpx;
        width: 108rpx;
        height: 108rpx;
        text-align: center;
        line-height: 60rpx;
        opacity: 0.15;
      }
    }

    &__bottom {
      box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.12);
      border-radius: 0 0 10rpx 10rpx;
      position: absolute;
      width: 85%;
      line-height: 15rpx;
      left: 50%;
      bottom: -15rpx;
      transform: translateX(-50%);
      z-index: -1;
      text-align: center;
    }
  }
}




</style>

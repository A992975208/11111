<template>
  <view class="template-advertise">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back tn-navbg'
            @click="goBack">
        <text class='icon tn-icon-home-smile-fill'></text>
      </view>
    </tn-nav-bar>

    <!-- <view :style="{paddingTop: `${topInfo.height}px`}"></view> -->

    <view class="banner" v-if="courseSectionList.length>0">
      <video :src="firstVideoUrl" controls="controls" autoplay="true" bindloadedmetadata="onLoadedMetadata"
             class="tn-width-full" loop></video>
    </view>
    <view class="adver-wrap tn-bg-white" v-if="courseSectionList.length>0">
      <view class="tn-flex tn-flex-row-between tn-padding-top-lg">
        <view class="tn-flex-3 tn-padding tn-margin-left-sm">
          <view class="tn-flex">
            <view class="tn-flex tn-flex-row-center tn-flex-col-center">
              <view class="tn-padding-right tn-text-left">
                <view class="tn-padding-right tn-color-black tn-text-ellipsis  tn-text-bold tn-text-xxl"
                      style="width: 600rpx">
                  青少年心理健康课程解决青少年早恋脾气暴躁，休学辍学等
                  青少年心理健康课程解决青少年早恋脾气暴躁，休学辍学等
                  青少年心理健康课程解决青少年早恋脾气暴躁，休学辍学等
                </view>
                <view class="tn-text-bold tn-text-xl tn-padding-top">课程简介</view>
                <view class="tn-padding-right tn-padding-top-sm  tn-text-df tn-text-ellipsis-2" style="color: #a4a7b7">
                  七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题七天见效课帮助您解决您孩子的心理健康问题
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!--      :class="current===index?'tn-main-gradient-blue&#45;&#45;light ':''"-->
      <view class="detail-img">
        <view v-for="(item,index) in courseSectionList" class="tn-padding  tn-flex" :key="index">
          <view class="tn-text-xl-xxl number_index">
                {{ courseSectionList.length < 10 ? `0${index + 1}` : `${index}` }}
              </view>
          <view class="tn-padding class-wrap class_container tn-margin-left">
            <view class="tn-flex">
              <view>
                <view style="color:#323337" class="tn-flex-1 tn-text-lg tn-text-bold tn-text-ellipsis-2">{{ item.mediaName }}</view>

              </view>
              <view @click="playCourseVideo(item,index)">
                <image v-if="current===index" src="/static/images/class_stop.png"
                       style="width: 60rpx;height: 60rpx"></image>
                <image v-else src="/static/images/class_play.png" style="width: 60rpx;height: 60rpx"></image>
              </view>
            </view>
            <!--                <expand-collapse :content="item.remark"/>-->
            <tn-read-more show-height="100" ref="readMore" openText="展开" close-btn close-text="收起"
                          :fontSize='fontSize' fontColor="#fac20d">
              <view style="color: #96979b" class="tn-text-sm">{{ item.remark }}</view>
            </tn-read-more>
            <view class="add-container" @click="changeAddShow(item)">
              <view class="tn-flex tn-flex-col-center">
                <image v-if="item.starShow" src="/static/images/active_add.png"></image>
                <image v-else src="/static/images/add.png"></image>
                <view  class="tn-text-sm tn-margin-left-sm" style="color: #96979b">收藏课程</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-else>
      <view class="empty-container">
        <tn-empty :imgWidth="width" text="暂无课程小节" icon="/static/images/notask_empty.png"></tn-empty>
      </view>
    </view>
    <view class='tn-tabbar-height'></view>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
  name: 'templateAdvertise',
  mixins: [template_page_mixin],
  data() {
    return {
      width:200,
      cardCur: 0,
      addShow: false,
      show1: false,
      show2: false,
      maskCloseable: true,
      topInfo: {
        height: 0,
      },
      current: 0,
      topInfoTranslateY: 0,
      prevScrollTop: 0,
      firstVideoUrl: '',
      courseSectionList: [],
      options: [
        {
          icon: 'star',
          style: {
            backgroundColor: '#FFA726',
            width: '80rpx',
            height: '80rpx',
            margin: '0 12rpx',
            borderRadius: '100rpx'
          }
        },
      ],
      duration: 0,
      fontSize: 24
    }
  },
  onLoad(options) {
    this.courseType = options.courseType
    this.courseId = options.courseId
    this.getCourseSections()
    this.getVideoInfo()
  },
  onReady() {
    this.getTopInfoRect()
  },
  onPageScroll(e) {
    this.handlePageScroll(e.scrollTop)
  },
  methods: {
    getVideoInfo(url) {
      uni.getVideoInfo({
        src: url,
        success: (res) => {
          this.duration = res.duration
          console.log(res, 'time')
        }
      })
    },
    menuEvent(item,e) {
      console.log(e,item)
      if (e.index === 0) {
        this.addCollect(item.id)
      }
    },
    async changeAddShow(item) {
      console.log(item)
      item.starShow = !item.starShow;
      item.starShow ? await this.addCollect(item.id) : await this.cancelCollect(item.id);
    },
    async addCollect(itemId) {
      try {
        const params = {
          customerId: uni.getStorageSync('userId'),
          itemId: itemId,
          itemType: 2
        }
        const res = await this.$API.addCollect(params)
        if(res.code===200){
        this.$t.message.toast('课程收藏到我的收藏')
        }
      } catch (e) {

      }
    },
    async cancelCollect(itemId) {
      try {
        const params = {
          customerId: uni.getStorageSync('userId'),
          itemId: itemId,
          type: 2
        }
        const res = await this.$API.cancelCollect(params)
        if(res.code===200){
        this.$t.message.toast('取消收藏')
        }
      } catch (e) {

      }
    },
    async getCourseSections() {
      try {
        let params = {
          courseId: this.courseId,
          courseType: this.courseType
        }
        const res = await this.$API.getCourseSectionList(params)
        if (res.code === 200 && res?.result?.length > 0) {
          this.firstVideoUrl = res.result[0].mediaUrl
          this.courseSectionList = res.result.map(item=>{
            return{
              ...item,
              starShow:false
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    playCourseVideo(e, index) {
      this.current = index
      this.firstVideoUrl = e.mediaUrl
      this.getVideoInfo(e.mediaUrl)
      this.firstPoster = e.mediaCover
    },
    // cardSwiper
    cardSwiper(e) {
      this.cardCur = e.detail.current
    },
    // 获取顶部销售信息容器相关信息
    getTopInfoRect() {
      this._tGetRect('#top-info').then((res) => {
        if (!res) {
          setTimeout(() => {
            this.getTopInfoRect()
          }, 50)
          return
        }
        this.topInfo.height = res.height
      })
    },
    // 处理页面滚动事件
    handlePageScroll(scrollTop) {
      if (this.prevScrollTop > scrollTop) {
        // 内容下滑，即手指从下往上滚
        this.topInfoTranslateY = 0
      } else {
        // 内容上滑，即手指从上往下滚
        if (scrollTop > this.topInfo.height) {
          this.topInfoTranslateY = this.topInfo.height
        }
      }
      this.prevScrollTop = scrollTop
    },
  }
}
</script>

<style lang="scss" scoped>
.class_container {
  position: relative;

  .add-container {
    position: absolute;
    bottom: 0rpx;
    left: 30rpx;

    image {
      width: 30rpx;
      height: 30rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.play_image {
  image {
    width: 100rpx;
    height: 100rpx;
  }
}
.empty-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
.number_index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50rpx;
  height: 50rpx;
  background-color: #fcf5ee;
  border-radius: 15rpx;
  color: #fac312;
  font-size: 28rpx;
  padding: 30rpx;
  margin-top: 30rpx;
}

.class-wrap {
  border-radius: 20rpx;
  box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
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

/* 渐变*/
.tn-navbg {
  margin: 0;
  color: #fff;
  background: linear-gradient(-120deg, #F15BB5, #9A5CE5, #01BEFF, #00F5D4);
  /* background: linear-gradient(-120deg,  #9A5CE5, #01BEFF, #00F5D4, #43e97b); */
  /* background: linear-gradient(-120deg,#c471f5, #ec008c, #ff4e50,#f9d423); */
  /* background: linear-gradient(-120deg, #0976ea, #c471f5, #f956b6, #ea7e0a); */
  background-size: 500% 500%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 内容 */
.adver-wrap {
  position: relative;
  z-index: 1;
  // padding: 20rpx 30rpx;
  margin-top: 500rpx;
  border-radius: 80rpx 80rpx 0 0;
}

.user-pic {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border-radius: 50%;
  overflow: hidden;
  background-color: #FFFFFF;
}

/* 富文本图示意 start */
.detail-img {
  //z-index: -1;
  //padding-bottom: 40rpx;

  image {
    width: 100%;
    margin: 20rpx 0;
    // height: 3373rpx;
    // z-index: -1;
  }
}


.banner {
  position: fixed;
  top: 0;
  width: 100%;
  transition: all 0.25s ease-out;
  will-change: transform;
  z-index: -1;
  background-color: #FFFFFF;
}

/* 轮播视觉差 start */
.card-swiper {
  height: 800rpx !important;
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
  width: 100%;
  display: block;
  height: 50%;
  border-radius: 10rpx;
  transform: translate(100rpx, -60rpx) scale(0.9, 0.9);
  transition: all 0.6s ease 0s;
  will-change: transform;
  overflow: hidden;
}

.card-swiper swiper-item.cur .swiper-item-text {
  margin-top: -380rpx;
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
  top: -150rpx;
  margin: 0 8rpx !important;
  position: relative;
}

.spot.active {
  opacity: 1;
  width: 30rpx;
  background-color: #FFFFFF;
}

/* 底部悬浮按钮 start*/
.tn-tabbar-height {
  min-height: 120rpx;
  height: calc(140rpx + env(safe-area-inset-bottom) / 2);
}

.tn-footerfixed {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  bottom: 0;
  width: 100%;
  transition: all 0.25s ease-out;
  will-change: transform;
  z-index: 100;
}


</style>

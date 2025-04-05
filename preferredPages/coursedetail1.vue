<!--商品详情-->
<template>
  <view class="template-product tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    <!--视频 goodsType=0-->
    <view>
      <video :src="firstVideoUrl" controls="controls" autoplay="true"
             class="tn-width-full" loop></video>
    </view>
    <view class="tn-padding-lg">
      <view
          class="study-shadow tn-padding-lg tn-margin-bottom-lg tn-flex tn-flex-row-between tn-flex-col-center"
          :class="current===index?'tn-main-gradient-blue--light ':''"
          v-for="(item,index) in courseSectionList" :key="index" @click="playCourseVideo(item,index)">
        <view style="color: #080808">{{item.mediaName}}</view>
        <view style="color: #080808">{{item.createTime}}</view>
        <view>
          <text style="color: #080808" class="tn-text-xl" :class="current===index?'tn-icon-stop':'tn-icon-play'"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
  name: 'TemplateProduct',
  mixins: [template_page_mixin],
  data() {
    return {
      cardCur: 0,
      swiperList: [],
      current: 0,
      courseType: '',
      courseId: '',
      courseSectionList: [],
      firstVideoUrl: '',
      firstPoster: '',
    }
  },
  onLoad(options) {
    this.courseType = options.courseType
    this.courseId = options.courseId
    this.getCourseSections()
  },
  methods: {
    async getCourseSections() {
      try {
        let params = {
          courseId: this.courseId,
          courseType: this.courseType
        }
        const res = await this.$API.getCourseSectionList(params)
        if (res.code === 200 && res?.result?.length > 0) {
          this.firstVideoUrl = res.result[0].mediaUrl
          this.courseSectionList = res.result
        }
      } catch (e) {
        console.log(e)
      }
    },
    playCourseVideo(e, index) {
      this.current = index
      this.firstVideoUrl = e.mediaUrl
      this.firstPoster = e.mediaCover
    },
    tn(e) {
      uni.navigateTo({
        url: e,
      });
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

.study-shadow {
  border-radius: 20rpx;
  box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.07);
}

.active {
  background-color: red;
}

.deactive {
  background-color: #0FD850;
}

/* 间隔线 end*/
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
    background-image: url(https://resource.tuniaokj.com/images/title_bg/title44.png);
    background-size: cover;
  }
}

/* 标签内容 start*/
.tn-tag-content {
  &__item {
    display: inline-block;
    line-height: 45rpx;
    padding: 10rpx 30rpx;
    margin: 20rpx 20rpx 5rpx 0rpx;

    &--prefix {
      padding-right: 10rpx;
    }
  }
}

/* 标签内容 end*/

/* 内容图 start */
.content-backgroup {
  z-index: -1;

  .backgroud-image {
    border-radius: 15rpx;
    width: 100%;
  }
}

/* 内容图 end */

/* 商家商品 start*/
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

/* 毛玻璃*/
.dd-glass {
  width: 100%;
  backdrop-filter: blur(20rpx);
  -webkit-backdrop-filter: blur(20rpx);
}
</style>

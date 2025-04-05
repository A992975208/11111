<template>
<view>
  <view class="template-cart tn-safe-area-inset-bottom tn-skeleton">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">我的课程</text>
      </view>
    </tn-nav-bar>

    <view v-if="userId">
      <view class="tn-padding-lg tn-padding-bottom-xl tn-bg-white tn-radius"
            :style="{paddingTop: vuex_custom_bar_height +20+ 'px'}" style="z-index: 999">
        <view class="tn-flex tn-flex-row-between">
          <view class="tn-flex-1 tn-padding-lg tn-margin-right-lg image-bg"
                style="border-radius: 20rpx;background-color: #E4E4F5"
                :style="'background-image: url(' + require('@/static/awatar/kcb.png') + ')'">
            <view class="tn-flex tn-flex-row-right tn-flex-col-bottom" @click="classTable">
              <text class="tn-text-bold tn-margin-left-xs tn-skeleton-rect" style="color: #646BCD">课程表</text>
            </view>
          </view>
          <view class="tn-flex-1 tn-padding-lg image-bg" style="border-radius: 20rpx;background-color: #FDF3E5;"
                :style="'background-image: url(' + require('@/static/awatar/wwc.png') + ')'">
            <view class="tn-flex tn-flex-row-right" @click="noCopmleted">
              <text class="tn-text-bold tn-margin-left-xs tn-skeleton-rect" style="color: #FF8D1A">未完成任务</text>
            </view>
          </view>
        </view>
      </view>
      <view class="tn-padding-top-xs">
        <tn-tabs :list="list" :isScroll="false" :current="current" name="tabName" @change="change"></tn-tabs>
        <view>
          <view v-if="current === 0">
            <view v-if="courseList.length>0">
              <view class="tn-margin study-shadow" v-for="(item, index) in courseList" :key="index">
                <view class="tn-padding tn-flex">
                  <!--                <view class="tn-tag-content tn-shadow-blur tn-cool-bg-color-15 tn-margin-right tn-text-sm tn-text-bold">-->
                  <!--                  <text class="tn-padding-right-sm">#</text>-->
                  <!--                  {{ item.courseType === 0 ? '视频课程' : '答题课程' }}-->
                  <!--                </view>-->
                  <view>
                    <image :src="item.courseImg"></image>
                  </view>
                  <view class=" tn-margin-left-lg">
                    <view class="tn-text-bold tn-text-md">{{ item.courseName }}</view>
                    <view class="tn-padding-top-sm">
                      <text class="tn-text-bold" style="color: #fac10d">名校讲师</text>
                      <text style="color:#888ca1">· 在线解答各种心理问题</text>
                    </view>
                    <view class="tn-flex tn-flex-col-center tn-flex-row-between tn-padding-top">
                      <view class="tn-flex tn-flex-col-center">
                        <tn-avatar size="sm" src="/static/awatar/xiong-3d.jpg"></tn-avatar>
                        <view class="tn-text-sm" style="color: #adb0bf">王老师</view>
                      </view>
                      <view class="tn-flex tn-flex-col-center">
                        <!--                      <view v-if="item.starShow"-->
                        <!--                            class="tn-icon-star-fill tn-text-xl tn-padding-right-sm tn-color-yellow"-->
                        <!--                            @click="startChange(item)"></view>-->
                        <!--                      <view v-else class="tn-icon-star tn-text-xl tn-padding-right-sm" style="color:#888ca1"-->
                        <!--                            @click="startChange(item)"></view>-->
                        <tn-button size="sm" shape="round" background-color="#fac10d" font-color="#080808"
                                   @click="toCourseDetail(item)">开始学习
                        </tn-button>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view v-else class="empty-container">
              <tn-empty :imgWidth="width" text="暂无媒体课程" icon="/static/images/class_empty.png"></tn-empty>
            </view>
          </view>
          <view v-else>
            <view class="empty-container">

              <tn-empty :imgWidth="width" text="暂无答题课程" icon="/static/images/class_empty.png"></tn-empty>
            </view>
            <!--          <view class="tn-margin study-shadow" v-for="(item, index) in courseList" :key="index"-->
            <!--                @click="toCourseDetail(item)">-->
            <!--            <view class="tn-padding tn-flex tn-flex-col-center tn-flex-row-between">-->
            <!--              <view class="tn-tag-content tn-shadow-blur tn-cool-bg-color-15 tn-margin-right tn-text-sm tn-text-bold">-->
            <!--                <text class="tn-padding-right-sm">#</text>-->
            <!--                {{ item.courseType === 0 ? '视频课程' : '答题课程' }}-->
            <!--              </view>-->
            <!--              <view class="tn-text-bold tn-text-lg">-->
            <!--                {{ item.courseName }}-->
            <!--              </view>-->
            <!--              <view>-->
            <!--                <image :src="item.courseImg" style="width: 100rpx;height: 100rpx"></image>-->
            <!--              </view>-->
            <!--            </view>-->
            <!--          </view>-->
          </view>
        </view>
      </view>
    </view>

    <view v-else class="empty-wrap tn-safe-area-inset-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="empty-content">
        <image src="/static/images/no-login.jpg" style="width: 253rpx;height: 196rpx;"></image>
        <view class="tn-color-gray tn-text-sm tn-text-center">登录后查看我的课程</view>
        <view class="tn-flex tn-flex-row-center tn-padding-top-xl">
          <tn-button shape="round" backgroundColor="tn-bg-fruit" width="100%" shadow fontBold
                     @click="toLogin">
            <text class="tn-color-black">登录/注册</text>
          </tn-button>
        </view>
      </view>
    </view>
  </view>
<!--  <tn-skeleton :show="showSkeleton"></tn-skeleton>-->
</view>
</template>

<script>

export default {
  data() {
    return {
      showSkeleton:true,
      userId: uni.getStorageSync('userId'),
      list: [
        {
          tabName: '媒体课程'
        },
        {
          tabName: '答题课程'
        },
      ],
      current: 0,
      width: 200,
      courseList: [],
      dataList: [],
      starShow: false
    }
  },
  onLoad() {
    setTimeout(() => {
      this.showSkeleton = false
    }, 3000)
  },
  created() {
    // this.getCourseList()
  },
  methods: {
    async getCourseList() {
      try {
        const customerId = uni.getStorageSync('userId')
        const res = await this.$API.getCourseList({ customerId})
        if (res.code === 200 && res?.result?.videoCourses?.length > 0) {
          const collectStatus = uni.getStorageSync('collectStatus') || {};
          this.courseList = res.result.videoCourses.map(item => {
            return {
              ...item,
              starShow:collectStatus[item.id] || false // 根据本地存储状态初始化
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    change(index) {
      this.current = index;
    },
    //课程表
    classTable() {
      this.$navTo.togo('/preferredPages/myclasstable')
    },
    noCopmleted() {
      this.$navTo.togo('/preferredPages/nocompleted')
    },
    toCourseDetail(data) {
      this.$navTo.togo(`/preferredPages/coursedetail?courseId=${data.id}&courseType=${data.courseType}`)
    },
    toLogin() {
      uni.reLaunch({
        url: '/minePages/login',
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.empty-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 104rpx);
}
.image-bg {
  background-position: left;
  background-repeat: no-repeat;
  background-size:150rpx;
}
.empty-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
.course-padding{
  padding-top: 200rpx;
}
.study-radius {
  border-radius: 15rpx;
}

.study-shadow {
  border-radius: 20rpx;
  background: #F4F5F7;

  image {
    width: 160rpx;
    height: 100%;
    border-radius: 10rpx;
  }

  //box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.07);
}

.tn-tag-content {
  border-radius: 8rpx 25rpx 25rpx 8rpx;
  display: inline-block;
  line-height: 35rpx;
  padding: 8rpx 25rpx;
  color: rgba(255, 255, 255, 0.8);
}
</style>

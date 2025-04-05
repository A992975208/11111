<template>
  <view class="start-index">
    <view v-if="tabberPageLoadFlag[0]" :style="{display: currentIndex === 0 ? '' : 'none'}">
      <scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
        <home ref="homeRef"></home>
      </scroll-view>
    </view>
    <view v-if="tabberPageLoadFlag[1]" :style="{display: currentIndex === 1 ? '' : 'none'}">
      <scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
        <circle-page ref="circleRef"></circle-page>
      </scroll-view>
    </view>
    <view v-if="tabberPageLoadFlag[2]" :style="{display: currentIndex === 2 ? '' : 'none'}">
      <scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
        <activity ref="activity"></activity>
      </scroll-view>
    </view>
    <view v-if="tabberPageLoadFlag[3]" :style="{display: currentIndex === 3 ? '' : 'none'}">
      <scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
        <preferred ref="preferredRef"></preferred>
      </scroll-view>
    </view>
    <view v-if="tabberPageLoadFlag[4]" :style="{display: currentIndex === 4 ? '' : 'none'}">
      <scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
        <mine ref="mine"></mine>
      </scroll-view>
    </view>

    <tn-tabbar
      v-model="currentIndex"
      :list="tabbarList"
      activeColor="#1a1a1a"
      inactiveColor="#1a1a1a"
      activeIconColor="#fac10d"
      :animation="true"
      :safeAreaInsetBottom="true"
      @change="switchTabbar"
    ></tn-tabbar>
  </view>
</template>

<script>
import Home from './home/home.vue'
import CirclePage from './circle/circle.vue'
import Activity from './activity/activity.vue'
import Preferred from './preferred/preferred.vue'
import Mine from './mine/mine.vue'

export default {
    components: {
      Home,
      CirclePage,
      Activity,
      Preferred,
      Mine
    },
    data() {
      return {
        // 底部tabbar菜单数据
        tabbarList: [
          {
            title: '首页',
            activeIcon: '/static/tabbar/active_home.png',
            inactiveIcon: '/static/tabbar/home.png'
          },
          {
            title: '社区',
            activeIcon: '/static/tabbar/active_community.png',
            inactiveIcon: '/static/tabbar/community.png'
          },
          {
            title: '发布',
            activeIcon: 'add',
            inactiveIcon: 'add',
            activeIconColor: '#FFFFFF',
            inactiveIconColor: '#FFFFFF',
            iconSize: 50,
            out: true
          },
          {
            title: '学习',
            activeIcon: '/static/tabbar/active_class.png',
            inactiveIcon: '/static/tabbar/class.png',
          },
          {
            title: '我的',
            activeIcon: '/static/tabbar/active_mine.png',
            inactiveIcon: '/static/tabbar/mine.png'
          }
        ],
        // tabbar当前被选中的序号
        currentIndex: 0,
        // 自定义底栏对应页面的加载情况
        tabberPageLoadFlag: []
      }
    },
    onLoad(options) {
      const index = Number(options.index || 4)
      // 根据底部tabbar菜单列表设置对应页面的加载情况
      this.tabberPageLoadFlag = this.tabbarList.map((item, tabbar_index) => {
        return index === tabbar_index
      })
      this.switchTabbar(index)
    },
    methods: {
      // 切换导航
      switchTabbar(index) {
        //刷新页面
        const actions = {
          0: () => this.$refs.homeRef?.refresh(),
          1: () => this.$refs.circleRef?.refresh(),
          3: () => this.$refs.preferredRef?.getCourseList(),
        };
        if (actions[index]) {
          setTimeout(actions[index], 100);
        } else {
          console.log(`此页面不需要刷新: ${index}`);
        }
        this._switchTabbarPage(index)
        // if (index !== 2) {
        //   this.$refs?.circleRef?.stopAllVideo()
        // }
      },

      // 导航页面滚动到底部
      tabbarPageScrollLower(e) {
        if (this.currentIndex === 3) {
          this.$refs.preferredRef.getRandomData && this.$refs.preferredRef.getRandomData()
        }
      },
      // 切换导航页面
      _switchTabbarPage(index) {
        const selectPageFlag = this.tabberPageLoadFlag[index]
        if (selectPageFlag === undefined) {
          return
        }
        if (selectPageFlag === false) {
          this.tabberPageLoadFlag[index] = true
        }
        this.currentIndex = index
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

<template>
  <view class="template-news tn-safe-area-inset-bottom">

    <view class="tn-navbg" :style="{height: vuex_custom_bar_height + 'px'}">
      <!-- 顶部自定义导航 -->
      <tn-nav-bar fixed alpha customBack>
        <view slot="back" class='tn-custom-nav-bar__back'
          @click="goBack">
          <text class='icon tn-icon-left'></text>
          <text class='icon tn-icon-home-capsule-fill'></text>
        </view>
      </tn-nav-bar>
    </view>

    <view class="tn-margin-top-xs" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="nav_title--wrap">
        <view class="nav_title tn-cool-bg-color-6">
          <!-- <text class="tn-icon-fire tn-padding-right-sm"></text> -->
           我的社区上线啦！！！
          <!-- <text class="tn-icon-fire tn-padding-left-sm"></text> -->
        </view>
      </view>


      <view class="news-img tn-padding">
        <image src='/static/images/onepiece-1.jpg' mode='widthFix' class=''></image>
        <image src='/static/images/content_1.jpeg' mode='widthFix' class=''></image>
      </view>


    </view>

    <view class="tn-margin-top tn-padding-top-sm tn-margin-bottom">
      <view class="see">

        <view class="justify-content-item tn-flex tn-flex-col-center">
          <view style="margin-right: 10rpx;margin-left: 30rpx;">
            <tn-avatar-group :lists="groupList" size="sm"></tn-avatar-group>
          </view>
        </view>
        <view class="tn-margin-right">
          <text class='tn-color-grey tn-text-df tn-margin-right-sm'>263 查看 </text>
          <text class='tn-color-grey tn-text-df'> 34 点赞</text>
        </view>

      </view>
    </view>

    <!-- 边距间隔 -->
    <view class="tn-strip-bottom"></view>

    <view class="tn-flex tn-flex-row-between">
      <view class="justify-content-item tn-margin tn-text-bold tn-text-xl">
      Ta们都在看
      </view>
      <view class="justify-content-item tn-margin tn-text-lg tn-color-grey" @click="tn('/homePages/hot')">
        <text class="tn-padding-xs">全部</text>
        <text class="tn-icon-topics"></text>
      </view>
    </view>


    <!-- 不建议写时间，因为写了时间，你就要经常更新文章了鸭-->
    <view class="">
      <block v-for="(item, index) in content" :key="index">
        <view class="article-shadow tn-margin">
          <view class="tn-flex">
            <view class="tn-margin-sm tn-padding-top-xs" style="width: 100%;">
              <view class="tn-text-lg tn-text-bold clamp-text-1 tn-text-justify">
                <text class="">{{ item.title }}</text>
              </view>
              <view class="tn-padding-top-xs" style="min-height: 90rpx;">
                <text class="tn-text-df tn-color-gray clamp-text-2 tn-text-justify">
                  {{ item.desc }}
                </text>
              </view>
              <view class="tn-flex tn-flex-row-between tn-flex-col-between">
                <view v-for="(label_item,label_index) in item.label" :key="label_index" style="transform: translate(0rpx,6rpx);"
                  class="justify-content-item tn-tag-content__item tn-margin-right-xs tn-round tn-text-sm tn-text-bold" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
                  <text class="tn-tag-content__item--prefix">#</text> {{ label_item }}
                </view>
                <view class="justify-content-item tn-color-gray tn-text-center tn-color-gray--disabled" style="padding-top: 15rpx;">
                  <text class="tn-icon-footprint tn-padding-right-xs tn-text-lg"></text>
                  <text class="tn-padding-right tn-text-df">{{ item.collectionCount }}</text>
                  <text class="tn-icon-like-lack tn-padding-right-xs tn-text-lg"></text>
                  <text class="tn-text-df">{{ item.likeCount }}</text>
                </view>
              </view>
            </view>
            <view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.userAvatar + ')'">
              <view class="image-article">
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>


    <!-- 悬浮按钮-->
    <view class="tn-flex tn-flex-row-between tn-footerfixed">
      <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
        <tn-button backgroundColor="#00FFC6" padding="40rpx 0" width="90%" shadow fontBold>
          <text class="tn-icon-like-lack tn-padding-right-xs tn-color-black"></text>
          <text class="tn-color-black">点 赞</text>
        </tn-button>
      </view>
      <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
        <tn-button backgroundColor="#FFF00D" padding="40rpx 0" width="90%" shadow fontBold open-type="share">
          <text class="tn-icon-share-triangle tn-padding-right-xs tn-color-black"></text>
          <text class="tn-color-black">分 享</text>
        </tn-button>
      </view>
    </view>

    <view class='tn-tabbar-height'></view>

  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateNews',
    mixins: [template_page_mixin],
    data(){
      return {
        groupList: [
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
        ],
        content: [
          {
            userAvatar: 'static/images/fm.png',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'red',
            label: ['心理学'],
            title: '心理健康的重要性',
            desc: '心理健康是整体健康的重要组成部分。保持良好的心理状态不仅有助于提高生活质量，还能增强应对压力和挑战的能力。',
            mainImage: 'static/images/fm.png',
            viewUser: {
              latestUserAvatar: [{
                src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
              },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 567
            },
            collectionCount: 543,
            commentCount: 543,
            likeCount: 206
          },
          {
            userAvatar: 'static/images/fm.png',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'cyan',
            label: ['情绪管理'],
            title: '如何管理自己的情绪',
            desc: '情绪是我们生活中不可避免的一部分。学习识别、理解和调节自己的情绪，可以帮助我们更好地应对生活中的各种情况。',
            mainImage: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg',
            viewUser: {
              latestUserAvatar: [{
                src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
              },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 987
            },
            collectionCount: 567,
            commentCount: 69,
            likeCount: 65
          },
          {
            userAvatar: 'static/images/fm.png',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'blue',
            label: ['压力管理'],
            title: '为什么会有压力？',
            desc: '深呼吸：放慢呼吸，集中注意力，帮助缓解压力。运动：规律的身体活动可以释放内啡肽，改善情绪。',
            mainImage: 'https://resource.tuniaokj.com/images/shop/computer2.jpg',
            viewUser: {
              latestUserAvatar: [{
                src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
              },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 321
            },
            collectionCount: 654,
            commentCount: 232,
            likeCount: 543
          },
          {
            userAvatar: 'static/images/fm.png',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'green',
            label: ['自我关怀'],
            title: '自我关怀并不是自私',
            desc: '自我关怀并不是自私，而是为自己提供必要的关注和照顾。定期为自己安排一些放松的时间，培养兴趣爱好。',
            mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg',
            viewUser: {
              latestUserAvatar: [{
                src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
              },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 230
            },
            collectionCount: 987,
            commentCount: 236,
            likeCount: 342
          },
          {
            userAvatar: 'static/images/fm.png',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'orange',
            label: ['寻求帮助'],
            title: '如果感到心理上的困扰',
            desc: '如果感到心理上的困扰，勇于寻求专业帮助是非常重要的。心理咨询师和医生可以提供支持和指导。',
            mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg',
            viewUser: {
              latestUserAvatar: [{
                src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
              },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 106
            },
            collectionCount: 765,
            commentCount: 32,
            likeCount: 91
          },
          {
            userAvatar: 'static/images/fm.png',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'purplered',
            label: ['积极思考'],
            title: '尝试把注意力放在积极的事物上',
            desc: '尝试把注意力放在积极的事物上，培养乐观的心态，有助于提升整体心理健康。\n',
            mainImage: 'https://resource.tuniaokj.com/images/shop/watch1.jpg',
            viewUser: {
              latestUserAvatar: [{
                src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
              },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 232
            },
            collectionCount: 776,
            commentCount: 48,
            likeCount: 86
          },
        ],

      }
    },
    methods: {
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

  /* 顶部渐变*/
  .tn-navbg {
      background: linear-gradient(-120deg, #F15BB5, #9A5CE5, #01BEFF, #00F5D4);
      /* background: linear-gradient(-120deg,  #9A5CE5, #01BEFF, #00F5D4, #43e97b); */
      /* background: linear-gradient(-120deg,#c471f5, #ec008c, #ff4e50,#f9d423); */
      /* background: linear-gradient(-120deg, #0976ea, #c471f5, #f956b6, #ea7e0a); */
      background-size: 500% 500%;
      animation: gradientBG 15s ease infinite;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 100;
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

  /* 标题 start */
  .nav_title {
    -webkit-background-clip: text;
    color: transparent;

    &--wrap {
      position: relative;
      display: flex;
      height: 120rpx;
      font-size: 42rpx;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background-image: url(https://resource.tuniaokj.com/images/title_bg/title00.png);
      background-size: cover;
    }
  }
  /* 标题 end */

  /* 富文本图示意 start */
  .news-img {
    z-index: -1;
    padding-bottom: 40rpx;

    image {
      width: 100%;
      margin: 20rpx 0;
      // height: 3373rpx;
      // z-index: -1;
    }
  }

  /* 资讯主图 start*/
  .image-article {
    border-radius: 8rpx;
    border: 1rpx solid #F8F7F8;
    width: 200rpx;
    height: 200rpx;
    position: relative;
  }

  .image-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border-radius: 10rpx;
  }

  .article-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }

  /* 文字截取*/
  .clamp-text-1 {
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .clamp-text-2 {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  /* 标签内容 start*/
  .tn-tag-content {
    &__item {
      display: inline-block;
      line-height: 35rpx;
      padding: 7rpx 25rpx 5rpx 25rpx;

      &--prefix {
        padding-right: 10rpx;
      }
    }
  }

  /* 标签内容 end*/

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

  /* 查看*/
  .see {
    display: flex;
    justify-content: space-between;
    padding-top: 10rpx;
    border-radius: 6rpx;
    color: #666;
    line-height: 1.6;
  }
  /* 间隔线 start*/
  .tn-strip-bottom {
   width: 100%;
   border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
  }
   /* 间隔线 end*/
</style>

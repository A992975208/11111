<template>
  <view class="template-details tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
      <view>
        <view class="tn-text-bold tn-text-xl">动态</view>
      </view>
    </tn-nav-bar>

    <view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <!-- 图文信息 -->
      <block>
        <view class="blogger__item">
          <view class="blogger__author tn-flex tn-flex-row-between tn-flex-col-center">
            <view class="justify__author__info" @click="tn('/circlePages/blogger_other')">
              <view class="tn-flex tn-flex-row-center">
                <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                  <view class="">
                    <tn-avatar
                      class=""
                      shape="circle"
                      :src="userInfo.avatar"
                      size="lg">
                    </tn-avatar>
                  </view>
                  <view class="tn-padding-right tn-text-ellipsis">
                    <view class="tn-padding-right tn-padding-left-sm tn-text-bold tn-text-lg">{{
                        userInfo.nickName
                      }}
                    </view>
                    <view class="tn-flex tn-flex-col-center tn-padding-right tn-padding-left-sm tn-padding-top-xs ">
                      <view class="tn-color-gray">
                        {{ formatRelativeTime(userInfo.createTime) }}
                      </view>
                      <view class="tn-icon-phone tn-color-gray tn-margin-left-sm">{{ phoneModal }}</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="blogger__author__btn justify-content-item tn-flex-col-center tn-flex-row-center">
              <!-- 既然都点到详情里面了，加个关注按钮呗 -->
              <!--              <text class="tn-bg-brown&#45;&#45;light tn-round tn-text-df tn-text-bold tn-color-brown" style="padding: 10rpx 24rpx;">+ 关注</text>-->
              <text class="tn-icon-more-vertical tn-color-gray tn-text-bold tn-text-xxl" @click="moreMenu"></text>
            </view>
          </view>
          <view class="blogger__desc tn-margin-top-sm tn-margin-bottom-sm tn-text-justify tn-flex-col-center tn-flex-row-left">
            <!--            <view v-for="(label_item,label_index) in item.label" :key="label_index" class="blogger__desc__label tn-float-left tn-margin-right tn-bg-gray&#45;&#45;light tn-round tn-text-sm tn-text-bold">-->
            <!--              <text class="blogger__desc__label&#45;&#45;prefix">#</text>-->
            <!--              <text class="tn-text-df">{{ label_item }}</text>-->
            <!--            </view>-->
            <!-- 不用限制长度了，因为发布的时候限制长度了-->
            <text v-if="!detailInfo.label || detailInfo.label.length < 4"
                  class="blogger__desc__content tn-flex-1 tn-text-justify tn-text-df">{{ detailInfo.content }}
            </text>
          </view>
          <block v-if="detailInfo.attach">
            <view v-if="[1,2,4].indexOf(detailInfo.attach.length) != -1" class="tn-padding-top-xs tn-flex tn-flex-wrap">
              <view v-for="(image_item,image_index) in detailInfo.attach" :key="image_index">
                <view
                    v-if="image_item.endsWith('.png') || image_item.endsWith('.jpg') || image_item.endsWith('.jpeg') || image_item.endsWith('.gif')">
                  <image class="blogger__main-image" :class="{ 'blogger__main-image--1 tn-margin-bottom-sm': detailInfo.attach.length === 1,
                         'blogger__main-image--2 tn-margin-right-sm tn-margin-bottom-sm': detailInfo.attach.length === 2 || detailInfo.attach.length === 3||detailInfo.attach.length === 4 }"
                         :src="image_item" mode="aspectFill"></image>
                </view>
                <view v-else>
                  <view class="blogger__main-image video-container"
                        :class="{ 'blogger__main-image--1 tn-margin-bottom-sm': detailInfo.attach.length === 1,
                         'blogger__main-image--2 tn-margin-right-sm tn-margin-bottom-sm': detailInfo.attach.length === 2 || detailInfo.attach.length === 3||detailInfo.attach.length === 4 }">
                    <DomVideoPlayer
                        object-fit="cover"
                        ref="domVideoPlayer"
                        :src="image_item"
                        mode="aspectFill"
                        loop
                        controls/>
                  </view>
                </view>
              </view>
            </view>
          </block>
          <view class="tn-text-sm tn-color-gray">发布于{{ipCity}}</view>
        </view>
      </block>
    </view>
    <!-- 评论 -->
    <view class="tn-padding" style="padding-bottom: 100rpx">
      <CommentItem v-for="(comment, index) in commentList" :key="comment.id" :comment="comment" @replyTo="replyTo"/>
    </view>
    <!-- 评论输入框 -->
    <view class="tabbar footerfixed tn-bg-white">
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
        <view class="tn-flex tn-flex-col-center tn-round custom-style" @click="showCommentPopup">
          <view>
            <image src="/static/images/pubCom.png" style="width: 40rpx; height: 40rpx"></image>
          </view>
          <view class="tn-margin-left-sm" style="color: #727272">说说你的看法</view>
          </view>
<!--        <view class="tn-flex tn-flex-row-between" style="color: #727272">-->
<!--          <view class="tn-flex tn-flex-col-center tn-margin-right-sm">-->
<!--            <view class="blogger__count-icon tn-icon-message"></view>-->
<!--            <view>999</view>-->
<!--          </view>-->
<!--          <view class="tn-flex tn-flex-col-bottom tn-margin-right-sm">-->
<!--            <view class="blogger__count-icon tn-icon-praise"></view>-->
<!--            <view class="">236</view>-->
<!--          </view>-->
<!--          &lt;!&ndash;          <view class="tn-flex tn-flex-col-bottom tn-margin-right-sm">&ndash;&gt;-->
<!--          &lt;!&ndash;            <view class="blogger__count-icon tn-icon-star"></view>&ndash;&gt;-->
<!--          &lt;!&ndash;            <view class="">236</view>&ndash;&gt;-->
<!--          &lt;!&ndash;          </view>&ndash;&gt;-->
<!--          <view class="tn-flex tn-flex-col-center">-->
<!--            <view class="blogger__count-icon tn-icon-share-circle"></view>-->
<!--            <view>365</view>-->
<!--          </view>-->
<!--        </view>-->
      </view>
    </view>
    <tn-popup v-model="show" mode="bottom" border-radius="15">
      <view class="tn-padding  tn-padding-top-xl">
       <view class="tn-padding-bottom-lg">
         <tn-grid align="center" :col="col">
             <tn-grid-item>
               <view class="tn-flex tn-flex-direction-column tn-flex-col-center tn-margin-right-lg">
                 <view class="tn-bg-gray--disabled tn-flex tn-flex-row-center tn-flex-col-center tn-padding-sm tn-round"
                       @click="collection">
                   <image v-if="collectState" src="/static/images/ysc.png" style="width: 41rpx;height: 41rpx"></image>
                   <image v-else src="/static/images/sc.png" style="width: 41rpx;height: 41rpx"></image>
                 </view>
                 <view class="tn-padding-top-sm tn-color-gray">收藏</view>
               </view>
             </tn-grid-item>
             <tn-grid-item>
               <view class="tn-flex tn-flex-direction-column tn-flex-col-center tn-margin-right-lg">
                 <view class="tn-bg-gray--disabled tn-flex tn-flex-row-center tn-flex-col-center tn-padding-sm tn-round"
                       @click="editOrDelete('edit')">
                   <image src="/static/images/edit.png" style="width: 41rpx;height: 41rpx"></image>
                 </view>
                 <view class="tn-padding-top-sm tn-color-gray">编辑</view>
               </view>
             </tn-grid-item>
           <tn-grid-item>
             <view class="tn-flex tn-flex-direction-column tn-flex-col-center tn-margin-right-lg">
               <view class="tn-bg-gray--disabled tn-flex tn-flex-row-center tn-flex-col-center tn-padding-sm tn-round"
                     @click="editOrDelete('del')">
                 <image src="/static/images/del.png" style="width: 41rpx;height: 41rpx"></image>
               </view>
               <view class="tn-padding-top-sm tn-color-gray">删除</view>
             </view>
             </tn-grid-item>
           <tn-grid-item>
             <view class="tn-flex tn-flex-direction-column tn-flex-col-center tn-margin-right-lg">

             </view>
           </tn-grid-item>
         </tn-grid>
       </view>
       <view>
         <tn-grid align="center" :col="col1">
           <block v-for="(item,index) in iconList1" :key="index">
             <tn-grid-item>
               <view class="tn-flex tn-flex-direction-column tn-flex-col-center tn-margin-right-lg">
                 <view class="tn-flex tn-flex-row-center tn-flex-col-center tn-round">
                   <image :src="item.icon" style="width:80rpx;height: 80rpx"></image>
                 </view>
                 <view class="tn-padding-top-sm tn-color-gray">{{ item.name }}</view>
               </view>
             </tn-grid-item>
           </block>
         </tn-grid>
       </view>
      </view>
    </tn-popup>
    <!--删除动态-->
    <tn-popup v-model="delShow" mode="bottom" border-radius="15">
      <view class="tn-padding">
        <view class="tn-text-center" style="color: #888888;padding-bottom: 40rpx;border-bottom: 2px solid #f9f9f9;">
          帖子删除后无法找回，是否确认删除？
        </view>
        <view class="tn-text-center" style="color: #080808;padding: 40rpx;border-bottom: 2px solid #f9f9f9;">
          设为私密贴
        </view>
        <view class="tn-text-center" style="color: #E83A30;padding: 40rpx;border-bottom: 2px solid #f9f9f9;"
              @click="confimDel">确认删除
        </view>
      </view>
      <view class="footer  tn-flex tn-flex-row-center" style="padding-bottom: 40rpx;color: #080808"
            @click="delShow=false">
        取消
      </view>
    </tn-popup>
    <!--评论-->
    <tn-popup v-model="showCommentInput" mode="bottom" border-radius="15" class="fixed-input"
              :style="{bottom: inputBottom+'px'}">
      <view class="tn-padding">
        <view class="tn-flex tn-flex-row-between tn-padding-bottom">
          <view>回复</view>
          <view class="tn-color-gray" @click="addComment">发布</view>
        </view>
        <input @focus="focusTextarea" @blur="blurTextarea" placeholder="请在此输入" :adjust-position="false"
               v-model="comment"></input>
      </view>
    </tn-popup>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
import {mapState} from "vuex";
import CommentItem from "@/components/commentItem/commentItem";
import formatRelativeTime from "@/libs/mixin/mixins";
export default {
    name: 'TemplateDetails',
    mixins: [template_page_mixin,formatRelativeTime],
    components: {CommentItem},
    data(){
      return {
        inputBottom: 0,
        col: 4,
        col1: 4,
        show: false,
        delShow: false,
        detailInfo: {
          attach: ''
        },
        iconList: [
          {
            name: '收藏',
            icon: '/static/images/sc.png',
            activeIcon: '/static/images/ysc.png'
          },
          {
            name: '编辑',
            icon: '/static/images/edit.png',
            activeIcon: '/static/images/edit.png',
          },
          {
            name: '删除',
            icon: '/static/images/del.png',
            activeIcon: '/static/images/del.png',
          },
        ],
        iconList1: [
          {
            name: 'QQ',
            icon: '/static/images/qq.png',

          },
          {
            name: 'QQ空间',
            icon: '/static/images/qqkj.png',
          },
          {
            name: '微信好友',
            icon: '/static/images/wechat.png',
          },
          {
            name: '朋友圈',
            icon: '/static/images/pyq.png',
          },
          // {
          //   name: '复制链接',
          //   icon: '/static/images/copy.png',
          // },
        ],
        id: '',
        comment: '',
        commentList: [],
        isFocused: false, // 是否聚焦
        pid: '',
        placeholder: '不说点什么吗？',
        pageNo: 1,
        subCommentList: [],
        expandShow: false,
        isPlaying: false, // 视频播放状态
        collectState: false, // 收藏状态
        params:{
          customerId: uni.getStorageSync('userId'),
          itemId: '',
        },
        detailId: '',
        showCommentInput: false,
        phoneModal: uni.getStorageSync('systemInfo').brand,
        ipCity:''
      }
    },
  computed: {
    ...mapState({
      userInfo: (state) => state.car.userInfo
    }),
  },
  onLoad(options) {
    this.detailId = options.id
    this.getCommunityDetail(this.detailId)
    this.getCommentList(this.detailId)
  },
  onReachBottom() {
    console.log('触底')
    this.pageNo++
    this.getCommentList(this.detailId)
    // if (this.noMoreData) {
    //   return
    // }
    // this.lastPage = this.currentPage
    // this.currentPage++
    // this.getProductList(false)
  },
  created() {
      uni.$on('refreshCommunityDetail',()=>{
        this.getCommunityDetail(this.detailId)
      })
    uni.getLocation({
      type: 'gcj02', // 高德地图使用 GCJ-02 坐标系
      geocode: true,
      success: (locationRes) => {
        console.log(locationRes, 'locationRes');
        const {province,city} = locationRes.address;
        this.ipCity = `${province}${city}`
      },
      fail: (err) => {
      }
    });
  },
  destroyed() {
      uni.$off('refreshCommunityDetail')
  },
  methods: {
    focusTextarea(e) {
      this.inputBottom = e.detail.height;
    },
    //解决输入框拉起键盘把页面顶上去
    blurTextarea(e) {
      this.inputBottom = 0;
    },
    showCommentPopup() {
      this.showCommentInput = true
    },
    async getCommunityDetail(id) {
      try {
        const res = await this.$API.getCommunityBuyIdDetail({id})
        if (res.code === 200) {
          this.params.itemId = res.result.id
          this.detailInfo = res.result
          this.detailInfo.attach = res.result.attach.split(',')
        }
      } catch (e) {

      }
    },
    replyTo(item) {
      this.pid = item.id
      this.placeholder = '回复@' + item.customerNickName + ':'
      //输入框聚焦拉起键盘
      this.isFocused = true;
    },
    // 获取评论列表
    async getCommentList(id) {
      try {
        let params = {
          postId: id,
          pageNo: this.pageNo,
          pageSize: 10
        }
        const res = await this.$API.getRootComments(params)
        if (res.code === 200) {
          if (this.pageNo === 1) {
            this.commentList = res.result.records
          } else {
            this.commentList = this.commentList.concat(res.result.records)
          }
        }
      } catch (e) {

      }
    },
    //获取子级评论
    async getSubCommentList(id) {
      try {
        const res = await this.$API.getSubCommentList({parentId: id})
        if (res.code === 200) {
          console.log(res, '子级评论列表')
          this.subCommentList = res.result
        }
      } catch (e) {
        console.log(e)
      }
    },
    //添加评论
    async addComment() {
      try {
        let params = {
          customerId: uni.getStorageSync('userId'),
          postId: this.detailId,
          content: this.comment,
          pid: this.isFocused === true ? this.pid : ''
        }
        const res = await this.$API.addComment(params)
        if (res.code === 200) {
          this.comment = ''
          await this.getCommentList(this.detailId)
          this.pid = ''
          this.placeholder = '不说点什么吗？'
        }
      } catch (e) {

      }
    },
    // 收藏
    async collection() {
      this.collectState = !this.collectState
      if (this.collectState) {
        await this.addCollect()
      } else {
        await this.cancelCollect()
      }
    },
    async addCollect() {
      try {
        this.params.itemType = 3
        const res = await this.$API.addCollect(this.params)
        if (res.code === 200) {
          this.$t.message.toast('收藏成功')
          this.collectState = true
        }
      } catch (e) {
      }
    },
    async cancelCollect() {
      try {
        this.params.type = 3
        const res = await this.$API.cancelCollect(this.params)
        if (res.code === 200) {
          this.$t.message.toast('取消收藏')
          this.collectState = false
        }
      } catch (e) {
      }
    },
    editOrDelete(item) {
      console.log(item)
      if (item == 'edit') {
        this.$navTo.togo(`/circlePages/edit?id=${this.detailInfo.id}`)
      } else if (item == 'del') {
        this.show = false
        this.delShow = true
      }
    },
    async confimDel() {
      try {
        const res = await this.$API.deleteCommunity({id:this.detailInfo.id})
        if (res.code === 200) {
          // 通知列表页刷新
          uni.$emit('refreshDynamicList');
          uni.navigateBack()
        }
      } catch (e) {

      }
    },
    moreMenu() {
      this.show = true
    },
    cancelHandel() {
      this.show = false
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
.custom-style {
  width:100%;
  background: #f9f9f9;
  color: #000;
  font-size: 28rpx;
  padding: 10rpx 20rpx;
}

.content {
  align-items: center;
  min-height: 130rpx;
  padding: 0;
  height: calc(130rpx + env(safe-area-inset-bottom) / 2);
  padding-bottom: calc(30rpx + env(safe-area-inset-bottom) / 2);
  padding-left: 10rpx;
  padding-right: 10rpx;
}

.video-container {
  position: relative;
  width: 100%;
  height: 200px; /* 根据需要调整高度 */
  background: #000;
}

.custom-video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保视频填充容器 */
  background: transparent; /* 去掉背景色 */
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.play-btn::after {
  content: "▶"; /* 播放图标 */
}
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

    /* 文章内容 start*/
      .blogger {
        &__item {
          padding: 30rpx;
        }

        &__author {
          &__btn {
            margin-right: -12rpx;
            padding: 0 20rpx;
          }
        }

        &__desc {
          line-height: 55rpx;

          &__label {
            padding: 0 20rpx;
            margin: 0rpx 18rpx 0 0;

            &--prefix {
              color: #00FFC8;
              padding-right: 10rpx;
            }
          }
          &__content {

          }
        }

        &__content {
          margin-top: 18rpx;
          padding-right: 18rpx;

          &__data {
            line-height: 46rpx;
            text-align: justify;
            overflow: hidden;
            transition: all 0.25s ease-in-out;

          }

          &__status {
            margin-top: 10rpx;
            font-size: 26rpx;
            color: #82B2FF;
          }
        }

        &__main-image {
          border-radius: 16rpx;

          &--1 {
            width: 600rpx;
            height: 300rpx;
          }

          &--2 {
            width: 300rpx;
            height: 300rpx;
          }

          &--3 {
            width: 200rpx;
            height: 212rpx;
          }
        }

        &__count-icon {
          font-size: 40rpx;
          padding-right: 5rpx;
        }

        &__ad {
          width: 100%;
          height: 500rpx;
          transform: translate3d(0px, 0px, 0px) !important;

          ::v-deep .uni-swiper-slide-frame {
            transform: translate3d(0px, 0px, 0px) !important;
          }
          .uni-swiper-slide-frame {
            transform: translate3d(0px, 0px, 0px) !important;
          }

          &__item {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-origin: left center;
            transform: translate3d(100%, 0px, 0px) scale(1) !important;
            transition: transform 0.25s ease-in-out;
            z-index: 1;

            &--0 {
              transform: translate3d(0%, 0px, 0px) scale(1) !important;
              z-index: 4;
            }
            &--1 {
              transform: translate3d(13%, 0px, 0px) scale(0.9) !important;
              z-index: 3;
            }
            &--2 {
              transform: translate3d(26%, 0px, 0px) scale(0.8) !important;
              z-index: 2;
            }
          }

          &__content {
            border-radius: 40rpx;
            width: 640rpx;
            height: 500rpx;
            overflow: hidden;
          }

          &__image {
            width: 100%;
            height: 100%;
          }
        }
      }
      /* 文章内容 end*/

       /* 间隔线 start*/
      .tn-strip-bottom {
       width: 100%;
       border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
      }
       /* 间隔线 end*/

    /* 头像 start */
    .logo-image {
      width: 60rpx;
      height: 60rpx;
      position: relative;
    }

    .logo-pic {
      background-size: cover;
      background-repeat: no-repeat;
      // background-attachment:fixed;
      background-position: top;
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
      border-radius: 50%;
      overflow: hidden;
      // background-color: #FFFFFF;
    }


  /* 底部 start*/
  .footerfixed{
   position: fixed;
   width: 100%;
   bottom: 0;
   z-index: 999;
   background-color: rgba(255,255,255,0.5);
   box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
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

  /* 头像*/
  .avatar-all {
    width: 60rpx;
    height: 60rpx;
    border: 4rpx solid rgba(255,255,255,0.05);
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
  }

  /* 内容*/
  .topic {
    position: relative;
    height: 100%;
    z-index: 1;
    margin-bottom: 120rpx;


    /* 表单信息 start */
    &__info {
      margin: 0 50rpx;
      margin-top: 105rpx;
      padding: 30rpx 51rpx;
      border-radius: 20rpx;
      background-color: rgba(255,255,255,1);
      border: 2rpx solid rgba(255, 255, 255, 0.1);
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);

      &__item {

        &__input {
          width: 350rpx;
          height: 60rpx;
          border: 1rpx solid #b4b4b4;
          border-radius: 39rpx;

          &__left-icon {
            width: 10%;
            font-size: 44rpx;
            margin-left: 20rpx;
            margin-right: 5rpx;
            color: #b4b4b4;
          }

          &__content {
            width: 80%;
            padding-left: 10rpx;

            &--verify-code {
              width: 56%;
            }

            input {
              font-size: 30rpx;
              color: #78909C;
              // letter-spacing: 0.1em;
            }
          }

          &__right-icon {
            width: 10%;
            font-size: 34rpx;
            margin-right: 20rpx;
            color: #78909C;
          }

          &__right-verify-code {
            width: 34%;
            margin-right: 20rpx;
          }
        }

        &__button {
          width: 100%;
          height: 60rpx;
          text-align: center;
          font-size: 31rpx;
          font-weight: bold;
          line-height: 77rpx;
          // text-indent: 1em;
          border-radius: 100rpx;
          color: #FFFFFF;
          background-color: rgba(255,255,255,0.2);
          // border: 2rpx solid #FFFFFF;
        }

        &__sure {
          height: 60rpx;
          width: 140rpx;
        }

      }
    }
    /* 表单信息 end */

    /* 内容 end */

  }

  /deep/.input-placeholder {
    font-size: 30rpx;
    color: #b4b4b4;
  }

</style>

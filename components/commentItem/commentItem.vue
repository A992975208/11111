<template>
  <view class="comment-item tn-padding-bottom-sm">
    <!-- 父级评论内容 -->
    <view class="tn-flex tn-flex-row-between tn-flex-col-center">
      <view class="tn-flex tn-flex-row-left">
        <view>
          <view>
            <tn-avatar
                class=""
                shape="circle"
                :src="comment.customerAvatar"
                size="xs">
            </tn-avatar>
          </view>
        </view>
        <view class="tn-padding-left-sm">
          <view class="tn-text-df tn-text-bold tn-color-black">{{ comment.customerNickName }}</view>
          <view class="tn-text-xs tn-color-gray" style="padding-top: 5rpx;">{{ formatRelativeTime(comment.createTime) }}</view>
        </view>
      </view>
      <view class="tn-color-gray" @click="replyTo(comment)">回复</view>
    </view>
    <view class="tn-margin-top tn-margin-bottom" style="margin-left: 80rpx;">{{ comment.content }}</view>

    <!--        <view class="tn-padding-left-lg tn-flex tn-flex-col-center">-->
    <!--          <view class="tn-bg-gray tn-margin-right-sm" style="width: 40rpx;height: 3rpx;"></view>-->
    <!--          <view class="tn-color-gray tn-margin-right-sm" @click="expandHandel(item)">{{expandShow===false?'展开回复':'收起'}}</view>-->
    <!--          <view class="tn-icon-down tn-color-gray"></view>-->
    <!-- 子评论 -->
    <view v-if="comment.replyCount > 0">
      <view v-if="!expandShow" @click="toggleExpand(comment.id)" class="tn-color-gray tn-padding-left-lg tn-flex tn-flex-col-center">
        <view class="tn-bg-gray tn-margin-right-sm" style="width: 40rpx;height: 3rpx;"></view>
        <view>展开回复 ({{ comment.replyCount }})</view>
      </view>
      <view v-else>
        <view
            v-for="(child, index) in subCommentList"
            :key="child.id"
            class="tn-bg-gray--light tn-radius tn-padding tn-margin-bottom-sm">
          <CommentItem :comment="child" @replyTo="replyTo"/>
        </view>
        <view class="tn-color-gray tn-padding-left-lg tn-flex tn-flex-col-center tn-padding-bottom" @click="toggleExpand">
          <view class="tn-bg-gray tn-margin-right-sm" style="width: 40rpx;height: 3rpx;"></view>
         <view>收起</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import formatRelativeTime from '@/libs/mixin/mixins'
export default {
  name: "CommentItem",
  mixins:[formatRelativeTime],
  props: {
    comment: {
      type: Object,
      required: true,

    }
  },
  data() {
    return {
      subCommentList: [],
      expandShow: false
    }
  },
  created() {
  },
  methods: {
    replyTo(comment) {
      this.$emit('replyTo', comment)
    },
    toggleExpand(id) {
      this.expandShow = !this.expandShow
      if (this.expandShow) {
      this.getSubCommentList(id)
      }
      // 如果未加载子评论，动态加载
      // if (!this.comment.subComments || this.comment.subComments.length === 0) {
      //   this.fetchSubComments(this.comment.id).then((subComments) => {
      //     this.comment.subComments = subComments;
      //     this.comment.expandShow = true;
      //   });
      // } else {
      //   this.comment.expandShow = !this.comment.expandShow;
      // }
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
    fetchSubComments(parentId) {
      // 模拟获取子评论接口
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: `${parentId}-1`,
              customerAvatar: "path/to/avatar.jpg",
              customerNickName: `用户${parentId}-1`,
              createTime: "2024-11-19",
              content: `这是评论${parentId}的子评论1`,
              replyCount: 0,
              subComments: []
            },
            {
              id: `${parentId}-2`,
              customerAvatar: "path/to/avatar.jpg",
              customerNickName: `用户${parentId}-2`,
              createTime: "2024-11-19",
              content: `这是评论${parentId}的子评论2`,
              replyCount: 0,
              subComments: []
            }
          ]);
        }, 500);
      });
    }
  }
};
</script>

<style scoped lang="scss">
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
  border-radius: 60%;
  overflow: hidden;
  // background-color: #FFFFFF;
}
</style>

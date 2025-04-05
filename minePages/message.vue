<template>
	<view class="template-message">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed :z-index="zIndex" :bottomShadow="false" customBack>
      <view slot="back" class="tn-custom-nav-bar__back" @click="goBack">
        <view class="tn-icon-left tn-text-bold"></view>
      </view>
      <view class="">
        <text class="tn-text-lg tn-text-bold">消息</text>
      </view>
      <view slot="right" class="tn-padding-right" @click="showModal">
        <image src="/static/images/clear.png" style="width: 40rpx;height: 40rpx;" mode="aspectFit"></image>
      </view>
    </tn-nav-bar>
    <tn-modal v-model="show1" :custom="true">
      <view class="custom-modal-content">
        <view class="tn-text-center tn-padding-top-sm tn-text-xxl tn-text-bold">提 示</view>
        <view class="tn-text-center tn-padding-top tn-text-lg tn-color-gray">确定将所有消息标为已读吗？</view>
        <view class="tn-flex tn-flex-row-between tn-margin-top-xl">
          <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
            <tn-button backgroundColor="#00FFC6" padding="40rpx 0" width="90%" shadow fontBold shape="round">
              <text class="tn-color-black">取 消</text>
            </tn-button>
          </view>
          <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
            <tn-button backgroundColor="#FFF00D" padding="40rpx 0" width="90%" shadow fontBold shape="round">
              <text class="tn-color-black">确 定</text>
            </tn-button>
          </view>
        </view>
      </view>
    </tn-modal>
    <view class="tn-safe-area-inset-bottom tn-margin-bottom-sm" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view>
        <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
              <view class="tn-flex tn-flex-col-center tn-flex-row-left">
                <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-blue tn-color-white">
                  <view class="tn-icon-notice-fill">
                  </view>
                </view>
                <view class="tn-padding-right tn-color-black" @click="tn('/minePages/activityPost')">
                  <view class="tn-padding-right tn-padding-left-sm tn-text tn-text-semibold">
                    活动公告
                  </view>
                  <view class="tn-padding-right tn-padding-top-xs tn-text-ellipsis tn-padding-left-sm">
                    <view class="tn-text-sm tn-color-gray tn-text-ellipsis" style="width: 300rpx;">
                      千果家庭教育免费送好课，还有更多精品课程等你来哦~~~
                    </view>
                  </view>
                </view>
            </view>
            <view class="justify-content-item">
              <view class="tn-flex tn-flex-row-right">
                <view class="tn-text-sm tn-color-gray">2024-12-16</view>
              </view>
              <view class="tn-flex tn-flex-row-right">
                <tn-badge backgroundColor="tn-cool-bg-color-1" fontColor="tn-color-white" :radius="40" margin="10rpx 0rpx 10rpx 10rpx"><text>6</text></tn-badge>
              </view>
            </view>
          </view>
        <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
            <view class="justify-content-item">
              <view class="tn-flex tn-flex-col-center tn-flex-row-left">
                <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-orange tn-color-white">
                  <view class="tn-icon-topics-fill">
                  </view>
                </view>
                <view class="tn-padding-right tn-color-black" @click="tn('/minePages/otherActivityPost')">
                  <view class="tn-padding-right tn-padding-left-sm tn-text tn-text-bold">
                   社区消息通知
                  </view>
                  <view class="tn-padding-right tn-padding-top-xs tn-text-ellipsis tn-padding-left-sm">
                    <view class="tn-text-sm tn-color-gray tn-text-ellipsis" style="width: 300rpx;">
                      点赞、评论、系统通知
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="justify-content-item">
              <view class="tn-flex tn-flex-row-right">
                <view class="tn-text-sm tn-color-gray">2024-12-16</view>
              </view>
              <view class="tn-flex tn-flex-row-right">
                <tn-badge backgroundColor="tn-cool-bg-color-1" fontColor="tn-color-white" :radius="40" margin="10rpx 0rpx 10rpx 10rpx"><text>6</text></tn-badge>
              </view>
            </view>
          </view>
        <tn-load-more class="tn-margin-top tn-text-sm" status="nomore" :loadText="loadText" fontColor="tn-color-gray">
        </tn-load-more>
      </view>
    </view>
	</view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

export default {
    name: 'TemplateMessage',
    mixins: [template_page_mixin],
		data() {
			return {
        zIndex:99,
        loadText: {
          loadmore: '下拉加载',
          loading: '快速加载中...',
          nomore: '已经没有了啊'
        },
        show1: false,
				options: [{
				    icon: 'star',
				    style: {
				      backgroundColor: '#FFA726',
				      width: '80rpx',
				      height: '80rpx',
				      margin: '0 12rpx',
				      borderRadius: '100rpx'
				    }
				  },
				  {
				    icon: 'delete',
				    style: {
				      backgroundColor: '#E83A30',
				      width: '80rpx',
				      height: '80rpx',
				      margin: '0 12rpx',
				      borderRadius: '100rpx'
				    }
				  }
				]
			}
		},
		onLoad() {

		},
		methods: {
      tn(url){
        this.$navTo.togo(url)
      },
      // 弹出模态框
      showModal(event) {
        this.openModal()
      },
      // 打开模态框
      openModal() {
        this.show1 = true
      },
		}
	}
</script>

<style lang="scss" scoped>
/* 胶囊*/
.tn-custom-nav-bar__back {
  width: 60%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 1000rpx;
  color: #000000;
  font-size: 18px;
}

  .tn-message-fixed{
    position: fixed;
    background-color: rgba(255,255,255,1);
    box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    top: 0;
    width: 100%;
    transition: all 0.25s ease-out;
    z-index: 100;
  }

  /* 图标容器1 start */
  .icon1 {
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
        width: 90rpx;
        height: 90rpx;
        font-size: 60rpx;
        border-radius: 50%;
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
    }
  }

  /* 用户头像 start */
  .logo-image {
    width: 90rpx;
    height: 90rpx;
    position: relative;
  }

  .logo-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    // box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    overflow: hidden;
    // background-color: #FFFFFF;
  }
</style>

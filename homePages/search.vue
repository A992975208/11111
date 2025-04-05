<template>
  <view class="template-search tn-safe-area-inset-bottom">
    <view class="tn-navbg" :style="{height: vuex_custom_bar_height + 'px'}">
      <!-- 顶部自定义导航 -->
      <tn-nav-bar fixed alpha customBack>
        <view slot="back" class='tn-custom-nav-bar__back'
          @click="goBack">
          <text class='icon tn-icon-left-arrow'></text>
        </view>
      </tn-nav-bar>
    </view>
    <view class="tn-search-fixed">
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin" :style="{marginTop: vuex_custom_bar_height + 'px'}">
        <view class="justify-content-item align-content-item">
          <view class="tn-bg-gray--light tn-flex tn-flex-col-center" style="border-radius: 100rpx;padding: 10rpx 20rpx 10rpx 20rpx;width: 100%;">
            <text class="tn-icon-search justify-content-item tn-padding-right-xs tn-color-gray tn-text-lg"></text>
            <input class="justify-content-item" placeholder="想搜点什么咧" name="input" placeholder-style="color:#AAAAAA" v-model="keyword"></input>
          </view>
        </view>
        <view class="align-content-item">
          <view class="justify-content-item tn-text-center">
            <tn-button backgroundColor="#fac10d" shape="round" padding="20rpx 20rpx" width="150rpx" shadow fontBold @tap="searchGoods">
              <text class="tn-color-black">搜 索</text>
            </tn-button>
          </view>
        </view>
      </view>
    </view>
    <view :style="{paddingTop: vuex_custom_bar_height + 100+'px'}">
      <view class="tn-flex tn-flex-row-between tn-margin" >
        <view class="justify-content-item tn-text-bold">
          <text class="tn-text-df tn-color-black">最近搜索</text>
        </view>
        <view class="justify-content-item tn-text-df tn-color-gray" @click="clearSearchHistory">
          <text class="tn-padding-xs">删除</text>
          <text class="tn-icon-delete"></text>
        </view>
      </view>
    </view>
    <view class="">
      <view class="tn-tag-search tn-margin tn-text-justify">
        <view v-for="(item, index) in searchHistoryList" :key="index"
              @click="historySearch(item)"
              class="tn-tag-search__item tn-margin-right tn-round tn-text-sm tn-bg-gray--light tn-color-gray">
          <text class="tn-tag-search__item--prefix">#</text>
          {{ item }}
        </view>
      </view>
    </view>
    <view class="tn-flex tn-flex-row-between tn-padding-top-xl tn-margin tn-padding-bottom">
      <view class="justify-content-item tn-text-bold">
        <text class="tn-text-df tn-color-black">搜索结果</text>
      </view>
      <view class="justify-content-item tn-text-df tn-color-gray">
        <text class="tn-padding-xs">筛选</text>
        <text class="tn-icon-filter"></text>
      </view>
    </view>
    <view class="tn-margin-bottom-lg" v-if="searchGoodsList.length>0">
      <block v-for="(item, index) in searchGoodsList" :key="index">
        <view class="article-shadow tn-margin" @click="toGoodsDetail(item.id)">
          <view class="tn-flex">
            <view class="tn-margin-sm tn-padding-top-xs" style="width: 100%;">
              <view class="tn-text-lg tn-text-bold clamp-text-1 tn-text-justify">
                <text class="">{{ item.goodsName }}</text>
              </view>
              <view class="tn-padding-top-xs" style="min-height: 90rpx;">
                <text class="tn-text-df tn-color-gray clamp-text-2 tn-text-justify">
                  {{ item.goodsDesc }}
                </text>
              </view>
              <!--价格-->
              <view class="tn-flex">
                <tn-tag size="sm" shape="circle" background-color="tn-main-gradient-blue">
                  {{ categoryType(item.goodsType) }}
                </tn-tag>
                <view class="tn-text-bold tn-color-red tn-margin-left-sm">
                  <text class="tn-text-sm tn-text-bold tn-color-red">￥</text>
                  {{ item.goodsPrice }}
                </view>
              </view>
            </view>
            <view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.goodsImg.split(',')[0] + ')'">
              <view class="image-article">
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
    <view v-else>
      <view class="empty-container">
        <tn-empty :imgWidth="width" text="暂无搜索结果" icon="/static/images/notask_empty.png"></tn-empty>
      </view>
    </view>
    <tn-modal v-model="show" :title="title" :content="content" :button="button" @click="clearBtn"></tn-modal>

  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
import categoryType from '@/libs/mixin/mixins'

export default {
    name: 'TemplateSearch',
    mixins: [template_page_mixin, categoryType],
    data(){
      return {
        width:150,
        show:false,
        title: '您确定要删除搜索历史吗？',
        content: '',
        button: [
            {
          text: '取消',
          backgroundColor: '#E6E6E6',
          fontColor: '#080808',
          shape: 'round'
        },
          {
            text: '确定',
            backgroundColor: '#3d7eff',
            fontColor: '#FFFFFF'
          }
        ],
        keyword: '',
        searchGoodsList: [],
        searchHistoryList: uni.getStorageSync('searchHistoryList') || []
      }
    },
    methods: {
      toGoodsDetail(id) {
        this.$navTo.togo(`/preferredPages/product?id=${id}`)
      },
      // 搜索
      async searchGoods() {
        try {
          if(this.keyword===''){
            this.$t.message.toast('请输入关键字搜索')
            return
          }
          const res = await this.$API.searchGoods({keyword: this.keyword})
          if(res.code===200){
            this.addSearchHistory()
            this.searchGoodsList = res.result
            this.keyword=''
          }
        } catch (e) {
          console.log(e)
        }
      },
      // 搜索历史
      addSearchHistory() {
        if (this.searchHistoryList.indexOf(this.keyword) == -1) {
          this.searchHistoryList.unshift(this.keyword)
          uni.setStorageSync('searchHistoryList', this.searchHistoryList)
        } else {
          this.searchHistoryList.splice(this.searchHistoryList.indexOf(this.keyword), 1)
          this.searchHistoryList.unshift(this.keyword)
          uni.setStorageSync('searchHistoryList', this.searchHistoryList)
        }
      },
      // 清空搜索历史
      clearSearchHistory() {
        this.show= true
      },
      historySearch(e){
        this.keyword = e
        this.searchGoods()
      },
      clearBtn(e){
        if(e.index===0){
          this.show=false
        }else{
          this.show=false
          this.searchHistoryList = []
          uni.setStorageSync('searchHistoryList', this.searchHistoryList)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tn-search-fixed{
    position: fixed;
    top: 50rpx;
    width: 100%;
    transition: all 0.25s ease-out;
    z-index: 1;
    background-color: #ffffff;
  }
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
  .empty-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
  }
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

  /* 搜索标签 start*/
  .tn-tag-search {
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
</style>

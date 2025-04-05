<template>
  <view class="multiline">
    <view class="info">
      <view :class="{hide:!iSinfo}" :style="!iSinfo?computedStyle:''">
        <view :style="{ color: textColor,fontWeight:fontWeight,fontSize:fontSize + 'rpx'}">
          {{content}}
        </view>
      </view>
      <text @tap="showinfo" v-if="!iSinfo && content.length>40"
            :style="{ color: showinfotextColor,fontWeight:showinfoFontWeight,fontSize:showinfoSize + 'rpx'}">展开</text>
    </view>
    <text @tap="showinfo" v-if="iSinfo" class="hidebtn"
          :style="{ color: showinfotextColor,fontWeight:showinfoFontWeight,fontSize:showinfoSize + 'rpx'}">收起</text>
  </view>
</template>

<script>
export default {
  props: {
    // 文本信息
    content: {
      type: String,
      default: "sadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    // 默认显示几行文本
    linesCount: {
      type: [Number, String],
      default: 2
    },
    // 文字颜色
    textColor: {
      type: String,
      default: "#333333"
    },
    // 文字粗体大小
    fontWeight: {
      type: [Number, String],
      default: 400
    },
    // 文字大小
    fontSize: {
      type: [Number, String],
      default: 24
    },
    // 展开收起文字大小
    showinfoSize: {
      type: [Number, String],
      default: 24
    },
    // 展开收起文字颜色
    showinfotextColor: {
      type: String,
      default: "#0078FF"
    },
    // 展开收起文字粗体大小
    showinfoFontWeight: {
      type: [Number, String],
      default: 400
    },
  },
  data() {
    return {
      iSinfo: false,
    };
  },
  mounted() {},
  computed: {
    computedStyle() {
      const style = `-webkit-line-clamp: ${this.linesCount};`;
      return style;
    }
  },
  methods: {
    showinfo() {
      this.iSinfo = !this.iSinfo
    }
  },
};
</script>

<style lang="scss" scoped>

.multiline{
  display: flex;
  // width: 100%;
  flex-direction: column;
  // background-color: #fff;
  position: relative;
  transition: all 0.3s linear;

  .info {
    display: flex;
    flex-direction: column;

    view {
      text-align: justify;
      word-break: break-word; //换行模式
      // background-color: #F6F7FB;
    }

    text {
      width: 70px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background: linear-gradient(90deg, rgba(246, 247, 251, 255) 0%, rgba(246, 247, 251, 255) 50%);
      color: #0078FF;
      position: absolute;
      bottom: 0rpx;
      right: 0rpx;
    }
  }

}

.hidebtn {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}

.hide {
  word-break: break-word; //换行模式
  overflow: hidden;
  text-overflow: ellipsis; //修剪文字
  display: -webkit-box;
  // -webkit-line-clamp: 2; //此处为上限行数
  -webkit-box-orient: vertical;
}
</style>

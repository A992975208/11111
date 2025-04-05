<template>
  <view class="tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
            @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
        <text class="tn-text-bold tn-text-xl tn-color-black">个人信息</text>
      </view>
    </tn-nav-bar>

    <view :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-center tn-flex-col-center tn-padding-xl" @tap.stop="openAuthorizationModal">
        <view class="justify-content-item tn-text-lg tn-color-grey" @click="changeAvatar" style="position:relative;">
          <tn-avatar size="xxl" :src="userInfo.avatar"></tn-avatar>
          <view class="camera">
            <text class="tn-icon-camera-fill tn-color-white"></text>
          </view>
        </view>
      </view>
    </view>
    <view class="info_shadow tn-padding">
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding-bottom" @click="showModal2(userInfo.phoneNum )">
        <view class="justify-content-item">
          <view class="tn-text-lg">
            绑定手机号
          </view>
          <view class="tn-color-gray tn-padding-top-xs">
            {{ userInfo.phoneNum }}
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right tn-padding-top"></view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding-bottom" @click="showModal3(userInfo.nickName)">
        <view class="justify-content-item">
          <view class="tn-text-lg">
            昵称
          </view>
          <view class="tn-color-gray tn-padding-top-xs">
            {{ userInfo.nickName }}
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right tn-padding-top"></view>
        </view>
      </view>
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding-bottom" @click="show4=true">
        <view class="justify-content-item">
          <view class="tn-text-lg">
            邮箱
          </view>
          <view class="tn-color-gray tn-padding-top-xs">
            {{ userInfo.email }}
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right tn-padding-top"></view>
        </view>
      </view>
      <picker @change="bindPickerChange" :value="index" :range="array">
        <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding-bottom">
          <view class="justify-content-item">
            <view class="tn-text-lg">
              性别
            </view>
            <view class="tn-color-gray tn-padding-top-xs">

              <view class="tn-color-gray">{{ userInfo.sex === 1 ? '男' : '女' }}</view>
            </view>
          </view>
          <view class="justify-content-item tn-text-lg tn-color-grey">
            <view class="tn-icon-right tn-padding-top"></view>
          </view>
        </view>
      </picker>
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding-bottom" @click="show=true">
        <view class="justify-content-item">
          <view class="tn-text-lg">
            地区
          </view>
          <view class="tn-color-gray tn-padding-top-xs">
            {{ userInfo.region }}
          </view>
        </view>
        <view class="justify-content-item tn-text-lg tn-color-grey">
          <view class="tn-icon-right tn-padding-top"></view>
        </view>
      </view>
    </view>

    <!--修改手机号-->
    <tn-popup v-model="show2" mode="bottom" border-radius="30" closeBtn>
      <view class="custom-modal-content tn-padding">
        <view class="">
          <view class="tn-text-lg tn-text-bold tn-text-center">变更手机号码</view>
          <view class="tn-bg-gray--light tn-color-gray"
                style="border-radius: 10rpx;padding: 20rpx 30rpx;margin: 50rpx 0 60rpx 0;">
            <input placeholder="请填写您的手机号" name="input" placeholder-style="color:#AAAAAA" maxlength="20"
                   v-model="form.phoneNum"></input>
          </view>
        </view>
        <view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center">
          <tn-button shape="round" backgroundColor="tn-bg-fruit" padding="40rpx 0" width="100%"  fontBold @click="savePersonalInfo(0)">
            <text class="tn-color-black">保 存</text>
          </tn-button>
          <!-- <tn-button backgroundColor="#3668FC" padding="40rpx 0" width="60%" shadow fontBold open-type="getPhoneNumber">
            <text class="tn-color-white">获取手机号</text>
          </tn-button> -->
        </view>
      </view>
    </tn-popup>
    <!--修改昵称-->
    <tn-popup v-model="show3" mode="bottom" border-radius="30" closeBtn>
      <view class="custom-modal-content tn-padding">
        <view class="">
          <view class="tn-text-lg tn-text-bold tn-text-center">修改昵称</view>
          <view class="tn-bg-gray--light" style="border-radius: 10rpx;padding: 20rpx 30rpx;margin: 50rpx 0 20rpx;">
            <input placeholder="请填写您的昵称" name="input" placeholder-style="color:#AAAAAA" maxlength="8"
                   v-model="form.nickName"></input>
          </view>
        </view>
        <view class="tn-padding tn-text-sm tn-color-gray">昵称最大长度不能超过8位</view>
        <view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center">
          <tn-button shape="round" backgroundColor="tn-bg-fruit" padding="40rpx 0" width="100%" fontBold @click="savePersonalInfo(1)">
            <text class="tn-color-black">保 存</text>
          </tn-button>
        </view>
      </view>
    </tn-popup>
    <!--修改邮箱-->
    <tn-popup v-model="show4" mode="bottom" border-radius="30" closeBtn>
      <view class="custom-modal-content tn-padding">
        <view class="">
          <view class="tn-text-lg tn-text-bold tn-text-center">请输入您的邮箱地址</view>
          <view class="tn-bg-gray--light" style="border-radius: 10rpx;padding: 20rpx 30rpx;margin: 50rpx 0 60rpx 0;">
            <input placeholder="请填写您的邮箱" name="input" placeholder-style="color:#AAAAAA" maxlength="20"
                   v-model="form.email"></input>
          </view>
        </view>
        <view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center">
          <tn-button shape="round" backgroundColor="tn-bg-fruit" padding="40rpx 0" width="100%" fontBold @click="savePersonalInfo(2)">
            <text class="tn-color-black">保 存</text>
          </tn-button>
        </view>
      </view>
    </tn-popup>
    <!--修改性别-->
    <!--修改地区-->
    <tn-picker mode="region" v-model="show" @confirm="confirmHandel"></tn-picker>
  </view>
</template>

<script>
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
import edit from "@/circlePages/edit.vue";
// import WxUserInfoModal from '@/uni_modules/tuniaoui-wx-user-info/components/tuniaoui-wx-user-info/tuniaoui-wx-user-info.vue'
export default {
  // components: { WxUserInfoModal },
  name: 'TemplateSet',
  mixins: [template_page_mixin],
  data() {
    return {
      showAuthorizationModal: false,
      show: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      index: 0,
      array: ['女', '男'],
      date: '2000-01-29',
      index1: 1,
      array1: ['计算机/电子', '高级UI设计', '会计/金融', '政府/非盈利组织/其他'],
      areaData: '',
      userInfo: {
        avatar: '',
        email: '',
        nickName: '',
        phoneNum: '',
      },
      form: {
        avatar: '',
        email: '',
        nickName: '',
        phoneNum: '',
        region: '',
      },
      // action:'http://62.234.12.185:9999/sys/common/upload',
      // action:'https://10bb-1-86-240-250.ngrok-free.app/sys/common/upload',
      action:`${this.$globalData.devBaseUrl}/sys/common/upload`,
      imagesUrl: '',
      systemInfo: uni.getStorageSync('systemInfo')
    }
  },
  computed: {
    edit() {
      return edit
    },
    startDate() {
      return this.getDate('start');
    },
    endDate() {
      return this.getDate('end');
    }
  },
  onLoad() {
    this.getUserInfo()
  },
  created() {
    console.log(this.systemInfo)
  },
  methods: {
    //获取用户个人信息
    getUserInfo() {
      let id = uni.getStorageSync('id')
      this.$API.getUserInfo(id).then(res => {
        uni.setStorageSync('userId', res.result.id)
        this.$store.commit('USER_INFO', res.result)
        this.userInfo = res.result
      })
    },
    confirmHandel(e) {
      this.areaData = e.province.label + e.city.label + e.area.label
      this.show = false;
      this.editPersonalInfo({id:uni.getStorageSync('userId'),region:this.areaData})
    },
    bindPickerChange(e) {
      this.form.sex = e.detail.value
      this.editPersonalInfo({id:uni.getStorageSync('userId'),sex:this.form.sex})
    },
    //修改用户信息
    savePersonalInfo(index) {
      const id = uni.getStorageSync('userId')
      switch (index) {
        case 0:
          let params = {
            id: id,
            phoneNum: this.form.phoneNum,
          }
          this.editPersonalInfo(params)
          break;
        case 1:
          let params1 = {
            id,
            nickName: this.form.nickName,
            cid: uni.getStorageSync('cid'),
            deviceId: this.systemInfo.deviceId,
            deviceBrand: this.systemInfo.deviceBrand,
            deviceModel: this.systemInfo.deviceModel,
            deviceSystem: this.systemInfo.system,
            deviceType: this.systemInfo.deviceType,
          }
          this.editPersonalInfo(params1)
          break;
        case 2:
          let params2 = {
            id,
            email: this.form.email
          }
          this.editPersonalInfo(params2)
          break;
        default:
          break;
      }
    },
    editPersonalInfo(params) {
      this.$API.editUserInfo(params).then(res=>{
        if(res.code===200){
          this.getUserInfo()
          this.$t.message.toast('修改用户信息成功')
          uni.$emit('editSuccess',)
          uni.navigateBack()
        }
      })
    },
    //修改用户头像拉起手机相册
    changeAvatar() {
      uni.chooseImage({
        count: 1,//默认选择1张图片
        sizeType: ['original', 'compressed'],
        sourceType: ['camera','album'],
        success: (res) => {
          this.editPersonalInfo({ id: uni.getStorageSync('userId'), avatar: this.imagesUrl})
          this.update(res.tempFilePaths[0])//上传图片
        }
      });
    },
    //上传图片
    async update(filePath) {
      const _this = this
      const token = uni.getStorageSync('token')
      uni.uploadFile({
        url: _this.action, //仅为示例，非真实的接口地址
        filePath: filePath,
        name: 'file',
        header: {
          'X-Access-Token': token
        },
        success: (res) => {
          this.imagesUrl = JSON.parse(res.data).message
          this.editPersonalInfo({ id: uni.getStorageSync('userId'), avatar: this.imagesUrl})
          console.log(JSON.parse(res.data),'上传图片成功')
        }
      });
    },
    // 跳转
    tn(e) {
      uni.navigateTo({
        url: e,
      });
    },
    // 打开模态框
    openModal1() {
      this.show1 = true
    },
    // 弹出模态框
    showModal2(event) {
      console.log(event)
      this.form.phoneNum=event
      this.openModal2()
    },
    // 打开模态框
    openModal2() {
      this.show2 = true
    },
    // 弹出模态框
    showModal3(event) {
      this.openModal3()
    },
    // 打开模态框
    openModal3() {
      this.show3 = true
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === 'start') {
        year = year - 60;
      } else if (type === 'end') {
        year = year + 2;
      }
      month = month > 9 ? month : '0' + month;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    },
    // 打开获取用户信息弹框
    openAuthorizationModal() {
      this.showAuthorizationModal = true
    },
  }
}
</script>

<style lang="scss" scoped>
.camera {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60rpx;
  height: 60rpx;
  background-color: #000000;
  opacity: 0.5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;

}

.info_shadow {
  margin: 40rpx;
  border-radius: 20rpx;
  box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.07);

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

/* 授权 */
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 授权按钮 */
.submit-btn {
  width: 100%;
  background-color: #05C160;
  color: #FFFFFF;
  margin-top: 60rpx;
  border-radius: 10rpx;
  padding: 25rpx;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30rpx;
}

/* 间隔线 start*/
.tn-strip-bottom-min {
  width: 100%;
  border-bottom: 1rpx solid #F8F9FB;
}

.tn-strip-bottom {
  width: 100%;
  border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
}

/* 间隔线 end*/


/* 用户头像 start */
.logo-image {
  width: 200rpx;
  height: 200rpx;
  position: relative;
}

.logo-pic {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border: 2rpx solid rgba(255, 255, 255, 0.05);
  box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  overflow: hidden;
  // background-color: #FFFFFF;
}


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

</style>

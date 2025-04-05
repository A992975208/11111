<template>
  <view :class="[fold&&'flex flex-items-center', 'wx-card mt20']">
    <view :class="[!fold&&'f32 flex flex-center pb20',fold&&'card-header']" @click="initDate">
      <view :class="[fold&&'f26 tc']">{{nowDay.year}}年</view>
      <view :class="[fold&&'flex flex-center flex-items-end']">
        <text :class="[fold&&'f70']">{{nowDay.month}}</text>
        <text :class="[fold&&'f30','pb10 ml5']">月</text>
      </view>
    </view>
    <view v-if="verticaled" class="flex flex-items-center flex-around pb10">
      <view :class="['tc w7']" v-for="item in weeks" :key="item">
        {{item}}
      </view>
    </view>
    <view class="flex-1 fit-height">
      <swiper
          :current="tabIndex"
          :animation="animationData"
          :class="[fold?'swiper-week':'swiper-month','flex-1']"
          :vertical="verticaled"
          :duration="duration"
          @change="ontabchange"
          @animationfinish="animationfinish" >
        <swiper-item v-for="(days,index1) in list" :key="index1">
          <template v-if="fold">
            <view class="month-wrap flex flex-items-center flex-around pt5">
              <view :class="['tc',!(item.isNow||item.isFuture)&&'graya']" v-for="item in days.weeks" :key="item.day" @click="clickTime(item)">
                <view>{{item.week}}</view>
                <view :class="[item.isNow&&'active',item.isActive&&'active','mt20 pb20',!item.isAct&&item.isAM&&'isAM',!item.isAct&&item.isPM&&'isPM',item.isAct&&'isAct']">
                  <text :class="[item.isNow&&'isNowWap',item.isActive&&'isSelect']">{{item.day}}</text>
                </view>
              </view>
            </view>
          </template>
          <template v-else>
            <view class="month-wrap">
              <view v-if="!verticaled" class="flex flex-items-center flex-around">
                <view :class="['tc w7']" v-for="item in weeks" :key="item">
                  {{item}}
                </view>
              </view>
              <view class="flex flex-items-center flex-wrap">
                <view :class="['tc w7',(!(item.isNow||item.isFuture)&&!verticaled||(!item.isMonth))&&'graya',item.isNow&&'active',item.isActive&&'active',!item.isAct&&item.isAM&&'isAM',!item.isAct&&item.isPM&&'isPM',item.isAct&&'isAct']" v-for="(item,index) in days.months" :key="index" @click="clickTime(item)">
                  <view :class="[item.isNow&&'isNowWap',item.isActive&&'isSelect','mt30 mb20']">{{item.day}}</view>
                </view>
              </view>
            </view>
          </template>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
/**
 * 一个简单的时间切换
 使用示例：<moSimpleDate @changeTime="changeTime"/>
 *
 */
export default {
  name: 'moSimpleDate',
  props: {
    fold: { // 是否收起
      type: Boolean,
      default: true
    },
    time: { // 起始时间
      type: [String, Number],
      default: 0
    },
    immite: {  // 是否立即执行
      type: Boolean,
      default: true
    },
    delay: {  // 切换时间
      type: Number,
      default: 300
    },
    selectTime: {  // 被选中的日期列表
      type: Array,
      default: ()=>[]
    },
    active: {  // 是否开启点击选中样式
      type: Boolean,
      default: true
    },
    vertical: {  // 是否垂直切换(fold=false时有效)
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      tabIndex: 1,
      duration: 50,
      weekList:[],
      monthList:[],
      nowTime: 0,
      timer: null,
      weeks: ["一", "二", "三", "四", "五", "六", "日"],
      animationData: {}
    }
  },
  computed: {
    verticaled(){
      return !this.fold ? this.vertical : false
    },
    list(){
      return this.fold ? this.weekList : this.monthList
    },
    nowDay(){
      const now = new Date(this.nowTime)
      const weekNumber = now.getDay()||7

      return this.fold ? {
        temps: now.getTime(),
        weekNumber: weekNumber,
        weeks: this.weekList[1].weeks,
        ...this.weekList[1].weeks[weekNumber-1]
      } : {
        temps: now.getTime(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        weekNumber,
        months: this.monthList[1].months,
        // ...this.monthList[1].months.filter(item=>item.isMonth)[0]
      }
    }
  },
  watch: {
    fold: {
      handler(_new){
        this.initDate(this.immite)
      },
      immediate: true
    },
    selectTime: {
      handler(_new){
        this.fold&&this.getWeekList(this.nowTime)
        !this.fold&&this.getMonthList(this.nowTime)
      },
    },
  },
  methods: {
    initDate(immite = true){
      const NowTimeMs = new Date().setHours(0,0,0,0)
      const getTimeMs = new Date(this.nowTime).setHours(0,0,0,0)
      this.nowTime = this.time ? new Date(this.time) : new Date()
      this.fold&&this.getWeekList()
      !this.fold&&this.getMonthList()
      this.switchTab(1)
      if(this.tabIndex==1&&NowTimeMs!=getTimeMs&&immite){
        this.$emit('changeTime',this.nowDay)
      }
      const _this = this
      this.$nextTick(()=>{
        _this.getHeg()
      })
    },
    getHeg(){
      const query = uni.createSelectorQuery().in(this);
      query.selectAll('.month-wrap').boundingClientRect(res=>{
        if(!res) return
        // const monthY = Math.max.apply(Math, res.map(e=> e.height))
        const monthY = res[1].height
        let animation = uni.createAnimation({
          duration: 200,
          timingFunction: "ease",
          delay: 0,
        })
        animation.height(monthY).step()
        this.animation = animation
        this.animationData = this.animation.export()
      }).exec()
    },
    ontabchange(e) {
      let index = e.target.current || e.detail.current;
      let dat = new Date(this.nowTime)
      if(index==2){
        this.nowTime = this.fold ? dat.setDate(dat.getDate() + 7) : dat.setMonth(dat.getMonth() + 1);
      }
      if(index==0){
        this.nowTime = this.fold ? dat.setDate(dat.getDate() - 7) : dat.setMonth(dat.getMonth() - 1);
      }
      this.switchTab(index)
      const _this = this
      this.$nextTick(()=>{
        _this.getHeg()
      })
      e.stopPropagation()
    },
    animationfinish(){
      if (this.tabIndex === 1) return;
      let _this = this
      this.duration = 0
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(function(){
        _this.fold&&_this.getWeekList(_this.nowTime)
        !_this.fold&&_this.getMonthList(_this.nowTime)
        _this.switchTab(1,true)
      }, 0)
    },
    switchTab(index,ani) {
      this.duration = ani ? 0 : this.delay
      if (this.tabIndex === index) return
      this.tabIndex = index
      this.tabIndex==1&&this.$emit('changeTime',this.nowDay)
    },
    select(item){
      if(this.fold){
        const weeks = JSON.parse(JSON.stringify(this.weekList[1].weeks))
        weeks.forEach(day=>{
          day.isActive = item.temps == day.temps
        })
        this.weekList = [
          this.weekList[0],
          {type:4, weeks},
          this.weekList[2],
        ]
      }else{
        const months = JSON.parse(JSON.stringify(this.monthList[1].months))
        months.forEach(day=>{
          day.isActive = item.temps == day.temps
          day.ss = 1212
        })
        const data = [
          this.monthList[0],
          {type:4, months},
          this.monthList[2],
        ]
        this.monthList = JSON.parse(JSON.stringify(data))
      }
    },
    clickTime(item){
      this.active&&this.select(item)
      const res = JSON.parse(JSON.stringify(item))
      Object.keys(res).forEach(e=>{
        delete res['isMonth']
      })
      this.$emit('clickTime', this.fold ? item : res)
    },
    getWeekList(now){
      const nowTime = new Date(now || new Date)
      const lastTime = new Date(nowTime).setDate(nowTime.getDate() - 7);
      const nextTime = new Date(nowTime).setDate(nowTime.getDate() + 7);
      this.weekList = [
        {type:0,weeks:this.getWeeks(lastTime)},
        {type:1,weeks:this.getWeeks(nowTime)},
        {type:2,weeks:this.getWeeks(nextTime)},
      ]
    },
    getWeeks(now){
      const dat = new Date(now);
      const day = dat.getDay();
      dat.setDate(dat.getDate() + (1 - day));
      const _weeks = ["一", "二", "三", "四", "五", "六", "日"]
      return _weeks.reduce((weeks,week)=>{
        const NowTimeMs = new Date().setHours(0,0,0,0)
        const getTimeMs = new Date(dat).setHours(0,0,0,0)
        const isAM = this.isActive(dat, 0)
        const isPM = this.isActive(dat, 1)
        const date = {
          temps: new Date(dat).getTime(),
          year: dat.getFullYear(),
          month: dat.getMonth() + 1,
          day: dat.getDate(),
          week,
          isNow: NowTimeMs == getTimeMs,
          isFuture: NowTimeMs < getTimeMs,
          isAM,
          isPM,
          isAct: isAM&&isPM,
        }
        dat.setDate(dat.getDate() +1)
        return weeks.concat(date)
      },[])
    },
    getMonthList(now){
      const nowTime = new Date(now || new Date)
      const lastTime = new Date(nowTime).setMonth(nowTime.getMonth() - 1);
      const nextTime = new Date(nowTime).setMonth(nowTime.getMonth() + 1);
      this.monthList = [
        {type:0,months:this.getMonths(lastTime)},
        {type:1,months:this.getMonths(nowTime)},
        {type:2,months:this.getMonths(nextTime)},
      ]
    },
    getMonths(now){
      const nowTime = new Date(now);
      const oneTime = nowTime.setDate(1)   // 设置为本月第一天
      nowTime.setDate(nowTime.getDate() + (1 - (nowTime.getDay()||7))); // 设置周一

      const nextTime = new Date(oneTime)
      nextTime.setMonth(nextTime.getMonth() + 1)  // 设置为下个月第一天
      nextTime.setDate(0)   // 设置为本月最后一天
      nextTime.setDate(nextTime.getDate() + (7 - (nextTime.getDay()||7)));  // 设置为结束

      return this.getDayList(nowTime,nextTime,[],oneTime)
    },
    getDayList(start, end, dayList=[],oneTime){
      if(start>end) return
      const nowTimeMs = new Date().setHours(0,0,0,0)
      const oneTimeMs = new Date(oneTime).getMonth()
      const startTime = new Date(start)
      const startTimeMs = startTime.setHours(0,0,0,0)
      const isAM = this.isActive(start, 0)
      const isPM = this.isActive(start, 1)
      const date = {
        year: startTime.getFullYear(),
        month: startTime.getMonth() + 1,
        day: startTime.getDate(),
        week: this.getWeekStr(startTime.getDay()||7),
        weekNumber: startTime.getDay()||7,
        temps: new Date(start).getTime(),
        isNow: nowTimeMs == startTimeMs,
        isFuture: nowTimeMs < startTimeMs,
        isMonth: oneTimeMs == startTime.getMonth(),
        isAM,
        isPM,
        isAct: isAM&&isPM,
      }
      dayList.push(date)
      startTime.setDate(startTime.getDate() +1)
      this.getDayList(new Date(startTime),end,dayList,oneTime)
      return dayList
    },
    getWeekStr(number){
      const _weeks = ["一", "二", "三", "四", "五", "六", "日"]
      return _weeks[number-1]
    },
    isActive(time,type = 0){  //type = 0 上午  | 1 下午
      const nowday = new Date(time).setHours(0,0,0,0)
      return this.selectTime.some(item=>{
        const actDate = new Date(item)
        const actday = new Date(item).setHours(0,0,0,0)
        const amVSpm = !type ? actDate.getHours()>=0&&actDate.getHours()<12 : actDate.getHours()>=12&&actDate.getHours()<=18
        return nowday == actday && amVSpm
      })
    },
  }
}
</script>
<style lang="scss" scoped>
// $theme-color: rgb(255, 165, 104);
$theme-color: #1ABC9C;
$am-color: rgb(8, 201, 95);
// $pm-color: rgb(235, 148, 35);
$pm-color: rgb(38, 129, 243);
$act-color: rgb(38, 129, 243);
.flex {display: flex;}
.flex-items-center {align-items: center;}
.flex-items-end {align-items:flex-end;}
.flex-center {justify-content:center;}
.flex-around {justify-content: space-around;}
.flex-wrap {flex-wrap: wrap;}
.flex-1 {flex: 1; min-width: 0;}
.fit-height {height: 100%;}
.graya{ color: #aaa; }
.tc{ text-align: center; }
.f26{font-size: 26rpx;}
.f30{font-size: 30rpx;}
.f32{font-size: 32rpx;}
.f70{font-size: 70rpx;}
.pb20{padding-bottom: 20rpx;}
.pb15{padding-bottom: 15rpx;}
.pb10{padding-bottom: 10rpx;}
.pt5{padding-top: 5rpx;}
.mt30{margin-top: 30rpx;}
.mt20{margin-top: 20rpx;}
.mt15{margin-top: 15rpx;}
.ml5{margin-left: 5rpx;}
.w7{ width: calc(100% * 1/7); }

.wx-card {
  border-radius: 12rpx;
  background-color: #fff;
  padding: 30rpx;
}
.card-header{
  width: 150rpx;
  padding-right: 30rpx;
}
.swiper-week{
  height: 120rpx;
}
.swiper-month{
  height: 300rpx;
}
.isAM,.isPM,.isAct{
  // color: $theme-color;
  position: relative;
  &::after{
    display: block;
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%,0);
    margin-top: -10rpx;
    width: 10rpx;
    height: 10rpx;
    border-radius: 10rpx;
    background-color: $theme-color;
  }
  &.isAM{
    // color: $am-color;
    &::after{
      background-color: $am-color;
    }
  }
  &.isPM{
    // color: $pm-color;
    &::after{
      background-color: $pm-color;
    }
  }
  &.isAct{
    // color: $act-color;
    &::after{
      background-color: $act-color;
    }
  }
}
.active{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .isSelect{
    position: relative;
    color: $theme-color;
    &::after{
      display: block;
      content: '';
      position: absolute;
      width: 50rpx;
      height: 50rpx;
      border: 1px solid $theme-color;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      z-index: -1;
      transform: translate(-50%,-50%);
    }
  }
  .isNowWap{
    position: relative;
    color: #fff;
    &::after{
      display: block;
      content: '';
      position: absolute;
      width: 50rpx;
      height: 50rpx;
      border: 1px solid $theme-color;
      background: $theme-color;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      z-index: -1;
      transform: translate(-50%,-50%);
    }
  }

}

</style>
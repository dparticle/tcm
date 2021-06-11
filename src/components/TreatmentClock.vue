<!-- 疗程打卡组件 -->
<template>
  <div class="treatment-clock">
    <van-row class="title" type="flex">
      <van-col>
        <van-icon name="certificate" size="18" />
      </van-col>
      <van-col style="font-size: 16px; margin-left: 8px">疗程打卡</van-col>
    </van-row>
    <div v-if="$store.state.token" class="treatment-content">
      <!-- 疗程名 -->
      <van-row type="flex" justify="center">
        <van-col>
          <van-col
            class="treatment-title"
            style="font-size: 16px; margin-left: 8px"
          >
            {{ treatmentTitle }}
          </van-col>
        </van-col>
      </van-row>
      <!-- 疗程进度环 -->
      <van-circle
        v-model="currentRate"
        :rate="rate"
        :speed="100"
        :color="gradientColor"
        layer-color="#ebedf0"
        :text="curDays + '/' + totalDays"
      />
      <van-row class="button" type="flex" justify="space-around">
        <van-col>
          <van-button icon="edit" type="info" @click="calendarShow = true"
            >修改疗程
          </van-button>
          <van-calendar
            v-model="calendarShow"
            type="range"
            @confirm="onConfirm"
          />
        </van-col>
        <van-col>
          <van-button v-if="todayStatus" icon="passed" type="primary"
            >已打卡
          </van-button>
          <van-button v-else icon="warning-o" type="warning" @click="clockIn"
            >打卡
          </van-button>
        </van-col>
      </van-row>
    </div>
    <!-- vant 空状态的使用 -->
    <van-empty v-else image="error" description="请登录获取疗程信息" />
  </div>
</template>

<script>
export default {
  name: "TreatmentClock",
  data() {
    return {
      totalDays: 14,
      curDays: 2,
      calendarShow: false,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      currentRate: 0,
      myTodayStatus: this.todayStatus,
    };
  },
  computed: {
    rate: function () {
      return (this.curDays * 100) / this.totalDays;
    },
  },
  //TODO props
  props: {
    todayStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    treatmentTitle: {
      type: String,
      required: true,
      default: "",
    },
  },
  methods: {
    clockIn: function () {
      this.curDays++;
      this.changeTodayStatus();
      //TODO 每天 0 点更新，之后可做规定时间
      setTimeout(() => {
        this.changeTodayStatus();
      }, 2000);
    },
    changeTodayStatus: function () {
      if (!this.myTodayStatus) {
        console.log("今日打卡");
      }
      this.myTodayStatus = !this.myTodayStatus;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.calendarShow = false;
      console.log("选择时间区间");
      console.log("start: " + start);
      console.log("end: " + end);
      // 计算天数
      this.totalDays =
        (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;
      //TODO 向后端更新或插入数据
    },
  },
};
</script>

<style scoped>
.treatment-clock {
  background-color: #ffffff;
  margin-top: 6px;
  padding: 0 16px;
}

.title {
  margin: 0;
  padding: 16px 0;
}

.treatment-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.van-circle {
  /*margin-top: 5px;*/
  margin-bottom: 20px;
}

/* 没用，不知道为啥 */
.van-progress__pivot {
  font-size: 12px;
  line-height: 2;
}

.button {
  padding-bottom: 20px;
}

.van-button {
  width: 110px;
  border-radius: 5px;
}
</style>

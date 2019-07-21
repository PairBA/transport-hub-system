<template>
    <div class="watchDutySchedule__homePage">
      <Row>
        <Col span="18" class="table">
          <DatePicker v-model="date" type="month" style="width: 200px"></DatePicker>
          <Button @click="goSearch">查询</Button>
          <Row>
            <Col v-for="day in weekList" :key="day">
              {{day}}
            </Col>
          </Row>
          <Row>
            <Col v-for="(day, index) in monthDayList" :key="index">
              {{day}}
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <div>2019-07-31</div>
          <Button>新增值班人员</Button>
        </Col>
      </Row>
    </div>
</template>

<script>
import {
  get,
  END_POINTS
} from '@/api'
import {
  dateFormat
} from '@/utils'
export default {
  data() {
    return {
      date: new Date(),
      planDetailList: [],
      maxDay: 0,
      monthDayList: [],
      planWorkerList: [],
      weekList: [
        '日',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六'
      ]
    }
  },
  mounted() {
    this.getPlanDetailList()
    this.getPlanWorkerList()
  },
  methods: {
    goSearch() {
      const date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
      this.maxDay = date.getDate()
      const monthDayList = []
      date.setDate(1)
      const week = date.getDay()
      console.log(week)
      if (week !== 7) {
        for (let i = 1; i <= week; i++) {
          monthDayList.push('.')
        }
      }
      for (let i = 1; i <= this.maxDay; i++) {
        monthDayList.push(i)
      }
      this.monthDayList = monthDayList
      console.log(monthDayList)
    },
    async getPlanDetailList() {
      const result = await get(END_POINTS.GET_PLAN_DETAIL_LIST + `?queryMonth=${dateFormat(this.date, 'yyyy-MM')}`)
      if (result.code === 2000) this.planDetailList = result.data
    },
    async getPlanWorkerList() {
      const result = await get(END_POINTS.GET_PLAN_WORKER_LIST)
      if (result.code === 2000) this.planWorkerList = result.data
    }
  }
}
</script>

<style lang="less">
.watchDutySchedule__homePage {
  .table {
    .ivu-col {
      width: 14.2857%;
      float: left;
      -webkit-box-flex: 0;
      -ms-flex: 0 0 auto;
      flex: 0 0 auto;
    }
  }
}
</style>

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
            <Col v-for="(singleDay, index) in monthDayList" :key="index" @click.native="highlightDay(singleDay)">
              <div v-if="singleDay.scheduleDetailList">
                <div v-for="(oneItem, indexForOne) in singleDay.scheduleDetailList" :key="`singleDay_${indexForOne}`">
                  <div>{{oneItem.scheduleName}}</div>
                  <div>
                    <div v-for="worker in oneItem.scheduleWorkerList" :key="worker.fullName">
                      {{worker.fullName}}{{worker.mobile}}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                {{singleDay}}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <div>{{item.scheduleDate}}</div>
          <div v-for="detail in item.scheduleDetailList" :key="detail.scheduleName">
            {{detail.scheduleName}}
            <div v-for="worker in detail.scheduleWorkerList" :key="worker.fullName">
              {{worker.fullName}}{{worker.mobile}}<Icon type="ios-close-circle-outline" @click="deletePlanWorker(detail.scheduleName, worker.fullName, worker.mobile)"/>
            </div>
            <Poptip placement="bottom">
              <Button>新增值班人员</Button>
              <div slot="content">
                <Select v-model="fullName"
                        placeholder="请选择人员">
                  <Option v-for="worker in planWorkerList"
                          :value="worker.fullName"
                          :key="worker.fullName">
                    {{ worker.fullName }} {{ worker.mobile }}
                  </Option>
                </Select>
                <div>
                  <Button @click="addPlanWorker(detail.scheduleName)">确定</Button>
                </div>
              </div>
            </Poptip>
          </div>
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
      item: '',
      planDetailList: [],
      maxDay: 0,
      monthDayList: [],
      planWorkerList: [],
      fullName: '',
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
    this.goSearch()
    this.getPlanWorkerList()
  },
  methods: {
    async goSearch() {
      await this.getPlanDetailList()
      const date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
      this.maxDay = date.getDate()
      const monthDayList = []
      date.setDate(1)
      const week = date.getDay()
      console.log(week)
      for (let i = 1; i <= this.maxDay; i++) {
        monthDayList.push(i)
      }
      this.planDetailList.forEach(item => {
        const dateStr = item.scheduleDate
        const day = dateStr.substring(8)
        monthDayList[day - 1] = item
      })
      if (week !== 7) {
        for (let i = 1; i <= week; i++) {
          monthDayList.unshift('.')
        }
      }
      this.monthDayList = monthDayList
    },
    highlightDay(item) {
      console.log(item)
      this.item = item
    },
    async deletePlanWorker(scheduleName, fullName, mobile) {
      const result = await get(END_POINTS.DELETE_PLAN_WORKER, {
        scheduleDate: this.item.scheduleDate,
        scheduleName,
        fullName,
        mobile
      })
      if (result.code === 2000) {
        this.$Message.success({
          content: this.$t('monitor.success')
        })
        this.goSearch()
      }
    },
    async addPlanWorker(scheduleName) {
      const worker = this.planWorkerList.find(worker => worker.fullName === this.fullName)
      const result = await get(END_POINTS.ADD_PLAN_WORKER, {
        scheduleDate: this.item.scheduleDate,
        scheduleName,
        fullName: worker.fullName,
        mobile: worker.mobile
      })
      if (result.code === 2000) {
        this.$Message.success({
          content: this.$t('monitor.success')
        })
        this.goSearch()
      }
    },
    async getPlanDetailList() {
      const result = await get(END_POINTS.GET_PLAN_DETAIL_LIST + `?queryMonth=${dateFormat(this.date, 'yyyy-MM')}`)
      if (result.code === 2000) this.planDetailList = result.data
    },
    async getPlanWorkerList() {
      const result = await get(END_POINTS.GET_PLAN_WORKER_LIST)
      if (result) this.planWorkerList = result.data
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

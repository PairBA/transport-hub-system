<template>
    <div class="watchDutySchedule__homePage">
      <PairBreadcrumb :title="title"/>
      <div class="watchDutySchedule__homePage-content">
        <DatePicker v-model="date" type="month" :clearable="false" @on-change="goSearch" style="width: 200px;margin-bottom: 24px"></DatePicker>
        <Button type="primary" @click="goSearch" style="margin-left: 24px">查询</Button>
        <Row :gutter="24">
          <Col span="18" class="table">
            <Row :gutter="8">
              <Col v-for="(singleDay, index) in monthDayList" :key="index" @click.native="highlightDay(singleDay)">
                <div class="item" :class="{ 'item-active' : singleDay.scheduleDate === item.scheduleDate, 'item-hidden' : !singleDay.scheduleDate}">
                  <div class="calender-num" :class="{ 'calender-num-active' : singleDay.scheduleDate === item.scheduleDate}">
                    {{singleDay.scheduleDate.substring(8)}}
                    <img class="today" v-if="dateFormat(todayTime, 'yyyy-MM-dd') === singleDay.scheduleDate" src="../../../img/today-tag.png"/>
                  </div>
                  <div style="padding: 8px" >
                    <div v-for="(oneItem, indexForOne) in singleDay.scheduleDetailList" :key="`singleDay_${indexForOne}`">
                      <div style="font-size: 12px; color: #4A5158">{{oneItem.scheduleName}}</div>
                      <div v-if="oneItem.scheduleWorkerList">
                        <span :style="{ color: singleDay.scheduleDate === item.scheduleDate ? '#338FF4' : '#374254', fontSize: '14px', fontWeight: 600 }" v-for="worker in oneItem.scheduleWorkerList" :key="worker.fullName">
                      {{worker.fullName}}
                        </span>
                      </div>
                      <div style="color: #A8AAB7; font-size: 14px" v-else>
                        暂无排班
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span="6" class="single-item content__card">
            <img style="float: left;width: 15px;margin-top: 4px;margin-right: 8px" src="../../../img/icon/calendar.png"/>
            <div style="color:rgba(108,117,125,1);font-size:16px;font-weight: 500">{{item.scheduleDate}}</div>
            <Divider/>
            <div v-for="detail in item.scheduleDetailList" :key="detail.scheduleName">
              <span style="font-size:14px;color:rgba(55,66,84,1);font-weight: 500">{{detail.scheduleName}}</span>
              <div v-for="(worker, index) in detail.scheduleWorkerList" :key="`worker_one${index}`" class="worker">
                {{worker.fullName}}{{worker.mobile}}<img src="../../../img/common/delete-icon.png" class="icon" @click="deletePlanWorker(detail.scheduleName, worker.fullName, worker.mobile)"/>
              </div>
              <Poptip placement="bottom-start">
                <Button icon="md-add" long style="margin-top: 12px;margin-bottom: 12px">新增值班人员</Button>
                <div slot="content">
                  <Select v-model="fullName"
                          placeholder="请选择人员"
                          filterable
                          @on-change="addPlanWorker(detail.scheduleName)">
                    <Option v-for="(workerTwo, indexTwo) in planWorkerList"
                            :value="workerTwo.fullName"
                            :key="`worker_two${indexTwo}`">
                      {{ workerTwo.fullName }} {{ workerTwo.mobile }}
                    </Option>
                  </Select>
                </div>
              </Poptip>
            </div>
          </Col>
        </Row>
      </div>
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
      todayTime: new Date(),
      date: new Date(),
      item: '',
      planDetailList: [],
      scheduleList: [],
      maxDay: 0,
      monthDayList: [],
      planWorkerList: [],
      fullName: ''
    }
  },
  computed: {
    title() {
      return this.$route.name
    }
  },
  async mounted() {
    await this.getScheduleList()
    await this.goSearch()
    const today = dateFormat(new Date(), 'yyyy-MM-dd')
    this.item = this.monthDayList.find(day => day.scheduleDate === today)
    this.getPlanWorkerList()
  },
  methods: {
    dateFormat(date, format) {
      return dateFormat(date, format)
    },
    async goSearch() {
      await this.getPlanDetailList()
      const date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
      this.maxDay = date.getDate()
      const monthDayList = []
      date.setDate(1)
      let week = date.getDay()
      for (let i = 1; i <= this.maxDay; i++) {
        let scheduleDate = dateFormat(this.date, 'yyyy-MM')
        if (i < 10) {
          scheduleDate = scheduleDate + '-0' + i
        } else scheduleDate = scheduleDate + '-' + i
        monthDayList.push({
          scheduleDate,
          scheduleDetailList: this.scheduleList
        })
      }
      this.planDetailList.forEach(item => {
        const dateStr = item.scheduleDate
        const day = dateStr.substring(8)
        const scheduleDetailListSet = item.scheduleDetailList
        const scheduleListCombine = this.scheduleList.map(itemTwo => {
          const haveSetItem = scheduleDetailListSet.find(itemThree => itemTwo.scheduleName === itemThree.scheduleName)
          return haveSetItem || itemTwo
        })
        item.scheduleDetailList = scheduleListCombine
        monthDayList[day - 1] = item
      })
      if (week === 0) week = 7
      if (week !== 1) {
        for (let i = 1; i < week; i++) {
          monthDayList.unshift({
            scheduleDate: ''
          })
        }
      }
      this.monthDayList = monthDayList
    },
    highlightDay(item) {
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
        await this.goSearch()
        const highlightItem = this.monthDayList.find(day => day.scheduleDate === this.item.scheduleDate)
        this.item = highlightItem
      }
    },
    async addPlanWorker(scheduleName) {
      const worker = this.planWorkerList.find(worker => worker.fullName === this.fullName)
      if (!worker) return
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
        await this.goSearch()
        const highlightItem = this.monthDayList.find(day => day.scheduleDate === this.item.scheduleDate)
        this.item = highlightItem
      }
      this.fullName = ''
    },
    async getPlanDetailList() {
      const result = await get(END_POINTS.GET_PLAN_DETAIL_LIST + `?queryMonth=${dateFormat(this.date, 'yyyy-MM')}`)
      if (result.code === 2000) this.planDetailList = result.data
      else this.planDetailList = []
    },
    async getPlanWorkerList() {
      const result = await get(END_POINTS.GET_PLAN_WORKER_LIST)
      if (result) this.planWorkerList = result.data
    },
    async getScheduleList() {
      const result = await get(END_POINTS.GET_SCHEDULE_LIST)
      if (result.success) this.scheduleList = result.data
    }
  }
}
</script>

<style lang="less">
@import '../../../theme/customized.less';
.watchDutySchedule__homePage {
  .watchDutySchedule__homePage-content {
    padding: 24px;
  }
  .table {
    overflow-y: scroll;
    height: @watch-duty__content--height;
    .ivu-col {
      width: 14.2857%;
      float: left;
      -webkit-box-flex: 0;
      -ms-flex: 0 0 auto;
      flex: 0 0 auto;
    }
  }
  .item {
    height: 140px;
    background-color: white;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 8px;
  }
  .item-active {
    border: 1px solid rgba(51,143,244,1);
  }
  .item-hidden {
    background-color: transparent;
    border: none;
  }
  .calender-num {
    font-size:30px;
    font-family:DIN-Bold;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:36px;
    text-align: right;
    background-image: url("../../../img/calendar.png");
    background-repeat: no-repeat;
    background-size: 100%;
    padding-right: 8px;
  }
  .calender-num-active {
    background-image: url("../../../img/calendar-light.png");
  }
  .single-item {
    padding: 20px 16px;
    .ivu-divider-horizontal{
      margin: 16px 0;
    }
    .icon {
      color: #AAB5C8;
      float: right;
      font-size: 16px;
      cursor: pointer;
      width: 16px;
    }
  }
  .worker {
    background:#F5F8FF;
    border-radius:2px;
    padding: 6px 14px;
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(102,117,141,1);
    margin-top: 12px;
    &:hover {
      background:#D8DEEB;
    }
  }
  .ivu-poptip {
    width: 100%;
    .ivu-poptip-rel {
      width: 100%;
    }
  }
  .today {
    height: 36px;
    position: absolute;
    left: 4px;
  }
}
</style>

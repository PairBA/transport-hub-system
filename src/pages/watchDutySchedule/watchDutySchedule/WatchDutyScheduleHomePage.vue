<template>
    <div class="watchDutySchedule__homePage">
      <Row>
        <Col span="18" class="table">
          <DatePicker v-model="date" type="month" style="width: 200px"></DatePicker>
          <Button type="primary" @click="goSearch" style="margin-left: 24px">查询</Button>
          <Row :gutter="8" style="margin-top: 24px">
            <Col v-for="(singleDay, index) in monthDayList" :key="index" @click.native="highlightDay(singleDay)">
              <div class="item">
                <div class="calender-num">
                  {{singleDay.scheduleDate.substring(8)}}
                </div>
                <div style="padding: 8px" >
                  <div v-if="singleDay.scheduleDetailList && singleDay.scheduleDetailList.length">
                    <div v-for="(oneItem, indexForOne) in singleDay.scheduleDetailList" :key="`singleDay_${indexForOne}`">
                      <div style="font-size: 12px">{{oneItem.scheduleName}}</div>
                      <span style="font-size: 14px; font-weight: 600" v-for="worker in oneItem.scheduleWorkerList" :key="worker.fullName">
                      {{worker.fullName}}
                    </span>
                    </div>
                  </div>
                  <div v-else>
                    暂无排班
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span="6" class="single-item content__card">
          <div style="color:rgba(108,117,125,1);font-size:16px;">{{item.scheduleDate}}</div>
          <Divider/>
          <div v-for="detail in item.scheduleDetailList" :key="detail.scheduleName">
            <span style="font-size:14px;color:rgba(55,66,84,1);font-weight: 500">{{detail.scheduleName}}</span>
            <div v-for="worker in detail.scheduleWorkerList" :key="worker.fullName" class="worker">
              {{worker.fullName}}{{worker.mobile}}<Icon type="ios-close-circle-outline" class="icon" @click="deletePlanWorker(detail.scheduleName, worker.fullName, worker.mobile)"/>
            </div>
            <Poptip placement="bottom">
              <Button icon="md-add" long style="margin-top: 12px;margin-bottom: 12px">新增值班人员</Button>
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
      // const week = date.getDay()
      for (let i = 1; i <= this.maxDay; i++) {
        let scheduleDate = dateFormat(this.date, 'yyyy-MM')
        if (i < 10) {
          scheduleDate = scheduleDate + '-0' + i
        } else scheduleDate = scheduleDate + '-' + i
        monthDayList.push({
          scheduleDate,
          scheduleDetailList: []
        })
      }
      this.planDetailList.forEach(item => {
        const dateStr = item.scheduleDate
        const day = dateStr.substring(8)
        monthDayList[day - 1] = item
      })
      // if (week !== 7) {
      //   for (let i = 1; i <= week; i++) {
      //     monthDayList.unshift({
      //       scheduleDate: '.'
      //     })
      //   }
      // }
      console.log(monthDayList)
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
  padding: 24px;
  .table {
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
    }
  }
  .worker {
    background:rgba(245,248,255,1);
    border-radius:2px;
    padding: 6px 14px;
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(102,117,141,1);
    margin-top: 12px;
  }
  .ivu-poptip {
    width: 100%;
    .ivu-poptip-rel {
      width: 100%;
    }
  }
}
</style>

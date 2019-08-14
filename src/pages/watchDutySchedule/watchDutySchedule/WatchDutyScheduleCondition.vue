<template>
  <div class="watchDutySchedule__condition">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="日期">
          <DatePicker v-model="date" type="month" :clearable="false" @on-change="goSearch" style="width: 200px;margin-bottom: 24px"></DatePicker>
        </FormItem>
        <Divider/>
        <Button type="primary"
                @click="goSearch">
          {{$t("sysManage.queryBar.searchBT")}}
        </Button>
        <Divider/>
        <div>
          <Button @click="exportModel" style="float: right">
            模版导出
          </Button>
          <Upload id="uploadFile" name="uploadFile"
                  :action="importUrl"
                  :headers="headers">
            <Button>数据导入</Button>
          </Upload>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
import { dateFormat } from '@/utils'
import {
  END_POINTS
} from '@/api'
import cloneDeep from 'clone-deep'
const baseUrl = process.env.VUE_APP_BASE_URL
export default {
  data() {
    return {
      importUrl: `${baseUrl + END_POINTS.UPLOAD_WORKER_LIST}`,
      headers: {
        'x-me-token': localStorage.getItem('hub-token')
      }
    }
  },
  computed: {
    date: {
      get() {
        return this.$store.state.watchDutySchedule.date
      },
      set(value) {
        this.$store.commit('watchDutySchedule/updateDate', value)
      }
    },
    scheduleList() {
      return this.$store.state.watchDutySchedule.scheduleList
    },
    planDetailList() {
      return this.$store.state.watchDutySchedule.planDetailList
    },
    monthDayList: {
      get() {
        return this.$store.state.watchDutySchedule.monthDayList
      },
      set(value) {
        this.$store.commit('watchDutySchedule/updateMonthDayList', value)
      }
    }
  },
  methods: {
    async goSearch() {
      await this.$store.dispatch('watchDutySchedule/getPlanDetailList')
      const date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
      const maxDay = date.getDate()
      const monthDayList = []
      date.setDate(1)
      let week = date.getDay()
      for (let i = 1; i <= maxDay; i++) {
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
        const cloneItem = cloneDeep(item)
        cloneItem.scheduleDetailList = scheduleListCombine
        monthDayList[day - 1] = cloneItem
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
    exportModel() {
      window.location.href = 'https://ossapi.paircity.com/template/%E5%80%BC%E7%8F%AD%E8%A1%A8%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
    }
  }
}
</script>

<style lang="less">
.watchDutySchedule__condition {
}
</style>

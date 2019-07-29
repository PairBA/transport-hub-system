<template>
  <div class="traffic-flow-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="闸口：">
          <Select v-model="gateName"
                  placeholder="请选择闸口">
            <Option value="">全部</Option>
            <Option value="T1">T1</Option>
            <Option value="T2">T2</Option>
          </Select>
        </FormItem>
        <FormItem label="统计方式：">
          <Select v-model="countType"
                  placeholder="请选择统计方式">
            <Option value="HOUR">按小时</Option>
            <Option value="DAY">按天</Option>
          </Select>
        </FormItem>
        <FormItem label="开始时间：">
          <DatePicker v-model="startDate"
                      type="date"
                      format="yyyy/MM/dd"
                      placeholder="请选择日期"
                      style="float: left;"
                      :clearable="false"
                      :editable="false"
                      :options="options">
          </DatePicker>
          <TimePicker v-model="startTime"
                      type="time"
                      format="HH:mm"
                      placeholder="请选择时间"
                      style="float: right;"
                      :disabled-minutes="disabledMinutes"
                      :disabled="!isHour"
                      :clearable="false"
                      :editable="false">
          </TimePicker>
        </FormItem>
        <FormItem label="结束时间：">
          <DatePicker v-model="endDate"
                      type="date"
                      format="yyyy/MM/dd"
                      placeholder="请选择日期"
                      style="float: left;"
                      :clearable="false"
                      :editable="false"
                      :options="options">
          </DatePicker>
          <TimePicker v-model="endTime"
                      type="time"
                      format="HH:mm"
                      placeholder="请选择时间"
                      style="float: right;"
                      :disabled-minutes="disabledMinutes"
                      :disabled="!isHour"
                      :clearable="false"
                      :editable="false">
          </TimePicker>
        </FormItem>
        <Divider/>
        <div style="text-align: center;">
          <Button type="primary"
                  @click="goSearch">
            查询
          </Button>
          <Button type="primary"
                  style="margin-left: 24px;"
                  @click="exportExcel">
            导出excel
          </Button>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
import { dateFormat } from '@/utils'
export default {
  data() {
    const disabledMinutes = []
    for (let i = 0; i < 60; i++) {
      disabledMinutes.push(i)
    }
    return {
      disabledMinutes: disabledMinutes,
      isHour: true,
      gateName: '',
      countType: 'HOUR',
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      startTime: '00:00',
      endDate: new Date(),
      endTime: dateFormat(new Date(), 'hh') + ':00',
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  computed: {
    tableListObject() {
      return this.$store.state.search.traFloObj.tableListObject
    }
  },
  watch: {
    countType: 'watchCountType'
  },
  methods: {
    watchCountType() {
      this.$store.commit('search/updateTraFloObjCountType', this.countType)
      if (this.countType === 'HOUR') { // 按小时统计
        this.isHour = true
      } else if (this.countType === 'DAY') { // 按天统计
        this.isHour = false
      }
    },
    goSearch() {
      this.getTrafficFlowInfo()
    },
    async getTrafficFlowInfo() {
      this.$store.commit('search/updateShowSpin', true)
      this.$store.commit('search/updateTraFloObjShowEchart', false)
      this.$store.commit('search/updateTraFloObjTableListObjectCurrentPage', 1)
      this.$store.commit('search/updateTraFloObjTableListObjectTotal', 0)
      this.$store.commit('search/updateTraFloObjTableListObjectPageSize', 10)
      const result = await get(END_POINTS.GET_VEHICLE_FLOW_COUNT, {
        hubCode: localStorage.getItem('hubCode'),
        gateName: this.gateName,
        countType: this.countType,
        startTime: dateFormat(new Date(this.startDate), 'yyyy-MM-dd') + ' ' + this.startTime + ':00',
        endTime: dateFormat(new Date(this.endDate), 'yyyy-MM-dd') + ' ' + this.endTime + ':00'
      })
      if (result.code === 2001) {
        // 开始构造echarts数据
        this.$store.commit('search/updateTraFloObjEchartsInfo', null)
        this.$store.commit('search/updateTraFloObjGateVehicleNum', 0)
        this.$store.commit('search/updateTraFloObjNormalVehicleNum', 0)
        let xAxis = []
        let yGate = []
        let yNormal = []
        let gateVehicleNum = 0
        let normalVehicleNum = 0
        result.data.forEach(item => {
          if (this.countType === 'HOUR') { // 按小时统计
            xAxis.push(dateFormat(new Date(item.time), 'yyyy-MM-dd hh:mm'))
          } else if (this.countType === 'DAY') { // 按天统计
            xAxis.push(dateFormat(new Date(item.time), 'yyyy-MM-dd'))
          }
          yGate.push(item.gateVehicle)
          yNormal.push(item.normalVehicle)
          gateVehicleNum = gateVehicleNum + item.gateVehicle
          normalVehicleNum = normalVehicleNum + item.normalVehicle
        })
        this.$store.commit('search/updateTraFloObjGateVehicleNum', gateVehicleNum)
        this.$store.commit('search/updateTraFloObjNormalVehicleNum', normalVehicleNum)
        this.$store.commit('search/updateTraFloObjEchartsInfo', {
          xAxis: xAxis,
          yGate: yGate,
          yNormal: yNormal
        })
        // 构造echarts数据结束
        // 构造表格前端分页数据开始
        this.doViewPage(result.data)
        // 构造表格前端分页数据结束
      } else {
        if (result.code === 2006) {
          this.$Message.warning({
            content: result.msg + '！'
          })
        }
        this.$store.commit('search/updateTraFloObjTableListObjectTableList', []) // 表格数据
        this.$store.commit('search/updateTraFloObjTableListObjectShowTableList', []) // 表格展示的数据
        this.$store.commit('search/updateTraFloObjEchartsInfo', null) // 图表对象
      }
      this.$store.commit('search/updateTraFloObjShowEchart', true)
      this.$store.commit('search/updateShowSpin', false)
    },
    doViewPage(data) {
      this.$store.commit('search/updateTraFloObjTableListObjectTableList', data) // 表格数据
      this.$store.commit('search/updateTraFloObjTableListObjectTotal', data.length) // 数据总数
      this.$store.commit('search/updateTraFloObjTableListObjectTotalPage',
        Math.ceil(this.tableListObject.total / this.tableListObject.pageSize)
      )
      // 当前页不大于总页数
      if (this.tableListObject.currentPage <= this.tableListObject.totalPage) {
        let showTableList = [] // 显示的列表
        for (let i = this.tableListObject.pageSize * (this.tableListObject.currentPage - 1) + 1;
          i <= ((this.tableListObject.total > this.tableListObject.pageSize * this.tableListObject.currentPage)
            ? (this.tableListObject.pageSize * this.tableListObject.currentPage) : (this.tableListObject.total));
          i++) {
          showTableList.push(this.tableListObject.tableList[i - 1])
        }
        this.$store.commit('search/updateTraFloObjTableListObjectShowTableList', showTableList)
      }
    },
    async exportExcel() {
      const token = localStorage.getItem('token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      const url = END_POINTS.GET_VEHICLE_FLOW_COUNT_EXCEL +
        '?gateName=' + this.gateName +
        '&countType=' + this.countType +
        '&hubCode=' + localStorage.getItem('hubCode') +
        '&startTime=' + dateFormat(new Date(this.startDate), 'yyyy-MM-dd') + ' ' + this.startTime + ':00' +
        '&endTime=' + dateFormat(new Date(this.endDate), 'yyyy-MM-dd') + ' ' + this.endTime + ':00' +
        '&x-me-token=' + token
      // window.location.href = `${baseUrl}${url}`
      window.open(`${baseUrl}${url}`)
    }
  },
  mounted() {
    this.getTrafficFlowInfo()
  }
}
</script>

<style lang="less">
.traffic-flow-search {
  .ivu-date-picker {
    width: 49%;
  }
}
</style>

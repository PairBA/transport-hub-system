<template>
  <div class="traffic-flow-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="交通枢纽：">
          <Select v-model="hubCode"
                  :placeholder="'请输入交通枢纽'">
            <Option v-for="item in hubList"
                    :key="`traFlo_${item.hubCode}`"
                    :value="item.hubCode">
              {{ item.hubName }}
            </Option>
          </Select>
        </FormItem>
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
                      :steps="[1, 60]"
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
                      :steps="[1, 60]"
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
import cloneDeep from 'clone-deep'
import { dateFormat, downloadFile } from '@/utils'
export default {
  data() {
    const disabledMinutes = []
    for (let i = 0; i < 60; i++) {
      disabledMinutes.push(i)
    }
    return {
      disabledMinutes: disabledMinutes,
      isHour: true,
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
    hubCode: {
      set(value) {
        this.$store.commit('updateHubCode', value)
      },
      get() {
        return this.$store.state.hubCode
      }
    },
    hubList() {
      return localStorage.getItem('hubCodeAndNameList').split(';').map(hub => {
        const hubArr = hub.split(',')
        return {
          hubCode: hubArr[0],
          hubName: hubArr[1]
        }
      })
    },
    gateName: {
      get() {
        return this.$store.state.gateVehicleSearch.gateName
      },
      set(value) {
        this.$store.commit('gateVehicleSearch/updateGateName', value)
      }
    },
    tableListObject() {
      return this.$store.state.search.traFloObj.tableListObject
    }
  },
  watch: {
    countType: 'watchCountType'
  },
  methods: {
    watchCountType() {
      if (this.countType === 'HOUR') { // 按小时统计
        this.isHour = true
      } else if (this.countType === 'DAY') { // 按天统计
        this.isHour = false
      }
    },
    goSearch() {
      this.getTrafficFlowInfo()
      this.$store.commit('search/updateTraFloObjCountType', this.countType)
    },
    async getTrafficFlowInfo() {
      this.$store.commit('search/updateShowSpin', true)
      this.$store.commit('search/updateTraFloObjShowEchart', false)
      this.$store.commit('search/updateTraFloObjTableListObjectCurrentPage', 1)
      this.$store.commit('search/updateTraFloObjTableListObjectTotal', 0)
      this.$store.commit('search/updateTraFloObjTableListObjectPageSize', 10)
      let gateName = typeof this.gateName === 'undefined' ? '' : this.gateName
      const result = await get(END_POINTS.GET_VEHICLE_FLOW_COUNT, {
        hubCode: this.hubCode,
        gateName: gateName,
        countType: this.countType,
        startTime: dateFormat(new Date(this.startDate), 'yyyy-MM-dd') + ' ' + this.startTime + ':00',
        endTime: dateFormat(new Date(this.endDate), 'yyyy-MM-dd') + ' ' + this.endTime + ':00'
      })
      if (result.code === 2001) {
        // 开始构造echarts数据
        this.$store.commit('search/updateTraFloObjEchartsInfo', null)
        this.$store.commit('search/updateTraFloObjGateVehicleNum', 0)
        this.$store.commit('search/updateTraFloObjNormalVehicleNum', 0)
        let xAxis = [] // 时间轴
        let yGate = [] // 闸口车辆
        let yNormal = [] // 发车量
        let yExp = [] // 异常车次
        let yOutAvl = [] // 空车出场车次
        let gateVehicleNum = 0
        let normalVehicleNum = 0
        let countExpVehicleNum = 0
        let sumOutAvlNum = 0
        result.data.forEach(item => {
          if (this.countType === 'HOUR') { // 按小时统计
            xAxis.push(dateFormat(new Date(item.time), 'yyyy-MM-dd hh:mm'))
          } else if (this.countType === 'DAY') { // 按天统计
            xAxis.push(dateFormat(new Date(item.time), 'yyyy-MM-dd'))
          }
          yGate.push(item.gateVehicle)
          yNormal.push(item.sumOutHired) // 以重车出场代替正常发车量-BY 文勇
          yExp.push(item.countExpVehicle)
          yOutAvl.push(item.sumOutAvl)
          gateVehicleNum += item.gateVehicle
          normalVehicleNum += item.sumOutHired
          countExpVehicleNum += item.countExpVehicle
          sumOutAvlNum += item.sumOutAvl
        })
        this.$store.commit('search/updateTraFloObjGateVehicleNum', gateVehicleNum)
        this.$store.commit('search/updateTraFloObjNormalVehicleNum', normalVehicleNum)
        this.$store.commit('search/updateTraFloObjCountExpVehicleNum', countExpVehicleNum)
        this.$store.commit('search/updateTraFloObjSumOutAvlNum', sumOutAvlNum)
        this.$store.commit('search/updateTraFloObjEchartsInfo', {
          xAxis: xAxis,
          yGate: yGate,
          yNormal: yNormal,
          yExp: yExp,
          yOutAvl: yOutAvl
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
        // 显示的列表
        let showTableList = []
        // 用 reverse 反转数组
        let tableList = cloneDeep(this.tableListObject.tableList).reverse()
        for (let i = this.tableListObject.pageSize * (this.tableListObject.currentPage - 1) + 1;
          i <= ((this.tableListObject.total > this.tableListObject.pageSize * this.tableListObject.currentPage)
            ? (this.tableListObject.pageSize * this.tableListObject.currentPage) : (this.tableListObject.total));
          i++) {
          showTableList.push(tableList[i - 1])
        }
        this.$store.commit('search/updateTraFloObjTableListObjectShowTableList', showTableList)
      }
    },
    async exportExcel() {
      const token = localStorage.getItem('hub-token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      let gateName = typeof this.gateName === 'undefined' ? '' : this.gateName
      const url = END_POINTS.GET_VEHICLE_FLOW_COUNT_EXCEL +
        '?gateName=' + gateName +
        '&countType=' + this.countType +
        '&hubCode=' + this.hubCode +
        '&startTime=' + dateFormat(new Date(this.startDate), 'yyyy-MM-dd') + ' ' + this.startTime + ':00' +
        '&endTime=' + dateFormat(new Date(this.endDate), 'yyyy-MM-dd') + ' ' + this.endTime + ':00' +
        '&x-me-token=' + token + '&me-api-type=hubmanager'
      downloadFile(`${baseUrl}${url}`)
    }
  },
  mounted() {
    if (!this.hubCode) {
      this.$store.commit('updateHubCode', this.hubList[0].hubCode)
    }
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

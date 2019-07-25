<template>
  <div class="traffic-flow-home-page">
    <ContentLayout :showSpin="showSpin">
      <div slot="searchCondition">
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
          <div>
            <Button type="primary"
                    style="float: left;"
                    @click="goSearch">
              查询
            </Button>
            <Button type="primary"
                    style="float: right;"
                    @click="exportExcel">
              导出excel
            </Button>
          </div>
        </Form>
      </div>
      <div slot="content">
        <TableWrapper>
          <div style="width: 100%;">
            <PairECharts v-if="showEchart"
                         id="trafficFlowECharts"
                         :title="trafficFlowECharts.title"
                         :xAxis="trafficFlowECharts.xAxis"
                         :yAxis="trafficFlowECharts.yAxis"
                         :tooltip="trafficFlowECharts.tooltip"
                         :series="trafficFlowECharts.series"
                         :grid="trafficFlowECharts.grid"
                         :color="trafficFlowECharts.color"
                         :legend="trafficFlowECharts.legend"
                         style="height: 300px;width: 100%;">
            </PairECharts>
          </div>
        </TableWrapper>
        <TableWrapper style="margin-top: 24px;">
          <div>
            <div>
              <span class="traffic-flow-count-info-span">
                闸口车辆总数：{{gateVehicleNum}}（车次）
              </span>
              <span class="traffic-flow-count-info-span">
                发车量总数：{{normalVehicleNum}}（车次）
              </span>
            </div>
            <div>
              <Table :columns="columns"
                     :data="tableListObject.showTableList">
              </Table>
              <PairPage id="trafficFlowListPage"
                        :total="tableListObject.total"
                        :current="tableListObject.currentPage"
                        :page-size="tableListObject.pageSize"
                        @on-change="getPage"
                        @on-page-size-change="changeSize">
              </PairPage>
            </div>
          </div>
        </TableWrapper>
      </div>
    </ContentLayout>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
import { dateFormat } from '@/utils'
export default {
  components: {
  },
  data() {
    const disabledMinutes = []
    for (let i = 0; i < 60; i++) {
      disabledMinutes.push(i)
    }
    return {
      disabledMinutes: disabledMinutes,
      showSpin: false,
      isHour: true,
      showEchart: false,
      gateName: '',
      countType: 'HOUR',
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      startTime: '00:00',
      endDate: new Date(),
      endTime: dateFormat(new Date(), 'hh') + ':00',
      echartsInfo: null, // echarts的数据
      gateVehicleNum: 0, // 总闸口车辆数
      normalVehicleNum: 0, // 总发车辆
      tableListObject: { // 前端分页的表格数据对象
        tableList: [],
        showTableList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0
      },
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '时间',
          key: 'time',
          tooltip: true,
          render: (h, params) => {
            // console.log(params)
            let time = params.row.time
            let content = ''
            if (this.countType === 'HOUR') {
              content = dateFormat(new Date(time), 'yyyy-MM-dd hh:mm')
            } else {
              content = dateFormat(new Date(time), 'yyyy-MM-dd')
            }
            return h('span', content)
          }
        },
        {
          title: '闸口车辆数',
          key: 'gateVehicle',
          tooltip: true
        },
        {
          title: '发车量',
          key: 'normalVehicle',
          tooltip: true
        }
      ]
    },
    trafficFlowECharts() {
      return {
        xAxis: {
          type: 'category',
          data: this.echartsInfo ? this.echartsInfo.xAxis : [],
          name: '时间',
          boundaryGap: false,
          nameTextStyle: {
            fontSize: 16
          },
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          nameGap: 16,
          type: 'value',
          name: '车次',
          nameTextStyle: {
            fontSize: 16
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          enterable: true,
          axisPointer: {
            animation: false
          },
          formatter: params => {
            // console.log(params)
            let title = params[0].axisValue + '<br />'
            let content = params[0].marker + '闸口车辆数：' + params[0].data + ' （车次）<br />' +
                          params[1].marker + '发车量：' + params[1].data + ' （车次）'
            return `${title}${content}`
          }
        },
        legend: {
          data: ['闸口车辆数', '发车量'],
          right: '20%'
        },
        grid: {
          left: '4%',
          right: '12%',
          top: 60,
          bottom: 30,
          containLabel: true
        },
        series: [
          {
            name: '闸口车辆数',
            type: 'line',
            smooth: false,
            color: '#6BB523',
            showSymbol: false,
            hoverAnimation: false,
            // symbolSize: 25,
            lineStyle: {
              width: 3
            },
            data: this.echartsInfo ? this.echartsInfo.yGate : []
          },
          {
            name: '发车量',
            type: 'line',
            smooth: false,
            color: '#1F88E5',
            showSymbol: false,
            hoverAnimation: false,
            // symbolSize: 25,
            lineStyle: {
              width: 3
            },
            data: this.echartsInfo ? this.echartsInfo.yNormal : []
          }
        ]
      }
    }
  },
  async mounted() {
    this.getTrafficFlowInfo()
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
    getPage(currentPage) {
      this.tableListObject.currentPage = currentPage
      this.doViewPage(this.tableListObject.tableList)
    },
    changeSize(pageSize) {
      this.tableListObject.pageSize = pageSize
      this.getPage(1)
    },
    goSearch() {
      this.getTrafficFlowInfo()
    },
    async getTrafficFlowInfo() {
      this.showSpin = true
      this.showEchart = false
      this.tableListObject.currentPage = 1
      this.tableListObject.total = 0
      this.tableListObject.pageSize = 10
      const result = await get(END_POINTS.GET_VEHICLE_FLOW_COUNT, {
        hubCode: localStorage.getItem('hubCode'),
        gateName: this.gateName,
        countType: this.countType,
        startTime: dateFormat(new Date(this.startDate), 'yyyy-MM-dd') + ' ' + this.startTime + ':00',
        endTime: dateFormat(new Date(this.endDate), 'yyyy-MM-dd') + ' ' + this.endTime + ':00'
      })
      if (result.code === 2001) {
        // 开始构造echarts数据
        this.echartsInfo = null
        this.gateVehicleNum = 0
        this.normalVehicleNum = 0
        let xAxis = []
        let yGate = []
        let yNormal = []
        result.data.forEach(item => {
          if (this.countType === 'HOUR') { // 按小时统计
            xAxis.push(dateFormat(new Date(item.time), 'yyyy-MM-dd hh:mm'))
          } else if (this.countType === 'DAY') { // 按天统计
            xAxis.push(dateFormat(new Date(item.time), 'yyyy-MM-dd'))
          }
          yGate.push(item.gateVehicle)
          yNormal.push(item.normalVehicle)
          this.gateVehicleNum = this.gateVehicleNum + item.gateVehicle
          this.normalVehicleNum = this.normalVehicleNum + item.normalVehicle
        })
        this.echartsInfo = {
          xAxis: xAxis,
          yGate: yGate,
          yNormal: yNormal
        }
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
        this.tableListObject.tableList = []
        this.tableListObject.showTableList = []
        this.echartsInfo = null
      }
      this.showEchart = true
      this.showSpin = false
    },
    doViewPage(data) {
      this.tableListObject.tableList = data // 表格数据
      this.tableListObject.total = data.length // 数据总数
      this.tableListObject.totalPage = Math.ceil(this.tableListObject.total / this.tableListObject.pageSize) // 总页数
      // 当前页不大于总页数
      if (this.tableListObject.currentPage <= this.tableListObject.totalPage) {
        this.tableListObject.showTableList = [] // 清空显示的列表
        for (let i = this.tableListObject.pageSize * (this.tableListObject.currentPage - 1) + 1;
          i <= ((this.tableListObject.total > this.tableListObject.pageSize * this.tableListObject.currentPage) ? (this.tableListObject.pageSize * this.tableListObject.currentPage) : (this.tableListObject.total));
          i++) {
          this.tableListObject.showTableList.push(this.tableListObject.tableList[i - 1])
        }
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
      window.location.href = `${baseUrl}${url}`
    }
  }
}
</script>

<style lang="less">
.traffic-flow-home-page {
  .ivu-date-picker {
    width: 49%;
  }
  .traffic-flow-count-info-span {
    font-size: 16px;
    height: 32px;
    padding: 6px 12px;
    line-height: 32px;
    font-weight: 500;
    &:last-child {
      margin-left: 24px;
    }
  }
}
</style>

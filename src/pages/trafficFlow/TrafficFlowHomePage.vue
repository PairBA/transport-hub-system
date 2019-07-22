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
                        placeholder="请选择日期">
            </DatePicker>
            <TimePicker v-model="startTime"
                        type="time"
                        format="HH:mm"
                        placeholder="请选择时间">
            </TimePicker>
          </FormItem>
          <FormItem label="结束时间：">
            <DatePicker v-model="endDate"
                        type="date"
                        placeholder="请选择日期">
            </DatePicker>
            <TimePicker v-model="endTime"
                        type="time"
                        format="HH:mm"
                        placeholder="请选择时间">
            </TimePicker>
          </FormItem>
          <Divider/>
          <Button type="primary"
                  @click="goSearch">
            查询
          </Button>
          <Button type="success"
                  @click="exportExcel">
            导出excel
          </Button>
        </Form>
      </div>
      <div slot="content">
        <div>
          <PairECharts id="trafficFlowECharts"
                       :title="trafficFlowECharts.title"
                       :xAxis="trafficFlowECharts.xAxis"
                       :yAxis="trafficFlowECharts.yAxis"
                       :tooltip="trafficFlowECharts.tooltip"
                       :series="trafficFlowECharts.series"
                       :grid="trafficFlowECharts.grid"
                       :color="trafficFlowECharts.color"
                       style="height: 300px;width: 100%">
          </PairECharts>
        </div>
        <div>
          <div>
            <span>闸口车辆总数：{{gateVehicleNum}}（车次）</span>
            <span>发车总车次：{{normalVehicleNum}}（车次）</span>
          </div>
          <div>
            <Table :columns="columns"
                   :data="tableList">
            </Table>
          </div>
        </div>
      </div>
    </ContentLayout>
  </div>
</template>

<script>
import {
  get,
  END_POINTS
} from '@/api'

import { dateFormat } from '@/utils'

export default {
  components: {
  },
  data() {
    return {
      showSpin: false,
      gateName: '',
      countType: 'HOUR',
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      startTime: '00:00',
      endDate: new Date(),
      endTime: '00:00',
      echartsInfo: null, // echarts的数据
      gateVehicleNum: 0, // 总闸口车辆数
      normalVehicleNum: 0, // 总发车辆
      tableList: [] // 表格数据
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
            let content = params[0].marker + '闸口车辆数：' + params[0].data + '<br />' +
                          params[1].marker + '发车辆：' + params[1].data
            return `${title}${content}`
          }
        },
        grid: {
          left: '3%',
          right: '10%',
          top: 60,
          bottom: 30,
          containLabel: true
        },
        series: [
          {
            type: 'line',
            smooth: true,
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
            type: 'line',
            smooth: true,
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
  methods: {
    goSearch() {
      this.getTrafficFlowInfo()
    },
    async getTrafficFlowInfo() {
      this.showSpin = true
      const result = await get(END_POINTS.GET_VEHICLE_FLOW_COUNT, {
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
          xAxis.push(dateFormat(new Date(item.time), 'yyyy-MM-dd hh:mm'))
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
        this.tableList = result.data // 表格数据
        this.showSpin = false
      } else {
        this.echartsInfo = null
        this.showSpin = false
      }
    },
    async exportExcel() {
      const token = localStorage.getItem('token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      const url = END_POINTS.GET_VEHICLE_FLOW_COUNT_EXCEL +
        '?gateName=' + this.gateName +
        '&countType=' + this.countType +
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
    width: 50%;
  }
}
</style>

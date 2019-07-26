<template>
  <div class="traffic-flow-home-page">
    <ContentLayout :showSpin="showSpin">
      <div>
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
import { dateFormat } from '@/utils'
export default {
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
  methods: {
    getPage(currentPage) {
      this.tableListObject.currentPage = currentPage
      this.doViewPage(this.tableListObject.tableList)
    },
    changeSize(pageSize) {
      this.tableListObject.pageSize = pageSize
      this.getPage(1)
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

<template>
  <div class="traffic-flow-home-page">
    <ContentLayout :showSpin="showSpin">
      <div>
        <TableWrapper>
          <div>
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
              <span class="traffic-flow-count-info-span">
                闸口异常总数：{{countExpVehicleNum}}（车次）
              </span>
              <span class="traffic-flow-count-info-span">
                空车出场总数：{{sumOutAvlNum}}（车次）
              </span>
            </div>
            <div>
              <Table :columns="columns"
                     :data="tableListObject.showTableList"
                     @on-row-click="handleClick">
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
import cloneDeep from 'clone-deep'
import { dateFormat } from '@/utils'
export default {
  computed: {
    gateName() {
      return this.$store.state.gateVehicleSearch.gateName
    },
    showSpin() {
      return this.$store.state.search.showSpin
    },
    countType() {
      return this.$store.state.search.traFloObj.countType
    },
    showEchart() {
      return this.$store.state.search.traFloObj.showEchart
    },
    gateVehicleNum() {
      return this.$store.state.search.traFloObj.gateVehicleNum
    },
    normalVehicleNum() {
      return this.$store.state.search.traFloObj.normalVehicleNum
    },
    countExpVehicleNum() {
      return this.$store.state.search.traFloObj.countExpVehicleNum
    },
    sumOutAvlNum() {
      return this.$store.state.search.traFloObj.sumOutAvlNum
    },
    echartsInfo() {
      return this.$store.state.search.traFloObj.echartsInfo
    },
    tableListObject() {
      return this.$store.state.search.traFloObj.tableListObject
    },
    columns() {
      return [
        {
          title: '时间',
          key: 'time',
          tooltip: true,
          render: (h, params) => {
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
          key: 'sumOutHired',
          tooltip: true
        },
        {
          title: '闸口异常',
          key: 'countExpVehicle',
          tooltip: true
        },
        {
          title: '空车出场',
          key: 'sumOutAvl',
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
          boundaryGap: true,
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
            if (params && params.length) {
              let title = params[0].axisValue + '（车次）<br />'
              let content = ''
              params.forEach(item => {
                content = `${content}${item.marker}${item.seriesName}: ${item.data} <br />`
              })
              return `${title}${content}`
            } else {
              return ''
            }
          }
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          data: ['闸口车辆数', '发车量', '闸口异常车次', '空车出场车次'],
          textStyle: {
            padding: [0, 24, 0, 0]
          }
        },
        grid: {
          left: '6%',
          right: '6%',
          top: 60,
          bottom: 50,
          containLabel: true
        },
        series: [
          {
            name: '闸口车辆数',
            type: 'bar',
            barGap: '20%',
            barCategoryGap: '30%',
            smooth: false,
            color: '#99C9FF',
            showSymbol: false,
            hoverAnimation: false,
            lineStyle: {
              width: 3
            },
            data: this.echartsInfo ? this.echartsInfo.yGate : []
          },
          {
            name: '发车量',
            stack: '出场',
            type: 'bar',
            barGap: '20%',
            barCategoryGap: '30%',
            smooth: false,
            color: '#70D5A9',
            showSymbol: false,
            hoverAnimation: false,
            lineStyle: {
              width: 3
            },
            data: this.echartsInfo ? this.echartsInfo.yNormal : []
          },
          {
            name: '闸口异常车次',
            stack: '出场',
            type: 'bar',
            barGap: '20%',
            barCategoryGap: '30%',
            smooth: false,
            color: '#8BEBFE',
            showSymbol: false,
            hoverAnimation: false,
            lineStyle: {
              width: 3
            },
            data: this.echartsInfo ? this.echartsInfo.yExp : []
          },
          {
            name: '空车出场车次',
            stack: '出场',
            type: 'bar',
            barGap: '20%',
            barCategoryGap: '30%',
            smooth: false,
            color: '#FFD478',
            showSymbol: false,
            hoverAnimation: false,
            lineStyle: {
              width: 3
            },
            data: this.echartsInfo ? this.echartsInfo.yOutAvl : []
          }
        ]
      }
    }
  },
  methods: {
    getPage(currentPage) {
      this.$store.commit('search/updateTraFloObjTableListObjectCurrentPage', currentPage)
      this.doViewPage(this.tableListObject.tableList)
    },
    changeSize(pageSize) {
      this.$store.commit('search/updateTraFloObjTableListObjectPageSize', pageSize)
      this.getPage(1)
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
    handleClick({ time }) {
      this.$store.commit('permission/updateActivePath', '/trafficFlow/gateVehicleHomePage')
      this.$router.push({ name: '闸口车辆查询', query: { time, gateName: this.gateName } })
    }
  }
}
</script>

<style lang="less">
.traffic-flow-home-page {
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

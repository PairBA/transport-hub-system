<template>
  <div class="capacity-scheduling-home-page">
    <ContentLayout :showSpin="showSpin">
      <Row class="content-card">
        <Row class="title">
          供求预测
        </Row>
        <Row class="content">
          <PairECharts v-if="estCountArray.length"
                       id="estTrips"
                       style="width: 100%;height: 300px;"
                       :series="estTripSeries"
                       :legend="estTripLegend"
                       :xAxis="estTripXAxis"
                       :yAxis="estTripYAxis"
                       :dataZoom="noDataZoom"
                       :grid="grid"
                       :tooltip="tooltipForTripCount"/>
          <Row v-else
               class="content-info">
            数据为空！
          </Row>
        </Row>
      </Row>
      <Row class="dispatch">
        <Row class="title">
          <Col class="left"
               span="12">
            <PairIcon type="capacity"
                      class="capacity"/>
            <span class="text">预警播报</span>
          </Col>
          <Col class="right"
               span="12">
            <Button class="action"
                    :disabled="enable"
                    @click="toNotify">
              手动播报
            </Button>
          </Col>
        </Row>
        <Row class="content">
          <Col span="12"
               class="col">
            <span>预警模式：</span>
            <RadioGroup v-model="notifyType"
                        style="margin-left: 24px;">
              <Radio label="SYSTEM"
                     class="monitor_est-font-size"
                     :disabled="enable">
                <span>托管模式</span>
              </Radio>
              <Radio label="CONFIRM"
                     :disabled="enable">
                <span>人工确认</span>
              </Radio>
            </RadioGroup>
          </Col>
          <Col span="12"
               class="col">
            <span>播报范围：</span>
            <RadioGroup v-model="notifyTarget"
                        style="margin-left: 24px;">
              <Radio label="NEARBY"
                     :disabled="enable">
                <span>附近司机</span>
              </Radio>
              <Radio label="ALL"
                     :disabled="enable">
                <span>全域司机</span>
              </Radio>
            </RadioGroup>
          </Col>
        </Row>
      </Row>
      <Row class="content-card"
           style="margin-top: 24px;">
        <Row class="title">
          等待时间
        </Row>
        <Row class="content">
          <PairECharts v-if="estCountArray.length"
                       id="waitMinute"
                       style="width: 100%;height: 300px;"
                       :series="waitMinuteSeries"
                       :legend="waitMinutelenged"
                       :xAxis="estTripXAxis"
                       :yAxis="estMinuteYAxis"
                       :dataZoom="noDataZoom"
                       :tooltip="tooltipForMinuteCount"
                       :grid="grid"/>
          <Row v-else
               class="content-info">
            数据为空！
          </Row>
        </Row>
      </Row>
      <Row class="table-wrapper">
        <Table :columns="columns"
               :data="list">
        </Table>
        <PairPage id="vehicleListPage"
                  :total="total"
                  :current="currentPage"
                  :page-size="pageSize"
                  @on-change="getPage"
                  @on-page-size-change="changeSize">
        </PairPage>
      </Row>
    </ContentLayout>
  </div>
</template>

<script>
import { dateFormat } from '@/utils'

export default {
  computed: {
    list() {
      return this.$store.state.capacityScheduling.list
    },
    currentPage() {
      return this.$store.state.capacityScheduling.currentPage
    },
    pageSize() {
      return this.$store.state.capacityScheduling.pageSize
    },
    total() {
      return this.$store.state.capacityScheduling.total
    },
    columns() {
      return [
        {
          title: '时间',
          key: 'crtOn',
          render: (h, params) => {
            return h('div', dateFormat(new Date(params.row.crtOn), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '模式',
          key: 'notifyType',
          render: (h, params) => {
            let content = ''
            let notifyType = params.row.notifyType
            if (notifyType === 'SYSTEM') {
              content = '托管模式'
            } else if (notifyType === 'MAN') {
              content = '手动播报'
            } else if (notifyType === 'CONFIRM') {
              content = '人工确认'
            } else {
              content = ' '
            }
            return h('div', content)
          }
        },
        {
          title: '范围',
          key: 'notifyRange',
          render: (h, params) => {
            let content = ''
            let notifyRange = params.row.notifyRange
            if (notifyRange === 'NEARBY') {
              content = '附近司机'
            } else if (notifyRange === 'ALL') {
              content = '全域司机'
            } else {
              content = ' '
            }
            return h('div', content)
          }
        },
        {
          title: '通知数量',
          key: 'sumDispatchRec'
        },
        {
          title: '响应总数',
          key: 'sumDispatchAns'
        },
        {
          title: '状态',
          key: 'statusDispatch',
          render: (h, params) => {
            let content = ''
            let statusDispatch = params.row.statusDispatch
            if (statusDispatch === 'TBC') {
              content = '待确认'
            } else if (statusDispatch === 'OPEN') {
              content = '已发送'
            } else if (statusDispatch === 'CLOSE') {
              content = '已结束'
            } else if (statusDispatch === 'UNSENT') {
              content = '未发送'
            } else {
              content = ' '
            }
            return h('div', content)
          }
        }
      ]
    },
    showSpin() {
      return this.$store.state.search.showSpin
    },
    estCountArray() {
      return this.$store.state.capacityScheduling.estChart.estCountArray
    },
    enable() {
      return this.$store.state.capacityScheduling.notifyEnable
    },
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
    notifyType: {
      get() {
        return this.$store.state.capacityScheduling.notifyType
      },
      async set(value) {
        const response = await this.$store.dispatch('capacityScheduling/updateHubNotifyTypeInScreen', value)
        if (response.success) {
          this.$Message.success({
            content: '修改成功！'
          })
        } else {
          this.$Message.error({
            content: '修改失败！'
          })
        }
      }
    },
    notifyTarget: {
      get() {
        return this.$store.state.capacityScheduling.notifyTarget
      },
      async set(value) {
        const response = await this.$store.dispatch('capacityScheduling/updateHubNotifyConfigInScreen', value)
        if (response.success) {
          this.$Message.success({
            content: '修改成功！'
          })
        } else {
          this.$Message.error({
            content: '修改失败！'
          })
        }
      }
    },
    estTripSeries() {
      const { estCountArray } = this.$store.state.capacityScheduling.estChart
      return [
        {
          name: '当前空车量',
          type: 'line',
          color: '#1890FF',
          showSymbol: false,
          hoverAnimation: false,
          data: estCountArray.length ? estCountArray.map(estCount =>
            this.formatCountData(
              estCount.estDateTime,
              estCount.estVehicleCount
            )
          ) : []
        },
        {
          name: '预估发车量',
          type: 'line',
          color: '#F5A623',
          showSymbol: false,
          hoverAnimation: false,
          data: estCountArray.length ? estCountArray.map(estCount =>
            this.formatCountData(
              estCount.estDateTime,
              estCount.estTripsCount
            )
          ) : []
        },
        {
          name: '实际发车量',
          type: 'line',
          color: '#AAB5C8',
          showSymbol: false,
          hoverAnimation: false,
          data: estCountArray.length ? estCountArray.map(estCount =>
            this.formatCountData(
              estCount.estDateTime,
              estCount.sumActuOn === -1 ? null : estCount.sumActuOn
            )
          ) : []
        }
      ]
    },
    estTripLegend() {
      const { estCountArray } = this.$store.state.capacityScheduling.estChart
      if (estCountArray.length) {
        return {
          data: [
            {
              name: '预估运力',
              textStyle: {
                color: '#66758D',
                fontSize: 14
              }
            },
            {
              name: '预估发车量',
              textStyle: {
                color: '#66758D',
                fontSize: 14
              }
            }
          ],
          right: '1%'
        }
      } else {
        return {
          show: false
        }
      }
    },
    estTripXAxis() {
      return {
        type: 'time',
        name: '',
        nameTextStyle: {
          color: 'rgba(0,0,0,0)'
        },
        splitLine: {
          show: false
        },
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: '#374254',
            fontSize: 14
          }
        }
      }
    },
    estTripYAxis() {
      return {
        type: 'value',
        name: '辆',
        nameLocation: 'end',
        nameGap: 8,
        max: value => {
          return value.max
        },
        min: 0,
        boundaryGap: [0, '100%'],
        nameTextStyle: {
          color: '#374254',
          fontSize: 14
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#374254',
            fontSize: 14
          }
        }
      }
    },
    noDataZoom() {
      return [
        {
          show: false
        }
      ]
    },
    grid() {
      return {
        left: '1%',
        right: '2%',
        bottom: '3%',
        top: '20%',
        containLabel: true
      }
    },
    tooltipForTripCount() {
      return {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      }
    },
    waitMinuteSeries() {
      const { estCountArray } = this.$store.state.capacityScheduling.estChart
      const estCountArrayWithoutZero = []
      for (let i = 0; i < estCountArray.length; i++) {
        if (estCountArray[i].avgRunning === 0) {
          continue
        }
        estCountArrayWithoutZero.push(estCountArray[i])
      }
      if (estCountArrayWithoutZero.length) {
        return [
          {
            name: '等待时间',
            type: 'line',
            color: '#6AA84F',
            showSymbol: false,
            hoverAnimation: false,
            data: estCountArrayWithoutZero.map(estCount =>
              this.formatMiniuteCountData(
                estCount.estDateTime,
                estCount.avgRunning
              )
            )
          },
          {
            name: '等待时间实际值',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            symbolSize: 0,
            lineStyle: {
              opacity: 0
            },
            data: estCountArrayWithoutZero.map(estCount =>
              this.formatCountData(
                estCount.estDateTime,
                estCount.avgRunning
              )
            )
          }
        ]
      } else {
        return [
          {
            name: '等待时间',
            type: 'line',
            color: '#1890FF',
            showSymbol: false,
            hoverAnimation: false,
            data: []
          },
          {
            name: '等待时间实际值',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            symbolSize: 0,
            lineStyle: {
              opacity: 0
            },
            data: []
          }
        ]
      }
    },
    waitMinutelenged() {
      const { estCountArray } = this.$store.state.capacityScheduling.estChart
      const estCountArrayWithoutZero = []
      for (let i = 0; i < estCountArray.length; i++) {
        if (estCountArray[i].avgRunning === 0) {
          continue
        }
        estCountArrayWithoutZero.push(estCountArray[i])
      }
      if (estCountArrayWithoutZero.length) {
        return {
          data: [
            {
              name: '等待时间',
              textStyle: {
                color: '#374254',
                fontSize: 14
              }
            }
          ],
          right: '2%'
        }
      } else {
        return {
          show: false
        }
      }
    },
    estMinuteYAxis() {
      return {
        type: 'value',
        name: '分钟',
        nameGap: 8,
        min: 0,
        max: value => {
          return 60
        },
        boundaryGap: [0, '100%'],
        nameTextStyle: {
          color: '#374254',
          fontSize: 14
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#374254',
            fontSize: 14
          }
        }
      }
    },
    tooltipForMinuteCount() {
      return {
        trigger: 'axis',
        formatter: params => {
          params = params[1]
          const date = new Date(params.name)
          const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
          const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
          const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
          const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

          return `${hour}:${minute} ${month}-${day}<br/>` +
            '<div style="float:left;width:12px;height:12px;background:#6AA84F; border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;margin-top: 5px;margin-right: 3px"></div>等待时间: ' + params.value[1]
        },
        axisPointer: {
          animation: false
        },
        textStyle: {
          fontSize: 14
        }
      }
    }
  },
  methods: {
    formatCountData(key, value) {
      return {
        name: key,
        value: [key, value ? Math.round(value) : '-']
      }
    },
    formatMiniuteCountData(key, value) {
      if (value > 60) {
        value = 60
      }
      return {
        name: key.toString(),
        value: [key, Math.round(value)]
      }
    },
    async toNotify() {
      this.$store.commit('search/updateShowSpin', true)
      const response = await this.$store.dispatch('capacityScheduling/notifyDriverByMan')
      if (response.success) {
        this.$Message.success({
          content: '手动播报成功！'
        })
      } else {
        this.$Message.error({
          content: '手动播报失败！'
        })
      }
      this.$store.commit('search/updateShowSpin', false)
    },
    getPage(currentPage) {
      this.$store.dispatch('capacityScheduling/getNotifyHistList', { currentPage })
    },
    changeSize(pageSize) {
      this.$store.commit('capacityScheduling/updatePageSize', pageSize)
      this.getPage(1)
    }
  },
  async mounted() {
    this.$store.commit('search/updateShowSpin', true)
    if (!this.hubCode) {
      this.$store.commit('updateHubCode', this.hubList[0].hubCode)
    }
    await Promise.all([
      this.$store.dispatch('capacityScheduling/loadEstChartInScreen'),
      this.$store.dispatch('capacityScheduling/getNotifyHistList', { currentPage: 1 })
    ])
    this.$store.commit('search/updateShowSpin', false)
  }
}
</script>

<style lang="less">
.capacity-scheduling-home-page {
  .content-card {
    background: #FFF;
    .title {
      background: #F5F8FF;
      padding: 12px 0;
      text-align: center;
      color: #AAB5C8;
      font-size: 16px;
      font-weight: 600;
    }
    .content {
      padding: 24px;
      background: #FFF;
      .content-info {
        text-align: center;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
  .dispatch {
    background: #FFF;
    margin-top: 24px;
    border-radius:8px 8px 0 0;
    .title {
      border-radius:8px 8px 0 0;
      padding: 14px 20px;
      box-shadow: 0 4px 12px -4px rgba(168,176,185,0.5);
      .left {
        .capacity {
          position: relative;
          top: 10px;
          margin-right: 10px;
          display: inline-block;
          width: 34px;
          height: 34px;
        }
        .text {
          color: #66758D;
          font-size: 20px;
          font-weight: 600;
        }
      }
      .right {
        position: relative;
        .action {
          border: 0 transparent solid;
          border-radius: 20px;
          position: absolute;
          right: 0;
          text-align: center;
          padding: 8px 19px;
          width: 94px;
          background: linear-gradient(270deg,rgba(23,149,255,1) 0%,rgba(82,211,255,1) 100%);
          color: #FFF;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
    .content {
      padding: 24px;
      .col {
        font-size: 14px;
        padding-left: 140px;
        font-weight: 400;
        color: rgba(55,66,84,1);
      }
    }
  }
  .table-wrapper {
    background: #FFF;
    padding: 24px;
    margin-top: 24px;
  }
}
</style>

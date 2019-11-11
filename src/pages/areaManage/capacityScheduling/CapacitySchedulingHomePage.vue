<template>
  <div class="capacity-scheduling-home-page">
    <ContentLayout :showSpin="showSpin">
      <div class="content-card">
        <div class="title">
          供求预测
        </div>
        <div class="content">
          <PairECharts v-if="estCountArray.length"
                       id="estTrips"
                       style="width: 100%;height: 300px;"
                       :series="estTripSeries"
                       :legend="estTripLegend"
                       :xAxis="estTripXAxis"
                       :yAxis="estTripYAxis"
                       :dataZoom="estTripDataZoom"
                       :grid="grid"
                       :tooltip="tooltipForTripCount"/>
          <div v-else
               class="content-info">
            数据为空！
          </div>
        </div>
      </div>
      <Row class="dispatch">
        <Row class="title">
          <Col class="left"
               span="12">
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
    </ContentLayout>
  </div>
</template>

<script>
export default {
  computed: {
    showSpin() {
      return this.$store.state.search.showSpin
    },
    estCountArray() {
      return this.$store.state.capacityScheduling.estChart.estCountArray
    },
    enable() {
      return this.$store.state.capacityScheduling.notifyEnable
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
          name: '预估运力',
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
                fontSize: 12
              }
            },
            {
              name: '预估发车量',
              textStyle: {
                color: '#66758D',
                fontSize: 12
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
            fontSize: 12
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
          fontSize: 12
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
            fontSize: 12
          }
        }
      }
    },
    estTripDataZoom() {
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
    }
  },
  methods: {
    formatCountData(key, value) {
      return {
        name: key,
        value: [key, value ? Math.round(value) : '-']
      }
    },
    async toNotify() {
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
    }
  },
  async mounted() {
    this.$store.commit('search/updateShowSpin', true)
    await this.$store.dispatch('capacityScheduling/loadEstChartInScreen')
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
}
</style>

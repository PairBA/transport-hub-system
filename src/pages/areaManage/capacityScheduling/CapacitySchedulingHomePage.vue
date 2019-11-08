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
                       :title="estTripTitle"
                       :dataZoom="estTripDataZoom"
                       :grid="grid"
                       :tooltip="tooltipForTripCount"/>
          <div v-else
               class="content-info">
            数据为空！
          </div>
        </div>
      </div>
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
                color: 'white',
                fontSize: 30
              }
            },
            {
              name: '预估发车量',
              textStyle: {
                color: 'white',
                fontSize: 30
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
            color: '#FFFFFF',
            fontSize: 24
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
          color: '#FFFFFF',
          fontSize: 24
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#FFFFFF',
            fontSize: 24
          }
        }
      }
    },
    estTripTitle() {
      return {
        text: '供求预测',
        textStyle: {
          color: '#ffffff',
          fontSize: 32
        },
        left: 'center'
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
        },
        textStyle: {
          fontSize: 36
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
}
</style>

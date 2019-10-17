<template>
  <div class="gpsOnlineTime__homePage">
    <ContentLayout :showSpin="showSpin">
      <div class="content__card">
        <div class="title">GPS在线时间</div>
        <PairECharts :id="'GPSGraphData'"
                     v-if="showEchart"
                     :title="GPSGraphData.title"
                     :series="GPSGraphData.series"
                     :xAxis="GPSGraphData.xAxis"
                     :yAxis="GPSGraphData.yAxis"
                     :tooltip="GPSGraphData.tooltip"
                     :grid="GPSGraphData.grid"
                     :color="GPSGraphData.color"
                     style="height: 300px;width: 100%"></PairECharts>
      </div>
    </ContentLayout>
  </div>
</template>

<script>
import echarts from 'echarts'
import { numFormat } from '@/utils'
export default {
  data() {
    return {
      showEchart: false
    }
  },
  computed: {
    showSpin: {
      get() {
        return this.$store.state.search.showSpin
      },
      set(value) {
        this.$store.commit('search/updateShowSpin', value)
      }
    },
    GPSGraphData() {
      return this.getChart(this.$store.state.gpsOnlineTime.GPSGraphData)
    }
  },
  async mounted() {
    await this.$store.dispatch('getCompListForSelect')
    this.$nextTick(() => {
      this.showEchart = true
    })
  },
  methods: {
    getChart(chartData) {
      return {
        title: {
          top: 20,
          left: 20,
          text: this.$t('sysManage.commonVar.GPSNum')
        },
        color: '#1882FF',
        xAxis: {
          type: 'category',
          data: chartData.xAxis,
          name: chartData.xLabel,
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
          name: chartData.yLabel,
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
          axisPointer: {
            animation: false
          },
          formatter: params => {
            const param = params[0]
            return `${param.axisValue}</br>${param.marker}${this.$t('sysManage.commonVar.GPSNum')}:  ${numFormat(param.value)}`
          }
        },
        grid: {
          left: '6%',
          right: '6%',
          top: 60,
          bottom: 30,
          containLabel: true
        },
        series: [
          {
            type: 'line',
            barWidth: '60%',
            name: chartData.yLabel,
            lineStyle: {
              width: 2
            },
            showSymbol: false,
            hoverAnimation: false,
            data: chartData.yAxis,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#1882FF'
                }, {
                  offset: 1,
                  color: '#ffe'
                }])
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.gpsOnlineTime__homePage{
  .title {
    text-align: center;
    background-color: #9D9D9D;
  }
}
</style>

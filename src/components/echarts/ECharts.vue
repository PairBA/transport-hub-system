<template>
  <div :id="id"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    series: {
      type: Object,
      default: () => {
        return []
      }
    },
    radar: {
      type: Object,
      default: () => {
        return {}
      }
    },
    xAxis: {
      type: Object,
      default: () => {
        return {}
      }
    },
    yAxis: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: Object,
      default: () => {
        return {}
      }
    },
    color: {
      type: String,
      default: () => {
        return ''
      }
    },
    tooltip: {
      type: Object,
      default: () => {
        return {}
      }
    },
    grid: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataZoom: {
      type: Object,
      default: () => {
        return [
          {
            show: false
          }
        ]
      }
    },
    axisPointer: {
      type: Object,
      default: () => {
        return {}
      }
    },
    legend: {
      type: Object,
      default: () => {
        return {
          show: false
        }
      }
    },
    onFunction: {
      type: Array,
      default: () => {
        /**
         * item example
         * {
         *     type: 'click',
         *     event: function
         * }
         */
        return []
      }
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  computed: {
  },
  watch: {
    series: 'renderEChart',
    xAxis: 'renderEChart',
    yAxis: 'renderEChart',
    htmlFontSize: 'resizeChart'
  },
  mounted() {
    this.renderEChart()
  },
  methods: {
    renderEChart() {
      const element = document.getElementById(this.id)
      this.myChart = echarts.init(element)
      const option = {
        baseOption: { // ECharts的基础Option，这里就是通过props传递过来的属性
          color: this.color,
          series: this.series,
          radar: this.radar,
          title: this.title,
          axisPointer: this.axisPointer,
          dataZoom: this.dataZoom,
          grid: this.grid,
          tooltip: this.tooltip,
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          legend: this.legend
        },
        media: [ // 媒体查询的条件设置，没有query的项为默认项，即没有满足的query条件时使用的规则
          {
            option: {
              legend: {
                orient: 'horizontal',
                left: 'right',
                itemGap: 10
              }
            }
          },
          {
            query: { maxWidth: 500 },
            option: {
              legend: {
                orient: 'vertical',
                left: 'right',
                itemGap: 10
              }
            }
          }
        ]
      }
      this.myChart.setOption(option, true)
      // 向 ECharts 上注册事件
      if (this.onFunction.length > 0) {
        this.onFunction.forEach(item => {
          this.myChart.on(item.type, item.event)
        })
      }
      // 当 window 触发 resize 事件时，
      // 根据 ECharts 的父容器宽度自动重绘 ECharts 图表
      window.addEventListener('resize', () => { this.myChart.resize() })
    },
    resizeChart() {
      if (this.myChart && this.myChart.resize) {
        this.myChart.resize()
      }
    }
  }
}
</script>
<style scoped>
</style>

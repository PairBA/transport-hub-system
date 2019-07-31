<template>
  <div class="illegalBoarding__homePage">
    <ContentLayout :showSpin="showSpin">
      <div class="content__card" style="margin-bottom: 24px">
        <PairECharts id="illegalECharts"
                     :xAxis="illegalECharts.xAxis"
                     :yAxis="illegalECharts.yAxis"
                     :tooltip="illegalECharts.tooltip"
                     :series="illegalECharts.series"
                     :grid="illegalECharts.grid"
                     style="height: 300px;width: 100%;">
        </PairECharts>
      </div>
      <TableWrapper>
        <Table :columns="columns"
               :data="list">
        </Table>
        <PairPage id="trailList" :total="total" :current="currentPage" :page-size="pageSize" @on-change="getPage" @on-page-size-change="changeSize"></PairPage>
      </TableWrapper>
    </ContentLayout>
  </div>
</template>

<script>
import { dateFormat } from '@/utils'
const detail = require('@/img/common/detail.png')
export default {
  components: {},
  data() {
    return {
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      }
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
    daterange: {
      get() {
        return this.$store.state.illegalBoarding.daterange
      },
      set(value) {
        this.$store.commit('illegalBoarding/updateDaterange', value)
      }
    },
    list() {
      return this.$store.state.illegalBoarding.list
    },
    currentPage() {
      return this.$store.state.illegalBoarding.currentPage
    },
    pageSize() {
      return this.$store.state.illegalBoarding.pageSize
    },
    total() {
      return this.$store.state.illegalBoarding.total
    },
    graphData() {
      return this.$store.state.illegalBoarding.graphData
    },
    illegalECharts() {
      return {
        xAxis: {
          type: 'category',
          data: this.graphData ? this.graphData.xAxis : [],
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
          trigger: 'axis'
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
            name: '车次',
            type: 'bar',
            smooth: false,
            color: '#1F88E5',
            hoverAnimation: false,
            data: this.graphData ? this.graphData.yAxis : []
          }
        ]
      }
    },
    columns() {
      return [
        {
          title: '车辆号牌',
          key: 'vehicleNo'
        },
        {
          title: '进场车次',
          key: 'sumIn'
        },
        {
          title: '发车量',
          key: 'sumOn'
        },
        {
          title: '违规上客',
          key: 'sumOnAlert'
        },
        {
          title: this.$t('sysManage.commonVar.action'),
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            return h('Tooltip', {
              props: {
                content: '查看',
                transfer: true,
                placement: 'bottom'
              },
              style: {
                cursor: 'pointer',
                width: '30px'
              }
            }, [
              h('img', {
                style: {
                  cursor: 'pointer',
                  width: '30px'
                },
                attrs: {
                  src: detail
                },
                on: {
                  click: () => {
                    this.goToDetail(params.row)
                  }
                }
              })
            ], '查看')
          }
        }
      ]
    }
  },
  mounted() {
    if (this.vehicleNo && this.vehicleNo !== '川A') {
      this.goSearch()
    }
  },
  methods: {
    goSearch() {
      this.getHubStatTrailList()
    },
    goToDetail({ mobile, vehicleNo }) {
      this.$router.push({
        name: '违规上客详情',
        query: {
          mobile,
          vehicleNo,
          startDate: dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd'),
          endDate: dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd')
        }
      })
    },
    getPage(currentPage) {
      this.$store.dispatch('illegalBoarding/getHubStatTrailList', { currentPage })
    },
    changeSize(pageSize) {
      this.$store.commit('illegalBoarding/updatePageSize', pageSize)
      this.getPage(1)
    },
    async getHubStatTrailList() {
      if (new Date(this.daterange[1]).getTime() - new Date(this.daterange[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.showSpin = true
        await this.$store.dispatch('illegalBoarding/getHubStatTrailList', { currentPage: 1 })
        this.showSpin = false
      }
    }
  }
}
</script>

<style lang="less">
.illegalBoarding__homePage{
  .ivu-date-picker {
    width: 100%;
  }
}
</style>

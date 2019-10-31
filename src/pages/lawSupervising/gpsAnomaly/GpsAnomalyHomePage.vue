<template>
  <div class="gpsAbnomal__homePage">
    <ContentLayout :showSpin="showSpin">
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
        return this.$store.state.gpsAnomaly.daterange
      },
      set(value) {
        this.$store.commit('gpsAnomaly/updateDaterange', value)
      }
    },
    list() {
      return this.$store.state.gpsAnomaly.list
    },
    currentPage() {
      return this.$store.state.gpsAnomaly.currentPage
    },
    pageSize() {
      return this.$store.state.gpsAnomaly.pageSize
    },
    total() {
      return this.$store.state.gpsAnomaly.total
    },
    graphData() {
      return this.$store.state.illegalBoarding.graphData
    },
    columns() {
      return [
        {
          title: '车辆号牌',
          key: 'vehicleNo'
        },
        {
          title: '公司',
          key: 'companyName'
        },
        {
          title: '终端厂商',
          key: 'terminalName'
        },
        {
          title: '缺失(次)',
          key: 'gpsLostCount'
        },
        {
          title: '缺失总时长(小时)',
          key: 'gpsLostSum'
        },
        {
          title: '缺失平均时长(小时)',
          key: 'gpsLostAvg'
        },
        {
          title: '重复(次)',
          key: 'gpsRepeatCount'
        },
        {
          title: '时间异常(次)',
          key: 'gpsTimeErrorCount'
        },
        {
          title: this.$t('sysManage.commonVar.action'),
          key: 'action',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary'
              },
              on: {
                click: () => {
                  this.goToDetail(params.row.vehicleNo)
                }
              }
            }, 'GPS在线时长')
          }
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('getCompListForSelect')
    this.$store.dispatch('getTerminalList')
  },
  methods: {
    goToDetail(vehicleNo) {
      this.$store.commit('permission/updateOpenNamesFromMain', '/lawSupervising/gpsOnlineHomePage')
      this.$router.push(
        {
          name: 'GPS在线时长',
          query: {
            vehicleNo,
            startDate: new Date(this.daterange[0]).getTime(),
            endDate: new Date(this.daterange[1]).getTime()
          }
        }
      )
    },
    goSearch() {
      this.getGpsErrorStatList()
    },
    getPage(currentPage) {
      this.$store.dispatch('gpsAnomaly/getGpsErrorStatList', { currentPage })
    },
    changeSize(pageSize) {
      this.$store.commit('gpsAnomaly/updatePageSize', pageSize)
      this.getPage(1)
    },
    async getGpsErrorStatList() {
      if (new Date(this.daterange[1]).getTime() - new Date(this.daterange[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.showSpin = true
        await this.$store.dispatch('gpsAnomaly/getGpsErrorStatList', { currentPage: 1 })
        this.showSpin = false
      }
    }
  }
}
</script>

<style lang="less">
.gpsAbnomal__homePage{
}
</style>

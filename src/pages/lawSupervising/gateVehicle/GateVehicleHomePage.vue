<template>
  <div class="gateVehicle__homePage">
    <ContentLayout :showSpin="showSpin">
      <div class="content__card" style="margin-bottom: 24px">
        <PairECharts id="gateECharts"
                     v-if="showEchart"
                     :xAxis="gateECharts.xAxis"
                     :yAxis="gateECharts.yAxis"
                     :tooltip="gateECharts.tooltip"
                     :series="gateECharts.series"
                     :grid="gateECharts.grid"
                     style="height: 300px;width: 100%;">
        </PairECharts>
      </div>
      <TableWrapper>
        <Table :columns="tableColumns" :data="gateJudgeList"/>
        <PairPage id="gateJudgeList" :total="total" :current="currentPage" :page-size="pageSize" @on-change="getPage" @on-page-size-change="changeSize"></PairPage>
      </TableWrapper>
    </ContentLayout>
    <FocusModal :showFocusModal = 'showFocusModal'
                :vehicleNo="vehicleNo"
                @close-focus-modal="closeFocusModal"
                @go-search="goSearch">
    </FocusModal>
  </div>
</template>

<script>
import FocusModal from '@/components/modal/focus/FocusModal'
import { get, END_POINTS } from '@/api'
import { dateFormat } from '@/utils'
const focus = require('@/img/focus/focus.png')
const cancelFocus = require('@/img/focus/cancelFocus.png')
export default {
  components: {
    FocusModal
  },
  data() {
    return {
      vehicleNo: '',
      showFocusModal: false,
      showEchart: false,
      tableColumns: [
        {
          title: this.$t('sysManage.gateAnalysis.gate'),
          key: 'gateName',
          tooltip: true
        },
        {
          title: this.$t('sysManage.commonVar.vehicleNo'),
          key: 'vehicleNo',
          tooltip: true
        },
        {
          title: '公司',
          key: 'companyName'
        },
        {
          title: this.$t('sysManage.queryBar.terminalManufacturer'),
          key: 'terminalName'
        },
        {
          title: this.$t('sysManage.gateAnalysis.gateTime'),
          key: 'entryTime',
          width: 110
        },
        {
          title: this.$t('sysManage.queryBar.issueType'),
          key: 'judgeType',
          render: (h, params) => {
            const judgeType = params.row.judgeType
            let issue = ''
            if (judgeType === 'GPS_LOST') {
              issue = this.$t('sysManage.commonSelect.issueJudgeType.gpsLost')
            } else if (judgeType === 'GPS_REPEAT') {
              issue = this.$t('sysManage.commonSelect.issueJudgeType.gpsRepeat')
            } else if (judgeType === 'CLONE_VEHICLE') {
              issue = this.$t('sysManage.commonSelect.issueJudgeType.cloneVehicle')
            } else if (judgeType === 'UNKNOWN_VEHICLE') {
              issue = this.$t('sysManage.commonSelect.issueJudgeType.unknownVehicle')
            } else if (judgeType === 'GPS_TIME_ERROR') {
              issue = this.$t('sysManage.commonSelect.issueJudgeType.gpsTimeError')
            } else if (judgeType === 'NO_GPS_UPLOAD') {
              issue = this.$t('sysManage.commonSelect.issueJudgeType.noGpsUpload')
            }
            return h('span', {
            }, issue)
          }
        },
        {
          title: this.$t('sysManage.gateAnalysis.info'),
          key: 'judgeResult',
          render: (h, params) => {
            const judgeType = params.row.judgeType
            const judgeResult = params.row.judgeResult
            let issueInfo = ''
            if (judgeType === 'GPS_LOST') {
              judgeResult ? issueInfo = `${judgeResult + ' ' + this.$t('sysManage.gateAnalysis.noGps')}` : issueInfo = this.$t('sysManage.gateAnalysis.noGpsData')
            } else if (judgeType === 'GPS_REPEAT') {
              const resultArr = judgeResult.split('::')
              issueInfo = resultArr[1] + ' ' + this.$t('sysManage.gateAnalysis.repeatGps') + resultArr[2] + this.$t('sysManage.unit.time')
            } else if (judgeType === 'CLONE_VEHICLE') {
              const resultArr = judgeResult.split('::')
              issueInfo = resultArr[0] + ' ' + this.$t('sysManage.gateAnalysis.gpsDistance') + ' ' + resultArr[1]
            } else if (judgeType === 'UNKNOWN_VEHICLE') {
              issueInfo = this.$t('sysManage.gateAnalysis.systemNoVehicle')
            } else if (judgeType === 'GPS_TIME_ERROR') {
              issueInfo = this.$t('sysManage.commonSelect.issueJudgeType.gpsTimeError') + this.$t('sysManage.commonVar.is') + judgeResult
            } else if (judgeType === 'NO_GPS_UPLOAD') {
              issueInfo = this.$t('sysManage.commonSelect.issueJudgeType.noGpsUpload')
            }
            return h('div', {
            }, issueInfo)
          }
        }
      ]
    }
  },
  computed: {
    gateJudgeList() {
      return this.$store.state.gateVehicle.gateJudgeList
    },
    currentPage() {
      return this.$store.state.gateVehicle.currentPage
    },
    pageSize() {
      return this.$store.state.gateVehicle.pageSize
    },
    total() {
      return this.$store.state.gateVehicle.total
    },
    mainMenu() {
      return this.$store.state.permission.mainMenu
    },
    showFocusBtn() {
      return this.$store.state.permission.focusRule
    },
    showSpin: {
      get() {
        return this.$store.state.search.showSpin
      },
      set(value) {
        this.$store.commit('search/updateShowSpin', value)
      }
    },
    startDate: {
      get() {
        return this.$store.state.gateVehicle.startDate
      },
      set(value) {
        this.$store.commit('gateVehicle/updateStartDate', value)
      }
    },
    endDate: {
      get() {
        return this.$store.state.gateVehicle.endDate
      },
      set(value) {
        this.$store.commit('gateVehicle/updateEndDate', value)
      }
    },
    startTime: {
      get() {
        return this.$store.state.gateVehicle.startTime
      },
      set(value) {
        this.$store.commit('gateVehicle/updateStartTime', value)
      }
    },
    endTime: {
      get() {
        return this.$store.state.gateVehicle.endTime
      },
      set(value) {
        this.$store.commit('gateVehicle/updateEndTime', value)
      }
    },
    graphData() {
      return this.$store.state.gateVehicle.graphData
    },
    gateECharts() {
      return {
        xAxis: {
          type: 'category',
          data: this.graphData ? this.graphData.xAxis : [],
          name: '时间',
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
          }
        },
        tooltip: {
          trigger: 'axis'
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
            name: '车次',
            type: 'bar',
            smooth: false,
            color: '#1F88E5',
            hoverAnimation: false,
            data: this.graphData ? this.graphData.yAxis : []
          }
        ]
      }
    }
  },
  async mounted() {
    this.$store.dispatch('getCompListForSelect')
    this.$store.dispatch('getTerminalList')
    this.showEchart = true
    this.getTableColumns()
    this.goSearch()
  },
  methods: {
    handleClick(vehicleNo, focused) {
      this.vehicleNo = vehicleNo
      if (focused) {
        this.cancelFocus()
      } else {
        this.showFocusModal = true
      }
    },
    closeFocusModal(result) {
      this.showFocusModal = result
    },
    getPage(currentPage) {
      this.$store.dispatch('gateVehicle/getGateJudgeList', { currentPage })
    },
    changeSize(pageSize) {
      this.$store.commit('gateVehicle/updatePageSize', pageSize)
      this.getPage(1)
    },
    async goSearch() {
      const startDate = new Date(dateFormat(this.startDate, 'yyyy-MM-dd') + ' ' + this.startTime).getTime()
      const endDate = new Date(dateFormat(this.endDate, 'yyyy-MM-dd') + ' ' + this.endTime).getTime()
      if (startDate > endDate) {
        this.$Notice.warning({
          desc: this.$t('sysManage.tripData.warningDesc')
        })
      } else {
        this.showSpin = true
        await this.$store.dispatch('gateVehicle/getGateJudgeList', { currentPage: 1 })
        await this.$store.dispatch('gateVehicle/getGateJudgeGraph')
        this.showSpin = false
      }
    },
    getTableColumns() {
      if (this.showFocusBtn) {
        this.tableColumns.push({
          title: this.$t('sysManage.commonVar.action'),
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            let content = ''
            let src = ''
            if (params.row.focused) { // 已经被关注
              content = '取消关注'
              src = cancelFocus
            } else { // 未被关注
              content = '关注'
              src = focus
            }
            return h('Tooltip', {
              props: {
                content: content,
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
                  src: src
                },
                on: {
                  click: () => {
                    this.handleClick(params.row.vehicleNo, params.row.focused)
                  }
                }
              })
            ], content)
          }
        })
      }
    },
    async cancelFocus() {
      const result = await get(END_POINTS.CANCEL_FOCUS, {
        vehicleNo: this.vehicleNo
      })
      if (result.code === 2000) {
        this.$Message.success({
          content: '成功取消关注！'
        })
        this.goSearch()
      }
    }
  }
}
</script>

<style lang="less">
.gateVehicle__homePage{
  .ivu-date-picker {
    width: 100%;
  }
}
</style>

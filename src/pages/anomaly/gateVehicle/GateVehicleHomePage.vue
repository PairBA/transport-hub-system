<template>
  <div class="gateVehicle__homePage">
    <ContentLayout :showSpin="showSpin">
      <div slot="searchCondition">
        <Form>
          <FormItem :label="$t('sysManage.queryBar.terminalManufacturer')">
            <Select v-model="terminalName" :placeholder="$t('sysManage.queryBar.terminalManufacturerPH')">
              <Option :value="''">
                {{ $t('sysManage.queryBar.driverStatusSelect.ALL') }}
              </Option>
              <Option v-for="item in terminalList" :key="item.terminalCode" :value="item.terminalCode">
                {{ item.terminalName }}
              </Option>
            </Select>
          </FormItem>
          <CompanySelect/>
          <FormItem :label="$t('sysManage.queryBar.issueType')">
            <Select v-model="judgeType" :placeholder="$t('sysManage.queryBar.issueTypePH')">
              <Option value=" ">{{$t("sysManage.queryBar.tripStatusSelect.ALL")}}</Option>
              <Option :value="'GPS_LOST'">{{ $t('sysManage.commonSelect.issueJudgeType.gpsLost') }}</Option>
              <Option :value="'GPS_REPEAT'">{{ $t('sysManage.commonSelect.issueJudgeType.gpsRepeat') }}</Option>
              <Option :value="'CLONE_VEHICLE'">{{ $t('sysManage.commonSelect.issueJudgeType.cloneVehicle') }}</Option>
              <Option :value="'UNKNOWN_VEHICLE'">{{ $t('sysManage.commonSelect.issueJudgeType.unknownVehicle') }}</Option>
              <Option :value="'GPS_TIME_ERROR'">{{ $t('sysManage.commonSelect.issueJudgeType.gpsTimeError') }}</Option>
              <Option :value="'NO_GPS_UPLOAD'">{{ $t('sysManage.commonSelect.issueJudgeType.noGpsUpload') }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('sysManage.queryBar.vehicleNo')">
            <Input v-model="vehicleNoSearch"
                   placeholder="请输入车辆号牌">
            </Input>
          </FormItem>
          <FormItem label="时间区间：">
            <DatePicker v-model="daterange"
                        type="daterange"
                        format="yyyy/MM/dd"
                        placement="bottom-start"
                        placeholder="请选择时间区间"
                        :clearable="false"
                        :editable="false"
                        :options="options">
            </DatePicker>
          </FormItem>
          <Divider/>
          <div>
            <Button type="primary"
                    style="float: left;"
                    :disabled="showSpin"
                    @click="initPage">
              {{$t("sysManage.queryBar.searchBT")}}
            </Button>
            <Button type="primary"
                    style="float: right;"
                    @click="exportGate">
              {{$t("sysManage.versionMgmt.exportExcel")}}
            </Button>
          </div>
        </Form>
      </div>
      <div slot="content">
        <TableWrapper>
          <Table :columns="tableColumns" :data="gateJudgeList"/>
          <PairPage id="gateJudgeList" :total="total" :current="currentPage" :page-size="pageSize" @on-change="getPage" @on-page-size-change="changeSize"></PairPage>
        </TableWrapper>
      </div>
    </ContentLayout>
    <FocusModal :showFocusModal = 'showFocusModal'
                :vehicleNo="vehicleNo"
                @close-focus-modal="closeFocusModal"
                @go-search="goSearch">
    </FocusModal>
  </div>
</template>

<script>
import CompanySelect from '@/components/common/CompanySelect'
import FocusModal from '@/components/modal/focus/FocusModal'
import { get, post, END_POINTS } from '@/api'
import { dateFormat, downloadFile } from '@/utils'
const focus = require('@/img/focus/focus.png')
const cancelFocus = require('@/img/focus/cancelFocus.png')
export default {
  components: {
    CompanySelect,
    FocusModal
  },
  data() {
    return {
      showSpin: false,
      daterange: [new Date(new Date().getTime() - 24 * 60 * 60 * 1000), new Date()],
      judgeType: '',
      hubCode: '',
      vehicleNo: '',
      vehicleNoSearch: '川A',
      terminalName: '',
      gateJudgeList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      },
      showFocusModal: false,
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
          title: this.$t('sysManage.gateAnalysis.company'),
          key: 'companyName',
          tooltip: true
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
    mainMenu() {
      return this.$store.state.permission.mainMenu
    },
    showFocusBtn() {
      return this.mainMenu.some(menu => menu.resourceKey === 'focus')
    },
    terminalList() {
      return this.$store.state.terminalList
    }
  },
  async mounted() {
    this.$store.dispatch('getCompListForSelect')
    this.$store.dispatch('getTerminalList')
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
      this.currentPage = currentPage
      this.goSearch()
    },
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.getPage(1)
    },
    initPage() {
      this.getPage(1)
    },
    async exportGate() {
      const token = localStorage.getItem('token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      const startDate = new Date(dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd')).getTime()
      const endDate = new Date(dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd')).getTime()
      const url = END_POINTS.EXPORT_GATE_JUDGE_REPORT +
        '?judgeType=' + this.judgeType +
        '&areaCode=' + localStorage.getItem('areaCode') +
        '&companyId=' + this.$store.state.companyIdForSelect +
        '&startDate=' + dateFormat(new Date(startDate), 'yyyy-MM-dd') +
        '&vehicleNo=' + this.vehicleNoSearch +
        '&endDate=' + dateFormat(new Date(endDate), 'yyyy-MM-dd') +
        '&terminalName=' + this.terminalName +
        '&x-me-token=' + token
      // window.location.href = `${baseUrl}${url}`
      // window.open(`${baseUrl}${url}`)
      downloadFile(`${baseUrl}${url}`)
    },
    async goSearch() {
      const startDate = new Date(dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd')).getTime()
      const endDate = new Date(dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd')).getTime()
      if (startDate > endDate) {
        this.$Notice.warning({
          desc: this.$t('sysManage.tripData.warningDesc')
        })
      } else {
        this.showSpin = true
        const gateJudgeListObject = await post(END_POINTS.GET_GATE_JUDGE_LIST, {
          currentPage: this.currentPage,
          orderBy: '',
          pageSize: this.pageSize,
          queryVO: {
            judgeType: this.judgeType,
            startDate: dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd'),
            endDate: dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd'),
            areaCode: this.$store.state.areaCodeForSelect,
            hubCode: localStorage.getItem('hubCode'),
            companyId: this.$store.state.companyIdForSelect,
            terminalName: this.terminalName,
            vehicleNo: this.vehicleNoSearch
          },
          refreshTotalRecord: true
        })
        if (gateJudgeListObject.code === 2001) {
          this.currentPage = gateJudgeListObject.currentPage
          this.pageSize = gateJudgeListObject.pageSize
          this.gateJudgeList = gateJudgeListObject.data
          this.total = gateJudgeListObject.total
        } else {
          this.currentPage = 1
          this.total = 0
          this.gateJudgeList = []
        }
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

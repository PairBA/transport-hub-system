<template>
  <div class="gateVehicle__homePage">
    <ContentLayout :showSpin="showSpin">
      <div slot="searchCondition">
        <Form>
          <FormItem :label="$t('sysManage.commonVar.startDateAndTime')">
            <DatePicker v-model="startDate" :editable="false" :clearable="false" type="date" :placeholder="$t('sysManage.queryBar.datePH')"/>
          </FormItem>
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
          <FormItem :label="$t('sysManage.commonVar.endDateAndTime')">
            <DatePicker v-model="endDate" :editable="false" :clearable="false" type="date" :placeholder="$t('sysManage.queryBar.datePH')"/>
          </FormItem>
          <FormItem :label="$t('sysManage.queryBar.issueType')">
            <Select v-model="judgeType" :placeholder="$t('sysManage.queryBar.issueTypePH')">
              <Option value="">{{$t("sysManage.queryBar.tripStatusSelect.ALL")}}</Option>
              <Option :value="'GPS_LOST'">{{ $t('sysManage.commonSelect.issueJudgeType.gpsLost') }}</Option>
              <Option :value="'GPS_REPEAT'">{{ $t('sysManage.commonSelect.issueJudgeType.gpsRepeat') }}</Option>
              <Option :value="'CLONE_VEHICLE'">{{ $t('sysManage.commonSelect.issueJudgeType.cloneVehicle') }}</Option>
              <Option :value="'UNKNOWN_VEHICLE'">{{ $t('sysManage.commonSelect.issueJudgeType.unknownVehicle') }}</Option>
              <Option :value="'GPS_TIME_ERROR'">{{ $t('sysManage.commonSelect.issueJudgeType.gpsTimeError') }}</Option>
              <Option :value="'NO_GPS_UPLOAD'">{{ $t('sysManage.commonSelect.issueJudgeType.noGpsUpload') }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('sysManage.queryBar.vehicleNo')">
            <Input v-model="vehicleNo"/>
          </FormItem>
          <div>
            <Button type="primary" style="margin-left: 24px;margin-bottom: 24px" @click="initPage" :disabled="showSpin">{{$t("sysManage.queryBar.searchBT")}}</Button>
            <Button type="primary" style="margin-left: 24px;margin-bottom: 24px" @click="exportGate">{{$t("sysManage.versionMgmt.exportExcel")}}</Button>
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
  </div>
</template>

<script>
import ContentLayout from '@/components/ContentLayout'
import TableWrapper from '@/components/wrapper/TableWrapper'
import PairPage from '@/components/common/PairPage'
import CompanySelect from '@/components/common/CompanySelect'
import {
  post,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
export default {
  components: {
    ContentLayout,
    TableWrapper,
    PairPage,
    CompanySelect
  },
  data() {
    return {
      showSpin: false,
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      judgeType: '',
      hubCode: '',
      vehicleNo: '',
      terminalName: '',
      gateJudgeList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    tableColumns() {
      return [
        {
          title: this.$t('sysManage.commonVar.hubName'),
          key: 'hubCode',
          width: 110,
          render: (h, params) => {
            const hubCode = params.row.hubCode
            let hubName = ''
            const hub = this.hubList.find(hub => hub.hubCode === hubCode)
            if (hub) hubName = hub.description
            return h('span', {
            }, hubName)
          }
        },
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
          width: 180
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
    },
    terminalList() {
      return this.$store.state.terminalList
    }
  },
  async mounted() {
    this.$store.dispatch('getCompListForSelect')
    this.$store.dispatch('getTerminalList')
    this.goSearch()
  },
  methods: {
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
      const baseUrl = process.env.BASE_URL
      const startDate = new Date(dateFormat((this.startDate), 'yyyy-MM-dd')).getTime()
      const endDate = new Date(dateFormat((this.endDate), 'yyyy-MM-dd')).getTime()
      const url = END_POINTS.EXPORT_GATE_JUDGE_REPORT + `?judgeType=${this.judgeType}&areaCode=CNSCA1&companyId=${this.$store.state.companyIdForSelect}&startDate=${dateFormat(new Date(startDate), 'yyyy-MM-dd')}&vehicleNo=${this.vehicleNo}&endDate=${dateFormat(new Date(endDate), 'yyyy-MM-dd')}&terminalName=${this.terminalName}&x-me-token=${token}`
      window.location.href = `${baseUrl}${url}`
    },
    async goSearch() {
      const startDate = new Date(dateFormat((this.startDate), 'yyyy-MM-dd')).getTime()
      const endDate = new Date(dateFormat((this.endDate), 'yyyy-MM-dd')).getTime()
      if (startDate > endDate) {
        this.$Notice.warning({
          desc: this.$t('sysManage.tripData.warningDesc')
        })
      } else {
        const token = localStorage.getItem('token')
        const gateJudgeListObject = await post(END_POINTS.GET_GATE_JUDGE_LIST, {
          currentPage: this.currentPage,
          orderBy: '',
          pageSize: this.pageSize,
          queryVO: {
            judgeType: this.judgeType,
            startDate: dateFormat(new Date(startDate), 'yyyy-MM-dd'),
            endDate: dateFormat(new Date(endDate), 'yyyy-MM-dd'),
            areaCode: this.$store.state.areaCodeForSelect,
            hubCode: localStorage.getItem('hubCode'),
            companyId: this.$store.state.companyIdForSelect,
            terminalName: this.terminalName,
            vehicleNo: this.vehicleNo
          },
          refreshTotalRecord: true
        }, token)
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
      }
    }
  }
}
</script>

<style lang="less">
.gateVehicle__homePage{}
</style>

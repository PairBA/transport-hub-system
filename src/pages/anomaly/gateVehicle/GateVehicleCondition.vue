<template>
  <div class="exception-queue__condition">
    <MenuSearchWrapper>
      <Form label-position="top">
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
          <Select v-model="judgeType" multiple :placeholder="$t('sysManage.queryBar.issueTypePH')">
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
          <VehicleInput v-model="vehicleNo"/>
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
        <div style="text-align: center">
          <Button type="primary"
                  :disabled="showSpin"
                  @click="goSearch">
            {{$t("sysManage.queryBar.searchBT")}}
          </Button>
          <Button type="primary"
                  style="margin-left: 24px"
                  @click="exportGate">
            {{$t("sysManage.versionMgmt.exportExcel")}}
          </Button>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
import { END_POINTS } from '@/api'
import { dateFormat } from '@/utils'
import CompanySelect from '@/components/common/CompanySelect'
import VehicleInput from '@/components/common/VehicleInput'
export default {
  components: {
    CompanySelect,
    VehicleInput
  },
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
    vehicleNo: {
      get() {
        return this.$store.state.gateVehicle.vehicleNo
      },
      set(value) {
        this.$store.commit('gateVehicle/updateVehicleNo', value)
      }
    },
    daterange: {
      get() {
        return this.$store.state.gateVehicle.daterange
      },
      set(value) {
        this.$store.commit('gateVehicle/updateDaterange', value)
      }
    },
    judgeType: {
      get() {
        return this.$store.state.gateVehicle.judgeType
      },
      set(value) {
        this.$store.commit('gateVehicle/updateJudgeType', value)
      }
    },
    terminalName: {
      get() {
        return this.$store.state.gateVehicle.terminalName
      },
      set(value) {
        this.$store.commit('gateVehicle/updateTerminalName', value)
      }
    },
    showSpin: {
      get() {
        return this.$store.state.search.showSpin
      },
      set(value) {
        this.$store.commit('search/updateShowSpin', value)
      }
    },
    terminalList() {
      return this.$store.state.terminalList
    }
  },
  methods: {
    async goSearch() {
      const startDate = new Date(dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd')).getTime()
      const endDate = new Date(dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd')).getTime()
      if (startDate > endDate) {
        this.$Notice.warning({
          desc: this.$t('sysManage.tripData.warningDesc')
        })
      } else {
        this.showSpin = true
        await this.$store.dispatch('gateVehicle/getGateJudgeList', { currentPage: 1 })
        this.showSpin = false
      }
    },
    exportGate() {
      const token = localStorage.getItem('token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      const startDate = new Date(dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd')).getTime()
      const endDate = new Date(dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd')).getTime()
      const url = END_POINTS.EXPORT_GATE_JUDGE_REPORT +
        '?judgeType=' + this.judgeType +
        '&areaCode=' + localStorage.getItem('areaCode') +
        '&companyId=' + this.$store.state.companyIdForSelect +
        '&startDate=' + dateFormat(new Date(startDate), 'yyyy-MM-dd') +
        '&vehicleNo=' + this.vehicleNo +
        '&endDate=' + dateFormat(new Date(endDate), 'yyyy-MM-dd') +
        '&terminalName=' + this.terminalName +
        '&x-me-token=' + token
      window.location.href = `${baseUrl}${url}`
    }
  }
}
</script>

<style lang="less">
.exception-queue__condition {
  .ivu-date-picker {
    width: 98%;
  }
}
</style>

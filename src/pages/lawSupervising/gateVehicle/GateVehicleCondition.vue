<template>
  <div class="gateVehicle__condition">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="交通枢纽：">
          <Select v-model="hubCode" :placeholder="'请输入交通枢纽'">
            <Option v-for="item in hubList"
                    :key="`gateVeh_hub_${item.hubCode}`"
                    :value="item.hubCode">
              {{ item.hubName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="闸口：">
          <Select v-model="gateName"
                  placeholder="请选择闸口">
            <Option value="">全部</Option>
            <Option value="T1">T1</Option>
            <Option value="T2">T2</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('sysManage.queryBar.terminalManufacturer')">
          <Select v-model="terminalName" :placeholder="$t('sysManage.queryBar.terminalManufacturerPH')">
            <Option :value="''" v-if="!terminalCode">
              {{ $t('sysManage.queryBar.driverStatusSelect.ALL') }}
            </Option>
            <Option v-for="item in terminalList"
                    :key="`gateVeh_ter_${item.terminalCode}`"
                    :value="item.terminalCode">
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
            <Option :value="'GPS_TIME_ERROR'">{{ $t('sysManage.commonSelect.issueJudgeType.gpsTimeError') }}</Option>
            <Option :value="'NO_GPS_UPLOAD'">{{ $t('sysManage.commonSelect.issueJudgeType.noGpsUpload') }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('sysManage.queryBar.vehicleNo')">
          <VehicleInput v-model="vehicleNo"/>
        </FormItem>
        <FormItem :label="$t('sysManage.commonVar.startDateAndTime')">
          <DatePicker v-model="startDate"
                      type="date"
                      format="yyyy/MM/dd"
                      style="float: left;"
                      :editable="false"
                      :clearable="false"
                      :options="options"
                      :placeholder="$t('sysManage.queryBar.datePH')">
          </DatePicker>
          <TimePicker v-model="startTime"
                      format="HH:mm"
                      style="float: right;"
                      :editable="false"
                      :clearable="false"
                      :disabled-minutes="disabledMinutes"
                      :placeholder="$t('sysManage.queryBar.timeSelectPH')">
          </TimePicker>
        </FormItem>
        <FormItem :label="$t('sysManage.commonVar.endDateAndTime')">
          <DatePicker v-model="endDate"
                      type="date"
                      format="yyyy/MM/dd"
                      style="float: left;"
                      :editable="false"
                      :clearable="false"
                      :options="options"
                      :placeholder="$t('sysManage.queryBar.datePH')">
          </DatePicker>
          <TimePicker v-model="endTime"
                      format="HH:mm"
                      style="float: right;"
                      :editable="false"
                      :disabled-minutes="disabledMinutes"
                      :clearable="false"
                      :placeholder="$t('sysManage.queryBar.timeSelectPH')">
          </TimePicker>
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
import { dateFormat, downloadFile } from '@/utils'
import CompanySelect from '@/components/common/CompanySelect'
import VehicleInput from '@/components/common/VehicleInput'
export default {
  components: {
    CompanySelect,
    VehicleInput
  },
  data() {
    const disabledMinutes = []
    for (let i = 0; i < 60; i++) {
      disabledMinutes.push(i)
    }
    return {
      disabledMinutes,
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  computed: {
    terminalCode() {
      return localStorage.getItem('hub-terminalCode')
    },
    hubCode: {
      set(value) {
        this.$store.commit('updateHubCode', value)
      },
      get() {
        return this.$store.state.hubCode
      }
    },
    hubList() {
      return localStorage.getItem('hubCodeAndNameList').split(';').map(hub => {
        const hubArr = hub.split(',')
        return {
          hubCode: hubArr[0],
          hubName: hubArr[1]
        }
      })
    },
    vehicleNo: {
      get() {
        return this.$store.state.gateVehicle.vehicleNo
      },
      set(value) {
        this.$store.commit('gateVehicle/updateVehicleNo', value)
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
    judgeType: {
      get() {
        return this.$store.state.gateVehicle.judgeType
      },
      set(value) {
        this.$store.commit('gateVehicle/updateJudgeType', value)
      }
    },
    gateName: {
      get() {
        return this.$store.state.gateVehicle.gateName
      },
      set(value) {
        this.$store.commit('gateVehicle/updateGateName', value)
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
      console.log(this.$store.state.terminalList)
      return this.$store.state.terminalList
    }
  },
  mounted() {
    if (!this.hubCode) {
      this.$store.commit('updateHubCode', this.hubList[0].hubCode)
    }
  },
  methods: {
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
    exportGate() {
      let judgeType = this.judgeType.join('::')
      if (this.judgeType.some(item => item === ' ')) {
        judgeType = 'GPS_LOST::GPS_REPEAT::GPS_TIME_ERROR::NO_GPS_UPLOAD'
      }
      const token = localStorage.getItem('hub-token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      const url = END_POINTS.EXPORT_GATE_JUDGE_REPORT +
        '?judgeType=' + judgeType +
        '&areaCode=' + localStorage.getItem('areaCode') +
        '&companyId=' + this.$store.state.companyIdForSelect +
        '&startDate=' + dateFormat(this.startDate, 'yyyy-MM-dd') + ' ' + this.startTime +
        '&vehicleNo=' + (this.vehicleNo === '川A' ? '' : this.vehicleNo) +
        '&endDate=' + dateFormat(this.endDate, 'yyyy-MM-dd') + ' ' + this.endTime +
        '&hubCode=' + this.hubCode +
        '&terminalName=' + this.terminalName +
        '&gateName=' + this.gateName +
        '&x-me-token=' + token
      downloadFile(`${baseUrl}${url}`)
    }
  }
}
</script>

<style lang="less">
.gateVehicle__condition {
  .ivu-date-picker {
    width: 49%;
  }
}
</style>

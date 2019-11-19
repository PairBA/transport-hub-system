<template>
  <div class="no-vehicle__condition">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="交通枢纽：">
          <Select v-model="hubCode"
                  :placeholder="'请输入交通枢纽'">
            <Option v-for="item in hubList"
                    :key="`noVehicle_${item.hubCode}`"
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
import VehicleInput from '@/components/common/VehicleInput'
export default {
  components: {
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
    gateName: {
      get() {
        return this.$store.state.gateVehicle.gateName
      },
      set(value) {
        this.$store.commit('gateVehicle/updateGateName', value)
      }
    },
    showSpin: {
      get() {
        return this.$store.state.search.showSpin
      },
      set(value) {
        this.$store.commit('search/updateShowSpin', value)
      }
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
        this.$store.commit('gateVehicle/updateJudgeType', ['UNKNOWN_VEHICLE'])
        await this.$store.dispatch('gateVehicle/getGateJudgeList', { currentPage: 1 })
        await this.$store.dispatch('gateVehicle/getGateJudgeGraph')
        this.showSpin = false
      }
    },
    exportGate() {
      const token = localStorage.getItem('hub-token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      const url = END_POINTS.EXPORT_GATE_JUDGE_REPORT +
        '?judgeType=UNKNOWN_VEHICLE' +
        '&areaCode=' + localStorage.getItem('areaCode') +
        '&startDate=' + dateFormat(this.startDate, 'yyyy-MM-dd') + ' ' + this.startTime +
        '&vehicleNo=' + this.vehicleNo +
        '&endDate=' + dateFormat(this.endDate, 'yyyy-MM-dd') + ' ' + this.endTime +
        '&hubCode=' + this.hubCode +
        '&gateName=' + this.gateName +
        '&x-me-token=' + token
      downloadFile(`${baseUrl}${url}`)
      // window.location.href = `${baseUrl}${url}`
    }
  }
}
</script>

<style lang="less">
.no-vehicle__condition {
  .ivu-date-picker {
    width: 49%;
  }
}
</style>

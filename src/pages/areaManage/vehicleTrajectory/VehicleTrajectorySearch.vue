<template>
  <div class="vehicle-trajectory-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="车辆号牌">
          <VehicleInput v-model="vehicleNo"/>
        </FormItem>
        <FormItem :label="$t('sysManage.commonVar.startDateAndTime')">
          <DatePicker v-model="vehtStartDate"
                      type="date"
                      format="yyyy/MM/dd"
                      style="float: left;"
                      :editable="false"
                      :clearable="false"
                      :options="options"
                      :placeholder="$t('sysManage.queryBar.datePH')">
          </DatePicker>
          <TimePicker v-model="vehtStartHour"
                      format="HH:mm"
                      style="float: right;"
                      :editable="false"
                      :clearable="false"
                      :placeholder="$t('sysManage.queryBar.timeSelectPH')">
          </TimePicker>
        </FormItem>
        <FormItem :label="$t('sysManage.commonVar.endDateAndTime')">
          <DatePicker v-model="vehtEndDate"
                      type="date"
                      format="yyyy/MM/dd"
                      style="float: left;"
                      :editable="false"
                      :clearable="false"
                      :options="options"
                      :placeholder="$t('sysManage.queryBar.datePH')">
          </DatePicker>
          <TimePicker v-model="vehtEndHour"
                      format="HH:mm"
                      style="float: right;"
                      :editable="false"
                      :clearable="false"
                      :placeholder="$t('sysManage.queryBar.timeSelectPH')">
          </TimePicker>
        </FormItem>
        <Divider/>
        <div style="text-align: center">
          <Button type="primary"
                  @click="goSearch">
            {{$t("sysManage.queryBar.searchBT")}}
          </Button>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
import { dateFormat, drawTripLine } from '@/utils'
import VehicleInput from '@/components/common/VehicleInput'
export default {
  components: {
    VehicleInput
  },
  data() {
    return {
      vehicleNo: '川A',
      vehtStartDate: '',
      vehtStartHour: '',
      vehtEndDate: '',
      vehtEndHour: '',
      vehtCorrected: true,
      options: {
        disabledDate(date) {
          return date && date.valueOf() < new Date().getTime() - 15 * 24 * 60 * 60 * 1000
        }
      }
    }
  },
  computed: {
    tripStatusAndGpsInfo: {
      get() {
        return this.$store.state.search.vehTraObj.tripStatusAndGpsInfo
      },
      set(value) {
        this.$store.commit('search/updateVehTraObjTripStatusAndGpsInfo', value)
      }
    },
    polylines: {
      get() {
        return this.$store.state.search.vehTraObj.polylines
      },
      set(value) {
        this.$store.commit('search/updateVehTraObjPolylines', value)
      }
    },
    allGpsList: {
      get() {
        return this.$store.state.search.vehTraObj.allGpsList
      },
      set(value) {
        this.$store.commit('search/updateVehTraObjAllGpsList', value)
      }
    },
    timeForGpsList: {
      get() {
        return this.$store.state.search.vehTraObj.timeForGpsList
      },
      set(value) {
        this.$store.commit('search/updateVehTraObjTimeForGpsList', value)
      }
    }
  },
  methods: {
    initQueryDate() {
      // 取到当前时间
      let nowDate = new Date()
      let strDateMinute = dateFormat((nowDate), 'yyyy-MM-dd hh:mm')
      // 得到与最近的分钟时间前N个小时的时间
      let strNearNHour = dateFormat(new Date(new Date(strDateMinute).getTime() - 60 * 60 * 1000), 'yyyy-MM-dd hh:mm')
      // 根据两个时间来初始化页面查询条件的时间
      let startDate = dateFormat(new Date(strNearNHour), 'yyyy-MM-dd')
      let startTime = dateFormat(new Date(strNearNHour), 'hh:mm')
      let endDate = dateFormat(new Date(strDateMinute), 'yyyy-MM-dd')
      let endTime = dateFormat(new Date(strDateMinute), 'hh:mm')
      // 初始化查询时间条件
      this.vehtStartDate = startDate
      this.vehtStartHour = startTime
      this.vehtEndDate = endDate
      this.vehtEndHour = endTime
    },
    async goSearch() {
      let startDate = this.vehtStartDate
      let startTime = this.vehtStartHour
      let endDate = this.vehtEndDate
      let endTime = this.vehtEndHour
      let startDateTime = dateFormat(new Date(startDate), 'yyyy-MM-dd') + ' ' + startTime
      let endDateTime = dateFormat(new Date(endDate), 'yyyy-MM-dd') + ' ' + endTime
      let startTimeStamp = new Date(startDateTime).getTime()
      let endTimeStamp = new Date(endDateTime).getTime()
      if (!this.vehicleNo || this.vehicleNo === '川A') {
        this.$Message.warning({
          content: this.$t('sysManage.queryBar.vehicleNoPH')
        })
      } else if (!this.vehtStartDate || !this.vehtStartHour || !this.vehtEndDate || !this.vehtEndHour) {
        this.$Message.warning({
          content: this.$t('sysManage.queryBar.selectDateAndTime')
        })
      } else if (startTimeStamp > endTimeStamp) {
        this.$Message.warning({
          content: this.$t('sysManage.queryBar.startTimeNotGreaterTheEndTime')
        })
      } else if (endTimeStamp - startTimeStamp > 3 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: this.$t('sysManage.vehicleTrajectory.moreThanOneDay')
        })
      } else {
        this.$store.commit('search/updateShowSpin', true)
        const response = await get(END_POINTS.GET_TRAIL_LIST, {
          vehicleNo: this.vehicleNo === '川A' ? '' : this.vehicleNo,
          driverType: 'TAXI',
          startDate: dateFormat(new Date(this.vehtStartDate), 'yyyy-MM-dd') + ' ' + this.vehtStartHour + ':00',
          endDate: dateFormat(new Date(this.vehtEndDate), 'yyyy-MM-dd') + ' ' + this.vehtEndHour + ':00',
          corrected: this.vehtCorrected
        })
        if (response.code === 2000) {
          let value = response.data
          this.tripStatusAndGpsInfo = value.tripLineList
          this.allGpsList = value.allGpsList
          this.timeForGpsList = value.timeForGpsList
          const polylinsArr = []
          this.tripStatusAndGpsInfo.map(value => {
            if (value.driverStatus === 'HIRED') {
              let polyline = drawTripLine(value.gpsList, '#6AA84F')
              polylinsArr.push(polyline)
            }
            if (value.driverStatus === 'AVL' || value.driverStatus === 'PAY') {
              let polyline = drawTripLine(value.gpsList, '#0091FF')
              polylinsArr.push(polyline)
            }
          })
          this.polylines = polylinsArr
        } else {
          this.tripStatusAndGpsInfo = []
          this.polylines = []
          this.allGpsList = []
          this.timeForGpsList = []
        }
        this.$store.commit('search/updateShowSpin', false)
      }
    }
  },
  mounted() {
    this.initQueryDate()
  }
}
</script>

<style lang="less">
.vehicle-trajectory-search {
  .ivu-date-picker {
    width: 49%;
  }
}
</style>

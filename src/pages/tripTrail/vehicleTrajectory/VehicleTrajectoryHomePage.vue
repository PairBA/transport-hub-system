<template>
    <div class="vehicleTrajectory__homePage">
      <ContentLayout :showSpin="showSpin">
        <div slot="searchCondition">
          <Form>
            <FormItem label="车辆号牌">
              <Input v-model="vehicleNo" placeholder="请输入车辆号牌"/>
            </FormItem>
            <FormItem :label="$t('sysManage.commonVar.startDateAndTime')">
              <DatePicker v-model="vehtStartDate" :editable="false" :clearable="false" type="date"
                          :options="options" :placeholder="$t('sysManage.queryBar.datePH')" style="margin-bottom: 24px"/>
              <TimePicker v-model="vehtStartHour" :editable="false" :clearable="false" format="HH:mm"
                          :placeholder="$t('sysManage.queryBar.timeSelectPH')"/>
            </FormItem>
            <FormItem :label="$t('sysManage.commonVar.endDateAndTime')">
              <DatePicker v-model="vehtEndDate" :editable="false" :clearable="false" type="date"
                          :options="options" :placeholder="$t('sysManage.queryBar.datePH')" style="margin-bottom: 24px"/>
              <TimePicker v-model="vehtEndHour" :editable="false" :clearable="false" format="HH:mm"
                          :placeholder="$t('sysManage.queryBar.timeSelectPH')"/>
            </FormItem>
            <Divider/>
            <Button type="primary" style="margin: 0 0 24px 24px" @click="goSearch">{{$t("sysManage.queryBar.searchBT")}}</Button>
          </Form>
        </div>
        <div slot="content">
          <VehicleTrajectoryAMap :tripStatusAndGpsInfo="tripStatusAndGpsInfo"
                                 :polylines="polylines"
                                 :allGpsList="allGpsList"
                                 :timeForGpsList="timeForGpsList"></VehicleTrajectoryAMap>
        </div>
      </ContentLayout>
    </div>
</template>

<script>
import ContentLayout from '@/components/ContentLayout'
import VehicleTrajectoryAMap from '@/components/tripTrail/VehicleTrajectoryAMap'
import {
  get,
  END_POINTS
} from '@/api'
import { dateFormat, drawTripLine } from '@/utils'
export default {
  components: {
    ContentLayout,
    VehicleTrajectoryAMap
  },
  data() {
    return {
      showSpin: false,
      vehicleNo: '川ATR888',
      vehtStartDate: '',
      vehtStartHour: '',
      vehtEndDate: '',
      vehtEndHour: '',
      vehtCorrected: true,
      tripStatusAndGpsInfo: [],
      polylines: [],
      allGpsList: [],
      timeForGpsList: [],
      options: {
        disabledDate(date) {
          return date && date.valueOf() < new Date().getTime() - 15 * 24 * 60 * 60 * 1000
          // return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  methods: {
    async goSearch() {
      let startDate = this.vehtStartDate
      let startTime = this.vehtStartHour
      let endDate = this.vehtEndDate
      let endTime = this.vehtEndHour
      let startDateTime = dateFormat(new Date(startDate), 'yyyy-MM-dd') + ' ' + startTime
      let endDateTime = dateFormat(new Date(endDate), 'yyyy-MM-dd') + ' ' + endTime
      let startTimeStamp = new Date(startDateTime).getTime()
      let endTimeStamp = new Date(endDateTime).getTime()
      if (!this.vehicleNo) {
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
        this.showSpin = true
        const response = await this.getTrailListForVehicle()
        this.showSpin = false
        if (response.code === 2000) {
          let value = response.data
          this.tripStatusAndGpsInfo = value.tripLineList
          this.allGpsList = value.allGpsList
          this.timeForGpsList = value.timeForGpsList
          this.polylines = []
          this.tripStatusAndGpsInfo.map(value => {
            if (value.driverStatus === 'HIRED') {
              let polyline = drawTripLine(value.gpsList, '#6AA84F')
              this.polylines.push(polyline)
            }
            if (value.driverStatus === 'AVL' || value.driverStatus === 'PAY') {
              let polyline = drawTripLine(value.gpsList, '#0091FF')
              this.polylines.push(polyline)
            }
          })
        } else {
          this.tripStatusAndGpsInfo = []
          this.polylines = []
          this.allGpsList = []
          this.timeForGpsList = []
        }
      }
    },
    async getTrailListForVehicle() {
      return get(END_POINTS.GET_TRAIL_LIST + `?vehicleNo=${this.vehicleNo}&driverType=TAXI&startDate=${dateFormat(new Date(this.vehtStartDate), 'yyyy-MM-dd')} ${this.vehtStartHour}:00&endDate=${dateFormat(new Date(this.vehtEndDate), 'yyyy-MM-dd')} ${this.vehtEndHour}:00&corrected=${this.vehtCorrected}`)
    }
  }
}
</script>

<style lang="less">
.vehicleTrajectory__homePage{}
</style>

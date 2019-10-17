<template>
  <div class="gps-onlineTime__condition">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="车辆号牌">
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
          <TimePicker v-model="startHour"
                      format="HH:mm"
                      style="float: right;"
                      :editable="false"
                      :clearable="false"
                      :disabled-minutes="disableMinutes"
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
          <TimePicker v-model="endHour"
                      format="HH:mm"
                      style="float: right;"
                      :editable="false"
                      :disabled-minutes="disableMinutes"
                      :clearable="false"
                      :placeholder="$t('sysManage.queryBar.timeSelectPH')">
          </TimePicker>
        </FormItem>
        <Divider/>
        <div style="text-align: center">
          <Button type="primary"
                  @click="goSearch">
            查询
          </Button>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
import { END_POINTS, get } from '@/api'
import { dateFormat } from '@/utils'
import VehicleInput from '@/components/common/VehicleInput'
export default {
  components: {
    VehicleInput
  },
  data() {
    const disableMinutes = []
    for (let i = 0; i < 60; i++) {
      disableMinutes.push(i)
    }
    const today = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    const formatToday = dateFormat(today, 'yyyy-MM-dd hh') + '12:00'
    const formatTodayForHour = dateFormat(today, 'yyyy-MM-dd hh') + '00:00'
    return {
      disableMinutes,
      showEchart: false,
      vehicleNo: '',
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      startHour: new Date(formatToday),
      endHour: new Date(formatTodayForHour),
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  computed: {
    routerName() {
      return this.$route.name
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
    const vehicleNo = this.$route.query.vehicleNo
    console.log(vehicleNo)
    if (vehicleNo) {
      this.vehicleNo = vehicleNo || ''
      this.goSearch()
    }
  },
  methods: {
    async goSearch() {
      const startDate = new Date(`${dateFormat(this.startDate, 'yyyy-MM-dd')} ${this.startHour}:00`).getTime()
      const endDate = new Date(`${dateFormat(this.endDate, 'yyyy-MM-dd')} ${this.endHour}:00`).getTime()
      if (startDate > endDate) {
        this.$Message.warning({
          content: this.$t('sysManage.tripData.warningDesc')
        })
      } else if (endDate - startDate > 14 * 24 * 60 * 60 * 1000) { // 时间间隔大于14天
        this.$Message.warning({
          content: this.$t('sysManage.queryBar.notGt14Day')
        })
      } else if (!this.vehicleNo) {
        this.$Message.warning({
          content: this.$t('sysManage.queryBar.vehicleNoPH')
        })
      } else {
        this.getGPSGraphData()
      }
    },
    async getGPSGraphData() {
      this.showSpin = true
      const GPSGraphObject = await get(END_POINTS.GET_GPS_POINT_COUNT, {
        areaCode: this.$store.state.areaCodeForSelect,
        vehicleNo: this.vehicleNo,
        startDate: dateFormat(this.startDate, 'yyyy-MM-dd ') + this.startHour,
        endDate: dateFormat(this.endDate, 'yyyy-MM-dd ') + this.endHour
      })
      if (GPSGraphObject.success) {
        if (GPSGraphObject.code === 2006) {
          this.$Message.warning({
            content: GPSGraphObject.msg
          })
        }
        this.$store.commit('gpsOnlineTime/updateGPSGraphData', GPSGraphObject.data)
      } else {
        this.$Message.warning({
          content: GPSGraphObject.msg
        })
      }
      this.showSpin = false
    }
  }
}
</script>

<style lang="less">
.gps-onlineTime__condition {
  .ivu-date-picker {
    width: 49%;
  }
}
</style>

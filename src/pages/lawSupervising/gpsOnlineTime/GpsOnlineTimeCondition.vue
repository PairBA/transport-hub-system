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
    return {
      disableMinutes,
      showEchart: false,
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
    },
    vehicleNo: {
      get() {
        return this.$store.state.gpsOnlineTime.vehicleNo
      },
      set(value) {
        this.$store.commit('gpsOnlineTime/updateVehicleNo', value)
      }
    },
    startDate: {
      get() {
        return this.$store.state.gpsOnlineTime.startDate
      },
      set(value) {
        this.$store.commit('gpsOnlineTime/updateStartDate', value)
      }
    },
    endDate: {
      get() {
        return this.$store.state.gpsOnlineTime.endDate
      },
      set(value) {
        this.$store.commit('gpsOnlineTime/updateEndDate', value)
      }
    },
    startHour: {
      get() {
        return this.$store.state.gpsOnlineTime.startHour
      },
      set(value) {
        this.$store.commit('gpsOnlineTime/updateStartHour', value)
      }
    },
    endHour: {
      get() {
        return this.$store.state.gpsOnlineTime.endHour
      },
      set(value) {
        this.$store.commit('gpsOnlineTime/updateEndHour', value)
      }
    }
  },
  mounted() {
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
        this.showSpin = true
        const GPSGraphObject = await this.$store.dispatch('gpsOnlineTime/getGpsPointCount')
        if (GPSGraphObject.success) {
          if (GPSGraphObject.code === 2006) {
            this.$Message.warning({
              content: GPSGraphObject.msg
            })
          }
        }
        this.showSpin = false
      }
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

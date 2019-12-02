<template>
  <div class="gate-vehicle-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="交通枢纽：">
          <Select v-model="hubCode"
                  :placeholder="'请输入交通枢纽'">
            <Option v-for="item in hubList"
                    :key="`gatVeh_${item.hubCode}`"
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
        <FormItem label="车辆号牌">
          <VehicleInput v-model="vehicleNo"/>
        </FormItem>
        <FormItem label="开始时间：">
          <DatePicker v-model="startDate"
                      type="date"
                      format="yyyy/MM/dd"
                      placeholder="请选择日期"
                      style="float: left;"
                      :clearable="false"
                      :editable="false"
                      :options="options">
          </DatePicker>
          <TimePicker v-model="startTime"
                      type="time"
                      format="HH:mm"
                      placeholder="请选择时间"
                      style="float: right;"
                      :clearable="false"
                      :editable="false">
          </TimePicker>
        </FormItem>
        <FormItem label="结束时间：">
          <DatePicker v-model="endDate"
                      type="date"
                      format="yyyy/MM/dd"
                      placeholder="请选择日期"
                      style="float: left;"
                      :clearable="false"
                      :editable="false"
                      :options="options">
          </DatePicker>
          <TimePicker v-model="endTime"
                      type="time"
                      format="HH:mm"
                      placeholder="请选择时间"
                      style="float: right;"
                      :clearable="false"
                      :editable="false">
          </TimePicker>
        </FormItem>
        <Divider/>
        <div style="text-align: center;">
          <Button type="primary"
                  @click="goSearch">
            查询
          </Button>
          <Button type="primary"
                  style="margin-left: 24px;"
                  @click="exportExcel">
            导出excel
          </Button>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
import VehicleInput from '@/components/common/VehicleInput'
import { dateFormat, downloadFile } from '@/utils'
import {
  END_POINTS
} from '@/api'
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
        return this.$store.state.gateVehicleSearch.vehicleNo
      },
      set(value) {
        this.$store.commit('gateVehicleSearch/updateVehicleNo', value)
      }
    },
    gateName: {
      get() {
        return this.$store.state.gateVehicleSearch.gateName
      },
      set(value) {
        this.$store.commit('gateVehicleSearch/updateGateName', value)
      }
    },
    startDate: {
      get() {
        return this.$store.state.gateVehicleSearch.startDate
      },
      set(value) {
        this.$store.commit('gateVehicleSearch/updateStartDate', value)
      }
    },
    startTime: {
      get() {
        return this.$store.state.gateVehicleSearch.startTime
      },
      set(value) {
        this.$store.commit('gateVehicleSearch/updateStartTime', value)
      }
    },
    endDate: {
      get() {
        return this.$store.state.gateVehicleSearch.endDate
      },
      set(value) {
        this.$store.commit('gateVehicleSearch/updateEndDate', value)
      }
    },
    endTime: {
      get() {
        return this.$store.state.gateVehicleSearch.endTime
      },
      set(value) {
        this.$store.commit('gateVehicleSearch/updateEndTime', value)
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
      this.showSpin = true
      await this.$store.dispatch('gateVehicleSearch/getGateVehicleList', { currentPage: 1 })
      this.showSpin = false
    },
    async exportExcel() {
      const vehicleNo = this.vehicleNo === '川A' ? '' : this.vehicleNo
      const token = localStorage.getItem('hub-token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      const url = END_POINTS.EXPORT_GATE_VEHICLE_LIST +
        '?gateName=' + this.gateName +
        '&vehicleNo=' + vehicleNo +
        '&hubCode=' + this.hubCode +
        '&startDate=' + dateFormat(new Date(this.startDate), 'yyyy-MM-dd') + ' ' + this.startTime + ':00' +
        '&endDate=' + dateFormat(new Date(this.endDate), 'yyyy-MM-dd') + ' ' + this.endTime + ':00' +
        '&x-me-token=' + token
      downloadFile(`${baseUrl}${url}`)
    }
  }
}
</script>

<style lang="less">
.gate-vehicle-search {
  .ivu-date-picker {
    width: 49%;
  }
}
</style>

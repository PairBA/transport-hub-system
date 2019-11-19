<template>
  <div class="gps-error__condition">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem :label="$t('sysManage.queryBar.terminalManufacturer')">
          <Select v-model="terminalName" :placeholder="$t('sysManage.queryBar.terminalManufacturerPH')">
            <Option v-if="!terminalCode" :value="''">
              {{ $t('sysManage.queryBar.driverStatusSelect.ALL') }}
            </Option>
            <Option v-for="item in terminalList"
                    :key="`gpsAno_${item.terminalCode}`"
                    :value="item.terminalCode">
              {{ item.terminalName }}
            </Option>
          </Select>
        </FormItem>
        <CompanySelect/>
        <FormItem label="车辆号牌">
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
                  @click="goSearch">
            查询
          </Button>
          <Button type="primary"
                  style="margin-left: 24px"
                  @click="exportExcel">
            导出excel
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
    VehicleInput,
    CompanySelect
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
    terminalCode() {
      return localStorage.getItem('hub-terminalCode')
    },
    companyId() {
      return this.$store.state.companyIdForSelect
    },
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
        return this.$store.state.gpsAnomaly.vehicleNo
      },
      set(value) {
        this.$store.commit('gpsAnomaly/updateVehicleNo', value)
      }
    },
    terminalName: {
      get() {
        return this.$store.state.gpsAnomaly.terminalName
      },
      set(value) {
        this.$store.commit('gpsAnomaly/updateTerminalName', value)
      }
    },
    daterange: {
      get() {
        return this.$store.state.gpsAnomaly.daterange
      },
      set(value) {
        this.$store.commit('gpsAnomaly/updateDaterange', value)
      }
    },
    terminalList() {
      return this.$store.state.terminalList
    }
  },
  mounted() {
    this.goSearch()
  },
  methods: {
    async goSearch() {
      if (new Date(this.daterange[1]).getTime() - new Date(this.daterange[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.showSpin = true
        await this.$store.dispatch('gpsAnomaly/getGpsErrorStatList', { currentPage: 1 })
        this.showSpin = false
      }
    },
    exportExcel() {
      if (new Date(this.daterange[1]).getTime() - new Date(this.daterange[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        const token = localStorage.getItem('hub-token')
        const baseUrl = process.env.VUE_APP_BASE_URL
        const url = END_POINTS.EXPORT_GPS_ERROR_STAT_LIST +
          '?startDate=' + dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd') + ' 00:00' +
          '&areaCode=' + localStorage.getItem('areaCode') +
          '&endDate=' + dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd') + ' 23:59' +
          '&vehicleNo=' + this.vehicleNo +
          '&terminalName=' + this.terminalName +
          '&companyId=' + this.companyId +
          '&x-me-token=' + token
        downloadFile(`${baseUrl}${url}`)
        // window.location.href = `${baseUrl}${url}`
      }
    }
  }
}
</script>

<style lang="less">
.gps-error__condition {
  .ivu-date-picker {
    width: 98%;
  }
}
</style>

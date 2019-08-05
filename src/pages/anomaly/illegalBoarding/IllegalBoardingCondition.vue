<template>
  <div class="illegal-boarding__condition">
    <MenuSearchWrapper>
      <Form label-position="top">
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
import VehicleInput from '@/components/common/VehicleInput'
export default {
  components: {
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
        return this.$store.state.illegalBoarding.vehicleNo
      },
      set(value) {
        this.$store.commit('illegalBoarding/updateVehicleNo', value)
      }
    },
    daterange: {
      get() {
        return this.$store.state.illegalBoarding.daterange
      },
      set(value) {
        this.$store.commit('illegalBoarding/updateDaterange', value)
      }
    }
  },
  methods: {
    async goSearch() {
      if (new Date(this.daterange[1]).getTime() - new Date(this.daterange[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.showSpin = true
        await this.$store.dispatch('illegalBoarding/getHubStatTrailList', { currentPage: 1 })
        await this.$store.dispatch('illegalBoarding/getHubStatTrailGraph')
        this.showSpin = false
      }
    },
    exportExcel() {
      if (new Date(this.daterange[1]).getTime() - new Date(this.daterange[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        const token = localStorage.getItem('token')
        const baseUrl = process.env.VUE_APP_BASE_URL
        const url = END_POINTS.GET_HUB_STAT_TRAIL_CUTQ_EXCEL +
          '?startDate=' + dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd') +
          '&endDate=' + dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd') +
          '&vehicleNo=' + this.vehicleNo +
          '&driverType=TAXI' +
          '&areaCode=' + localStorage.getItem('areaCode') +
          '&hubCode=' + localStorage.getItem('hubCode') +
          '&x-me-token=' + token
        downloadFile(`${baseUrl}${url}`)
        // window.location.href = `${baseUrl}${url}`
      }
    }
  }
}
</script>

<style lang="less">
.illegal-boarding__condition {
  .ivu-date-picker {
    width: 98%;
  }
}
</style>

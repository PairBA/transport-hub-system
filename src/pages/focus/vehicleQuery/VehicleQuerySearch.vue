<template>
  <div class="vehicle-query-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="车牌号：">
          <Input v-model="vehicleNo"
                 placeholder="请输入车牌号"/>
        </FormItem>
        <FormItem label="时间区间：">
          <DatePicker v-model="focusDate"
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
        <div style="text-align: center;">
          <Button type="primary"
                  @click="vehicleQuerySearch">
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
import { END_POINTS } from '@/api'
import { dateFormat } from '@/utils'

export default {
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
        return this.$store.state.vehicleQuery.vehicleNo
      },
      set(value) {
        this.$store.commit('vehicleQuery/updateVehicleNo', value)
      }
    },
    focusDate: {
      get() {
        return this.$store.state.vehicleQuery.focusDate
      },
      set(value) {
        this.$store.commit('vehicleQuery/updateFocusDate', value)
      }
    }
  },
  methods: {
    async vehicleQuerySearch() {
      if (new Date(this.focusDate[1]).getTime() - new Date(this.focusDate[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.$store.commit('search/updateShowSpin', true)
        this.$store.commit('vehicleQuery/updateTableListObjectCurrentPage', 1)
        const result = await this.$store.dispatch('vehicleQuery/getHubStatTrailList')
        if (result.code === 2006) {
          if (this.vehicleNo && this.vehicleNo !== '川A') {
            await this.$store.dispatch('vehicleQuery/isVehicleFocus')
          }
        }
        this.$store.commit('search/updateShowSpin', false)
      }
    },
    exportExcel() {
      if (new Date(this.focusDate[1]).getTime() - new Date(this.focusDate[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        const token = localStorage.getItem('token')
        const baseUrl = process.env.VUE_APP_BASE_URL
        const url = END_POINTS.GET_HUB_STAT_TRAIL_ALL_EXCEL +
          '?startDate=' + dateFormat(new Date(this.focusDate[0]), 'yyyy-MM-dd') +
          '&endDate=' + dateFormat(new Date(this.focusDate[1]), 'yyyy-MM-dd') +
          '&vehicleNo=' + this.vehicleNo +
          '&driverType=TAXI' +
          '&areaCode=' + localStorage.getItem('areaCode') +
          '&hubCode=' + localStorage.getItem('hubCode') +
          '&x-me-token=' + token
        window.location.href = `${baseUrl}${url}`
      }
    }
  }
}
</script>

<style lang="less">
.vehicle-query-search {
  .ivu-date-picker {
    width: 100%;
  }
}
</style>

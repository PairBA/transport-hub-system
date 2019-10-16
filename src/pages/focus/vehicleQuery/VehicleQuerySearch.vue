<template>
  <div class="vehicle-query-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="交通枢纽：">
          <Select v-model="hubCode" :placeholder="'请输入交通枢纽'">
            <Option v-for="item in hubList" :key="item.hubCode" :value="item.hubCode">
              {{ item.hubName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="车牌号：">
          <VehicleInput v-model="vehicleNo"/>
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
  mounted() {
    if (!this.hubCode) {
      this.$store.commit('updateHubCode', this.hubList[0].hubCode)
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
        if (result.code === 2006 || result.data.length === 0) {
          if (this.vehicleNo && this.vehicleNo !== '川A') {
            const resultNo = await this.$store.dispatch('vehicleQuery/getVehicleInfoByNo')
            if (resultNo.code === 2006) {
              await this.$store.dispatch('vehicleQuery/isVehicleFocus')
            }
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
        const token = localStorage.getItem('hub-token')
        const baseUrl = process.env.VUE_APP_BASE_URL
        const url = END_POINTS.GET_HUB_STAT_TRAIL_ALL_EXCEL +
          '?startDate=' + dateFormat(new Date(this.focusDate[0]), 'yyyy-MM-dd') +
          '&endDate=' + dateFormat(new Date(this.focusDate[1]), 'yyyy-MM-dd') +
          '&vehicleNo=' + this.vehicleNo +
          '&driverType=TAXI' +
          '&areaCode=' + localStorage.getItem('areaCode') +
          '&configId=' + localStorage.getItem('configId') +
          '&hubCode=' + this.hubCode +
          '&x-me-token=' + token
        // window.location.href = `${baseUrl}${url}`
        // window.open(`${baseUrl}${url}`)
        downloadFile(`${baseUrl}${url}`)
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

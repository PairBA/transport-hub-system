<template>
  <div class="exception-queue__condition">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="交通枢纽：">
          <Select v-model="hubCode"
                  :placeholder="'请输入交通枢纽'">
            <Option v-for="item in hubList"
                    :key="`exeQue_${item.hubCode}`"
                    :value="item.hubCode">
              {{ item.hubName }}
            </Option>
          </Select>
        </FormItem>
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
    routerName() {
      return this.$route.name
    },
    vehicleNo: {
      get() {
        return this.$store.state.exceptionQueue.vehicleNo
      },
      set(value) {
        this.$store.commit('exceptionQueue/updateVehicleNo', value)
      }
    },
    daterange: {
      get() {
        return this.$store.state.exceptionQueue.daterange
      },
      set(value) {
        this.$store.commit('exceptionQueue/updateDaterange', value)
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
      if (new Date(this.daterange[1]).getTime() - new Date(this.daterange[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.showSpin = true
        await this.$store.dispatch('exceptionQueue/getHubStatTrailList', { currentPage: 1 })
        await this.$store.dispatch('exceptionQueue/getHubStatTrailGraph')
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
        const url = END_POINTS.GET_HUB_STAT_TRAIL_CUTQ_EXCEL +
          '?startDate=' + dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd') +
          '&endDate=' + dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd') +
          '&vehicleNo=' + this.vehicleNo +
          '&driverType=TAXI' +
          '&areaCode=' + localStorage.getItem('areaCode') +
          '&hubCode=' + this.hubCode +
          '&x-me-token=' + token + '&me-api-type=hubmanager'
        downloadFile(`${baseUrl}${url}`)
        // window.location.href = `${baseUrl}${url}`
      }
    }
  }
}
</script>

<style lang="less">
.exception-queue__condition {
  .ivu-date-picker {
    width: 98%;
  }
}
</style>

<template>
  <div class="focus-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="交通枢纽：">
          <Select v-model="hubCode"
                  :placeholder="'请输入交通枢纽'">
            <Option v-for="item in hubList"
                    :key="`focSea_${item.hubCode}`"
                    :value="item.hubCode">
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
        <Button type="primary"
                @click="focusSearch">
          查询
        </Button>
        <Button type="primary"
                style="float: right;"
                @click="exportExcel">
          导出excel
        </Button>
        <Divider/>
        <div>
          <Button @click="exportModel" style="float: right">
            模版导出
          </Button>
          <Upload :action="importUrl"
                  id="uploadFile" name="uploadFile"
                  :data="param"
                  :headers="headers">
            <Button>数据导入</Button>
          </Upload>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
import { END_POINTS } from '@/api'
import { dateFormat, downloadFile } from '@/utils'
import VehicleInput from '@/components/common/VehicleInput'

const baseUrl = process.env.VUE_APP_BASE_URL
export default {
  components: {
    VehicleInput
  },
  data() {
    return {
      importUrl: `${baseUrl + END_POINTS.UPLOAD_FOCUS_VEHICLE_LIST}`,
      headers: {
        'x-me-token': localStorage.getItem('hub-token')
      },
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  computed: {
    param() {
      return {
        hubCode: this.hubCode,
        configId: localStorage.getItem('configId')
      }
    },
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
        return this.$store.state.focus.vehicleNo
      },
      set(value) {
        this.$store.commit('focus/updateVehicleNo', value)
      }
    },
    focusDate: {
      get() {
        return this.$store.state.focus.focusDate
      },
      set(value) {
        this.$store.commit('focus/updateFocusDate', value)
      }
    }
  },
  mounted() {
    if (!this.hubCode) {
      this.$store.commit('updateHubCode', this.hubList[0].hubCode)
    }
  },
  methods: {
    async focusSearch() {
      if (new Date(this.focusDate[1]).getTime() - new Date(this.focusDate[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.$store.commit('search/updateShowSpin', true)
        this.$store.commit('focus/updateTableListObjectCurrentPage', 1)
        const result = await this.$store.dispatch('focus/getHubFocusVehicleList')
        if (result.code === 2006) {
          this.$Message.warning({
            content: result.msg + '！'
          })
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
        const vehicleNo = this.vehicleNo === '川A' ? '' : this.vehicleNo
        const token = localStorage.getItem('hub-token')
        const baseUrl = process.env.VUE_APP_BASE_URL
        const url = END_POINTS.GET_HUB_FOCUS_VEHICLE_EXCEL +
          '?startDate=' + dateFormat(new Date(this.focusDate[0]), 'yyyy-MM-dd') +
          '&endDate=' + dateFormat(new Date(this.focusDate[1]), 'yyyy-MM-dd') +
          '&areaCode=' + localStorage.getItem('areaCode') +
          '&hubCode=' + this.hubCode +
          '&configId=' + localStorage.getItem('configId') +
          '&vehicleNo=' + vehicleNo +
          '&driverType=TAXI' +
          '&x-me-token=' + token
        // window.location.href = `${baseUrl}${url}`
        // window.open(`${baseUrl}${url}`)
        downloadFile(`${baseUrl}${url}`)
      }
    },
    exportModel() {
      window.location.href = 'https://ossapi.paircity.com/template/%E9%87%8D%E7%82%B9%E5%85%B3%E6%B3%A8%E8%BD%A6%E8%BE%86%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
    }
  }
}
</script>

<style lang="less">
.focus-search {
  .ivu-date-picker {
    width: 100%;
  }
}
</style>

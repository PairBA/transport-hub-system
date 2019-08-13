<template>
  <div class="focus-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="车牌号：">
          <Input v-model="vehicleNo"
                 placeholder="请输入车牌号"
                 :clearable="true"/>
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
const baseUrl = process.env.VUE_APP_BASE_URL
export default {
  data() {
    return {
      importUrl: `${baseUrl + END_POINTS.UPLOAD_FOCUS_VEHICLE_LIST}`,
      headers: {
        'x-me-token': localStorage.getItem('token')
      },
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
        const token = localStorage.getItem('token')
        const baseUrl = process.env.VUE_APP_BASE_URL
        const url = END_POINTS.GET_HUB_FOCUS_VEHICLE_EXCEL +
          '?startDate=' + dateFormat(new Date(this.focusDate[0]), 'yyyy-MM-dd') +
          '&endDate=' + dateFormat(new Date(this.focusDate[1]), 'yyyy-MM-dd') +
          '&areaCode=' + localStorage.getItem('areaCode') +
          '&hubCode=' + localStorage.getItem('hubCode') +
          '&vehicleNo=' + this.vehicleNo +
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

<template>
  <div class="meter-trip-error-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <CompanySelect></CompanySelect>
        <FormItem label="终端厂商">
          <Select v-model="mteTerminalCode"
                  placeholder="请选择终端厂商">
            <Option v-if="!terminalCode"
                    value="0">
              全部
            </Option>
            <Option v-for="item in terminalList"
                    :key="`as_ter_${item.terminalCode}`"
                    :value="item.terminalCode">
              {{ item.terminalName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="问题类型">
          <Select v-model="mteJudgeType">
            <Option v-for="item in judgeTypeList"
                    :key="`as_${item.code}`"
                    :value="item.code">
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="车牌号:">
          <Input v-model="mteVehicleNo"
                 placeholder="请输入车牌号"
                 :clearable="true"/>
        </FormItem>
        <FormItem label="日期区间：">
          <DatePicker v-model="mteDateRange"
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
            {{$t("sysManage.queryBar.searchBT")}}
          </Button>
          <Button type="primary"
                  style="margin-left: 24px"
                  @click="exportMeterError">
            {{$t("sysManage.versionMgmt.exportExcel")}}
          </Button>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
import { END_POINTS } from '@/api'
import { dateFormat, downloadFile } from '@/utils'

export default {
  data() {
    return {
      judgeTypeList: [
        {
          code: '0',
          name: '全部'
        },
        {
          code: 'METER_STATE_EXP',
          name: '状态异常'
        },
        {
          code: 'METER_DIST_EXP',
          name: '里程异常'
        },
        {
          code: 'METER_FARE_EXP',
          name: '金额异常'
        }
      ],
      options: { // 日期配置，不能选择比今天大的日期
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
    terminalList() {
      return this.$store.state.terminalList
    },
    mteTerminalCode: {
      get() {
        return this.$store.state.meterTripError.mteTerminalCode
      },
      set(value) {
        this.$store.commit('meterTripError/updateMteTerminalCode', value)
      }
    },
    mteJudgeType: {
      get() {
        return this.$store.state.meterTripError.mteJudgeType
      },
      set(value) {
        this.$store.commit('meterTripError/updateMteJudgeType', value)
      }
    },
    mteVehicleNo: {
      get() {
        return this.$store.state.meterTripError.mteVehicleNo
      },
      set(value) {
        this.$store.commit('meterTripError/updateMteVehicleNo', value)
      }
    },
    mteDateRange: {
      get() {
        return this.$store.state.meterTripError.mteDateRange
      },
      set(value) {
        this.$store.commit('meterTripError/updateMteDateRange', value)
      }
    }
  },
  methods: {
    async goSearch() {
      this.$store.commit('search/updateShowSpin', true)
      await this.$store.dispatch('meterTripError/getMTETableObj', { currentPage: 1 })
      this.$store.commit('search/updateShowSpin', false)
    },
    exportMeterError() {
      const token = localStorage.getItem('hub-token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      const url = END_POINTS.EXPORT_METER_ERROR_EXCEL +
        '?areaCode=' + localStorage.getItem('areaCode') +
        '&companyId=' + this.$store.state.companyIdForSelect +
        '&terminalCode=' + this.mteTerminalCode +
        '&judgeType=' + (this.mteJudgeType === '0' ? '' : this.mteJudgeType) +
        '&vehicleNo=' + (this.mteVehicleNo === '川A' ? '' : this.mteVehicleNo) +
        '&startDate=' + dateFormat(this.mteDateRange[0], 'yyyy-MM-dd') +
        '&endDate=' + dateFormat(this.mteDateRange[1], 'yyyy-MM-dd') +
        '&x-me-token=' + token + ' &me-api-type=hubmanager'
      downloadFile(`${baseUrl}${url}`)
    }
  }
}
</script>

<style lang="less">
.meter-trip-error-search {
  .ivu-date-picker {
    width: 100%;
  }
}
</style>

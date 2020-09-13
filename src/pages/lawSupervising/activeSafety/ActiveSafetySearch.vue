<template>
  <div class="active-safety-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <CompanySelect></CompanySelect>
        <FormItem label="终端厂商">
          <Select v-model="asTerminalCode"
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
        <FormItem label="报警类别">
          <Select v-model="asAlarmType">
            <Option v-for="item in alarmTypeList"
                    :key="`as_${item.code}`"
                    :value="item.code">
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="车牌号:">
          <Input v-model="asVehicleNo"
                 placeholder="请输入车牌号"
                 :clearable="true"/>
        </FormItem>
        <FormItem label="日期区间：">
          <DatePicker v-model="asDateRange"
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
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alarmTypeList: [
        {
          code: '0',
          name: '全部'
        },
        {
          code: '1',
          name: '人车不符'
        },
        {
          code: '2',
          name: '遮挡视频'
        },
        {
          code: '3',
          name: '计价器异常'
        },
        {
          code: '4',
          name: '顶灯异常'
        },
        {
          code: '5',
          name: '存储卡异常'
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
    asVehicleNo: {
      get() {
        return this.$store.state.activeSafety.asVehicleNo
      },
      set(value) {
        this.$store.commit('activeSafety/updateASVehicleNo', value)
      }
    },
    asTerminalCode: {
      get() {
        return this.$store.state.activeSafety.asTerminalCode
      },
      set(value) {
        this.$store.commit('activeSafety/updateAsTerminalCode', value)
      }
    },
    asAlarmType: {
      get() {
        return this.$store.state.activeSafety.asAlarmType
      },
      set(value) {
        this.$store.commit('activeSafety/updateAsAlarmType', value)
      }
    },
    asDateRange: {
      get() {
        return this.$store.state.activeSafety.asDateRange
      },
      set(value) {
        this.$store.commit('activeSafety/updateAsDateRange', value)
      }
    }
  },
  methods: {
    async goSearch() {
      let startTimestamp = this.asDateRange[0].getTime()
      let endTimestamp = this.asDateRange[1].getTime()
      if (endTimestamp - startTimestamp > 30 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间区间不能大于一个月!'
        })
      } else {
        this.$store.commit('search/updateShowSpin', true)
        await this.$store.dispatch('activeSafety/getASTableObj', { currentPage: 1 })
        this.$store.commit('search/updateShowSpin', false)
      }
    }
  }
}
</script>

<style lang="less">
.active-safety-search {
  .ivu-date-picker {
    width: 100%;
  }
}
</style>

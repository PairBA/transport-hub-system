<template>
  <div class="sms-alert-type-home-page">
    <PairBreadcrumb title="短信告警类型"/>
    <div class="sms-alert-type-home-page-content">
      <div class="card">
        <Row>
          <span class="title">车辆异常</span>
          <Divider></Divider>
          <CheckboxGroup v-model="vehicle">
            <Checkbox label="FOCUS_VEHICLE">
              <span>重点关注</span>
            </Checkbox>
            <Checkbox label="UNKNOWN_VEHICLE">
              <span>未注册车</span>
            </Checkbox>
          </CheckboxGroup>
        </Row>
        <Row style="padding-top: 24px;">
          <span class="title">GPS异常</span>
          <Divider></Divider>
          <CheckboxGroup v-model="gps">
            <Checkbox label="GPS_REPEAT">
              <span>GPS重复</span>
            </Checkbox>
            <Checkbox label="GPS_LOST">
              <span>GPS缺失</span>
            </Checkbox>
            <Checkbox label="GPS_TIME_ERROR">
              <span>GPS时间错误</span>
            </Checkbox>
            <Checkbox label="CLONE_VEHICLE">
              <span>疑似克隆车</span>
            </Checkbox>
          </CheckboxGroup>
        </Row>
        <Row style="padding-top: 24px;">
          <span class="title">计价器异常</span>
          <Divider></Divider>
          <CheckboxGroup v-model="meter">
            <Checkbox label="METER_STATE_EXP">
              <span>计价器状态异常</span>
            </Checkbox>
            <Checkbox label="METER_DIST_EXP">
              <span>计价里程异常</span>
            </Checkbox>
            <Checkbox label="计价公式异常">
              <span>计价公式异常</span>
            </Checkbox>
          </CheckboxGroup>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
export default {
  name: 'SmsAlertTypeHomePage',
  data() {
    return {
      vehicle: [],
      gps: [],
      meter: []
    }
  },
  watch: {
    other: {
      handler(newValue, oldValue) {
        this.judgeUpdate(oldValue, newValue)
      }
    },
    gps: {
      handler(newValue, oldValue) {
        this.judgeUpdate(oldValue, newValue)
      }
    },
    meter: {
      handler(newValue, oldValue) {
        this.judgeUpdate(oldValue, newValue)
      }
    }
  },
  methods: {
    async getGateAlertConfigList() {
      const result = await get(END_POINTS.GET_GATE_ALERT_CONFIG_LIST)
      if (result.code === 2000) {
        if (result.data && result.data.length) {
          this.switchConfig(result.data)
        } else {
          this.$Message.error({
            content: '查询结果为空！'
          })
        }
      } else {
        this.$Message.error({
          content: result.msg
        })
      }
    },
    switchConfig(data) {
      data.forEach(item => {
        if (item.alertItem === '车辆异常' && item.isEnabled) {
          this.vehicle.push(item.alertType)
        } else if (item.alertItem === 'GPS异常' && item.isEnabled) {
          this.gps.push(item.alertType)
        } else if (item.alertItem === '计价器异常' && item.isEnabled) {
          this.meter.push(item.alertType)
        }
      })
    },
    async updateGateAlertConfig(alertType, isEnabled) {
      const result = await get(END_POINTS.UPDATE_GATE_ALERT_CONFIG, {
        alertType: alertType,
        isEnabled: isEnabled
      })
      console.log(result)
    },
    judgeUpdate(oldValue, newValue) {

    }
  },
  mounted() {
    this.getGateAlertConfigList()
  }
}
</script>

<style lang="less">
.sms-alert-type-home-page {
  .sms-alert-type-home-page-content {
    padding: 24px;
    .card {
      padding: 24px;
      background: #FFFFFF;
      .title {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
  .ivu-checkbox-group-item {
    margin-left: 24px;
  }
  .ivu-checkbox-wrapper {
    font-size: 14px;
  }
}
</style>

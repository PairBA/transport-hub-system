<template>
  <div class="sms-alert-type-home-page">
    <PairBreadcrumb title="短信告警类型"/>
    <div class="sms-alert-type-home-page-content">
      <div class="card">
        <Row>
          <CheckboxGroup v-model="other">
            <Checkbox label="重点关注">
              <span>重点关注</span>
            </Checkbox>
            <Checkbox label="未注册车">
              <span>未注册车</span>
            </Checkbox>
          </CheckboxGroup>
        </Row>
        <Row style="padding-top: 24px;">
          <span class="title">GPS异常</span>
          <Divider></Divider>
          <CheckboxGroup v-model="gps">
            <Checkbox label="GPS重复">
              <span>GPS重复</span>
            </Checkbox>
            <Checkbox label="GPS缺失">
              <span>GPS缺失</span>
            </Checkbox>
            <Checkbox label="GPS时间错误">
              <span>GPS时间错误</span>
            </Checkbox>
            <Checkbox label="疑似克隆车">
              <span>疑似克隆车</span>
            </Checkbox>
          </CheckboxGroup>
        </Row>
        <Row style="padding-top: 24px;">
          <span class="title">计价器异常</span>
          <Divider></Divider>
          <CheckboxGroup v-model="meter">
            <Checkbox label="计价器状态异常">
              <span>计价器状态异常</span>
            </Checkbox>
            <Checkbox label="计价里程异常">
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
      other: [],
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
    judgeUpdate(oldValue, newValue) {

    },
    async getGateAlertConfigList() {
      const result = await get(END_POINTS.GET_GATE_ALERT_CONFIG_LIST)
      console.log(result)
    },
    async updateGateAlertConfig(alertType, isEnabled) {
      const result = await get(END_POINTS.UPDATE_GATE_ALERT_CONFIG, {
        alertType: alertType,
        isEnabled: isEnabled
      })
      console.log(result)
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
    &:not(:first-child) {
      margin-left: 12px;
    }
  }
  .ivu-checkbox-wrapper {
    font-size: 14px;
  }
}
</style>

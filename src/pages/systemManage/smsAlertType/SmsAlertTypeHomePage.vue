<template>
  <div class="sms-alert-type-home-page">
    <ContentLayout :showSpin="showSpin">
      <div class="card">
        <Row>
          <span class="title">车辆异常</span>
          <Divider></Divider>
          <CheckboxGroup v-model="vehicle">
            <Checkbox v-for="item in vehicleList"
                      :key="item.alertType"
                      :label="item.alertType">
              <span>{{item.alertName}}</span>
            </Checkbox>
          </CheckboxGroup>
        </Row>
        <Row style="padding-top: 24px;">
          <span class="title">GPS异常</span>
          <Divider></Divider>
          <CheckboxGroup v-model="gps">
            <Checkbox v-for="item in gpsList"
                      :key="item.alertType"
                      :label="item.alertType">
              <span>{{item.alertName}}</span>
            </Checkbox>
          </CheckboxGroup>
        </Row>
        <Row style="padding-top: 24px;">
          <span class="title">计价器异常</span>
          <Divider></Divider>
          <CheckboxGroup v-model="meter">
            <Checkbox v-for="item in meterList"
                      :key="item.alertType"
                      :label="item.alertType">
              <span>{{item.alertName}}</span>
            </Checkbox>
          </CheckboxGroup>
        </Row>
      </div>
    </ContentLayout>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
export default {
  name: 'SmsAlertTypeHomePage',
  data() {
    return {
      vehicle: [],
      vehicleList: [],
      gps: [],
      gpsList: [],
      meter: [],
      meterList: []
    }
  },
  computed: {
    showSpin() {
      return this.$store.state.search.showSpin
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
      this.$store.commit('search/updateShowSpin', true)
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
      this.$store.commit('search/updateShowSpin', false)
    },
    switchConfig(data) {
      data.forEach(item => {
        if (item.alertItem === '车辆异常') {
          this.vehicleList.push(item)
          if (item.isEnabled) {
            this.vehicle.push(item.alertType)
          }
        } else if (item.alertItem === 'GPS异常') {
          this.gpsList.push(item)
          if (item.isEnabled) {
            this.gps.push(item.alertType)
          }
        } else if (item.alertItem === '计价器异常') {
          this.meterList.push(item)
          if (item.isEnabled) {
            this.meter.push(item.alertType)
          }
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
  .card {
    padding: 24px;
    background: #FFFFFF;
    .title {
      font-size: 16px;
      font-weight: 500;
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

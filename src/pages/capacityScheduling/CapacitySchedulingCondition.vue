<template>
  <div class="capacity-scheduling__homePage">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="日期">
          <DatePicker v-model="date" :clearable="false" @on-change="goSearch" style="width: 200px;margin-bottom: 24px"></DatePicker>
        </FormItem>
        <FormItem label="预警模式">
          <RadioGroup v-model="notifyType">
            <Radio label="SYSTEM" :disabled="notifyEnable">{{$t("monitor.smartDispatch.auto")}}</Radio>
            <Radio label="CONFIRM" :disabled="notifyEnable"><span>{{$t("monitor.smartDispatch.tbc")}}</span></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="播报范围">
          <RadioGroup v-model="notifyTarget">
            <Radio label="NEARBY" :disabled="notifyEnable"><span>{{$t("monitor.smartDispatch.nearBy")}}</span></Radio>
            <Radio label="ALL" :disabled="notifyEnable"><span>{{$t("monitor.smartDispatch.cityWide")}}</span></Radio>
          </RadioGroup>
        </FormItem>
        <Divider/>
        <div style="text-align: center">
          <Button type="primary"
                  @click="goSearch">
            查询
          </Button>
          <Button type="primary"
                  style="margin-left: 24px"
                  @click="notifyDriverByMan">
            手动播报
          </Button>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
export default {
  computed: {
    date: {
      get() {
        return this.$store.state.capacityScheduling.date
      },
      set(value) {
        this.$store.commit('capacityScheduling/updateDate', value)
      }
    },
    notifyEnable() {
      return this.$store.state.capacityScheduling.notifyEnable
    },
    notifyTarget: {
      get() {
        return this.$store.state.capacityScheduling.notifyTarget
      },
      async set(value) {
        const updateHubNotifyConfigResult = await this.$store.dispatch('capacityScheduling/updateHubNotifyConfig', value)
        if (updateHubNotifyConfigResult) {
          this.$Modal.success({
            title: this.$t('monitor.notification'),
            content: this.$t('monitor.success')
          })
        } else {
          this.$Modal.error({
            title: this.$t('monitor.notification'),
            content: this.$t('monitor.failure')
          })
        }
      }
    },
    notifyType: {
      get() {
        return this.$store.state.capacityScheduling.notifyType
      },
      async set(value) {
        const updateHubNotifyConfigResult = await this.$store.dispatch('capacityScheduling/updateHubNotifyType', value)
        if (updateHubNotifyConfigResult) {
          this.$Modal.success({
            title: this.$t('monitor.notification'),
            content: this.$t('monitor.success')
          })
        } else {
          this.$Modal.error({
            title: this.$t('monitor.notification'),
            content: this.$t('monitor.failure')
          })
        }
      }
    }
  },
  methods: {
    goSearch() {
      this.$store.dispatch('capacityScheduling/loadEstChartInScreen')
    },
    async notifyDriverByMan() {
      const notifyResult = await this.$store.dispatch('capacityScheduling/notifyDriverByMan')
      if (notifyResult) {
        this.$Modal.success({
          title: this.$t('monitor.notification'),
          content: this.$t('monitor.success')
        })
      } else {
        this.$Modal.error({
          title: this.$t('monitor.notification'),
          content: this.$t('monitor.failure')
        })
      }
    }
  }
}
</script>

<style lang="less">
.capacity-scheduling__homePage {
}
</style>

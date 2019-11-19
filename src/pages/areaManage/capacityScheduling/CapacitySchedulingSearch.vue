<template>
  <div class="capacity-scheduling-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="交通枢纽：">
          <Select v-model="hubCode"
                  :placeholder="'请输入交通枢纽'">
            <Option v-for="item in hubList"
                    :key="`capSch_${item.hubCode}`"
                    :value="item.hubCode">
              {{ item.hubName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="日期：">
          <DatePicker v-model="searchDate"
                      type="date"
                      format="yyyy/MM/dd"
                      placeholder="请选择日期"
                      :clearable="false"
                      :editable="false">
          </DatePicker>
        </FormItem>
        <Divider/>
        <div style="text-align: center;">
          <Button type="primary"
                  @click="goSearch">
            查询
          </Button>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
export default {
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
    searchDate: {
      get() {
        return this.$store.state.capacityScheduling.searchDate
      },
      set(value) {
        this.$store.commit('capacityScheduling/updateSearchDate', value)
      }
    }
  },
  methods: {
    async goSearch() {
      this.$store.commit('search/updateShowSpin', true)
      await Promise.all([
        this.$store.dispatch('capacityScheduling/loadEstChartInScreen'),
        this.$store.dispatch('capacityScheduling/getNotifyHistList', { currentPage: 1 })
      ])
      this.$store.commit('search/updateShowSpin', false)
    }
  },
  mounted() {
    if (!this.hubCode) {
      this.$store.commit('updateHubCode', this.hubList[0].hubCode)
    }
  }
}
</script>

<style lang="less">
.capacity-scheduling-search {
  .ivu-date-picker {
    width: 100%;
  }
}
</style>

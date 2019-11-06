<template>
  <div class="driver-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="车辆类别：">
          <Select v-model="driverType"
                  :placeholder="'请选择车辆类别'">
            <Option value="TAXI">巡游出租车</Option>
          </Select>
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
import { get, END_POINTS } from '@/api'

export default {
  data() {
    return {
      driverType: 'TAXI'
    }
  },
  computed: {
  },
  methods: {
    async goSearch() {
      this.$store.commit('search/updateShowSpin', true)
      const response = await get(END_POINTS.GET_TRAIL_LIST, {
        driverType: this.driverType
      })
      if (response.code === 2000) {
      } else {
      }
      this.$store.commit('search/updateShowSpin', false)
    }
  },
  mounted() {
  }
}
</script>

<style lang="less">
.driver-search {
}
</style>

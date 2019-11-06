<template>
  <div class="vehicle-search">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="车辆类别：">
          <Select v-model="driverType"
                  :placeholder="'请选择车辆类别'">
            <Option value="TAXI">巡游出租车</Option>
          </Select>
        </FormItem>
        <CompanySelect></CompanySelect>
        <FormItem label="车牌号:">
          <Input v-model="driverNo"
                 placeholder="请输入车牌号"/>
        </FormItem>
        <FormItem label="自编号:">
          <Input v-model="selfNumber"
                 placeholder="请输入自编号"/>
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
  computed: {
    driverType: {
      get() {
        return this.$store.state.vehicleSearch.driverType
      },
      set(value) {
        this.$store.commit('vehicleSearch/updateVSDriverType', value)
      }
    },
    driverNo: {
      get() {
        return this.$store.state.vehicleSearch.driverNo
      },
      set(value) {
        this.$store.commit('vehicleSearch/updateVSDriverNo', value)
      }
    },
    selfNumber: {
      get() {
        return this.$store.state.vehicleSearch.selfNumber
      },
      set(value) {
        this.$store.commit('vehicleSearch/updateVSSelfNumber', value)
      }
    }
  },
  methods: {
    async goSearch() {
      this.$store.commit('search/updateShowSpin', true)
      await this.$store.dispatch('vehicleSearch/getVSTableObj')
      this.$store.commit('search/updateShowSpin', false)
    }
  }
}
</script>

<style lang="less">
.vehicle-search {
}
</style>

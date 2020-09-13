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
          <Input v-model="vehicleNo"
                 placeholder="请输入车牌号"
                 :clearable="true"/>
        </FormItem>
        <FormItem label="自编号:">
          <Input v-model="selfNumber"
                 placeholder="请输入自编号"
                 :clearable="true"/>
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
    vehicleNo: {
      get() {
        return this.$store.state.vehicleSearch.vehicleNo
      },
      set(value) {
        this.$store.commit('vehicleSearch/updateVSVehicleNo', value)
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
      await Promise.all([
        this.$store.dispatch('getCompListForSelect'),
        this.$store.dispatch('vehicleSearch/getVSTableObj', { currentPage: 1 })
      ])
      this.$store.commit('search/updateShowSpin', false)
    }
  }
}
</script>

<style lang="less">
.vehicle-search {
}
</style>

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
        <CompanySelect></CompanySelect>
        <FormItem label="姓名:">
          <Input v-model="driverName"
                 placeholder="请输入姓名"/>
        </FormItem>
        <FormItem label="身份证号（从业资格证号）:">
          <Input v-model="driverNumber"
                 placeholder="请输入身份证号（从业资格证号）"/>
        </FormItem>
        <FormItem label="服务证号:">
          <Input v-model="serviceNumber"
                 placeholder="请输入服务证号"/>
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
        return this.$store.state.driverSearch.driverType
      },
      set(value) {
        this.$store.commit('driverSearch/updateDSDriverType', value)
      }
    },
    driverName: {
      get() {
        return this.$store.state.driverSearch.driverName
      },
      set(value) {
        this.$store.commit('driverSearch/updateDSDriverName', value)
      }
    },
    driverNumber: {
      get() {
        return this.$store.state.driverSearch.driverNumber
      },
      set(value) {
        this.$store.commit('driverSearch/updateDSDriverNumber', value)
      }
    },
    serviceNumber: {
      get() {
        return this.$store.state.driverSearch.serviceNumber
      },
      set(value) {
        this.$store.commit('driverSearch/updateDSServiceNumber', value)
      }
    }
  },
  methods: {
    async goSearch() {
      this.$store.commit('search/updateShowSpin', true)
      await this.$store.dispatch('driverSearch/getDSTableObj')
      this.$store.commit('search/updateShowSpin', false)
    }
  }
}
</script>

<style lang="less">
.driver-search {
}
</style>

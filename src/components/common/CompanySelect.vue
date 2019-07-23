<template>
  <FormItem :label="$t('sysManage.commonVar.companyName')">
    <Select v-model="companyIdForSelect" :clearable="showAllCompany" :placeholder="$t('sysManage.commonVar.companyNameSelectPH')">
      <Option :value="' '" v-if="showAllCompany">
        {{ $t('sysManage.queryBar.driverStatusSelect.ALL') }}
      </Option>
      <Option v-for="company in companyListForSelect" :key="company.id" :value="company.id">
        {{ company.name }}
      </Option>
    </Select>
  </FormItem>
</template>

<script>
export default {
  data() {
    return {
      showAllCompany: !localStorage.getItem('role')
    }
  },
  computed: {
    companyListForSelect() {
      return this.$store.state.companyListForSelect
    },
    companyIdForSelect: {
      get() {
        return this.$store.state.companyIdForSelect
      },
      set(value) {
        if (!value) {
          this.$store.commit('updateCompanyIdForSelect', '')
        } else {
          this.$store.commit('updateCompanyIdForSelect', value)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

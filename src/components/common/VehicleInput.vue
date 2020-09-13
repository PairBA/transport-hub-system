<template>
 <Input :value="value" :placeholder="$t('sysManage.queryBar.vehicleNoPH')" @on-focus="handleOnfocus" @input="handleInput"/>
</template>

<script>
import { getVehicleNoPrefix } from '@/utils'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    areaCode() {
      return this.$store.state.areaCodeForSelect
    }
  },
  watch: {
    areaCode() {
      this.$emit('input', '')
    }
  },
  methods: {
    handleOnfocus() {
      if (!this.value && this.areaCode) this.$emit('input', getVehicleNoPrefix(this.areaCode))
    },
    handleInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>

</style>

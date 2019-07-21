<template>
  <Menu mode="horizontal" theme="dark" active-name="1">
    <MenuItem v-for="item in subMenu" :key="item.name" :name="item.path" :to="item.path">
      {{item.name}}
    </MenuItem>
  </Menu>
</template>

<script>
export default {
  name: 'SubMenu',
  computed: {
    subMenu() {
      return this.$store.state.permission.subMenu
    }
  },
  mounted() {
    console.log()
  }
}
</script>

<style scoped>

</style>

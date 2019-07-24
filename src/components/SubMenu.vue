<template>
  <div class="sub-menu">
    <Menu ref="menu"
          width="auto"
          accordion>
      <MenuItem v-for="item in subMenu" :key="item.name" :name="item.path" :to="item.path">
        {{item.name}}
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  computed: {
    subMenu() {
      return this.$store.state.permission.subMenu
    }
  }
}
</script>

<style lang="less">
.sub-menu {
}

</style>

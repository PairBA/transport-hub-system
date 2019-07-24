<template>
  <div class="sub-menu">
    <Menu ref="subMenu"
          width="auto"
          :active-name="activeName"
          accordion>
      <MenuItem v-for="item in subMenu" :key="item.name" :name="item.path" :to="item.path">
        {{item.name}}
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'SubMenu',
  data() {
    return {
      activeName: ''
    }
  },
  computed: {
    subMenu() {
      return this.$store.state.permission.subMenu
    }
  },
  mounted() {
    this.activeName = this.$route.path
    this.$nextTick(() => {
      this.$refs.subMenu.updateActiveName()
    })
  }
}
</script>

<style lang="less">
.sub-menu {
}

</style>

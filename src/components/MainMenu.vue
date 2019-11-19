<template>
  <div class="main-menu">
    <Menu ref="mainMenu"
          mode="horizontal"
          theme="dark"
          :active-name="activeName"
          @on-select="onSelectMenu">
      <MenuItem v-for="menu in mainMenu"
                :key="menu.resourceKey"
                :name="menu.resourceKey">
        {{menu.resourceName}}
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
    mainMenu() {
      return this.$store.state.permission.mainMenu
    },
    subMenuObj() {
      return this.$store.state.permission.subMenuObj
    }
  },
  watch: {
    $route: {
      handler() {
        const path = this.$route.path
        this.activeName = path.replace(/(.+)\/.*/, (match, $1) => {
          return $1
        }).substring(1)
        this.$store.commit('permission/updateActivePath', path)
        this.getSelectMenu(this.activeName)
        this.$nextTick(() => {
          this.$refs.mainMenu.updateActiveName()
        })
      },
      deep: true
    }
  },
  methods: {
    onSelectMenu(name) {
      this.activeName = name
      this.$store.commit('permission/updateSubMenu', this.subMenuObj[name])
      this.$store.commit('permission/updateOpenNamesFromMain', this.subMenuObj[name][0].path)
    },
    getSelectMenu(name) {
      this.activeName = name
      this.$store.commit('permission/updateSubMenu', this.subMenuObj[name])
    }
  },
  mounted() {
    const path = this.$route.path
    this.activeName = path.replace(/(.+)\/.*/, (match, $1) => {
      return $1
    }).substring(1)
  }
}
</script>

<style lang="less">
.main-menu {
  .ivu-menu-dark {
    background-color: transparent;
    line-height: 40px;
    padding: 12px;
  }

  .ivu-menu-item-active {
    background: linear-gradient(270deg, rgba(23, 149, 255, 1) 0%, rgba(82, 211, 255, 1) 100%);
    box-shadow: 0 14px 4px -8px #1795ff;
  }

  .ivu-menu-item {
    border-radius: 20px;

    &:not(:first-child) {
      margin-left: 24px;
    }
  }

  .ivu-menu-horizontal {
    height: 64px;
  }
}

</style>

<template>
  <div class="sub-menu">
    <Menu ref="subMenu"
          accordion
          @on-open-change="openChange"
          :active-name="activePath"
          :open-names="openNames">
      <Submenu v-for="item in subMenu"
               :class="{ 'submenu-title-icon' : !item.search}"
               :name="item.path"
               :key="item.path">
        <template slot="title">
          {{item.name}}
        </template>
        <component
          v-if="item.search"
          :is="item.search"
          :data="item.search"
          :key="item.search">
        </component>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import { searchComponentsReg } from '@/constant/searchReg'
export default {
  name: 'SubMenu',
  components: searchComponentsReg,
  data() {
    return {
      openNames: []
    }
  },
  computed: {
    subMenu() {
      return this.$store.state.permission.subMenu
    },
    openNamesFromMain() {
      return this.$store.state.permission.openNamesFromMain
    },
    activePath: {
      get() {
        return this.$store.state.permission.activePath
      },
      set(value) {
        this.$store.commit('permission/updateActivePath', value)
      }
    }
  },
  watch: {
    openNamesFromMain: 'reInitSubMenu',
    activePath: 'computedLastOpenedMenus'
  },
  methods: {
    openChange(names) {
      if (names.length) { // 打开菜单时执行
        this.$router.push({ path: names[0] })
      }
    },
    computedLastOpenedMenus() {
      this.openNames = [this.activePath]
      this.$nextTick(() => {
        this.$refs.subMenu.updateOpened()
      })
    },
    reInitSubMenu() {
      if (this.openNamesFromMain) { // 有二级菜单路由时才触发
        this.openNames = [this.openNamesFromMain]
        this.$nextTick(() => {
          this.$refs.subMenu.updateOpened()
        })
      }
    }
  },
  mounted() {
    this.openNames = [this.$route.path]
    this.$nextTick(() => {
      this.$refs.subMenu.updateOpened()
    })
  }
}
</script>

<style lang="less">
.sub-menu {
  .ivu-menu {
    width: 260px !important;
  }

  .ivu-menu-light {
    background-color: #F3F4F8;
  }

  .ivu-menu-submenu {
    &:not(:first-child) {
      margin-top: 12px;
    }

    .ivu-menu-submenu-title {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      color: #869099;
      background-color: #FFFFFF;
      font-size: 14px;
      padding: 8px 24px;
      font-weight: 500;
    }

    .ivu-menu-vertical .ivu-menu-item:hover,
    .ivu-menu-vertical .ivu-menu-submenu-title:hover {
      color: #869099;
      font-size: 14px;
      font-weight: 500;
    }

    ul {
      background-color: #FFFFFF;
    }
  }

  .ivu-menu-opened {
    .ivu-menu-submenu-title {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      padding: 8px 24px;
      font-size: 14px;
      font-weight: 500;
      color: #FFFFFF;
      background-color: #1997FF;
    }

    .ivu-menu-vertical .ivu-menu-item:hover,
    .ivu-menu-vertical .ivu-menu-submenu-title:hover {
      color: #FFFFFF;
      font-size: 14px;
    }
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0;
  }

  .ivu-menu-vertical .ivu-menu-submenu-title-icon {
    right: 12px;
  }

  .submenu-title-icon {
    .ivu-menu-submenu-title .ivu-menu-submenu-title-icon {
      display: none;
    }
  }
}

</style>

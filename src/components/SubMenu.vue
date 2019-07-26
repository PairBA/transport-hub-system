<template>
  <div class="sub-menu">
    <Menu ref="subMenu"
          accordion
          @on-open-change="openChange"
          :open-names="openNames">
      <Submenu v-for="item in subMenu"
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
    }
  },
  watch: {
    openNamesFromMain: 'reInitSubMenu'
  },
  methods: {
    openChange(names) {
      if (names.length) { // 打开菜单时执行
        this.$router.push({ path: names[0] })
      }
    },
    reInitSubMenu() {
      if (this.openNamesFromMain) { // 有二级菜单路由时才触发
        this.openNames = [this.openNamesFromMain]
        this.$nextTick(() => {
          this.$refs.subMenu.updateOpened()
          this.$router.push({ path: this.openNamesFromMain })
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
}

</style>

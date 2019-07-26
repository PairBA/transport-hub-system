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
import { searchReg } from '@/constant/searchReg'
export default {
  name: 'SubMenu',
  components: {
    searchReg
  },
  data() {
    return {
      openNames: ''
    }
  },
  computed: {
    subMenu() {
      return this.$store.state.permission.subMenu
    }
  },
  methods: {
    openChange(names) { // 打开的菜单改变
      if (names.length) {
        console.log(names[0])
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

<template>
  <div class="test-page">
    <Menu accordion @on-open-change="showName">
      <Submenu v-for="item in accountMgmtMenu" :name="item.path" :key="item.path">
        <template slot="title">
          {{item.name}}
        </template>
        <component :is="item.search" :data="item.search" :key="item.search"></component>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import { accountMgmtMenu } from '@/constant/menu'
export default {
  components: {
    search1: () => import('@/components/TestSearch'),
    search2: () => import('@/components/TestSearch')
  },
  data() {
    return {
      accountMgmtMenu: accountMgmtMenu,
      showSpin: false,
      userName: '',
      roleId: '',
      roleList: [],
      userList: []
    }
  },
  methods: {
    showName(names) {
      if (names.length) {
        console.log(names[0])
      }
    }
  }
}
</script>

<style lang="less">
.test-page {

}
</style>

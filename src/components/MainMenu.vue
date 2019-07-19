<template>
  <div class="main-menu">
    <Menu ref="menu"
          width="auto"
          @on-select="onSelectMenu"
          accordion>
      <MenuItem name="1">
        运力调度
      </MenuItem>
      <MenuItem name="2">
        异常告警
      </MenuItem>
      <MenuItem name="3">
        重点关注
      </MenuItem>
      <MenuItem name="4">
        行程轨迹
      </MenuItem>
      <MenuItem name="5">
        车流量
      </MenuItem>
      <MenuItem name="6">
        值班表
      </MenuItem>
      <MenuItem name="7">
        账号管理
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
import { accountMgmtMenu } from '@/constant/menu'
export default {
  name: 'MainMenu',
  methods: {
    onSelectMenu(name) {
      if (name === '7') {
        this.$store.commit('permission/updateSubMenu', accountMgmtMenu)
      }
    }
  }
}
</script>

<style lang="less">
.main-menu {

}

</style>

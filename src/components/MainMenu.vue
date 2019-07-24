<template>
  <div class="main-menu">
    <Menu mode="horizontal" theme="dark" active-name="1"  @on-select="onSelectMenu">
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
import { accountMgmtMenu, watchDutySchedule, tripTrail, anomaly, trafficFlow, focus } from '@/constant/menu'
export default {
  name: 'SubMenu',
  computed: {
    subMenu() {
      return this.$store.state.permission.subMenu
    }
  },
  methods: {
    onSelectMenu(name) {
      if (name === '7') {
        this.$store.commit('permission/updateSubMenu', accountMgmtMenu)
      } else if (name === '6') {
        this.$store.commit('permission/updateSubMenu', watchDutySchedule)
      } else if (name === '5') {
        this.$store.commit('permission/updateSubMenu', trafficFlow)
      } else if (name === '4') {
        this.$store.commit('permission/updateSubMenu', tripTrail)
      } else if (name === '3') {
        this.$store.commit('permission/updateSubMenu', focus)
      } else if (name === '2') {
        this.$store.commit('permission/updateSubMenu', anomaly)
      }
    }
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
    background:linear-gradient(270deg,rgba(23,149,255,1) 0%,rgba(82,211,255,1) 100%);
    box-shadow:0px 2px 4px 0px rgba(15,120,238,1);
  }
  .ivu-menu-item {
    margin-left: 24px;
    border-radius:20px;
  }
}

</style>

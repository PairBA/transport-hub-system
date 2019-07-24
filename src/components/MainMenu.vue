<template>
  <div class="main-menu">
    <Menu ref="mainMenu" mode="horizontal" theme="dark" :active-name="activeName"  @on-select="onSelectMenu">
      <MenuItem name="anomaly">
        异常告警
      </MenuItem>
      <MenuItem name="focus">
        重点关注
      </MenuItem>
      <MenuItem name="tripTrail">
        行程轨迹
      </MenuItem>
      <MenuItem name="trafficFlow">
        车流量
      </MenuItem>
      <MenuItem name="watchDutySchedule">
        值班表
      </MenuItem>
      <MenuItem name="accountMgmt">
        账号管理
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
import { accountMgmtMenu, watchDutySchedule, tripTrail, anomaly, trafficFlow, focus } from '@/constant/menu'
export default {
  name: 'SubMenu',
  data() {
    return {
      activeName: ''
    }
  },
  methods: {
    onSelectMenu(name) {
      this.activeName = name
      if (name === 'accountMgmt') {
        this.$store.commit('permission/updateSubMenu', accountMgmtMenu)
        this.$router.push({ name: accountMgmtMenu[0].name })
      } else if (name === 'watchDutySchedule') {
        this.$store.commit('permission/updateSubMenu', watchDutySchedule)
        this.$router.push({ name: watchDutySchedule[0].name })
      } else if (name === 'trafficFlow') {
        this.$store.commit('permission/updateSubMenu', trafficFlow)
        this.$router.push({ name: trafficFlow[0].name })
      } else if (name === 'tripTrail') {
        this.$store.commit('permission/updateSubMenu', tripTrail)
        this.$router.push({ name: tripTrail[0].name })
      } else if (name === 'focus') {
        this.$store.commit('permission/updateSubMenu', focus)
        this.$router.push({ name: focus[0].name })
      } else if (name === 'anomaly') {
        this.$store.commit('permission/updateSubMenu', anomaly)
        this.$router.push({ name: anomaly[0].name })
      }
    }
  },
  mounted() {
    const path = this.$route.path
    this.activeName = path.replace(/(.+)\/.*/, (match, $1) => {
      return $1
    }).substring(1)
    this.onSelectMenu(this.activeName)
    this.$nextTick(() => {
      this.$refs.mainMenu.updateActiveName()
    })
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

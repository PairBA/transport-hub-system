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
import {
  accountMgmt,
  watchDutySchedule,
  tripTrail,
  anomaly,
  trafficFlow,
  focus
} from '@/constant/menu'

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
    }
  },
  methods: {
    onSelectMenu(name) {
      this.activeName = name
      if (name === 'accountMgmt') {
        this.$store.commit('permission/updateSubMenu', accountMgmt)
        this.$store.commit('permission/updateOpenNamesFromMain', accountMgmt[0].path)
        // this.$router.push({ name: accountMgmtMenu[0].name })
      } else if (name === 'watchDutySchedule') {
        this.$store.commit('permission/updateSubMenu', watchDutySchedule)
        this.$store.commit('permission/updateOpenNamesFromMain', watchDutySchedule[0].path)
        // this.$router.push({ name: watchDutySchedule[0].name })
      } else if (name === 'trafficFlow') {
        this.$store.commit('permission/updateSubMenu', trafficFlow)
        this.$store.commit('permission/updateOpenNamesFromMain', trafficFlow[0].path)
        // this.$router.push({ name: trafficFlow[0].name })
      } else if (name === 'tripTrail') {
        this.$store.commit('permission/updateSubMenu', tripTrail)
        this.$store.commit('permission/updateOpenNamesFromMain', tripTrail[0].path)
        // this.$router.push({ name: tripTrail[0].name })
      } else if (name === 'focus') {
        this.$store.commit('permission/updateSubMenu', focus)
        this.$store.commit('permission/updateOpenNamesFromMain', focus[0].path)
        // this.$router.push({ name: focus[0].name })
      } else if (name === 'anomaly') {
        this.$store.commit('permission/updateSubMenu', anomaly)
        this.$store.commit('permission/updateOpenNamesFromMain', anomaly[0].path)
        // this.$router.push({ name: anomaly[0].name })
      }
    },
    getSelectMenu(name) {
      this.activeName = name
      if (name === 'accountMgmt') {
        this.$store.commit('permission/updateSubMenu', accountMgmt)
      } else if (name === 'watchDutySchedule') {
        this.$store.commit('permission/updateSubMenu', watchDutySchedule)
      } else if (name === 'trafficFlow') {
        this.$store.commit('permission/updateSubMenu', trafficFlow)
      } else if (name === 'tripTrail') {
        this.$store.commit('permission/updateSubMenu', tripTrail)
      } else if (name === 'focus') {
        this.$store.commit('permission/updateSubMenu', focus)
      } else if (name === 'anomaly') {
        this.$store.commit('permission/updateSubMenu', anomaly)
      }
    }
  },
  mounted() {
    const path = this.$route.path
    this.activeName = path.replace(/(.+)\/.*/, (match, $1) => {
      return $1
    }).substring(1)
    this.getSelectMenu(this.activeName)
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

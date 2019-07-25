<template>
  <Header :style="{width: '100%'}" class="header">
    <div class="menu-icon-wrapper">
      <Icon type="md-menu"
            color="#FFF"
            size="30"
            @click="triggerSideMenu"
            class="icon"/>
    </div>
    <div style="float: left; color: #FFF;">
      <div style="line-height: 39px;font-size: 23px;font-weight: 600">{{mainTitle}}</div>
      <div style="line-height: 15px;font-size: 17px">{{subTitle}}</div>
    </div>
    <div class="layout-nav">
      <MainMenu/>
    </div>
  </Header>
</template>

<script>
import MainMenu from '@/components/MainMenu'
export default {
  components: {
    MainMenu
  },
  data() {
    return {
      mainTitle: localStorage.getItem('systemName'),
      subTitle: localStorage.getItem('hubName')
    }
  },
  computed: {
    showMenu() {
      return this.$store.state.permission.showMenu
    }
  },
  methods: {
    triggerSideMenu() {
      this.$store.commit('permission/updateShowMenu', !this.showMenu)
    }
  }
}
</script>

<style lang="less">
.header {
  .layout-nav{
    float: left;
  }
  .menu-icon-wrapper {
    display: block;
    float: left;
    width: 54px;
    .icon {
      cursor: pointer;
    }
  }
}
</style>

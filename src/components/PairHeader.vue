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
      <div style="line-height: 30px">{{subTitle}}</div>
      <div style="line-height: 30px">{{mainTitle}}</div>
    </div>
    <div class="layout-nav">
      <SubMenu/>
    </div>
  </Header>
</template>

<script>
import SubMenu from '@/components/SubMenu'
export default {
  components: {
    SubMenu
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
    width: 750px;
    margin: 0 auto;
    margin-right: 20px;
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

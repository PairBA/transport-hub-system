<template>
  <Header :style="{width: '100%'}" class="header">
<!--    <div class="menu-icon-wrapper">-->
<!--      <Icon type="md-menu"-->
<!--            color="#FFF"-->
<!--            size="30"-->
<!--            @click="triggerSideMenu"-->
<!--            class="icon"/>-->
<!--    </div>-->
    <div style="text-align:center;float:left;color:#FFF;width: 280px;">
      <div style="line-height: 39px;font-size: 23px;font-weight: 600">{{mainTitle}}</div>
      <div style="line-height: 15px;font-size: 17px">{{subTitle}}</div>
    </div>
    <div class="layout-nav">
      <MainMenu/>
    </div>
    <div style="float: right;margin-right: 24px;">
      <Dropdown trigger="click"
                @on-click="handleListClick"
                placement="bottom-end">
        <Avatar icon="md-person"
                style="cursor: pointer;"/>
        <a href="javascript:void(0)"
           class="profile-user-name">
          {{ userName }}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="logout">
            <PairIcon type="user-logout" class="icon-item"/>
            <span>
              {{ $t("monitor.logOut") }}
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
      subTitle: localStorage.getItem('hubName'),
      userName: localStorage.getItem('userName')
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
    },
    handleListClick() {
      this.logout()
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
.header {
  .profile-user-name {
    margin-left: 10px;
    font-size: 16px;
    color: #FFFFFF;
  }
  .icon-item {
    width: 15px;
    height: 15px;
    float: left;
    margin-right: 10px;
  }
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

<template>
  <Header :style="{width: '100%'}"
          class="header">
    <div class="header-title">
      <div class="header-title-top">
        {{mainTitle}}
      </div>
      <div class="header-title-bottom">
        {{subTitle}}
      </div>
    </div>
    <div class="layout-nav">
      <MainMenu/>
    </div>
    <div class="header-user">
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
  .header-title {
    text-align: center;
    float: left;
    background: rgba(255,255,255,0.141);
    width: 280px;
    height: 64px;

    .header-title-top {
      line-height: 39px;
      color: #FFFFFF;
      font-size: 23px;
      font-weight: 600;
    }

    .header-title-bottom {
      color: #FFFFFF;
      line-height: 15px;
      font-size: 17px;
    }
  }

  .header-user {
    background:rgba(255,255,255,0.141);
    padding: 0 24px;
    float: right;
    border-top-left-radius: 48px;
    border-bottom-left-radius: 48px;
  }

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

  .layout-nav {
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

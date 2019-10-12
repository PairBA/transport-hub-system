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
      <Select v-model="hubCode" :placeholder="'请输入交通枢纽'" style="width: 145px;margin-right: 10px">
        <Option v-for="item in hubList" :key="item.hubCode" :value="item.hubCode">
          {{ item.hubName }}
        </Option>
      </Select>
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
      hubCodeAndNameList: localStorage.getItem('hubCodeAndNameList'),
      userName: localStorage.getItem('userName'),
      hubCode: ''
    }
  },
  computed: {
    showMenu() {
      return this.$store.state.permission.showMenu
    },
    subTitle() {
      return this.hubCodeAndNameList.split(';')[0].split(',')[1]
    },
    hubList() {
      return this.hubCodeAndNameList.split(';').map(hub => {
        const hubArr = hub.split(',')
        return {
          hubCode: hubArr[0],
          hubName: hubArr[1]
        }
      })
    }
  },
  methods: {
    handleListClick() {
      this.logout()
    },
    logout() {
      this.$store.dispatch('login/logout')
      localStorage.removeItem('hub-token')
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
    .ivu-select-selection {
      background:rgba(255,255,255,0.1);
      border-radius:15px;
      border:1px solid rgba(176,214,255,1);
      font-size:13px;
      font-family:PingFangSC-Regular,PingFangSC;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:18px;
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
      color:rgba(255,255,255,1);
    }
    .ivu-select-arrow {
      color: white;
    }
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

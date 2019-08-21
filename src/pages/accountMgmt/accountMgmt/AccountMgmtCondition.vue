<template>
  <div class="account-mgmt__condition">
    <MenuSearchWrapper>
      <Form label-position="top">
        <FormItem label="角色">
          <Select v-model="roleId"
                  :clearable="true"
                  placeholder="请选择角色">
            <Option v-for="item in roleList"
                    :value="item.id"
                    :key="item.id">
              {{ item.roleName }}
            </Option>
          </Select>
        </FormItem>
        <Divider/>
        <FormItem label="账号名称">
          <Input v-model="userName" placeholder="请输入账号名称"/>
        </FormItem>
        <Divider/>
        <div style="text-align: center">
          <Button type="primary"
                  @click="goSearch">
            {{ $t("sysManage.queryBar.searchBT") }}
          </Button>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
export default {
  computed: {
    routerName() {
      return this.$route.name
    },
    roleList() {
      return this.$store.state.accountMgmt.roleList
    },
    roleId: {
      get() {
        return this.$store.state.accountMgmt.roleId
      },
      set(value) {
        this.$store.commit('accountMgmt/updateRoleId', value)
      }
    },
    userName: {
      get() {
        return this.$store.state.accountMgmt.userName
      },
      set(value) {
        this.$store.commit('accountMgmt/updateUserName', value)
      }
    },
    showSpin: {
      get() {
        return this.$store.state.search.showSpin
      },
      set(value) {
        this.$store.commit('search/updateShowSpin', value)
      }
    }
  },
  methods: {
    async goSearch() {
      if (this.routerName !== '账号管理') {
        this.$router.push({ name: '账号管理' })
      }
      this.showSpin = true
      await this.$store.dispatch('accountMgmt/getUserList')
      this.showSpin = false
    }
  }
}
</script>

<style lang="less">
.account-mgmt__condition {
}
</style>

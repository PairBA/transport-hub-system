<template>
  <div class="accountMgmt__add">
    <SearchWrapper>
      <Form label-width="100">
        <FormItem label="用户名:">
          <Input v-model="userName" placeholder="请输入用户名"/>
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="fullName" placeholder="请输入姓名"/>
        </FormItem>
        <FormItem label="角色">
          <Select v-model="roleId"
                  placeholder="请选择角色">
            <Option v-for="item in roleList"
                    :value="item.id"
                    :key="item.id">
              {{ item.roleName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="mobile" placeholder="请输入手机号"/>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="email" placeholder="请输入邮箱"/>
        </FormItem>
        <FormItem label="密码">
          <Input v-model="password" type="password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="确认密码">
          <Input v-model="passwordConfirm" type="password" placeholder="请输入密码"/>
        </FormItem>
        <Button type="primary"
                @click="submit">
          提交
        </Button>
      </Form>
    </SearchWrapper>
  </div>
</template>

<script>
import {
  post,
  get,
  END_POINTS
} from '@/api'
import SearchWrapper from '@/components/wrapper/SearchWrapper'
export default {
  components: {
    SearchWrapper
  },
  data() {
    return {
      userName: '',
      fullName: '',
      roleId: '',
      roleList: [],
      mobile: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const result = await get(END_POINTS.GET_ROLE_LIST)
      if (result.code === 2000) this.roleList = result.data
    },
    async submit() {
      const result = await post(END_POINTS.ADD_USER, {
        hubCode: localStorage.getItem('hubCode'),
        userName: this.userName,
        fullName: this.fullName,
        roleId: this.roleId,
        mobile: this.mobile,
        email: this.email,
        password: this.password
      })
      if (result.code === 2000) {
        this.$Message.success({
          content: this.$t('monitor.success')
        })
        this.$router.push({ name: 'accountMgmtHomePage' })
      }
    }
  }
}
</script>

<style lang="less">
.accountMgmt__add{

}

</style>

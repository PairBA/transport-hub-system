<template>
  <div class="accountMgmt__add">
    <SearchWrapper>
      <Form :label-width="100" ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <FormItem label="用户名:" prop="userName">
          <Input v-model="formValidate.userName" placeholder="请输入用户名"/>
        </FormItem>
        <FormItem label="姓名" prop="fullName">
          <Input v-model="formValidate.fullName" placeholder="请输入姓名"/>
        </FormItem>
        <FormItem label="角色" prop="roleId">
          <Select v-model="formValidate.roleId"
                  placeholder="请选择角色">
            <Option v-for="item in roleList"
                    :value="item.id"
                    :key="item.id">
              {{ item.roleName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="手机号" prop="mobile">
          <Input v-model="formValidate.mobile" placeholder="请输入手机号"/>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="formValidate.email" placeholder="请输入邮箱"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formValidate.password" type="password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="确认密码" prop="passwordConfirm">
          <Input v-model="formValidate.passwordConfirm" type="password" placeholder="请输入密码"/>
        </FormItem>
        <Button type="primary"
                @click="handleSubmit('formValidate')">
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
      roleList: [],
      formValidate: {
        userName: '',
        fullName: '',
        roleId: '',
        mobile: '',
        email: '',
        password: '',
        passwordConfirm: ''
      },
      ruleValidate: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
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
    async handleSubmit(name) {
      if (this.formValidate.password !== this.formValidate.passwordConfirm) {
        this.$Notice.warning({
          desc: '两次密码输入不一致'
        })
        return
      }
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const result = await post(END_POINTS.ADD_USER, {
            hubCode: localStorage.getItem('hubCode'),
            userName: this.formValidate.userName,
            fullName: this.formValidate.fullName,
            roleId: this.formValidate.roleId,
            mobile: this.formValidate.mobile,
            email: this.formValidate.email,
            password: this.formValidate.password
          })
          if (result.code === 2000) {
            this.$Message.success({
              content: this.$t('monitor.success')
            })
            this.$router.push({ name: '账号管理' })
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style lang="less">
.accountMgmt__add{

}

</style>

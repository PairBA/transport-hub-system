<template>
  <div class="main-login">
    <div class="main-content">
      <Row>
        <Col span="12" class="left"></Col>
        <Col span="12" style="padding-left: 34px; padding-right: 34px">
          <div class="login-title">
            出租汽车智慧管理执法系统
          </div>
          <Divider/>
          <div class="login-content">
            <Form label-position="top"
                  ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  @submit.prevent.native="handleSubmit('formValidate')">
              <FormItem label="用户名" prop="username">
                <Input v-model="formValidate.username"
                       id="username"
                       type="text"
                       :placeholder="$t('sysManage.loginPage.userNamePH')"
                />
              </FormItem>
              <FormItem label="密码" prop="password">
                <Input v-model="formValidate.password"
                       id="password"
                       type="password"
                       :placeholder="$t('sysManage.loginPage.passwordPH')"
                       @keyup.enter.native="handleSubmit('formValidate')"/>
              </FormItem>
              <div class="button-margin">
                <Button type="primary" long :loading="loginLoading" @click="handleSubmit('formValidate')">
                  {{loginBtnInfo}}
                </Button>
                <p>{{message}}</p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loginLoading: false,
      formValidate: {
        username: '',
        password: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ]
      },
      message: '',
      isReload: false,
      loginStatus: ''
    }
  },
  computed: {
    loginBtnInfo() {
      if (this.loginStatus === 'success') {
        return this.$t('sysManage.commonVar.loadingSuccess')
      } else if (this.loginStatus === 'load') {
        return this.$t('sysManage.commonVar.loading')
      } else {
        return this.$t('sysManage.loginPage.loginBtn')
      }
    }
  },
  mounted() {
    this.$store.commit('permission/updateHasRule', false)
  },
  methods: {
    async handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loginStatus = 'load'
          this.message = ''
          this.loginLoading = true
          const response = await this.$store.dispatch('login/login', {
            username: this.formValidate.username,
            password: this.formValidate.password
          })
          if (response.success) {
            this.loginStatus = 'success'
            this.$router.push('/')
          } else {
            this.loginStatus = ''
            this.loginLoading = false
          }
        }
      })
    }
  }
}
</script>
<style lang="less">
.main-login {
  background-image: url("../img/login.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  form {
    font-size: 12px;
  }
  .main-content {
    background-color: #fff;
    box-shadow: 0 8px 12px 0 rgba(0, 58, 140, 0.2);
    border-radius: 6px;
    width: 912px;
    height: 505px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .ivu-row {
      height: 100%;
      .left {
        background-image: url("../img/login-left.png");
        height: 100%;
      }
    }
    .login-title {
      font-size:30px;
      font-family:PingFangSC-Semibold;
      text-align: center;
      font-weight:600;
      color:rgba(25,151,255,1);
      line-height:42px;
      margin-top: 36px;
    }
    .ivu-input {
      background-color: transparent !important;
      border: none;
      border-bottom: 1px solid  #ECEEF0;
      border-radius: 0;
      box-shadow: none
    }
    .ivu-form-item-label {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .login-content {
    padding: 34px 48px;
  }
  .ivu-btn-primary {
    background: linear-gradient(270deg,rgba(23,149,255,1) 0%,rgba(96,192,255,1) 100%);
    border: none;
  }
  .ivu-btn {
    font-size: 16px;
  }
  .button-margin {
    margin-top: 48px;
  }
}
</style>

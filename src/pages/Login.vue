<template>
  <div class="main-login">
    <div class="main-content">
      <div class="login-title">
        {{ $t("sysManage.loginPage.title") }}
      </div>
      <div class="login-content">
        <Form label-position="top"
              inline
              @submit.prevent.native="onSubmit">
          <div class="username-div">
            用户名
          </div>
          <div style="margin-top: 10px">
            <Input v-model="username"
                   id="username"
                   type="text"
                   class="input-width"
                   :placeholder="$t('sysManage.loginPage.userNamePH')"
                   />
          </div>
          <div class="input-margin">
            <div class="username-div">
              密码
            </div>
          </div>
          <div class="input-margin">
            <Input v-model="password"
                   id="password"
                   type="password"
                   class="input-width"
                   :placeholder="$t('sysManage.loginPage.passwordPH')"
                   @keyup.enter.native="onSubmit"/>
          </div>
          <div class="button-margin">
            <Button type="primary" :loading="loginLoading" @click="onSubmit" class="input-width">
              {{loginBtnInfo}}
            </Button>
            <p>{{message}}</p>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loginLoading: false,
      username: '',
      password: '',
      captcha: '',
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
  methods: {
    async onSubmit() {
      this.loginStatus = 'load'
      this.message = ''
      this.loginLoading = true
      const response = await this.$store.dispatch('login/login', {
        username: this.username,
        password: this.password
      })

      if (response.success) {
        // await this.$store.dispatch('permission/getResourceList')
        this.$router.push('/accountMgmt/accountMgmtHomePage')
      } else {
        console.log('failed')
        this.loginStatus = ''
        this.loginLoading = false
        this.message = response.msg
      }
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
    text-align: center; /*让div内部文字居中*/
    background-color: #fff;
    box-shadow: 0 8px 12px 0 rgba(0, 58, 140, 0.2);
    border-radius: 6px;
    width: 332px;
    height: 360px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .login-title {
    width: 100%;
    height: 60px;
    background: rgba(236, 238, 240, 1);
    border-radius: 6px;
    text-align: center;
    font-size: 22px;
    color: rgba(74, 74, 74, 1);
    line-height: 23px;
    padding: 16px 24px;
  }
  .login-content {
    padding: 24px;
  }
  .username-div {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }
  .input-margin {
    margin-top: 10px;
  }
  .captcha-input {
    float: left;
    width: 50%;
  }
  .input-width {
    width: 100%;
  }
  .button-margin {
    margin-top: 48px
  }
}
</style>

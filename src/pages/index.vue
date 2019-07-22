<template>
  <div class="main-login">
    1231312
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
  mounted() {
    // this.$store.commit('login/updateShowImg', false)
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('login/updateShowImg', false)
    next()
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
        if (response.data.defaultAreaCode) { // 登录成功之后才初始化默认运营区域，避免初始化失败
          this.$store.commit('updateAreaCodeForSelect', response.data.defaultAreaCode)
        }
        this.loginStatus = 'success'
        this.$router.push('/')
      } else {
        console.log('failed')
        this.loginStatus = ''
        this.loginLoading = false
        this.message = response.msg
      }
    },
    checkIsUseCaptchaLogin() {
      if (this.username) {
        this.$store.dispatch('login/checkIsUseCaptchaLogin', {
          username: this.username,
          password: this.password
        })
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

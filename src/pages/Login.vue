<template>
  <div class="main-login">
    <div class="main-content">
      <Row class="login-title">
        {{ $t("sysManage.loginPage.title") }}
      </Row>
      <Row class="login-content">
        <Row>
          <Dropdown trigger="click"
                    class="dropdown-width"
                    @on-click="onClickDropdown">
            <Button>
              <PairIcon type="gray-earth"
                        class="icon-earth"/>
              <span>
<!--                {{ language }}-->
              </span>
              <Icon type="md-arrow-dropdown"/>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="zh">
                中文
              </DropdownItem>
              <DropdownItem name="en">
                English
              </DropdownItem>
              <DropdownItem name="es">
                Español
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Row>
        <Row>
          <Form label-position="top"
                inline
                @submit.prevent.native="onSubmit">
            <Row class="username-row">
              <div class="username-div">
              </div>
            </Row>
            <Row style="margin-top: 10px">
              <Input v-model="username"
                     id="username"
                     type="text"
                     class="input-width"
                     :placeholder="$t('sysManage.loginPage.userNamePH')"
                     @on-blur="checkIsUseCaptchaLogin"/>
            </Row>
            <Row class="input-margin">
              <div class="username-div">
              </div>
            </Row>
            <Row class="input-margin">
              <Input v-model="password"
                     id="password"
                     type="password"
                     class="input-width"
                     :placeholder="$t('sysManage.loginPage.passwordPH')"
                     @keyup.enter.native="onSubmit"/>
            </Row>
            <div v-if="showImg">
              <Row class="input-margin">
                <div class="username-div">
                </div>
              </Row>
              <Row class="input-margin">
                <div class="captcha-input">
                  <Input v-model="captcha"
                         type="text"
                         :placeholder="$t('sysManage.loginPage.enterCode')"/>
                </div>
                <div class="captcha-img">
                  <img id="captchaImg"
                       :src="imgSrc"
                       @click="refreshImg"/>
                </div>
              </Row>
            </div>
            <Row class="forget-pwd-row">
              <span class="forget-pwd-span"
                    @click="toForgetPwdPage">
              </span>
            </Row>
            <Row class="button-margin">
              <Button type="primary" :loading="loginLoading" @click="onSubmit" class="input-width">
                {{loginBtnInfo}}
              </Button>
              <p>{{message}}</p>
            </Row>
          </Form>
        </Row>
      </Row>
    </div>
  </div>
</template>
<script>

export default {
  data () {
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
    imgSrc () {
      return this.$store.state.login.imgSrc
    },
    showImg () {
      return this.$store.state.login.showImg
    },
    // language () {
    //   const lang = this.$store.state.transHub.language
    //   if (lang === 'zh') {
    //     return '中文'
    //   } else if (lang === 'es') {
    //     return 'Español'
    //   } else {
    //     return 'English'
    //   }
    // },
    loginBtnInfo () {
      if (this.loginStatus === 'success') {
        return this.$t('sysManage.commonVar.loadingSuccess')
      } else if (this.loginStatus === 'load') {
        return this.$t('sysManage.commonVar.loading')
      } else {
        return this.$t('sysManage.loginPage.loginBtn')
      }
    }
  },
  mounted () {
    // this.$store.commit('login/updateShowImg', false)
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('login/updateShowImg', false)
    next()
  },
  methods: {
    async onSubmit () {
      this.loginStatus = 'load'
      this.message = ''
      this.loginLoading = true
      const response = await this.$store.dispatch('login/login', {
        username: this.username,
        password: this.password,
        captcha: this.captcha
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
    checkIsUseCaptchaLogin () {
      if (this.username) {
        this.$store.dispatch('login/checkIsUseCaptchaLogin', {
          username: this.username,
          password: this.password,
          captcha: this.captcha
        })
      }
    },
    refreshImg () {
      this.$store.dispatch('login/getCaptchaImg', {
        username: this.username,
        password: this.password,
        captcha: this.captcha
      })
    },
    toForgetPwdPage () {
      this.$router.push('/forgetPwd')
    },
    onClickDropdown (language) {
      localStorage.setItem('panel-language', language)
      window.location.reload()
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
    height: 450px;
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
    padding: 0 24px;
  }
  .username-row {
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
  .captcha-img {
    text-align: right;
    float: right;
    width: 40%;
  }
  .forget-pwd-row {
    text-align: right;
    margin-top: 16px;
  }
  .forget-pwd-span {
    color: #2EA2F8;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
  .input-width {
    width: 100%;
  }
  .button-margin {
    margin-top: 24px
  }
  .ivu-dropdown-item {
    font-size: 16px!important;
  }
  .dropdown-width {
    margin-top: 24px;
    float: right;
    .ivu-btn {
      padding: 1.8px 15px;
      color: #7A7F8A;
      font-size: 18px;
      background-color: transparent;
      border-radius: 19px;
      border-color: #7A7F8A;
      &:hover {
        color: #7A7F8A;
        background-color: transparent;
        border-color: #7A7F8A;
      }
      &:focus {
        -webkit-box-shadow: none;
        box-shadow: none;
      }
    }
    .icon-earth {
      width: 20px;
      height: 20px;
      float: left;
      margin-right: 5px;
      margin-top: 4.5px;
      vertical-align: middle;
    }
  }
}
</style>

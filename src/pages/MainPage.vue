<template>
  <div class="main-page">
    <Layout>
      <PairHeader/>
      <Layout class="system__layout">
        <Sider id="pairSider"
               hide-trigger
               v-show="showMenu">
          <SubMenu/>
        </Sider>
        <Content>
          <router-view></router-view>
        </Content>
      </Layout>
      <Footer/>
    </Layout>
  </div>
</template>

<script>
import SubMenu from '@/components/SubMenu'
import PairHeader from '@/components/PairHeader'
import Footer from '@/components/Footer'
export default {
  components: {
    SubMenu,
    PairHeader,
    Footer
  },
  computed: {
    showMenu() {
      return this.$store.state.permission.showMenu
    }
  },
  async mounted() {
    // await this.$store.dispatch('login/checkLoginStatus')
    // this.$router.push('/login')
  }
}
</script>
<style lang="less">
@import '../theme/index.less';
.main-page {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  .system__layout {
    height: @system__content--height;
  }

  /* 重写 primary 按钮的样式 start */
  .ivu-btn {
    font-size: 14px;
    min-width: 87px;
  }
  .ivu-btn-primary {
    background: -webkit-linear-gradient(left, #52D3FF, #1795FF); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #52D3FF, #1795FF); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #52D3FF, #1795FF); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #52D3FF, #1795FF); /* 标准的语法（必须放在最后）*/
    border: none;
  }
  /* 重写 primary 按钮的样式 end */
}
/* 重写 modal 组件中 primary 按钮的样式 start */
.ivu-modal-wrap .ivu-modal {
  .ivu-btn {
    font-size: 14px;
    min-width: 87px;
  }
  .ivu-btn-primary {
    background: -webkit-linear-gradient(left, #52D3FF, #1795FF); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #52D3FF, #1795FF); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #52D3FF, #1795FF); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #52D3FF, #1795FF); /* 标准的语法（必须放在最后）*/
    border: none;
  }
}
/* 重写 modal 组件中 primary 按钮的样式 end */
</style>

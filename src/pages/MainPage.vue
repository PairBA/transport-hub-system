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
        <Content :style="{background: '#fff', minHeight: '500px'}">
          <router-view></router-view>
        </Content>
      </Layout>
<!--      <Footer/>-->
    </Layout>
  </div>
</template>

<script>
import SubMenu from '@/components/SubMenu'
import PairHeader from '@/components/PairHeader'
export default {
  components: {
    SubMenu,
    PairHeader
  },
  computed: {
    showMenu() {
      return this.$store.state.permission.showMenu
    }
  },
  async mounted() {
    await this.$store.dispatch('login/checkLoginStatus')
    this.$router.push('/login')
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
}
</style>

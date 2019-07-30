<template>
  <Layout class="content-layout">
    <PairSpin :show="showSpin"/>
    <Row>
      <PairBreadcrumb :title="title"/>
      <Content class="content-layout-content">
        <slot></slot>
      </Content>
    </Row>
  </Layout>
</template>

<script>
export default {
  name: 'ContentLayout',
  props: {
    showSpin: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    title() {
      return this.$route.name
    }
  }
}
</script>

<style lang="less">
@import '../theme/customized.less';
.content-layout {
  .content-layout-content {
    padding: 24px;
  }
}

</style>

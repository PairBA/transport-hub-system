<template>
  <Layout class="content-layout">
    <PairSpin :show="showSpin"/>
    <Row>
      <PairBreadcrumb :title="title"/>
      <Content style="padding: 24px">
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
  .search-condition {
    height: @system__content--height;
    box-shadow: 6px 0px 12px 0px rgba(202,207,209,0.4);
    background: rgba(243,244,248,1);
    padding: 28px;
  }
}

</style>

<template>
  <Layout class="content-layout">
    <PairSpin :show="showSpin"/>
    <Row>
      <Col span="6" class="search-condition">
        <slot name="searchCondition"></slot>
      </Col>
      <Col span="18">
        <PairBreadcrumb :title="title"/>
        <Content style="padding: 24px">
          <slot name="content"></slot>
        </Content>
      </Col>
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
  },
  mounted() {
    console.log(this.title)
  }
}
</script>

<style lang="less">
@import '../theme/index.less';
.content-layout {
  .search-condition {
    height: @system__content--height;
    box-shadow: 6px 0px 12px 0px rgba(202,207,209,0.4);
    background: rgba(243,244,248,1);
    padding: 28px;
  }
}

</style>

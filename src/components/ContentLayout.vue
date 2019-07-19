<template>
  <Layout class="content-layout">
    <PairSpin :show="showSpin"/>
    <Row>
      <Col span="6">
        <slot name="searchCondition"></slot>
      </Col>
      <Col span="18">
        <PairBreadcrumb :title="title"/>
        <Content>
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

}

</style>

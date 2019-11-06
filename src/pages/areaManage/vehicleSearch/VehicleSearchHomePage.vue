<template>
  <div class="vehicle-search-home-page">
    <ContentLayout :showSpin="showSpin">
      <TableWrapper>
        <Table :columns="columns"
               :data="tableList">
        </Table>
        <PairPage id="vehicleSearchList"
                  :total="total"
                  :current="currentPage"
                  :page-size="pageSize"
                  @on-change="getPage"
                  @on-page-size-change="changeSize">
        </PairPage>
      </TableWrapper>
    </ContentLayout>
  </div>
</template>

<script>
export default {
  computed: {
    showSpin() {
      return this.$store.state.search.showSpin
    },
    tableList() {
      return this.$store.state.vehicleSearch.tableObj.tableList
    },
    currentPage() {
      return this.$store.state.vehicleSearch.tableObj.currentPage
    },
    pageSize() {
      return this.$store.state.vehicleSearch.tableObj.pageSize
    },
    total() {
      return this.$store.state.vehicleSearch.tableObj.total
    },
    columns() {
      return [
        {
          title: '姓名',
          key: ''
        },
        {
          title: '性别',
          key: ''
        },
        {
          title: '服务证号',
          key: ''
        },
        {
          title: '身份证号（从业资格证号）',
          key: ''
        },
        {
          title: '车牌号',
          key: ''
        },
        {
          title: '自编号',
          key: ''
        },
        {
          title: '公司',
          key: ''
        },
        {
          title: '准驾车型',
          key: ''
        },
        {
          title: '联系电话',
          key: ''
        }
      ]
    }
  },
  methods: {
    getPage(currentPage) {
      this.$store.dispatch('vehicleSearch/getDSTableObj', { currentPage })
    },
    changeSize(pageSize) {
      this.$store.commit('vehicleSearch/updateVSPageSize', pageSize)
      this.getPage(1)
    }
  },
  mounted() {
    this.$store.dispatch('getCompListForSelect')
  }
}
</script>

<style lang="less">
.vehicle-search-home-page {
}
</style>

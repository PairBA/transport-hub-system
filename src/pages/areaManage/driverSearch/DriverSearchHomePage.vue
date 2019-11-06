<template>
  <div class="driver-search-home-page">
    <ContentLayout :showSpin="showSpin">
      <TableWrapper>
        <Table :columns="columns"
               :data="tableList">
        </Table>
        <PairPage id="driverSearchList"
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
      return this.$store.state.driverSearch.tableObj.tableList
    },
    currentPage() {
      return this.$store.state.driverSearch.tableObj.currentPage
    },
    pageSize() {
      return this.$store.state.driverSearch.tableObj.pageSize
    },
    total() {
      return this.$store.state.driverSearch.tableObj.total
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
      this.$store.dispatch('driverSearch/getDSTableObj', { currentPage })
    },
    changeSize(pageSize) {
      this.$store.commit('driverSearch/updateDSPageSize', pageSize)
      this.getPage(1)
    }
  },
  mounted() {
    this.$store.dispatch('getCompListForSelect')
  }
}
</script>

<style lang="less">
.driver-search-home-page {
}
</style>

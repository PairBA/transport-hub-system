<template>
  <div class="gateVehicleSearch__homePage">
    <ContentLayout :showSpin="showSpin">
      <TableWrapper style="margin-top: 24px;">
        <Table :columns="columns"
               :data="list">
        </Table>
        <PairPage id="trafficFlowListPage"
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
    list() {
      return this.$store.state.gateVehicleSearch.list
    },
    currentPage() {
      return this.$store.state.gateVehicleSearch.currentPage
    },
    pageSize() {
      return this.$store.state.gateVehicleSearch.pageSize
    },
    total() {
      return this.$store.state.gateVehicleSearch.total
    },
    columns() {
      return [
        {
          title: '闸口时间',
          key: 'gateTime'
        },
        {
          title: '闸口',
          key: 'gateName'
        },
        {
          title: '车辆号牌',
          key: 'vehicleNo'
        },
        {
          title: '公司',
          key: 'companyName'
        },
        {
          title: '终端厂商',
          key: 'terminalName'
        }
      ]
    }
  },
  methods: {
    getPage(currentPage) {
      this.$store.dispatch('gateVehicleSearch/getGateVehicleList', { currentPage })
    },
    changeSize(pageSize) {
      this.$store.commit('gateVehicleSearch/updatePageSize', pageSize)
      this.getPage(1)
    }
  }
}
</script>

<style lang="less">
.gateVehicleSearch__homePage {
}
</style>

<template>
  <div class="gateVehicleSearch__homePage">
    <ContentLayout :showSpin="showSpin">
      <TableWrapper>
        <Table :columns="columns"
               :data="list">
        </Table>
        <PairPage id="vehicleListPage"
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
import { dateFormat } from '../../../utils'

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
          key: 'companyName',
          render: (h, params) => {
            return h('div', params.row.comShortName || params.row.companyName)
          }
        },
        {
          title: '终端厂商',
          key: 'terminalName'
        }
      ]
    }
  },
  mounted() {
    const time = this.$route.query.time
    const gateName = this.$route.query.gateName
    if (time) {
      const endTime = time + 1000 * 60 * 60
      this.$store.commit('gateVehicleSearch/updateGateName', gateName)
      this.$store.commit('gateVehicleSearch/updateStartDate', new Date(time))
      this.$store.commit('gateVehicleSearch/updateStartTime', dateFormat(new Date(time), 'hh:mm'))
      this.$store.commit('gateVehicleSearch/updateEndDate', new Date(endTime))
      this.$store.commit('gateVehicleSearch/updateEndTime', dateFormat(new Date(endTime), 'hh:mm'))
    }
    this.getPage(1)
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

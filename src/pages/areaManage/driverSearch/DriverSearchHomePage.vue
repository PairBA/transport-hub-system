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
          key: 'driverName'
        },
        {
          title: '性别',
          key: 'gender',
          render: (h, params) => {
            let content = '未知'
            let gender = params.row.gender
            if (gender === 'M') {
              content = '男'
            } else if (gender === 'F') {
              content = '女'
            }
            return h('div', content)
          }
        },
        {
          title: '服务证号',
          key: 'jobSeniorityCard',
          render: (h, params) => {
            let content = '--'
            if (params.row.jobSeniorityCard) {
              content = params.row.jobSeniorityCard
            }
            return h('span', content)
          }
        },
        {
          title: '身份证号（从业资格证号）',
          key: 'idCard',
          width: 250,
          render: (h, params) => {
            let content = '--'
            if (params.row.idCard) {
              content = params.row.idCard
            }
            return h('span', content)
          }
        },
        {
          title: '车牌号',
          key: 'vehicleNo'
        },
        {
          title: '自编号',
          key: 'customNum',
          render: (h, params) => {
            let content = '--'
            if (params.row.customNum) {
              content = params.row.customNum
            }
            return h('span', content)
          }
        },
        {
          title: '公司',
          key: 'comShortName',
          render: (h, params) => {
            let content = '--'
            if (params.row.comShortName) {
              content = params.row.comShortName
            }
            return h('span', content)
          }
        },
        {
          title: '准驾车型',
          key: 'vehicleClass',
          render: (h, params) => {
            let content = '--'
            if (params.row.vehicleClass) {
              content = params.row.vehicleClass
            }
            return h('span', content)
          }
        },
        {
          title: '联系电话',
          key: 'mobile',
          render: (h, params) => {
            let content = '--'
            if (params.row.mobile) {
              content = params.row.mobile
            }
            return h('span', content)
          }
        }
      ]
    }
  },
  methods: {
    async getPage(currentPage) {
      this.$store.commit('search/updateShowSpin', true)
      await this.$store.dispatch('driverSearch/getDSTableObj', { currentPage })
      this.$store.commit('search/updateShowSpin', false)
    },
    changeSize(pageSize) {
      this.$store.commit('driverSearch/updateDSPageSize', pageSize)
      this.getPage(1)
    }
  },
  async mounted() {
    this.$store.commit('search/updateShowSpin', true)
    await Promise.all([
      this.$store.dispatch('getCompListForSelect'),
      this.$store.dispatch('driverSearch/getDSTableObj', { currentPage: 1 })
    ])
    this.$store.commit('search/updateShowSpin', false)
  }
}
</script>

<style lang="less">
.driver-search-home-page {
}
</style>

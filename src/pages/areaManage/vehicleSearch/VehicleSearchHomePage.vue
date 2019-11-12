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
    <FocusModal :showFocusModal = 'showFocusModal'
                :vehicleNo = 'propVehicleNo'
                @close-focus-modal="closeFocusModal"
                @go-search="goSearch">
    </FocusModal>
  </div>
</template>

<script>
import FocusModal from '@/components/modal/focus/FocusModal'
import { get, END_POINTS } from '@/api'
import { dateFormat } from '@/utils'
const focus = require('@/img/focus/focus.png')
const cancelFocus = require('@/img/focus/cancelFocus.png')

export default {
  components: {
    FocusModal
  },
  data() {
    return {
      showFocusModal: false,
      propVehicleNo: ''
    }
  },
  computed: {
    showSpin() {
      return this.$store.state.search.showSpin
    },
    showFocusBtn() {
      return this.$store.state.permission.focusRule
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
          title: '自编号',
          key: 'customNum'
        },
        {
          title: '车牌号',
          key: 'vehicleNo'
        },
        {
          title: '公司',
          key: 'comShortName'
        },
        {
          title: '注册日期',
          key: 'regStartDate',
          render: (h, params) => {
            let content = '-'
            let regStartDate = params.row.regStartDate
            if (regStartDate) {
              content = dateFormat(new Date(regStartDate), 'yyyy-MM-dd')
            }
            return h('div', content)
          }
        },
        {
          title: '入户日期',
          key: 'permitDate',
          render: (h, params) => {
            let content = '-'
            let permitDate = params.row.permitDate
            if (permitDate) {
              content = dateFormat(new Date(permitDate), 'yyyy-MM-dd')
            }
            return h('div', content)
          }
        },
        {
          title: '注册到期日期',
          key: 'regEndDate',
          render: (h, params) => {
            let content = '-'
            let regEndDate = params.row.regEndDate
            if (regEndDate) {
              content = dateFormat(new Date(regEndDate), 'yyyy-MM-dd')
            }
            return h('div', content)
          }
        },
        {
          title: '厂牌型号',
          key: 'brand'
        },
        {
          title: '燃料类型',
          key: 'greenVehicle'
        },
        {
          title: '操作',
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            let content = ''
            let src = ''
            if (params.row.isFocused) { // 已经被关注
              content = '取消关注'
              src = cancelFocus
            } else { // 未被关注
              content = '关注'
              src = focus
            }
            if (this.showFocusBtn) {
              return h('div', [
                h('Tooltip', {
                  props: {
                    content: content,
                    transfer: true,
                    placement: 'bottom'
                  },
                  style: {
                    cursor: 'pointer',
                    width: '30px'
                  }
                }, [
                  h('img', {
                    style: {
                      cursor: 'pointer',
                      width: '30px'
                    },
                    attrs: {
                      src: src
                    },
                    on: {
                      click: () => {
                        if (params.row.isFocused) { // 已经被关注
                          this.doCancelFocus(params.row)
                        } else { // 未被关注
                          this.openFocus(params.row)
                        }
                      }
                    }
                  })
                ], content)
              ])
            }
          }
        }
      ]
    }
  },
  methods: {
    async getPage(currentPage) {
      this.$store.commit('search/updateShowSpin', true)
      await this.$store.dispatch('vehicleSearch/getVSTableObj', { currentPage })
      this.$store.commit('search/updateShowSpin', false)
    },
    changeSize(pageSize) {
      this.$store.commit('vehicleSearch/updateVSPageSize', pageSize)
      this.getPage(1)
    },
    openFocus(row) {
      this.propVehicleNo = row.vehicleNo
      this.showFocusModal = true
    },
    closeFocusModal(result) {
      this.showFocusModal = result
      this.propVehicleNo = ''
    },
    async doCancelFocus(row) {
      const response = await get(END_POINTS.CANCEL_FOCUS, {
        vehicleNo: row.vehicleNo
      })
      if (response.code === 2000) {
        this.goSearch()
        this.$Message.success({
          content: '成功取消关注！'
        })
      }
    },
    async goSearch() {
      this.$store.commit('search/updateShowSpin', true)
      await this.$store.dispatch('vehicleSearch/getVSTableObj', { currentPage: 1 })
      this.$store.commit('search/updateShowSpin', false)
    }
  },
  async mounted() {
    this.$store.commit('search/updateShowSpin', true)
    await Promise.all([
      this.$store.dispatch('getCompListForSelect'),
      this.$store.dispatch('vehicleSearch/getVSTableObj', { currentPage: 1 })
    ])
    this.$store.commit('search/updateShowSpin', false)
  }
}
</script>

<style lang="less">
.vehicle-search-home-page {
}
</style>

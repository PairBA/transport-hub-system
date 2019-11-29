<template>
  <div class="meter-trip-error-home-page">
    <ContentLayout :showSpin="showSpin">
      <TableWrapper>
        <Table :columns="columns"
               :data="tableList">
        </Table>
        <PairPage id="meterTripErrorList"
                  :total="total"
                  :current="currentPage"
                  :page-size="pageSize"
                  @on-change="getPage"
                  @on-page-size-change="changeSize">
        </PairPage>
      </TableWrapper>
    </ContentLayout>
    <FocusModal :showFocusModal='showFocusModal'
                :vehicleNo='propVehicleNo'
                @close-focus-modal="closeFocusModal"
                @go-search="goSearchCurrentPage">
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
          title: '车牌号',
          key: 'vehicleNo'
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
          title: '终端厂商',
          key: 'terminalName',
          render: (h, params) => {
            let content = '--'
            if (params.row.terminalName) {
              content = params.row.terminalName
            }
            return h('span', content)
          }
        },
        {
          title: '问题类型',
          key: 'judgeType',
          render: (h, params) => {
            let content = '--'
            let judgeType = params.row.judgeType
            if (judgeType) {
              content = dateFormat(new Date(judgeType), 'yyyy-MM-dd')
            }
            return h('div', content)
          }
        },
        {
          title: '问题描述',
          key: 'judgeDesc',
          render: (h, params) => {
            let content = '--'
            if (params.row.judgeDesc) {
              content = params.row.judgeDesc
            }
            return h('span', content)
          }
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
      await this.$store.dispatch('meterTripError/getMTETableObj', { currentPage })
      this.$store.commit('search/updateShowSpin', false)
    },
    changeSize(pageSize) {
      this.$store.commit('meterTripError/updateMTEPageSize', pageSize)
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
        this.goSearchCurrentPage()
        this.$Message.success({
          content: '成功取消关注！'
        })
      }
    },
    async goSearch() {
      this.$store.commit('search/updateShowSpin', true)
      await this.$store.dispatch('meterTripError/getMTETableObj', { currentPage: 1 })
      this.$store.commit('search/updateShowSpin', false)
    },
    async goSearchCurrentPage() {
      this.$store.commit('search/updateShowSpin', true)
      await this.$store.dispatch('meterTripError/getMTETableObj', { currentPage: this.currentPage })
      this.$store.commit('search/updateShowSpin', false)
    }
  },
  async mounted() {
    this.$store.commit('search/updateShowSpin', true)
    await Promise.all([
      this.$store.dispatch('getCompListForSelect'),
      this.$store.dispatch('getTerminalList'),
      this.$store.dispatch('meterTripError/getMTETableObj', { currentPage: 1 })
    ])
    this.$store.commit('search/updateShowSpin', false)
  }
}
</script>

<style lang="less">
.meter-trip-error-home-page {
}
</style>

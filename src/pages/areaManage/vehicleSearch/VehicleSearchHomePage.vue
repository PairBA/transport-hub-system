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
import { get, END_POINTS } from '@/api'
const focus = require('@/img/focus/focus.png')
const cancelFocus = require('@/img/focus/cancelFocus.png')
import FocusModal from '@/components/modal/focus/FocusModal'

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
          key: ''
        },
        {
          title: '车牌号',
          key: ''
        },
        {
          title: '公司',
          key: ''
        },
        {
          title: '注册日期',
          key: ''
        },
        {
          title: '入户日期',
          key: ''
        },
        {
          title: '注册到期日期',
          key: ''
        },
        {
          title: '厂牌型号',
          key: ''
        },
        {
          title: '燃料类型',
          key: ''
        },
        {
          title: '联系电话',
          key: ''
        },
        {
          title: '操作',
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            let content = ''
            let src = ''
            if (params.row.focus) { // 已经被关注
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
                        if (params.row.focus) { // 已经被关注
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
    getPage(currentPage) {
      this.$store.dispatch('vehicleSearch/getDSTableObj', { currentPage })
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
      await this.$store.dispatch('vehicleSearch/getVSTableObj')
      this.$store.commit('search/updateShowSpin', false)
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

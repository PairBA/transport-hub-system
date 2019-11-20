<template>
  <div class="active-safety-home-page">
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
      return this.$store.state.activeSafety.tableObj.tableList
    },
    currentPage() {
      return this.$store.state.activeSafety.tableObj.currentPage
    },
    pageSize() {
      return this.$store.state.activeSafety.tableObj.pageSize
    },
    total() {
      return this.$store.state.activeSafety.tableObj.total
    },
    columns() {
      return [
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
          title: '车牌号',
          key: 'vehicleNo'
        },
        {
          title: '报警类型',
          key: 'alarmType',
          render: (h, params) => {
            let content = '--'
            let alarmType = params.row.alarmType
            if (alarmType === 1) {
              content = '人车不符'
            } else if (alarmType === 2) {
              content = '遮挡视频'
            } else if (alarmType === 3) {
              content = '计价器异常'
            } else if (alarmType === 4) {
              content = '顶灯异常'
            } else if (alarmType === 5) {
              content = '存储卡异常'
            }
            return h('div', content)
          }
        },
        {
          title: '最新报警时间',
          key: 'alarmDate',
          render: (h, params) => {
            let content = '--'
            let alarmDate = params.row.alarmDate
            if (alarmDate) {
              content = dateFormat(new Date(alarmDate), 'yyyy-MM-dd hh:mm')
            }
            return h('div', content)
          }
        },
        {
          title: '报警次数',
          key: 'alarmCount'
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
      await this.$store.dispatch('activeSafety/getASTableObj', { currentPage })
      this.$store.commit('search/updateShowSpin', false)
    },
    changeSize(pageSize) {
      this.$store.commit('activeSafety/updateASPageSize', pageSize)
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
    async goSearchCurrentPage() {
      this.$store.commit('search/updateShowSpin', true)
      await this.$store.dispatch('activeSafety/getASTableObj', { currentPage: this.currentPage })
      this.$store.commit('search/updateShowSpin', false)
    }
  },
  async mounted() {
    this.$store.commit('search/updateShowSpin', true)
    await Promise.all([
      this.$store.dispatch('getCompListForSelect'),
      this.$store.dispatch('getTerminalList'),
      this.$store.dispatch('activeSafety/getASTableObj', { currentPage: 1 })
    ])
    this.$store.commit('search/updateShowSpin', false)
  }
}
</script>

<style lang="less">
.active-safety-home-page {
}
</style>

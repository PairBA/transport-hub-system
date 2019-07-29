<template>
  <div class="vehicle-query-home-page">
    <ContentLayout :showSpin="showSpin">
      <TableWrapper>
        <Table :columns="columns"
               :data="tableListObject.tableList">
        </Table>
        <PairPage id="vehicleQueryListPage"
                  :total="tableListObject.total"
                  :current="tableListObject.currentPage"
                  :page-size="tableListObject.pageSize"
                  @on-change="getPage"
                  @on-page-size-change="changeSize">
        </PairPage>
      </TableWrapper>
    </ContentLayout>
    <RealLocationAMap :isShowModal="isShowModal"
                      :vehicleNo="propVehicleNo"
                      :terminalName="propTerminalName"
                      :companyName="propCompanyName"
                      @on-visible-change="doCloseModal">
    </RealLocationAMap>
    <FocusModal :showFocusModal = 'showFocusModal'
                :vehicleNo = 'propVehicleNo'
                @close-focus-modal="closeFocusModal"
                @go-search="reVehicleQuerySearch">
    </FocusModal>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
import RealLocationAMap from '@/components/map/realLocation/RealLocationAMap'
import FocusModal from '@/components/modal/focus/FocusModal'
const focus = require('@/img/focus/focus.png')
const cancelFocus = require('@/img/focus/cancelFocus.png')
const realLocation = require('@/img/focus/realLocation.png')

export default {
  components: {
    RealLocationAMap,
    FocusModal
  },
  data() {
    return {
      isShowModal: false,
      showFocusModal: false,
      propVehicleNo: '',
      propTerminalName: '',
      propCompanyName: ''
    }
  },
  computed: {
    showSpin() {
      return this.$store.state.search.showSpin
    },
    tableListObject() {
      return this.$store.state.vehicleQuery.tableListObject
    },
    vehicleNo() {
      return this.$store.state.vehicleQuery.vehicleNo
    },
    focusDate() {
      return this.$store.state.vehicleQuery.focusDate
    },
    columns() {
      return [
        {
          title: '车牌号',
          key: 'vehicleNo',
          tooltip: true
        },
        {
          title: '公司',
          key: 'companyName',
          tooltip: true
        },
        {
          title: '终端厂商',
          key: 'terminalName',
          tooltip: true
        },
        {
          title: '发车量',
          key: 'sumOn',
          tooltip: true
        },
        {
          title: '违规上客',
          key: 'sumOnAlert',
          tooltip: true
        },
        {
          title: '异常排队',
          key: 'sumQcut',
          tooltip: true
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
            if (params.row.realLocation) { // 显示实时地图
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
                ], content),
                h('Tooltip', {
                  props: {
                    content: '实时位置',
                    transfer: true,
                    placement: 'bottom'
                  },
                  style: {
                    cursor: 'pointer',
                    width: '30px',
                    marginLeft: '12px'
                  }
                }, [
                  h('img', {
                    style: {
                      cursor: 'pointer',
                      width: '30px'
                    },
                    attrs: {
                      src: realLocation
                    },
                    on: {
                      click: () => {
                        this.doShowModal(params.row)
                      }
                    }
                  })
                ], '实时位置')
              ])
            } else {
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
      this.$store.commit('vehicleQuery/updateTableListObjectCurrentPage', currentPage)
      this.reVehicleQuerySearch()
    },
    changeSize(pageSize) {
      this.$store.commit('vehicleQuery/updateTableListObjectPageSize', pageSize)
      this.getPage(1)
    },
    doShowModal(row) {
      this.propVehicleNo = row.vehicleNo
      this.propTerminalName = row.terminalName
      this.propCompanyName = row.companyName
      this.isShowModal = true
    },
    doCloseModal(result) {
      this.isShowModal = result
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
      const result = await get(END_POINTS.CANCEL_FOCUS, {
        vehicleNo: row.vehicleNo
      })
      if (result.code === 2000) {
        this.reVehicleQuerySearch()
        this.$Message.success({
          content: '成功取消关注！'
        })
      }
    },
    async reVehicleQuerySearch() {
      if (new Date(this.focusDate[1]).getTime() - new Date(this.focusDate[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.$store.commit('search/updateShowSpin', true)
        const result = await this.$store.dispatch('vehicleQuery/getHubStatTrailList')
        if (result.code === 2006) {
          if (this.vehicleNo && this.vehicleNo !== '川A') {
            await this.$store.dispatch('vehicleQuery/isVehicleFocus')
          }
        }
        this.$store.commit('search/updateShowSpin', false)
      }
    }
  }
}
</script>

<style lang="less">
.vehicle-query-home-page {
}
</style>

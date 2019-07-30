<template>
  <div class="focus-home-page">
    <ContentLayout :showSpin="showSpin">
      <TableWrapper>
        <Table :columns="columns"
               :data="tableListObject.showTableList">
        </Table>
        <PairPage id="focusListPage"
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
                      @on-visible-change="doCloseModal"/>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
import { dateFormat, renderHeader } from '@/utils'
import RealLocationAMap from '@/components/map/realLocation/RealLocationAMap'
const cancelFocus = require('@/img/focus/cancelFocus.png')
const realLocation = require('@/img/focus/realLocation.png')

export default {
  components: {
    RealLocationAMap
  },
  data() {
    return {
      isShowModal: false,
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
      return this.$store.state.focus.tableListObject
    },
    vehicleNo() {
      return this.$store.state.focus.vehicleNo
    },
    focusDate() {
      return this.$store.state.focus.focusDate
    },
    columns() {
      return [
        {
          title: '车牌号',
          key: 'vehicleNo',
          tooltip: true,
          renderHeader
        },
        {
          title: '公司',
          key: 'companyName',
          tooltip: true,
          renderHeader
        },
        {
          title: '终端厂商',
          key: 'terminalName',
          tooltip: true,
          renderHeader
        },
        {
          title: '进场次数',
          key: 'sumIn',
          tooltip: true,
          renderHeader
        },
        {
          title: '发车量',
          key: 'sumOn',
          tooltip: true,
          renderHeader
        },
        {
          title: '操作人员',
          key: 'operatorName',
          tooltip: true,
          renderHeader
        },
        {
          title: '关注时间',
          key: 'focusTime',
          width: 110,
          // tooltip: true,
          renderHeader,
          render: (h, params) => {
            return h('span', dateFormat(new Date(params.row.focusTime), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '备注',
          key: 'remark',
          tooltip: true,
          renderHeader
        },
        {
          title: '操作',
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Tooltip', {
                props: {
                  content: '取消关注',
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
                    src: cancelFocus
                  },
                  on: {
                    click: () => {
                      this.doCancelFocus(params.row)
                    }
                  }
                })
              ], '取消关注'),
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
          }
        }
      ]
    }
  },
  methods: {
    getPage(currentPage) {
      this.$store.commit('focus/updateTableListObjectCurrentPage', currentPage)
      // 重新计算显示的列表数据
      if (this.tableListObject.currentPage <= this.tableListObject.totalPage) {
        let showList = []
        for (let i = this.tableListObject.pageSize * (this.tableListObject.currentPage - 1) + 1;
          i <= ((this.tableListObject.total > this.tableListObject.pageSize * this.tableListObject.currentPage)
            ? (this.tableListObject.pageSize * this.tableListObject.currentPage) : (this.tableListObject.total));
          i++) {
          showList.push(this.tableListObject.tableList[i - 1])
        }
        this.$store.commit('focus/updateTableListObjectShowTableList', showList)
      }
    },
    changeSize(pageSize) {
      this.$store.commit('focus/updateTableListObjectPageSize', pageSize)
      this.getPage(1)
    },
    async doCancelFocus(row) {
      const result = await get(END_POINTS.CANCEL_FOCUS, {
        vehicleNo: row.vehicleNo
      })
      if (result.code === 2000) {
        this.reFocusSearch()
        this.$Message.success({
          content: '成功取消关注！'
        })
      }
    },
    async reFocusSearch() {
      if (new Date(this.focusDate[1]).getTime() - new Date(this.focusDate[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.$store.commit('search/updateShowSpin', true)
        this.$store.commit('focus/updateTableListObjectCurrentPage', 1)
        const result = await this.$store.dispatch('focus/getHubFocusVehicleList')
        if (result.code === 2006) {
          this.$Message.warning({
            content: result.msg + '！'
          })
        }
        this.$store.commit('search/updateShowSpin', false)
      }
    },
    doShowModal(row) {
      this.propVehicleNo = row.vehicleNo
      this.propTerminalName = row.terminalName
      this.propCompanyName = row.companyName
      this.isShowModal = true
    },
    doCloseModal(result) {
      this.isShowModal = result
    }
  }
}
</script>

<style lang="less">
.focus-home-page {
}
</style>

<template>
  <div class="focus-home-page">
    <ContentLayout :showSpin="showSpin">
      <div slot="searchCondition">
        <Form label-position="top">
          <FormItem label="车牌号：">
            <Input v-model="vehicleNo" placeholder="请输入车牌号"/>
          </FormItem>
          <FormItem label="关注时间：">
            <DatePicker v-model="focusDate"
                        type="daterange"
                        format="yyyy/MM/dd"
                        placement="bottom-start"
                        placeholder="请选择关注时间区间">
            </DatePicker>
          </FormItem>
          <Divider/>
          <div>
            <Button type="primary"
                    style="float: left;"
                    @click="goSearch">
              查询
            </Button>
            <Button type="success"
                    style="float: right;"
                    @click="exportExcel">
              导出excel
            </Button>
          </div>
        </Form>
      </div>
      <div slot="content">
        <TableWrapper>
          <Table :columns="columns"
                 :data="tableListObject.tableList">
          </Table>
          <PairPage id="focusListPage"
                    :total="tableListObject.total"
                    :current="tableListObject.currentPage"
                    :page-size="tableListObject.pageSize"
                    @on-change="getPage"
                    @on-page-size-change="changeSize">
          </PairPage>
        </TableWrapper>
      </div>
    </ContentLayout>
    <RealLocationAMap :isShowModal="isShowModal"
                      :vehicleNo="propVehicleNo"
                      :terminalName="propTerminalName"
                      :companyName="propCompanyName"
                      @on-visible-change="doCloseModal"/>
  </div>
</template>

<script>
import {
  get,
  END_POINTS
} from '@/api'

import { dateFormat } from '@/utils'

import RealLocationAMap from '@/components/map/realLocation/RealLocationAMap'

export default {
  components: {
    RealLocationAMap
  },
  data() {
    return {
      isShowModal: false,
      showSpin: false,
      vehicleNo: '',
      focusDate: [new Date(), new Date()],
      propVehicleNo: '',
      propTerminalName: '',
      propCompanyName: '',
      tableListObject: { // 前端分页的表格数据对象
        tableList: [],
        showTableList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0
      }
    }
  },
  computed: {
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
          title: '进场次数',
          key: 'sumIn',
          tooltip: true
        },
        {
          title: '发车量',
          key: 'sumOn',
          tooltip: true
        },
        {
          title: '操作人员',
          key: 'operatorName',
          tooltip: true
        },
        {
          title: '关注时间',
          key: 'focusTime',
          tooltip: true,
          render: (h, params) => {
            // console.log(params)
            return h('span', dateFormat(new Date(params.row.focusTime), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '备注',
          key: 'remark',
          tooltip: true
        },
        {
          title: '操作',
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.doCancelFocus(params.row)
                  }
                }
              }, '取消关注'),
              h('span', {
                style: {
                  cursor: 'pointer',
                  marginLeft: '12px'
                },
                on: {
                  click: () => {
                    this.doShowModal(params.row)
                  }
                }
              }, '实时位置')
            ])
          }
        }
      ]
    }
  },
  async mounted() {
    this.getFocusInfo()
  },
  methods: {
    getPage(currentPage) {
      this.tableListObject.currentPage = currentPage
      this.doViewPage(this.tableListObject.tableList)
    },
    changeSize(pageSize) {
      this.tableListObject.pageSize = pageSize
      this.getPage(1)
    },
    goSearch() {
      this.getFocusInfo()
    },
    async getFocusInfo() {
      this.showSpin = true
      this.tableListObject.currentPage = 1
      this.tableListObject.total = 0
      this.tableListObject.pageSize = 10
      const result = await get(END_POINTS.GET_HUB_FOCUS_VEHICLE_LIST, {
        startDate: dateFormat(new Date(this.focusDate[0]), 'yyyy-MM-dd'),
        endDate: dateFormat(new Date(this.focusDate[1]), 'yyyy-MM-dd'),
        areaCode: localStorage.getItem('areaCode'),
        hubCode: localStorage.getItem('hubCode'),
        vehicleNo: this.vehicleNo,
        driverType: 'TAXI'
      })
      // console.log(result)
      if (result.code === 2000) {
        this.doViewPage(result.data) // 表格数据
        this.showSpin = false
      } else {
        if (result.code === 2006) {
          this.$Message.warning({
            content: result.msg + '！'
          })
        }
        this.tableListObject.tableList = []
        this.tableListObject.showTableList = []
        this.showSpin = false
      }
    },
    doViewPage(data) {
      this.tableListObject.tableList = data // 表格数据
      this.tableListObject.total = data.length // 数据总数
      this.tableListObject.totalPage = Math.ceil(this.tableListObject.total / this.tableListObject.pageSize) // 总页数
      // 当前页不大于总页数
      if (this.tableListObject.currentPage <= this.tableListObject.totalPage) {
        this.tableListObject.showTableList = [] // 清空显示的列表
        for (let i = this.tableListObject.pageSize * (this.tableListObject.currentPage - 1) + 1;
          i <= ((this.tableListObject.total > this.tableListObject.pageSize * this.tableListObject.currentPage) ? (this.tableListObject.pageSize * this.tableListObject.currentPage) : (this.tableListObject.total));
          i++) {
          this.tableListObject.showTableList.push(this.tableListObject.tableList[i - 1])
        }
      }
    },
    exportExcel() {
      const token = localStorage.getItem('token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      const url = END_POINTS.GET_HUB_FOCUS_VEHICLE_EXCEL +
        '?startDate=' + dateFormat(new Date(this.focusDate[0]), 'yyyy-MM-dd') +
        '&endDate=' + dateFormat(new Date(this.focusDate[1]), 'yyyy-MM-dd') +
        '&areaCode=' + localStorage.getItem('areaCode') +
        '&hubCode=' + localStorage.getItem('hubCode') +
        '&vehicleNo=' + this.vehicleNo +
        '&driverType=TAXI' +
        '&x-me-token=' + token
      window.location.href = `${baseUrl}${url}`
    },
    async doCancelFocus(row) {
      const result = await get(END_POINTS.CANCEL_FOCUS, {
        vehicleNo: row.vehicleNo
      })
      // console.log(result)
      if (result.code === 2000) {
        this.goSearch()
        this.$Message.success({
          content: '成功取消关注！'
        })
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
  .ivu-date-picker {
    width: 100%;
  }
}
</style>

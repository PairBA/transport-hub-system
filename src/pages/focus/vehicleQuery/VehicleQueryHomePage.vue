<template>
  <div class="vehicle-query-home-page">
    <ContentLayout :showSpin="showSpin">
      <div slot="searchCondition">
        <Form label-position="top">
          <FormItem label="车牌号：">
            <Input v-model="vehicleNo"
                   placeholder="请输入车牌号"/>
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
          <PairPage id="vehicleQueryListPage"
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
    <Modal v-model="showFocusModal"
           width="360"
           class="focus-modal"
           :mask-closable="false">
      <p slot="header"
         class="focus-modal-title">
        <span>加入重点关注</span>
      </p>
      <div style="font-size: 16px;font-weight: bold;">
        <div style="margin-bottom: 12px;">
          <span>车牌号码：{{confirmVehicleNo}}</span>
        </div>
        <div>
          <div>备注：</div>
          <div>
            <Input v-model="remark"
                   type="textarea"
                   :rows="2"
                   placeholder="请输入备注" />
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="success"
                size="large"
                long
                :loading="focusLoading"
                @click="confirmFocus">
          确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  get,
  post,
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
      focusLoading: false,
      isShowModal: false,
      showFocusModal: false,
      showSpin: false,
      vehicleNo: '',
      focusDate: [new Date(), new Date()],
      remark: '',
      tableListObject: {
        tableList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0
      },
      propVehicleNo: '',
      propTerminalName: '',
      propCompanyName: '',
      confirmVehicleNo: ''
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
            if (params.row.focus) { // 已经被关注
              content = '取消关注'
            } else { // 未被关注
              content = '关注'
            }
            if (params.row.realLocation) { // 显示实时地图
              return h('div', [
                h('span', {
                  style: {
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      if (params.row.focus) { // 已经被关注
                        this.doCancelFocus(params.row)
                      } else { // 未被关注
                        this.doFocus(params.row)
                      }
                    }
                  }
                }, content),
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
            } else {
              return h('div', [
                h('span', {
                  style: {
                    cursor: 'pointer'
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
                }, content)
              ])
            }
          }
        }
      ]
    }
  },
  async mounted() {
    this.getVehicleInfo()
  },
  methods: {
    getPage(currentPage) {
      this.tableListObject.currentPage = currentPage
      this.goSearch()
    },
    changeSize(pageSize) {
      this.tableListObject.pageSize = pageSize
      this.getPage(1)
    },
    goSearch() {
      this.getVehicleInfo()
    },
    async getVehicleInfo() {
      this.showSpin = true
      const result = await post(END_POINTS.GET_HUB_STAT_TRAIL_LIST, {
        currentPage: this.tableListObject.currentPage,
        pageSize: this.tableListObject.pageSize,
        queryVO: {
          areaCode: localStorage.getItem('areaCode'),
          driverType: 'TAXI',
          startDate: dateFormat(new Date(this.focusDate[0]), 'yyyy-MM-dd'),
          endDate: dateFormat(new Date(this.focusDate[1]), 'yyyy-MM-dd'),
          hubCode: localStorage.getItem('hubCode'),
          type: 'ALL',
          vehicleNo: this.vehicleNo
        },
        refreshTotalRecord: true
      })
      // console.log(result)
      if (result.code === 2001) {
        if (result.data && result.data.length) {
          this.tableListObject.tableList = result.data.map(item => {
            let realLocation = false
            if (item.companyName && item.terminalName) {
              realLocation = true
            }
            return {
              vehicleNo: item.vehicleNo,
              companyName: item.companyName,
              terminalName: item.terminalName,
              focus: item.focus, // 是否被关注
              realLocation: realLocation, // 是否显示实时位置操作
              sumOn: item.sumOn, // 发车量
              sumOnAlert: item.sumOnAlert, // 违规上客
              sumQcut: item.sumQcut // 异常排队
            }
          })
          this.tableListObject.currentPage = result.currentPage
          this.tableListObject.pageSize = result.pageSize
          this.tableListObject.totalPage = result.totalPage
          this.tableListObject.total = result.total
        } else {
          if (this.vehicleNo) {
            let focus = false
            const result = await get(END_POINTS.IS_VEHICLE_FOCUS, {
              vehicleNo: this.vehicleNo
            })
            if (result.code === 2000) {
              focus = true
            }
            this.tableListObject.tableList = [
              {
                vehicleNo: this.vehicleNo,
                companyName: '',
                terminalName: '',
                focus: focus, // 是否被关注
                realLocation: false, // 是否显示实时位置操作
                sumOn: 0, // 发车量
                sumOnAlert: 0, // 违规上客
                sumQcut: 0 // 异常排队
              }
            ]
            this.tableListObject.currentPage = 1
            this.tableListObject.totalPage = 1
            this.tableListObject.total = 1
          } else {
            this.tableListObject.tableList = []
            this.tableListObject.total = 0
          }
        }
        this.showSpin = false
      } else {
        this.tableListObject.tableList = []
        this.tableListObject.total = 0
        this.showSpin = false
      }
    },
    exportExcel() {
      const token = localStorage.getItem('token')
      const baseUrl = process.env.VUE_APP_BASE_URL
      const url = END_POINTS.GET_HUB_STAT_TRAIL_ALL_EXCEL +
        '?startDate=' + dateFormat(new Date(this.focusDate[0]), 'yyyy-MM-dd') +
        '&endDate=' + dateFormat(new Date(this.focusDate[1]), 'yyyy-MM-dd') +
        '&vehicleNo=' + this.vehicleNo +
        '&driverType=TAXI' +
        '&areaCode=' + localStorage.getItem('areaCode') +
        '&hubCode=' + localStorage.getItem('hubCode') +
        '&x-me-token=' + token
      window.location.href = `${baseUrl}${url}`
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
      this.showFocusModal = true
      this.confirmVehicleNo = row.vehicleNo
    },
    closeFocusModal() {
      this.showFocusModal = false
      this.confirmVehicleNo = ''
    },
    async confirmFocus() {
      this.focusLoading = true
      const result = await get(END_POINTS.FOCUS_VEHICLE, {
        areaCode: localStorage.getItem('areaCode'),
        vehicleNo: this.confirmVehicleNo,
        remark: this.remark
      })
      // console.log(result)
      if (result.code === 2000) {
        this.goSearch()
        this.closeFocusModal()
        this.$Message.success({
          content: '关注成功！'
        })
      }
      this.focusLoading = false
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
    }
  }
}
</script>

<style lang="less">
.vehicle-query-home-page {
  .ivu-date-picker {
    width: 100%;
  }
}
.focus-modal {
  .focus-modal-title {
    text-align: center;
    font-size: 24px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
  }
}
</style>

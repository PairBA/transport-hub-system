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
          <Button type="primary"
                  @click="goSearch">
            查询
          </Button>
          <Button type="success"
                  @click="exportExcel">
            导出excel
          </Button>
        </Form>
      </div>
      <div slot="content">
        <div>
          <Table :columns="columns"
                 :data="tableList">
          </Table>
        </div>
      </div>
    </ContentLayout>
  </div>
</template>

<script>
import {
  get,
  END_POINTS
} from '@/api'

import { dateFormat } from '@/utils'

export default {
  components: {},
  data() {
    return {
      showSpin: false,
      vehicleNo: '',
      focusDate: [new Date(), new Date()],
      tableList: []
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
                    this.goToDelete(params.row.userId)
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
                    this.goToEdit(params.row.userId)
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
    goSearch() {
      this.getFocusInfo()
    },
    async getFocusInfo() {
      this.showSpin = true
      const result = await get(END_POINTS.GET_HUB_FOCUS_VEHICLE_LIST, {
        startDate: dateFormat(new Date(this.focusDate[0]), 'yyyy-MM-dd'),
        endDate: dateFormat(new Date(this.focusDate[1]), 'yyyy-MM-dd'),
        areaCode: localStorage.getItem('areaCode'),
        hubCode: localStorage.getItem('hubCode'),
        vehicleNo: this.vehicleNo,
        driverType: 'TAXI'
      })
      console.log(result)
      if (result.code === 2000) {
        this.tableList = result.data // 表格数据
        this.showSpin = false
      } else {
        this.showSpin = false
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

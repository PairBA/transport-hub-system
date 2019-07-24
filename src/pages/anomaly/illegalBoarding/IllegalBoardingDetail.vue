<template>
  <div class="illegal-boarding-detail">
    <PairBreadcrumb parentPath="/anomaly/illegalBoardingHomePage"
                    parentTitle="违规上客"
                    :title="vehicleNo"/>
    <div class="illegal-boarding-detail-content">
      <div v-for="(detailObject, index) in alertOnListDetail" :key="`alertDetail__${index}`">
        <div class="illegal-boarding-detail-group-title">
          <div class="group-vehicle-no">
            {{vehicleNo}}
          </div>
          <div class="group-date-str">
            {{detailObject.dateStr}}
          </div>
        </div>
        <TableWrapper>
          <Table :columns="columns"
                 :data="detailObject.list"
                 @on-row-click="showTransHubEvent" highlight-row >
          </Table>
        </TableWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
import { dateFormat, getHubTrailTableArr } from '@/utils'
export default {
  components: {},
  data() {
    return {
      mobile: '',
      vehicleNo: '',
      startDate: '',
      endDate: '',
      alertOnListDetail: []
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '进场时间',
          key: 'timeIn',
          render: (h, params) => {
            return h('span', dateFormat(new Date(params.row.timeIn), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '发车时间',
          key: 'timeOn',
          render: (h, params) => {
            return h('span', dateFormat(new Date(params.row.timeOn), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '出场时间',
          key: 'timeOut',
          render: (h, params) => {
            return h('span', dateFormat(new Date(params.row.timeOut), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: this.$t('sysManage.commonVar.action'),
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            return h('span', {
              style: {
                cursor: 'pointer',
                marginLeft: '12px'
              },
              on: {
                click: () => {
                  this.showTransHubEvent(params.row)
                }
              }
            }, '查看')
          }
        }
      ]
    }
  },
  async mounted() {
    this.mobile = this.$route.query.mobile
    this.vehicleNo = this.$route.query.vehicleNo
    this.startDate = this.$route.query.startDate
    this.endDate = this.$route.query.endDate
    this.getHubStatTrailList()
  },
  methods: {
    showTransHubEvent() {
    },
    async getHubStatTrailList() {
      const result = await get(END_POINTS.GET_HUB_SUM_ON_ALERT_LIST_DETAIL, {
        areaCode: 'CNSCA1',
        hubCode: localStorage.getItem('hubCode'),
        startDate: this.startDate,
        endDate: this.endDate,
        mobile: this.mobile,
        vehicleNo: this.vehicleNo,
        driverType: 'TAXI'
      })
      if (result.code === 2000) {
        this.alertOnListDetail = getHubTrailTableArr(result.data)
      }
    }
  }
}
</script>

<style lang="less">
.illegal-boarding-detail {
  .illegal-boarding-detail-content {
    padding: 24px;
    .illegal-boarding-detail-group-title {
      height: 60px;
      line-height: 60px;
      background-color: #A5BDE5;
      color: #FFFFFF;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;

      .group-vehicle-no {
        display: inline-block;
        height: 32px;
        font-size: 18px;
        line-height: 32px;
        margin-left: 24px;
      }

      .group-date-str {
        display: inline-block;
        height: 32px;
        font-size: 16px;
        line-height: 32px;
        margin-left: 48px;
      }
    }
  }
}
</style>

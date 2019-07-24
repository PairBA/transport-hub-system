<template>
  <div class="exception-queue-detail">
    <PairBreadcrumb parentPath="/anomaly/exceptionQueueHomePage"
                    parentTitle="异常排队"
                    :title="vehicleNo"/>
    <div class="exception-queue-detail-content">
      <div v-for="(detailObject, index) in hubSumListDetail" :key="`trailDetail__${index}`">
        <div class="exception-queue-detail-group-title">
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
      hubSumListDetail: []
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '发车时间',
          key: 'timeOn',
          render: (h, params) => {
            // console.log(params)
            return h('span', dateFormat(new Date(params.row.timeOn), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '等待时间',
          key: 'timeWait'
        },
        {
          title: '平均等待时间',
          key: 'avgTimeWait'
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
      const result = await get(END_POINTS.GET_HUB_SUM_QCUT_LIST_DETAIL, {
        areaCode: localStorage.getItem('areaCode'),
        hubCode: localStorage.getItem('hubCode'),
        startDate: this.startDate,
        endDate: this.endDate,
        mobile: this.mobile,
        vehicleNo: this.vehicleNo,
        driverType: 'TAXI'
      })
      if (result.code === 2000) {
        this.hubSumListDetail = getHubTrailTableArr(result.data)
      }
    }
  }
}
</script>

<style lang="less">
.exception-queue-detail {
  .exception-queue-detail-content {
    padding: 24px;
    .exception-queue-detail-group-title {
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

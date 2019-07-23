<template>
  <div class="exceptionQueue__detail">
    <div v-for="(detailObject, index) in hubSumListDetail" :key="`trailDetail__${index}`">
      <div>{{detailObject.dateStr}}</div>
      <TableWrapper>
        <Table :columns="columns"
               :data="detailObject.list"
               @on-row-click="showTransHubEvent" highlight-row >
        </Table>
      </TableWrapper>
    </div>
  </div>
</template>

<script>
import TableWrapper from '@/components/wrapper/TableWrapper'
import {
  get,
  END_POINTS
} from '@/api'
import { getHubTrailTableArr } from '@/utils'
export default {
  components: {
    TableWrapper
  },
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
          key: 'timeOn'
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
        areaCode: 'CNSCA1',
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
.exceptionQueue__detail{}
</style>

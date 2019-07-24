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
                 @on-row-click="doShowModal" highlight-row >
          </Table>
        </TableWrapper>
      </div>
    </div>
    <TrailAMap :isShowModal="isShowModal"
               :polygons="polygons"
               :polylines="polylines"
               :allGpsList="hubEventListObject.allGpsList || []"
               :timeForGpsList="hubEventListObject.timeForGpsList || []"
               :markers="markers"
               @on-visible-change="doCloseModal"/>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
import { dateFormat, getHubTrailTableArr, addMarkerPosition, drawTripLine } from '@/utils'
import TrailAMap from '@/components/anomaly/TrailAMap'
export default {
  components: {
    TrailAMap
  },
  data() {
    return {
      mobile: '',
      vehicleNo: '',
      startDate: '',
      endDate: '',
      alertOnListDetail: [],
      isShowModal: false,
      hubEventListObject: '',
      polygons: [],
      polylines: [],
      markers: []
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
                  this.doShowModal(params.row)
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
    doCloseModal(result) {
      this.isShowModal = result
    },
    async doShowModal(row) {
      await this.getTransHubPolygonArea()
      const hubEventListObject = await get(END_POINTS.GET_HUB_EVENT_LIST + `?hubTrailId=${row.hubTrailId}&driverType=TAXI`)
      if (hubEventListObject.success) {
        this.hubEventListObject = hubEventListObject.data
        this.polylines = []
        this.markers = []
        const { hubEventList, tripLineList } = this.hubEventListObject
        if (hubEventList.length) {
          hubEventList.map(value => {
            if (value.event === 'METER_ON') {
              let marker = addMarkerPosition(value.gps, require('@/img/tripDetail/icon_green.png'), '上客时间: ' + value.updateTime + ', 行程ID：' + value.meterTripId, value.meterTripId, value.recDate)
              this.markers.push(marker)
            }
            if (value.event === 'METER_OFF' || value.event === 'IN_HIRED_METER_OFF') {
              let marker = addMarkerPosition(value.gps, require('@/img/tripDetail/icon_red.png'), '下客时间: ' + value.updateTime + '，行程ID：' + value.meterTripId, value.meterTripId, value.recDate)
              this.markers.push(marker)
            }
          })
        }
        if (tripLineList.length) {
          tripLineList.map(value => {
            if (value.driverStatus === 'HIRED') {
              let polyline = drawTripLine(value.gpsList, '#6AA84F')
              this.polylines.push(polyline)
            }
            if (value.driverStatus === 'AVL' || value.driverStatus === 'PAY') {
              let polyline = drawTripLine(value.gpsList, '#0091FF')
              this.polylines.push(polyline)
            }
          })
        }
      } else {
        this.hubEventListObject = ''
      }
      this.isShowModal = true
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
    },
    async getTransHubPolygonArea() {
      const result = await get(END_POINTS.GET_TRANS_HUB_POLYGON_AREA, {
        hubCode: localStorage.getItem('hubCode')
      })
      if (result.code === 2001) {
        const areaListData = result.data
        this.polygons = []
        this.polygons.push({
          path: areaListData.monitorArea.pathGpsList,
          fillOpacity: 0.2, // 填充透明度
          fillColor: '#F8E71C',
          strokeColor: '#FF5252',
          strokeWeight: 4
        })
        areaListData.boardAreaList.forEach(value => {
          this.polygons.push({
            path: value.pathGpsList,
            fillOpacity: 0.3, // 填充透明度
            fillColor: '#096DD9',
            strokeColor: '#69F0AE',
            strokeWeight: 4
          })
        })
      }
      console.log(this.polygons)
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

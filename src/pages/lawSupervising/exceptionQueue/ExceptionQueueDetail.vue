<template>
  <div class="exception-queue-detail">
    <PairBreadcrumb parentPath="/anomaly/exceptionQueueHomePage"
                    parentTitle="异常排队"
                    :title="vehicleNo"/>
    <div class="exception-queue-detail-content">
      <div v-for="(detailObject, index) in hubSumListDetail" :key="`trailDetail__${index}`" class="trail-card">
        <div class="exception-queue-detail-group-title">
          <img src="../../../img/vehicle.png" class="icon-vehicle"/>
          <div class="group-vehicle-no">
            {{vehicleNo}}
          </div>
          <div class="group-date-str">
            {{detailObject.dateStr}}
          </div>
          <Button type="primary" v-if="showFocusBtn" style="float: right; margin-top: 12px;margin-right: 24px" @click="handleClick">{{isFocus ? '-关注' : '+关注'}}</Button>
        </div>
        <TableWrapper style="box-shadow:0px 4px 12px -4px rgba(168,176,185,0.5);">
          <Table :columns="columns"
                 :data="detailObject.list"
                 @on-row-click="doShowModal" highlight-row>
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
               :type="'cut'"
               :data="modalData"
               @on-visible-change="doCloseModal"/>
    <FocusModal :showFocusModal = 'showFocusModal'
                :vehicleNo = 'vehicleNo'
                @close-focus-modal="closeFocusModal"
                @go-search="isVehicleFocus">
    </FocusModal>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
import { dateFormat, getHubTrailTableArr, addMarkerPosition, drawTripLine } from '@/utils'
import TrailAMap from '@/components/anomaly/TrailAMap'
import FocusModal from '@/components/modal/focus/FocusModal'
const detail = require('@/img/common/detail.png')
export default {
  components: {
    TrailAMap,
    FocusModal
  },
  data() {
    return {
      showFocusModal: false,
      mobile: '',
      vehicleNo: '',
      startDate: '',
      endDate: '',
      hubSumListDetail: [],
      isShowModal: false,
      hubEventListObject: '',
      polygons: [],
      polylines: [],
      markers: [],
      isFocus: false,
      modalData: {}
    }
  },
  computed: {
    mainMenu() {
      return this.$store.state.permission.mainMenu
    },
    showFocusBtn() {
      return this.$store.state.permission.focusRule
    },
    hubCode() {
      return this.$store.state.hubCode
    },
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
          title: '等待时间(分钟)',
          key: 'timeWait'
        },
        {
          title: '平均等待时间(分钟)',
          key: 'avgTimeWait'
        },
        {
          title: this.$t('sysManage.commonVar.action'),
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            return h('Tooltip', {
              props: {
                content: '查看',
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
                  src: detail
                },
                on: {
                  click: () => {
                    this.doShowModal(params.row)
                  }
                }
              })
            ], '查看')
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
    this.$store.commit('updateHubCode', this.$route.query.hubCode)
    this.getHubStatTrailList()
    this.isVehicleFocus()
  },
  methods: {
    handleClick() {
      if (this.isFocus) {
        this.cancelFocus()
      } else {
        this.showFocusModal = true
      }
    },
    async getHubStatTrailList() {
      const result = await get(END_POINTS.GET_HUB_SUM_QCUT_LIST_DETAIL, {
        areaCode: localStorage.getItem('areaCode'),
        hubCode: this.hubCode,
        startDate: this.startDate,
        endDate: this.endDate,
        mobile: this.mobile,
        vehicleNo: this.vehicleNo,
        driverType: 'TAXI'
      })
      if (result.code === 2000) {
        this.hubSumListDetail = getHubTrailTableArr(result.data)
      }
    },
    doCloseModal(result) {
      this.isShowModal = result
    },
    closeFocusModal(result) {
      this.showFocusModal = result
    },
    async doShowModal(row) {
      this.modalData = row
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
    async getTransHubPolygonArea() {
      const result = await get(END_POINTS.GET_TRANS_HUB_POLYGON_AREA, {
        hubCode: this.hubCode
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
    },
    async cancelFocus() {
      const result = await get(END_POINTS.CANCEL_FOCUS, {
        vehicleNo: this.vehicleNo
      })
      if (result.code === 2000) {
        this.$Message.success({
          content: '成功取消关注！'
        })
        this.isVehicleFocus()
      }
    },
    async isVehicleFocus() {
      const result = await get(END_POINTS.IS_VEHICLE_FOCUS, {
        vehicleNo: this.vehicleNo
      })
      if (result.code === 2000) {
        this.isFocus = true
      } else this.isFocus = false
    },
    async focusVehicle() {
      const result = await get(END_POINTS.FOCUS_VEHICLE, {
        vehicleNo: this.vehicleNo,
        areaCode: 'CNSCA1',
        mobile: this.mobile
      })
      if (result.code === 2000) {
        this.$Message.success({
          content: '关注成功！'
        })
        this.isVehicleFocus()
      }
    }
  }
}
</script>

<style lang="less">
.exception-queue-detail {
  .exception-queue-detail-content {
    padding: 24px;
    .trail-card{
      margin-bottom: 24px;
    }
    .exception-queue-detail-group-title {
      line-height: 62px;
      background-color: #FFFFFF;
      color: #66758D;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      box-shadow:0px 4px 12px -4px rgba(168,176,185,0.5);
      .icon-vehicle {
        width: 32px;
        margin: 14px 20px;
        float: left;
      }

      .group-vehicle-no {
        display: inline-block;
        font-size: 20px;
        margin-left: -10px;
        font-weight: 600;
      }

      .group-date-str {
        display: inline-block;
        font-size: 16px;
        margin-left: 48px;
        font-weight:600;
        color: #A6ACBA;
      }
      .ivu-btn-primary {
        background:rgba(25,152,255,1);
        border-radius:18px;
        padding-left: 24px;
        padding-right: 24px
      }
    }
  }
}
</style>

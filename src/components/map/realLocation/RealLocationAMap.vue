<template>
  <Modal class="real-location-amap-modal"
         width="70"
         :footer-hide="true"
         :closable="false"
         :value="isShowModal"
         @on-visible-change="closeModal">
    <PairSpin :show="showSpin"/>
    <Row class="real-location-amap-modal-info">
      <Col span="6">
        <div>
          <span>车牌号：{{vehicleNo}}</span>
        </div>
        <div>
          <span>终端厂商：{{terminalName}}</span>
        </div>
      </Col>
      <Col span="10">
        <div>
          <span>公司：{{companyName}}</span>
        </div>
        <div>
          <span>最新gps时间：{{lastTime}}</span>
        </div>
      </Col>
    </Row>
    <el-amap ref="realLocationAmap"
             vid="realLocationAmap"
             style="height: 300px;"
             :amap-manager="mapManager"
             :zoom="zoom"
             :center="center"
             :plugin="plugins"
             :events="events">
      <el-amap-marker v-if="driverMarker"
                      :icon="driverMarker.icon"
                      :position="driverMarker.position"
                      :offset="[-15, -30]">
      </el-amap-marker>
    </el-amap>
  </Modal>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { AMAP_STYLE_NORMAL } from '@/constant'
import { get, END_POINTS } from '@/api'
import { drawTripLine } from '@/utils'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '7bfb1994e208f200c2cd63a626f74868',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Heatmap', 'AMap.MouseTool'],
  v: '1.4.10',
  uiVersion: '1.0.11'
})
const driverPositionBlue = require('@/img/driver/driver-position-blue.png')
const driverPositionGreen = require('@/img/driver/driver-position-green.png')

export default {
  props: {
    isShowModal: {
      type: Boolean,
      required: true
    },
    vehicleNo: {
      type: String,
      default: ''
    },
    terminalName: {
      type: String,
      default: ''
    },
    companyName: {
      type: String,
      default: ''
    }
  },
  data() {
    const mapManager = new VueAMap.AMapManager()
    return {
      mapManager,
      zoom: 12,
      center: [104.066143, 30.573095],
      plugins: ['Scale'],
      events: {
        'complete': () => { // 地图初始化完成
        },
        init: (map) => {
          // 设置地图的皮肤
          map.setMapStyle(AMAP_STYLE_NORMAL)
        }
      },
      showSpin: false,
      lastTime: '',
      driverMarker: null,
      intervalId: null
    }
  },
  watch: {
    isShowModal: 'isInitInterval'
  },
  methods: {
    closeModal(result) {
      if (!result) {
        this.lastTime = ''
        this.$emit('on-visible-change', result)
        if (this.intervalId) {
          clearInterval(this.intervalId)
        }
      }
    },
    isInitInterval() {
      if (this.isShowModal) {
        this.$nextTick(() => {
          this.getTrailInfoInterval(this.mapManager.getMap())
        })
      }
    },
    getTrailInfoInterval(map) {
      this.getTrailInfo(map) // 先执行一次请求
      this.intervalId = setInterval(() => { // 后面每15秒执行一次
        this.getTrailInfo(map)
      }, 15 * 1000)
    },
    async getTrailInfo(map) {
      this.showSpin = true
      const result = await get(END_POINTS.GET_LAST_TRAIL_LIST, {
        vehicleNo: this.vehicleNo,
        corrected: false,
        driverType: 'TAXI',
        lastTime: this.lastTime
      })
      if (result.code === 2000) {
        if (result.data.tripLineList && result.data.tripLineList.length) {
          // 车辆的轨迹
          result.data.tripLineList.map(item => {
            if (item.driverStatus === 'HIRED') {
              map.add(new AMap.Polyline(drawTripLine(item.gpsList, '#6AA84F')))
            } else if (item.driverStatus === 'AVL' || item.driverStatus === 'PAY') {
              map.add(new AMap.Polyline(drawTripLine(item.gpsList, '#0091FF')))
            }
          })
          // 司机的位置
          let icon = driverPositionBlue
          const driverStatus = result.data.tripLineList[result.data.tripLineList.length - 1].driverStatus
          if (driverStatus === 'HIRED') {
            icon = driverPositionGreen
          } else if (driverStatus === 'AVL' || driverStatus === 'PAY') {
            icon = driverPositionBlue
          }
          if (result.data.allGpsList && result.data.allGpsList.length) {
            this.driverMarker = {
              icon,
              position: result.data.allGpsList[result.data.allGpsList.length - 1]
            }
          }
          // 最近一个gps点的时间
          if (result.data.timeForGpsList && result.data.timeForGpsList.length) {
            this.lastTime = result.data.timeForGpsList[result.data.timeForGpsList.length - 1]
          }
          map.setFitView()
        }
      }
      this.showSpin = false
    }
  }
}
</script>

<style lang="less">
.real-location-amap-modal {
  .real-location-amap-modal-info {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px #E9E9E9 solid;
  }
}
</style>

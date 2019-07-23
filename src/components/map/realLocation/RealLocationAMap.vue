<template>
  <Modal class="real-location-amap-modal"
         :footer-hide="true"
         :closable="false"
         :value="isShowModal"
         @on-visible-change="closeModal">
    <PairSpin :show="showSpin"/>
    <div>
      <div>
        <span>车牌号：{{vehicleNo}}</span>
        <span>终端厂商：{{terminalName}}</span>
      </div>
      <div>
        <span>公司：{{companyName}}</span>
        <span>最新gps时间：{{lastTime}}</span>
      </div>
    </div>
    <Divider/>
    <el-amap ref="realLocationAmap"
             vid="realLocationAmap"
             style="height: 350px;"
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
import {
  get,
  END_POINTS
} from '@/api'

import { drawTripLine } from '@/utils'
import VueAMap from 'vue-amap'
import { AMAP_STYLE_NORMAL } from '@/constant'

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
      zoom: 11,
      center: [104.066143, 30.573095],
      plugins: ['Scale'],
      events: {
        'complete': () => { // 地图初始化完成
          let map = mapManager.getMap()
          this.getTrailInfoInterval(map)
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
  methods: {
    closeModal(result) {
      this.$emit('on-visible-change', result)
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
    },
    getTrailInfoInterval(map) {
      this.getTrailInfo(map); // 先执行一次请求
      this.intervalId = setInterval(() => { // 后面每15秒执行一次
        this.getTrailInfo(map);
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
          let icon = '../../../img/driver/driver-position-blue.png'
          const driverStatus = result.data.tripLineList[result.data.tripLineList.length - 1].driverStatus
          if (driverStatus === 'HIRED') {
            icon = '../../../img/driver/driver-position-green.png'
          } else if (driverStatus === 'AVL' || driverStatus === 'PAY') {
            icon = '../../../img/driver/driver-position-blue.png'
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
        }
      }
      this.showSpin = false
    }
  }
}
</script>

<style lang="less">
.real-location-amap-modal {
}
</style>

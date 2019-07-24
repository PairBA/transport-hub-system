<template>
  <Modal class="trail-amap"
         width="60"
         :footer-hide="true"
         :closable="false"
         :value="isShowModal"
         @on-visible-change="closeModal">
    <PairSpin :show="showSpin"/>
    <el-amap ref="map" vid="illegalBoardingAMap" style="height: 250px;" :zoom="zoom" :center="center" :amap-manager="mapManager" :events="events">
      <el-amap-marker v-for="(marker, index) in markers" :key="index+5" :position="marker.position" :icon="marker.icon" :title="marker.title" :vid="index" :events="marker.event" zIndex="100"></el-amap-marker>
      <el-amap-marker v-if="showSliderMarker" :position="sliderMarker.position" :icon="sliderMarker.icon" :title="sliderMarker.title" zIndex="99" ></el-amap-marker>
      <el-amap-polygon v-for="(polygon, index) in polygons" :key="`polygonTrail_${index}`" :path="polygon.path" :strokeColor="polygon.strokeColor" :strokeWeight="polygon.strokeWeight" strokeStyle="dashed" :fillOpacity="0"></el-amap-polygon>
    </el-amap>
    <Row v-if="isShowSlider" class="vehicle-trajectory-player-row">
      <Col span="1">
        <div @click="toggleReplay" class="vehicle-trajectory-player-btn">
          <Icon type="ios-play" :size="10" v-show="!sliderPlaying" color="white"></Icon>
          <Icon type="ios-pause" :size="10" v-show="sliderPlaying" color="white"></Icon>
        </div>
      </Col>
      <Col span="18" class="vehicle-trajectory-player-slider">
        <Slider v-model="sliderValue" :max="sliderMax"></Slider>
      </Col>
      <Col span="4" class="vehicle-trajectory-player-slidertime">
        <span>{{ sliderTime }}</span>
      </Col>
      <Col span="1" class="vehicle-trajectory-player-speed">
        <PlayerSpeed :playerSpeed="playerSpeed" @updatePlayerSpeed="updatePlayerSpeed"></PlayerSpeed>
      </Col>
    </Row>
  </Modal>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { AMAP_STYLE_NORMAL } from '@/constant'
import PlayerSpeed from '@/components/tripTrail/PlayerSpeed'
import { sleep } from '@/utils'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '7bfb1994e208f200c2cd63a626f74868',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Heatmap', 'AMap.MouseTool'],
  v: '1.4.10',
  uiVersion: '1.0.11'
})

export default {
  components: {
    PlayerSpeed
  },
  props: {
    isShowModal: {
      type: Boolean,
      required: true
    },
    markers: {
      type: Array,
      default: () => []
    },
    polygons: {
      type: Array,
      default: () => []
    },
    polylines: {
      type: Array,
      default: () => []
    },
    allGpsList: {
      type: Array,
      default: () => []
    },
    timeForGpsList: {
      type: Array,
      default: () => []
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
      polylinesCache: [],
      sliderValue: 0,
      playerSpeed: 1,
      sliderPlaying: false,
      isShowSlider: false
    }
  },
  computed: {
    showSliderMarker() {
      return this.allGpsList.length
    },
    sliderMax() {
      return this.allGpsList.length > 0 ? this.allGpsList.length - 1 : 0
    },
    sliderMarker() {
      return {
        position: this.allGpsList[this.sliderValue],
        icon: require('@/img/tripSharing/wtAndBdCar.png'),
        title: this.$t('monitor.hubTrailPlayer.driverLoc')
      }
    },
    sliderTime() {
      return this.timeForGpsList[this.sliderValue]
    }
  },
  watch: {
    polylines: 'renderPolylines',
    sliderPlaying: 'playSlider',
    allGpsList: 'showSlider',
    isShowModal: 'fit'
  },
  methods: {
    fit() {
      if (this.isShowModal) {
        this.$nextTick(() => {
          let map = this.mapManager.getMap()
          map.setFitView()
        })
      }
    },
    updatePlayerSpeed(value) {
      this.playerSpeed = value
    },
    toggleReplay() {
      this.sliderPlaying = !this.sliderPlaying
    },
    closeModal(result) {
      this.$emit('on-visible-change', result)
    },
    async playSlider() {
      while (this.sliderPlaying) {
        if (this.sliderValue >= this.sliderMax) {
          this.sliderPlaying = false
          this.sliderValue = 0
          break
        }
        this.sliderValue++
        let palerSpeed = 200 / this.playerSpeed
        await sleep(palerSpeed)
      }
    },
    showSlider() {
      if (this.allGpsList.length > 0) {
        this.isShowSlider = true
        // 如果所有gps的点发生变化，将播放条初始化
        if (this.sliderPlaying) {
          this.toggleReplay()
        }
        this.sliderValue = 0
      } else {
        this.isShowSlider = false
      }
    },
    renderPolylines() {
      let map = this.mapManager.getMap()
      map.remove(this.polylinesCache)
      this.polylinesCache = this.polylines.map(value => {
        return new AMap.Polyline(value)
      })
      map.add(this.polylinesCache)
      map.setFitView()
    }
  }
}
</script>

<style lang="less">
.trail-amap {
  .vehicle-trajectory-player-row {
    width: 100%;
    height: 40px;
  }
  .vehicle-trajectory-player-btn {
    width: 24px;
    height: 24px;
    padding: 3px;
    border-radius: 50%;
    background-color: rgba(168,170,183,1);
    margin: 8px auto;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  }
  .vehicle-trajectory-player-slider {
    margin-top: 4px;
  }
  .vehicle-trajectory-player-slidertime {
    text-align: center;
    padding: 10px;
    font-size: 14px;
    color: #333333;
  }
  .vehicle-trajectory-player-speed {
    margin-top: 10px;
  }
}
</style>

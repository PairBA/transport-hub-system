<template>
  <div class="vehicle-trajectory-amap-page">
    <div class="vehicle-trajectory-amap-container"  id="vehtAMap">
      <el-amap ref="vehtAMap"
               vid="vehtAMap"
               :amap-manager="lineManager"
               :plugin="plugin">
        <el-amap-marker v-if="showSliderMarker"
                        :position="sliderMarker.position"
                        :icon="sliderMarker.icon"
                        :title="sliderMarker.title"
                        zIndex="99">
        </el-amap-marker>
      </el-amap>
    </div>
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
  </div>
</template>

<script>
import PlayerSpeed from '@/components/tripTrail/PlayerSpeed'
import VueAMap from 'vue-amap'
import Vue from 'vue'
import { sleep } from '@/utils'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '7bfb1994e208f200c2cd63a626f74868',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Heatmap', 'AMap.Polyline'],
  v: '1.4.4'
})

export default {
  components: {
    PlayerSpeed
  },
  props: {
    tripStatusAndGpsInfo: {
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
    let lineManager = new VueAMap.AMapManager()
    return {
      lineManager,
      sliderValue: 0,
      playerSpeed: 1,
      sliderPlaying: false,
      isShowSlider: false,
      vehtPolylinesCache: [],
      plugin: ['Scale', 'ToolBar', 'PolyEditor']
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
        icon: './src/img/tripSharing/wtAndBdCar.png',
        title: this.$t('monitor.hubTrailPlayer.driverLoc')
      }
    },
    sliderTime() {
      return this.timeForGpsList[this.sliderValue]
    }
  },
  watch: {
    polylines: 'renderVehicleTripLine',
    sliderPlaying: 'playSlider',
    allGpsList: 'showSlider'
  },
  methods: {
    updatePlayerSpeed(value) {
      this.playerSpeed = value
    },
    toggleReplay() {
      this.sliderPlaying = !this.sliderPlaying
    },
    renderVehicleTripLine() {
      let aMap = this.lineManager.getMap()
      aMap.remove(this.vehtPolylinesCache)
      this.vehtPolylinesCache = this.polylines.map(value => {
        return new AMap.Polyline(value) // 循环构造polylines
      })
      aMap.add(this.vehtPolylinesCache)
      aMap.setFitView()
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
    }
  }
}
</script>

<style lang="less">
@import '../../theme/index.less';
.vehicle-trajectory-amap-page {
  .ivu-slider-bar {
    height: 6px;
  }
  .ivu-slider-wrap {
    height: 6px;
  }
  .vehicle-trajectory-amap-container {
    height: 480px;
  }
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
    margin-top: 1px;
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

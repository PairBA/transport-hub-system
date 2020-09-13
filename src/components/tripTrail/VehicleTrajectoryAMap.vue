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
    <div v-if="isShowSlider" class="vehicle-trajectory-player-row">
      <div @click="toggleReplay" class="vehicle-trajectory-player-btn">
        <Icon type="ios-play" :size="12" v-show="!sliderPlaying" color="white" style="vertical-align: top"></Icon>
        <Icon type="ios-pause" :size="12" v-show="sliderPlaying" color="white" style="vertical-align: top"></Icon>
      </div>
      <div class="vehicle-trajectory-player-slider">
        <Slider v-model="sliderValue" :max="sliderMax"></Slider>
      </div>
      <div class="vehicle-trajectory-player-slidertime">
        {{ sliderTime }}
      </div>
      <div class="vehicle-trajectory-player-speed">
        <PlayerSpeed :playerSpeed="playerSpeed" @updatePlayerSpeed="updatePlayerSpeed"></PlayerSpeed>
      </div>
    </div>
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
        icon: require('@/img/tripSharing/wtAndBdCar.png'),
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
.vehicle-trajectory-amap-page {
  .ivu-slider-bar {
    height: 6px;
  }
  .ivu-slider-wrap {
    height: 6px;
    background-color: #D8DEEB;
    border-radius:3px;
  }
  .vehicle-trajectory-amap-container {
    height: 480px;
  }
  .vehicle-trajectory-player-row {
    width: 100%;
    height: 40px;
    display: flex;
    background-color: rgba(131,184,244,0.2);
    margin-top: 12px;
    padding-right: 12px;
    padding-left: 12px;
  }
  .vehicle-trajectory-player-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 6px;
    background:linear-gradient(270deg,rgba(23,149,255,1) 0%,rgba(82,211,255,1) 100%);
    box-shadow:0px 1px 4px 0px rgba(43,164,255,0.5);
    margin: auto 12px auto 0;
    text-align: center;
    cursor: pointer;
  }
  .vehicle-trajectory-player-slider {
    width: 75%;
  }
  .vehicle-trajectory-player-slidertime {
    text-align: center;
    line-height: 40px;
    margin-left: 12px;
    font-size: 16px;
    color: rgba(134,144,153,1);
  }
  .vehicle-trajectory-player-speed {
    margin: auto;
  }
}
</style>

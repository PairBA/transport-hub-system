<template>
  <div class="meter-trip-search-amap" id="tripSearchAMap">
    <el-amap ref="meterTripSearchAmap"
             vid="meterTripSearchAmap"
             :center="amapCenter"
             :zoom="amapZoom"
             :events="events"
             :amap-manager="aMapManager"
             :plugin="plugins">
      <el-amap-rectangle vid="orgRetangle"
                         ref="orgRetangle"
                         v-if="orgRetangle.bounds.length"
                         :bounds="orgRetangle.bounds"
                         :fill-color="orgRetangle.fillColor"
                         :fill-opacity="0.4"
                         :stroke-color="orgRetangle.strokeColor">
      </el-amap-rectangle>
      <el-amap-rectangle vid="destRetangle"
                         ref="destRetangle"
                         v-if="destRetangle.bounds.length"
                         :bounds="destRetangle.bounds"
                         :fill-color="destRetangle.fillColor"
                         :fill-opacity="0.4"
                         :stroke-color="destRetangle.strokeColor">
      </el-amap-rectangle>
      <el-amap-marker v-for="(marker, index) in meterTripMarkers"
                      :key="`${index} + 'mtsamap'`"
                      :position="marker.position"
                      :icon="marker.icon"
                      :title="marker.title"
                      :vid="index">
      </el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
import { AMAP_STYLE_NORMAL } from '@/constant'
import Vue from 'vue'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '7bfb1994e208f200c2cd63a626f74868',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Heatmap', 'AMap.Polyline'],
  v: '1.4.4'
})
export default {
  data() {
    const aMapManager = new VueAMap.AMapManager()
    return {
      aMapManager,
      amapZoom: 11,
      amapCenter: [104.067108, 30.652374],
      events: {
        'complete': () => {
          this.initAutocomplete()
        },
        init: (map) => {
          // 设置地图的皮肤
          map.setMapStyle(AMAP_STYLE_NORMAL)
        }
      },
      plugins: ['Scale'],
      meterTripLineCache: '',
      orgMarker: '',
      destMarker: ''
    }
  },
  computed: {
    areaName() {
      return this.$store.state.meterTripSearch.areaName
    },
    gpsStepList() {
      return this.$store.state.meterTripSearch.gpsStepList
    },
    orgRetangle() {
      return this.$store.state.meterTripSearch.orgRetangle
    },
    destRetangle() {
      return this.$store.state.meterTripSearch.destRetangle
    },
    meterTripMarkers: {
      get() {
        return this.$store.state.meterTripSearch.gpsListForAMap.markers
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMeterTripMarkers', value)
      }
    },
    meterTripLine() {
      return this.$store.state.meterTripSearch.gpsListForAMap.polylines
    },
    mtsOrgLocGps: {
      get() {
        return this.$store.state.meterTripSearch.mtsOrgLocGps
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMtsOrgLocGps', value)
      }
    },
    mtsOrgLocName: {
      get() {
        return this.$store.state.meterTripSearch.mtsOrgLocName
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateSearchOrgLocName', value)
      }
    },
    mtsDestLocGps: {
      get() {
        return this.$store.state.meterTripSearch.mtsDestLocGps
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMtsDestLocGps', value)
      }
    },
    mtsDestLocName: {
      get() {
        return this.$store.state.meterTripSearch.mtsDestLocName
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateSearchDestLocName', value)
      }
    },
    orgBounds: {
      get() {
        return this.$store.state.meterTripSearch.orgRetangle.bounds
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateOrgRetangleBounds', value)
      }
    },
    destBounds: {
      get() {
        return this.$store.state.meterTripSearch.destRetangle.bounds
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateDestRetangleBounds', value)
      }
    }
  },
  watch: {
    areaName: 'initInputPlugin',
    meterTripLine: 'renderMeterTripLine',
    mtsOrgLocName: 'doSomething',
    mtsDestLocName: 'doSomething'
  },
  methods: {
    doSomething() {
      if (!this.mtsOrgLocName) {
        this.clearOrgMaker()
      }
      if (!this.mtsDestLocName) {
        this.clearDestMaker()
      }
    },
    initInputPlugin() {
      this.initAutocomplete() // 地理位置自动搜索
    },
    renderMeterTripLine() {
      let map = this.aMapManager.getMap()
      if (this.meterTripLineCache) {
        map.remove(this.meterTripLineCache)
      }
      if (this.meterTripLine) {
        this.meterTripLineCache = new AMap.Polyline(this.meterTripLine)
        map.add(this.meterTripLineCache)
        map.setFitView()
      }
    },
    initAutocomplete() {
      AMap.plugin(['AMap.Autocomplete'], () => {
        const autoOptions = {
          city: this.areaName,
          citylimit: true,
          input: 'mtsOrgLocName'
        }
        const autoInput = new AMap.Autocomplete(autoOptions)
        AMap.event.addListener(autoInput, 'select', (e) => {
          this.mtsOrgLocName = e.poi.name
          this.mtsOrgLocGps = [e.poi.location.lng, e.poi.location.lat]
          this.amapCenter = [e.poi.location.lng, e.poi.location.lat]
          this.amapZoom = 11
          // 根据中心点计算格子的边界
          this.orgBounds = this.computePolygonsByCenter(this.mtsOrgLocGps)
          // 根据中心点添加上客点marker
          this.addOrgMarker(this.mtsOrgLocGps)
        })
      })
      AMap.plugin(['AMap.Autocomplete'], () => {
        const autoOptions = {
          city: this.areaName,
          citylimit: true,
          input: 'mtsDestLocName'
        }
        const autoInput = new AMap.Autocomplete(autoOptions)
        AMap.event.addListener(autoInput, 'select', (e) => {
          this.mtsDestLocName = e.poi.name
          this.mtsDestLocGps = [e.poi.location.lng, e.poi.location.lat]
          this.amapCenter = [e.poi.location.lng, e.poi.location.lat]
          this.amapZoom = 11
          // 根据中心点计算格子的边界
          this.destBounds = this.computePolygonsByCenter(this.mtsDestLocGps)
          // 根据中心点添加下客点marker
          this.addDestMarker(this.mtsDestLocGps)
        })
      })
    },
    computePolygonsByCenter(centerGps) {
      let lngStep = 0.0234 // 经度默认边长系数（深圳步长）
      let latStep = 0.0162 // 纬度默认边长系数（深圳步长）
      if (this.gpsStepList.length) { // 如果从数据库中得到了步长，设置为数据库中的值
        this.gpsStepList.forEach(item => {
          if (item.codeName === 'LNG_STEP') {
            lngStep = Number.parseFloat(item.codeValue)
          } else if (item.codeName === 'LAT_STEP') {
            latStep = Number.parseFloat(item.codeValue)
          }
        })
      }
      let centerLng = centerGps[0] // 中心点经度
      let centerLat = centerGps[1] // 中心点纬度
      let gpsLb = [centerLng - lngStep / 2, centerLat - latStep / 2] // 左下角的点
      let gpsRt = [centerLng + lngStep / 2, centerLat + latStep / 2] // 右上角的点
      return [gpsLb, gpsRt]
    },
    addOrgMarker(orgGps) {
      let map = this.aMapManager.getMap()
      this.clearOrgMaker() // 先清除marker，再添加
      let icon = new AMap.Icon({
        size: new AMap.Size(24, 24), // 图标尺寸
        image: require('@/img/meterTrip/pick-up-area.png'), // Icon的图像
        imageSize: new AMap.Size(24, 24) // 根据所设置的大小拉伸或压缩图片
      })
      this.orgMarker = new AMap.Marker({
        icon: icon, // 自定义点标记
        position: orgGps, // 基点位置
        offset: new AMap.Pixel(-12, -24) // 设置点标记偏移量
      })
      map.add(this.orgMarker)
    },
    addDestMarker(destGps) {
      let map = this.aMapManager.getMap()
      this.clearDestMaker() // 先清除marker，再添加
      let icon = new AMap.Icon({
        size: new AMap.Size(24, 24), // 图标尺寸
        image: require('@/img/meterTrip/drop-off-area.png'), // Icon的图像
        imageSize: new AMap.Size(24, 24) // 根据所设置的大小拉伸或压缩图片
      })
      this.destMarker = new AMap.Marker({
        icon: icon, // 自定义点标记
        position: destGps, // 基点位置
        offset: new AMap.Pixel(-12, -24) // 设置点标记偏移量
      })
      map.add(this.destMarker)
    },
    clearOrgMaker() {
      if (this.orgMarker) {
        this.orgMarker.setMap(null)
        this.orgMarker = ''
      }
    },
    clearDestMaker() {
      if (this.destMarker) {
        this.destMarker.setMap(null)
        this.destMarker = ''
      }
    },
    isAddMarker() { // 判断是否初始化上下课点的marker
      if (this.mtsOrgLocGps.length) {
        // 根据中心点添加上客点marker
        this.addOrgMarker(this.mtsOrgLocGps)
      }
      if (this.mtsDestLocGps.length) {
        // 根据中心点添加下客点marker
        this.addDestMarker(this.mtsDestLocGps)
      }
    }
  },
  mounted() {
    this.meterTripLineCache = ''
    this.meterTripMarkers = []
  }
}
</script>

<style lang="less">
@import '../../theme/index.less';
.meter-trip-search-amap {
  height: 600px;
}
</style>

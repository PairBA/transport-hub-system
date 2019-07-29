<template>
    <div class="vehicle-trajectory-home-page">
      <ContentLayout :showSpin="showSpin">
        <VehicleTrajectoryAMap :tripStatusAndGpsInfo="tripStatusAndGpsInfo"
                               :polylines="polylines"
                               :allGpsList="allGpsList"
                               :timeForGpsList="timeForGpsList">
        </VehicleTrajectoryAMap>
      </ContentLayout>
    </div>
</template>

<script>
import VehicleTrajectoryAMap from '@/components/tripTrail/VehicleTrajectoryAMap'
export default {
  components: {
    VehicleTrajectoryAMap
  },
  computed: {
    tripStatusAndGpsInfo() {
      return this.$store.state.search.vehTraObj.tripStatusAndGpsInfo
    },
    polylines() {
      return this.$store.state.search.vehTraObj.polylines
    },
    allGpsList() {
      return this.$store.state.search.vehTraObj.allGpsList
    },
    timeForGpsList() {
      return this.$store.state.search.vehTraObj.timeForGpsList
    },
    showSpin: {
      get() {
        return this.$store.state.search.showSpin
      },
      set(value) {
        this.$store.commit('search/updateShowSpin', value)
      }
    }
  }
}
</script>

<style lang="less">
.vehicle-trajectory-home-page {
}
</style>

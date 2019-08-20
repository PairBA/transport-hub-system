<template>
  <div class="capacity-scheduling__homePage">
    <PairBreadcrumb :title="title"/>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$route.name
    }
  },
  mounted() {
    // this.$store.dispatch('capacityScheduling/loadEstChartInScreen')
  },
  methods: {}
}
</script>

<style lang="less">
.capacity-scheduling__homePage {
}
</style>

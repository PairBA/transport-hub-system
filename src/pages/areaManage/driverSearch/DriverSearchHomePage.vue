<template>
  <div class="driver-search-home-page">
    <ContentLayout :showSpin="showSpin">
      <h2>待开发...</h2>
    </ContentLayout>
  </div>
</template>

<script>
export default {
  computed: {
    showSpin: {
      get() {
        return this.$store.state.search.showSpin
      },
      set(value) {
        this.$store.commit('search/updateShowSpin', value)
      }
    }
  },
  mounted() {
    this.$store.dispatch('getCompListForSelect')
  }
}
</script>

<style lang="less">
.driver-search-home-page {
}
</style>

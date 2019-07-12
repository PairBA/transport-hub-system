<template>
  <div v-html="iconSvg"></div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      iconSvg: ''
    }
  },
  async mounted () {
    const icon = await import(`./svgs/${this.type}.svg`)
    this.iconSvg = icon.default
  }
}
</script>

<template>
  <Dropdown class="player-speed-dropdown" trigger="click" placement="top"
            @on-click="updatePlayerSpeed">
    <a href="javascript:void(0)" class="speed-dropdown-title">
      {{ showContent }}
    </a>
    <DropdownMenu slot="list">
      <DropdownItem name="1">1.0X</DropdownItem>
      <DropdownItem name="2">2.0X</DropdownItem>
      <DropdownItem name="3">3.0X</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
export default {
  props: {
    playerSpeed: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      speed: 0
    }
  },
  computed: {
    showContent() {
      if (this.playerSpeed === 1 && this.speed !== 1) {
        return this.$t('monitor.hubTrailPlayer.speed')
      } else {
        return this.playerSpeed + 'X'
      }
    }
  },
  methods: {
    updatePlayerSpeed(playerSpeed) {
      this.$emit('updatePlayerSpeed', parseFloat(playerSpeed))
    }
  },
  mounted() {
    this.speed = 0
  }
}
</script>

<style lang="less">
.player-speed-dropdown {
  .ivu-select-dropdown {
    color:rgba(153,153,153,0.6);
    width: 50px;
  }
  .ivu-dropdown-item {
    color:rgba(153,153,153,0.6);
    padding: 6px 10px;
    width: 50px;
  }
  .ivu-dropdown-item:hover {
    color:rgba(51,51,51,1);
    font-weight: bold;
    width: 50px;
  }
  .speed-dropdown-title {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>

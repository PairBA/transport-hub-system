<template>
  <div class="system__spin">
    <Spin v-if="show"
          fix
          size="large">
      <svg class="circular"
           viewBox="25 25 50 50">
        <circle class="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke-width="5"
                stroke-miterlimit="10">
        </circle>
      </svg>
      <div>
        {{ $t('sysManage.toolBar.loading') }}
      </div>
    </Spin>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      require: true,
      default: () => {
        return false
      }
    }
  }
}
</script>

<style lang="less" >
@import '../../theme/index.less';
.system__spin {
  .ivu-spin-fix {
    background-color: transparent;
    & .ivu-spin-main {
      width: @system__spin-width;
      height: @system__spin-width;
      padding: @system__spin-padding;
      background-color: @system__spin-background-color;
    }
  }
  .ivu-spin-show-text .ivu-spin-text {
    color: #FFF;
    font-size: @system__spin-font-size;
    letter-spacing: 1px
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 130, 200;
      stroke-dashoffset: -50px;
    }
    100% {
      stroke-dasharray: 130, 200;
      stroke-dashoffset: -188px;
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .circular {
    width: @system__spin-circular-width;
    height: @system__spin-circular-width;
    animation: rotate 2s linear infinite;
  }
  .path {
    stroke: @system__spin-color;
    fill: none;
    animation: dash 1.5s linear infinite;
  }
}
</style>

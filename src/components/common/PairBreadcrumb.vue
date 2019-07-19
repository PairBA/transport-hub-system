<template>
  <div class="system-breadcrumb">
    <Breadcrumb separator=">">
      <BreadcrumbItem v-if="parentPath" :to="parentPath">
      <span @click="activePath">
        {{ parentTitle }}
      </span>
      </BreadcrumbItem>
      <BreadcrumbItem>
        {{ title }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    parentPath: {
      type: String,
      require: true,
      default: () => {
        return ''
      }
    },
    parentTitle: {
      type: String,
      require: true,
      default: () => {
        return ''
      }
    },
    title: {
      type: String,
      require: true,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    activePath() {
      // 切换回主页面时，需要激活主页的菜单
      this.$store.commit('permission/updateActivePath', this.parentPath)
    }
  }
}
</script>

<style lang="less">
.system-breadcrumb {
  padding: 16px 32px;
  background-color: #FFFFFF;
  .ivu-breadcrumb {
    font-size: 16px;
  }
  .ivu-breadcrumb-item-separator {
    color: #979797;
  }
  .ivu-breadcrumb a {
    &:hover {
      color: #1890FF;
      font-weight: 500;
    }
    color: rgba(24, 144, 255, 0.6);
  }
}
</style>

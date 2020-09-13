<template>
  <div class="table-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="less">
@import '../../theme/customized.less';

.table-wrapper{
  &:extend(.content__card);
  padding:@layout__padding;
  /* 重写表格样式 start */
  .ivu-table-wrapper {
    position: unset !important;
  }
  .ivu-table:after{
    width: 0;
  }
  .ivu-table:before {
    height: 0;
  }
  .ivu-table {
    border-radius: 2px;
  }
  .ivu-table-header {
    color: #A6ACBA;
  }
  .ivu-table-wrapper {
    position: static;
    border: none;
  }
  .ivu-table-cell {
    width: 100%;
    .ivu-tooltip {
      width: 100%;
      .ivu-tooltip-rel {
        vertical-align: bottom;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow-x: hidden;
      }
    }
  }
  /* 重写表格样式 end */
}
</style>

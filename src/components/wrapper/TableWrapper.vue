<template>
  <div class="table-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="less">
@import '../../theme/index.less';

.table-wrapper{
  &:extend(.content__card);
  padding:@layout__padding;
  .ivu-table:after{
    width: 0;
  }

  .ivu-table:before{
    height: 0;
  }

  .ivu-table{
    border-radius: 6px;
  }

  .ivu-table-wrapper{
    position: static;
    border: none;
  }
}
</style>

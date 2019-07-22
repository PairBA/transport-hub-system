<template>
  <div class="search-wrapper">
    <slot></slot>
  </div>
</template>
<style lang="less">
@import '../../theme/index.less';

.search-wrapper{
  margin-bottom: @layout__padding;
  padding-top: @layout__padding;
  .ivu-form .ivu-form-item-label{
    font-size: 14px;
    font-weight: 600;
  }
  .ivu-form {
    width: 50%;
    margin: auto;
  }
  .ivu-btn {
    padding: 5px 24px;
    font-size: 14px;
  }

  .ivu-input-wrapper{
    width: 200px;
  }
  .ivu-select{
    width: 200px;
  }
  .ivu-select-item-selected.ivu-select-item-focus{
    background-color: #FFFFFF;
    color: #495060;
  }
}
</style>

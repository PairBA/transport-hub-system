<template>
  <div class="footer">
    <Footer>{{subTitle}} - {{mainTitle}} 技术支持： 成都湃尔智芯科技有限公司</Footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainTitle: localStorage.getItem('systemName'),
      subTitle: localStorage.getItem('hubName')
    }
  }
}
</script>

<style lang="less" scoped>
.footer{
  .ivu-layout-footer {
    padding: 0;
    text-align: center;
    line-height: 30px;
    background-color: rgba(216,222,235,1);
    font-weight:500;
    color:rgba(102,117,141,1);
  }
}
</style>

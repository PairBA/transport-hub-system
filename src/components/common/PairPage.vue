<template>
  <div class="pair-page">
    <div v-if="size === 'small'">
      <Page class="page-content"
            size="small"
            simple
            :id="id"
            :total="total"
            :current="current"
            :page-size="pageSize"
            @on-change="onChange"
            @on-page-size-change="onPageSizeChange">
      </Page>
    </div>
    <div v-else>
      <div class="page-button">
        <Button size="small"
                @click="goElevatorPage">
          {{ $t('sysManage.toolBar.jump') }}
        </Button>
      </div>
      <Page class="page-content"
            show-total
            show-sizer
            show-elevator
            :id="id"
            :total="total"
            :current="current"
            :page-size="pageSize"
            @on-change="onChange"
            :page-size-opts="[10, 50, 100, 500]"
            @on-page-size-change="onPageSizeChange">
      </Page>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    size: {
      type: String,
      default: null
    }
  },
  methods: {
    onChange(currentPage) {
      this.$emit('on-change', currentPage)
    },
    onPageSizeChange(pageSize) {
      this.$emit('on-page-size-change', pageSize)
    },
    goElevatorPage() {
      let evtObj = ''
      let thisPage = document.getElementById(this.id)
      let elevatorDiv = thisPage.getElementsByClassName('ivu-page-options-elevator')
      if (elevatorDiv && elevatorDiv.length) {
        let pageInput = elevatorDiv[0].getElementsByTagName('input')[0]
        evtObj = document.createEvent('UIEvents')
        evtObj.initUIEvent('keyup', true, true, window, 1)
        delete evtObj.keyCode
        if (typeof evtObj.keyCode === 'undefined') {
          Object.defineProperty(evtObj, 'keyCode', { value: 13 })
        } else {
          evtObj.key = String.fromCharCode(13)
        }
        pageInput.dispatchEvent(evtObj)
      }
    }
  }
}
</script>

<style lang="less">
.pair-page {
  margin-right: 20px;
  overflow: hidden;

  .ivu-btn {
    min-width: auto!important;
  }

  .page-button {
    float: right;
    margin-top: 20px;
    margin-left: 10px;
    line-height: 32px;
  }

  .page-content {
    float: right;
    margin-top: 20px;
  }
}
</style>

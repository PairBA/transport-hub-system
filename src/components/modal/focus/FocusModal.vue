<template>
  <Modal class="focus-modal"
         width="360"
         :mask-closable="false"
         :value="showFocusModal"
         @on-visible-change="closeModal">
    <p slot="header"
       class="focus-modal-title">
      <span>加入重点关注</span>
    </p>
    <div style="font-size: 16px;font-weight: bold;">
      <div style="margin-bottom: 12px;">
        <span>车牌号码：{{vehicleNo}}</span>
      </div>
      <div>
        <div>备注：</div>
        <div>
          <Input v-model="remark"
                 type="textarea"
                 :rows="2"
                 placeholder="请输入备注" />
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button type="primary"
              size="large"
              long
              :loading="focusLoading"
              @click="confirmFocus">
        确定
      </Button>
    </div>
  </Modal>
</template>

<script>
import { get, END_POINTS } from '@/api'
export default {
  props: {
    showFocusModal: {
      type: Boolean,
      required: true
    },
    vehicleNo: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      focusLoading: false,
      remark: ''
    }
  },
  methods: {
    closeModal(result) {
      if (!result) {
        this.remark = ''
        this.$emit('close-focus-modal', result)
      }
    },
    async confirmFocus() {
      this.focusLoading = true
      const result = await get(END_POINTS.FOCUS_VEHICLE, {
        areaCode: localStorage.getItem('areaCode'),
        vehicleNo: this.vehicleNo,
        remark: this.remark
      })
      if (result.code === 2000) {
        this.$emit('go-search')
        this.closeModal(false) // fase 为关闭
        this.$Message.success({
          content: '关注成功！'
        })
      }
      this.focusLoading = false
    }
  }
}
</script>

<style lang="less">
.focus-modal {
  .focus-modal-title {
    text-align: center;
    font-size: 24px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
  }
}
</style>

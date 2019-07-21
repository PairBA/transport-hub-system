<template>
  <div class="schedule__add">
    <Form>
      <FormItem label="班次名称:">
        <Input v-model="scheduleName" placeholder="请输入班次名称"/>
      </FormItem>
      <FormItem label="开始时间:">
        <TimePicker type="time" v-model="startTime" placeholder="请输入开始时间"></TimePicker>
      </FormItem>
      <FormItem label="结束时间:">
        <TimePicker type="time" v-model="endTime" placeholder="请输入结束时间"></TimePicker>
      </FormItem>
      <Button type="primary"
              @click="submit">
        提交
      </Button>
    </Form>
  </div>
</template>

<script>
import {
  post,
  END_POINTS
} from '@/api'
export default {
  data() {
    return {
      scheduleName: '',
      startTime: '',
      endTime: ''
    }
  },
  methods: {
    async submit() {
      const result = await post(END_POINTS.ADD_SCHEDULE, {
        scheduleName: this.scheduleName,
        startTime: this.startTime,
        endTime: this.endTime
      })
      if (result.code === 2000) {
        this.$Message.success({
          content: this.$t('monitor.success')
        })
        this.$router.push({ name: '班次时间' })
      }
    }
  }
}
</script>

<style lang="less">
.schedule__add{

}

</style>

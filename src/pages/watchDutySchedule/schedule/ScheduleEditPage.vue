<template>
  <div class="schedule__edit">
    <Form>
      <FormItem label="班次名称:">
        <Input v-model="scheduleName" placeholder="请输入班次名称"/>
      </FormItem>
      <FormItem label="开始时间:">
        <TimePicker type="time" v-model="startTime" format="HH:mm" placeholder="请输入开始时间"></TimePicker>
      </FormItem>
      <FormItem label="结束时间:">
        <TimePicker type="time" v-model="endTime" format="HH:mm" placeholder="请输入结束时间"></TimePicker>
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
  get,
  END_POINTS
} from '@/api'
import {
  dateFormat
} from '@/utils'
export default {
  data() {
    return {
      id: '',
      scheduleName: '',
      startTime: '',
      endTime: ''
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getScheduleById(this.id)
  },
  methods: {
    async submit() {
      this.editSchedule()
    },
    async getScheduleById(id) {
      const result = await get(END_POINTS.GET_SCHEDULE_BY_ID + `?scheduleId=${id}`)
      if (result.code === 2000) {
        const { scheduleName, startTime, endTime } = result.data
        this.scheduleName = scheduleName
        this.startTime = new Date(dateFormat(new Date(), 'yyyy-MM-dd') + ' ' + startTime + ':00')
        this.endTime = new Date(dateFormat(new Date(), 'yyyy-MM-dd') + ' ' + endTime + ':00')
      }
    },
    async editSchedule() {
      const result = await post(END_POINTS.EDIT_SCHEDULE, {
        id: this.id,
        scheduleName: this.scheduleName,
        startTime: this.startTime,
        endTime: this.endTime
      })
      if (result.code === 2000) {
        this.$Message.success({
          content: this.$t('monitor.success')
        })
      }
    }
  }
}
</script>

<style lang="less">
.schedule__edit{

}

</style>

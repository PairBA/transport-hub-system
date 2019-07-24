<template>
  <div class="schedule__edit">
    <SearchWrapper>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <FormItem label="班次名称:" prop="scheduleName">
          <Input v-model="formValidate.scheduleName" placeholder="请输入班次名称"/>
        </FormItem>
        <FormItem label="开始时间:" prop="startTime">
          <TimePicker type="time" format="HH:mm" v-model="formValidate.startTime" placeholder="请输入开始时间"></TimePicker>
        </FormItem>
        <FormItem label="结束时间:" prop="endTime">
          <TimePicker type="time" format="HH:mm" v-model="formValidate.endTime" placeholder="请输入结束时间"></TimePicker>
        </FormItem>
        <div style="text-align: center">
          <Button type="primary"
                  @click="handleSubmit('formValidate')">
            提交
          </Button>
        </div>
      </Form>
    </SearchWrapper>
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
import SearchWrapper from '@/components/wrapper/SearchWrapper'
export default {
  components: {
    SearchWrapper
  },
  data() {
    return {
      id: '',
      formValidate: {
        scheduleName: '',
        startTime: '',
        endTime: ''
      },
      ruleValidate: {
        scheduleName: [
          { required: true, message: '班次名称不能为空', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getScheduleById(this.id)
  },
  methods: {
    async handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.editSchedule()
        } else {
          this.$Message.error('失败')
        }
      })
    },
    async getScheduleById(id) {
      const result = await get(END_POINTS.GET_SCHEDULE_BY_ID + `?scheduleId=${id}`)
      if (result.code === 2000) {
        const { scheduleName, startTime, endTime } = result.data
        this.formValidate.scheduleName = scheduleName
        this.formValidate.startTime = new Date(dateFormat(new Date(), 'yyyy-MM-dd') + ' ' + startTime + ':00')
        this.formValidate.endTime = new Date(dateFormat(new Date(), 'yyyy-MM-dd') + ' ' + endTime + ':00')
      }
    },
    async editSchedule() {
      const result = await post(END_POINTS.EDIT_SCHEDULE, {
        id: this.id,
        scheduleName: this.formValidate.scheduleName,
        startTime: this.formValidate.startTime,
        endTime: this.formValidate.endTime
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
  .ivu-form {
    width: 25%;
  }
}

</style>

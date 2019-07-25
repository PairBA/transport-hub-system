<template>
  <div class="schedule__edit">
    <PairBreadcrumb parentPath="/watchDutySchedule/scheduleHomePage"
                    parentTitle="班次时间"
                    title="编辑班次"/>
    <div class="schedule__edit-content">
      <div class="schedule__edit-content-wrapper">
        <div class="schedule__edit-form-wrapper">
          <Form ref="formValidate"
                label-position="top"
                :model="formValidate"
                :rules="ruleValidate">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post, get, END_POINTS } from '@/api'
import { dateFormat } from '@/utils'
export default {
  components: {},
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
.schedule__edit {
  .schedule__edit-content {
    padding: 24px;

    .schedule__edit-content-wrapper {
      padding: 24px;
      width: 100%;
      background-color: #FFFFFF;
      border-radius: 2px;

      .schedule__edit-form-wrapper {
        width: 200px;
        margin: 0 auto;

        .ivu-date-picker {
          width: 100%;
        }
      }
    }
  }
}

</style>

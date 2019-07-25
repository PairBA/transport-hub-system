<template>
  <div class="schedule__add">
    <PairBreadcrumb parentPath="/watchDutySchedule/scheduleHomePage"
                    parentTitle="班次时间"
                    title="新增班次"/>
    <div class="schedule__add-content">
      <div class="schedule__add-content-wrapper">
        <div class="schedule__add-form-wrapper">
          <Form ref="formValidate"
                label-position="top"
                :model="formValidate"
                :rules="ruleValidate">
            <FormItem label="班次名称:" prop="scheduleName">
              <Input v-model="formValidate.scheduleName" placeholder="请输入班次名称"/>
            </FormItem>
            <FormItem label="开始时间:" prop="startTime">
              <TimePicker type="time" format="HH:mm" @on-change="handleChange" v-model="formValidate.startTime" placeholder="请输入开始时间"></TimePicker>
            </FormItem>
            <FormItem label="结束时间:" prop="endTime">
              <TimePicker type="time" :format="format" @on-change="handleChange" v-model="formValidate.endTime" placeholder="请输入结束时间"></TimePicker>
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
import { post, END_POINTS } from '@/api'
export default {
  components: {},
  data() {
    return {
      format: 'HH:mm',
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
  methods: {
    async handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const result = await post(END_POINTS.ADD_SCHEDULE, {
            scheduleName: this.formValidate.scheduleName,
            startTime: this.formValidate.startTime,
            endTime: this.formValidate.endTime.length > 5 ? this.formValidate.endTime.substring(3) : this.formValidate.endTime
          })
          if (result.code === 2000) {
            this.$Message.success({
              content: this.$t('monitor.success')
            })
            this.$router.push({ name: '班次时间' })
          }
        }
      })
    },
    handleChange() {
      let endTime = this.formValidate.endTime
      if (endTime.length > 5) endTime = endTime.substring(3)
      if (endTime < this.formValidate.startTime) {
        this.format = '次日 HH:mm'
      } else this.format = 'HH:mm'
    }
  }
}
</script>

<style lang="less">
.schedule__add{
  .schedule__add-content {
    padding: 24px;

    .schedule__add-content-wrapper {
      padding: 24px;
      width: 100%;
      background-color: #FFFFFF;
      border-radius: 2px;

      .schedule__add-form-wrapper {
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

<template>
  <div class="schedule_homePage">
    <Button type="primary"
            @click="addSchedule">
      新增班次
    </Button>
    <Table :columns="columns"
           :data="scheduleList">
    </Table>
  </div>
</template>

<script>
import {
  get,
  END_POINTS
} from '@/api'
export default {
  data() {
    return {
      scheduleList: []
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '班次名称',
          key: 'scheduleName'
        },
        {
          title: '班次时间',
          key: 'startTime',
          render: (h, params) => {
            const startTime = params.row.startTime
            const endTime = params.row.endTime
            return h('span', startTime + '-' + endTime)
          }
        },
        {
          title: this.$t('sysManage.commonVar.action'),
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.goToDelete(params.row.id)
                  }
                }
              }, '删除'),
              h('span', {
                style: {
                  cursor: 'pointer',
                  marginLeft: '12px'
                },
                on: {
                  click: () => {
                    this.goToEdit(params.row.id)
                  }
                }
              }, '修改')
            ])
          }
        }
      ]
    }
  },
  mounted() {
    this.getScheduleList()
  },
  methods: {
    addSchedule() {
      this.$router.push({ name: '新增班次' })
    },
    async goToDelete(id) {
      const result = await get(END_POINTS.DELETE_SCHEDULE_BY_ID + `?scheduleId=${id}`)
      if (result.code === 2000) {
        this.$Message.success({
          content: this.$t('monitor.success')
        })
        this.getScheduleList()
      }
    },
    goToEdit(id) {
      this.$router.push({ name: '编辑班次', query: { id } })
    },
    async getScheduleList() {
      const result = await get(END_POINTS.GET_SCHEDULE_LIST)
      if (result.code === 2000) this.scheduleList = result.data
    }
  }
}
</script>

<style lang="less">
.schedule_homePage {}
</style>

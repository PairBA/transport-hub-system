<template>
  <div class="schedule_homePage">
    <TableWrapper>
      <Button type="primary"
              style="margin-bottom: 12px"
              @click="addSchedule">
        新增班次
      </Button>
      <Table :columns="columns"
             :data="scheduleList">
      </Table>
    </TableWrapper>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
import TableWrapper from '@/components/wrapper/TableWrapper'
const deleteIcon = require('@/img/common/delete.png')
const editIcon = require('@/img/common/edit.png')
export default {
  components: {
    TableWrapper
  },
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
              h('Tooltip', {
                props: {
                  content: '编辑',
                  transfer: true,
                  placement: 'bottom'
                },
                style: {
                  cursor: 'pointer',
                  width: '30px'
                }
              }, [
                h('img', {
                  style: {
                    cursor: 'pointer',
                    width: '30px'
                  },
                  attrs: {
                    src: editIcon
                  },
                  on: {
                    click: () => {
                      this.goToEdit(params.row.id)
                    }
                  }
                })
              ], '编辑'),
              h('Poptip', {
                style: {
                  textAlign: 'left',
                  marginLeft: '12px'
                },
                props: {
                  confirm: true,
                  placement: 'bottom-end',
                  title: this.$t('sysManage.validateInfo.sureDelete')
                },
                on: {
                  'on-ok': () => {
                    this.goToDelete(params.row.id)
                  },
                  'on-cancel': () => {
                  }
                }
              }, [
                h('Tooltip', {
                  props: {
                    content: '删除',
                    transfer: true,
                    placement: 'bottom'
                  },
                  style: {
                    cursor: 'pointer',
                    width: '30px'
                  }
                }, [
                  h('img', {
                    style: {
                      cursor: 'pointer',
                      width: '30px'
                    },
                    attrs: {
                      src: deleteIcon
                    }
                  })
                ], '删除')
              ])
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
      if (result.success) this.scheduleList = result.data
    }
  }
}
</script>

<style lang="less">
.schedule_homePage {
  padding: 24px;
}
</style>

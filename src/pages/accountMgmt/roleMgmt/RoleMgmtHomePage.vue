<template>
  <div class="roleMgmt__homePage">
    <PairBreadcrumb title="角色管理"/>
    <div class="roleMgmt__homePage-content">
      <TableWrapper>
        <Button type="primary"
                @click="addRole"
                style="margin-bottom: 12px">
          新增角色
        </Button>
        <Table :columns="columns"
               :data="roleList">
        </Table>
      </TableWrapper>
    </div>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
const deleteIcon = require('@/img/common/delete.png')
const editIcon = require('@/img/common/edit.png')
export default {
  components: {},
  name: 'RoleMgmtHomePage',
  data() {
    return {
      roleList: []
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '角色',
          key: 'roleName'
        },
        {
          title: '权限',
          key: 'resourceNameList',
          render: (h, params) => {
            const { manageMenuNameList, appletMenuNameList } = params.row
            return h('div', [
              h('div', '执法系统功能：' + manageMenuNameList.join('|')),
              h('div', '小程序功能：' + appletMenuNameList.join('|'))
            ])
          }
        },
        {
          title: this.$t('sysManage.commonVar.action'),
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            if (params.row.id === '2') return h('div', '')
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
                  title: '删除角色会删除该角色对应的所有账号, 确定删除吗？'
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
    this.getRoleList()
  },
  methods: {
    addRole() {
      this.$router.push({ name: '新增角色' })
    },
    goToEdit(id) {
      this.$router.push({ name: '修改角色', query: { id } })
    },
    async goToDelete(id) {
      const result = await get(END_POINTS.DELETE_ROLE_BY_ID + `?roleId=${id}`)
      if (result.code === 2000) {
        this.$Message.success({
          content: this.$t('monitor.success')
        })
        this.getRoleList()
      }
    },
    async getRoleList() {
      const result = await get(END_POINTS.GET_ROLE_LIST + `?configId=${localStorage.getItem('configId')}`)
      if (result.code === 2000) this.roleList = result.data
    }
  }
}
</script>

<style lang="less">
.roleMgmt__homePage {
  .roleMgmt__homePage-content {
    padding: 24px;
  }
}
</style>

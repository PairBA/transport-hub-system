<template>
  <div class="roleMgmt__homePage">
    <Button type="primary"
            @click="addRole">
      新增角色
    </Button>
    <Table :columns="columns"
           :data="roleList">
    </Table>
  </div>
</template>

<script>
import {
  get,
  END_POINTS
} from '@/api'
export default {
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
            return h('span', params.row.resourceNameList.join('|'))
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
      const result = await get(END_POINTS.GET_ROLE_LIST)
      if (result.code === 2000) this.roleList = result.data
    }
  }
}
</script>

<style lang="less">
.roleMgmt__homePage{}
</style>

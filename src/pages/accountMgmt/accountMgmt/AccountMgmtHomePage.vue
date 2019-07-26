<template>
  <div class="accountMgmt__homePage">
    <ContentLayout :showSpin="showSpin">
      <div slot="searchCondition">
        <Form>
          <FormItem label="角色">
            <Select v-model="roleId"
                    placeholder="请选择角色">
              <Option v-for="item in roleList"
                      :value="item.id"
                      :key="item.id">
                {{ item.roleName }}
              </Option>
            </Select>
          </FormItem>
          <Divider/>
          <FormItem label="账号名称">
            <Input v-model="userName" placeholder="请输入账号名称"/>
          </FormItem>
          <Divider/>
          <Button type="primary"
                  class="taxi-company-home-page-search-btn"
                  @click="goSearch">
            {{ $t("sysManage.queryBar.searchBT") }}
          </Button>
        </Form>
      </div>
      <div slot="content">
        <TableWrapper>
          <Button style="margin-bottom: 12px"
                  type="primary"
                  icon="md-add"
                  @click="addAccount">
            新增账号
          </Button>
          <Table :columns="columns"
                 :data="userList">
          </Table>
        </TableWrapper>
      </div>
    </ContentLayout>
  </div>
</template>

<script>
import { get, END_POINTS } from '@/api'
const deleteIcon = require('@/img/common/delete.png')
const editIcon = require('@/img/common/edit.png')
export default {
  components: {},
  data() {
    return {
      showSpin: false,
      userName: '',
      roleId: '',
      roleList: [],
      userList: []
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '账号',
          key: 'userName'
        },
        {
          title: '角色',
          key: 'roleId',
          render: (h, params) => {
            const roleId = params.row.roleId
            let roleName = ''
            const role = this.roleList.find(role => role.id === roleId)
            if (role) roleName = role.roleName
            return h('span', {
            }, roleName)
          }
        },
        {
          title: '姓名',
          key: 'fullName'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '邮箱',
          key: 'email'
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
                      this.goToEdit(params.row.userId)
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
                    this.goToDelete(params.row.userId)
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
  async mounted() {
    await this.getRoleList()
    this.goSearch()
  },
  methods: {
    goSearch() {
      this.getUserList()
    },
    addAccount() {
      this.$router.push({ name: '新增账号' })
    },
    goToEdit(userId) {
      this.$router.push({ name: '修改账号', query: { userId } })
    },
    async goToDelete(userId) {
      const result = await get(END_POINTS.DELETE_USER_BY_ID + `?userId=${userId}`)
      if (result.code === 2000) {
        this.$Message.success({
          content: this.$t('monitor.success')
        })
        this.goSearch()
      }
    },
    async getRoleList() {
      const result = await get(END_POINTS.GET_ROLE_LIST)
      if (result.code === 2000) this.roleList = result.data
    },
    async getUserList() {
      const result = await get(END_POINTS.GET_USER_LIST, {
        userName: this.userName,
        roleId: this.roleId,
        hubCode: localStorage.getItem('hubCode')
      })
      if (result.code === 2000) this.userList = result.data
      else this.userList = []
    }
  }
}
</script>

<style lang="less">
.accountMgmt__homePage{}
</style>

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
        <Button style="margin-bottom: 12px" type="primary" icon="md-add"
                @click="addAccount">
          新增账号
        </Button>
        <Table :columns="columns"
               :data="userList">
        </Table>
      </div>
    </ContentLayout>
  </div>
</template>

<script>
import ContentLayout from '@/components/ContentLayout'
import {
  get,
  END_POINTS
} from '@/api'
export default {
  components: {
    ContentLayout
  },
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
          key: 'userId',
          tooltip: true
        },
        {
          title: '角色',
          key: 'roleId',
          tooltip: true
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
              h('span', {
                style: {
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.goToDelete(params.row.userId)
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
                    this.goToEdit(params.row.userId)
                  }
                }
              }, '修改')
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

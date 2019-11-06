<template>
  <div class="accountMgmt__add">
    <PairBreadcrumb parentPath="/systemManage/roleMgmtHomePage"
                    parentTitle="角色管理"
                    title="新增角色"/>
    <div class="accountMgmt__add-content">
      <div class="accountMgmt__add-content-wrapper">
        <div class="accountMgmt__add-form-wrapper">
          <Form ref="formValidate"
                label-position="top"
                :model="formValidate"
                :rules="ruleValidate">
            <FormItem label="角色:" prop="roleName">
              <Input v-model="formValidate.roleName" placeholder="请输入角色"/>
            </FormItem>
            <FormItem :label="'执法系统功能'">
              <Tree :data="manageMenuIdList" ref="lawTree" show-checkbox multiple></Tree>
            </FormItem>
            <FormItem :label="'小程序功能'">
              <Tree :data="appletMenuIdList" ref="appTree" show-checkbox multiple></Tree>
            </FormItem>
            <div style="text-align: center;">
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
export default {
  components: {},
  data() {
    return {
      manageMenuIdList: [],
      appletMenuIdList: [],
      formValidate: {
        roleName: '',
        resourceIdList: []
      },
      ruleValidate: {
        roleName: [
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ],
        resourceIdList: [
          { required: true, type: 'array', min: 1, message: '请选择至少一个权限', trigger: 'change' }
        ]
      },
      resourceList: []
    }
  },
  async mounted() {
    const lawTreeData = await this.getManageTreeForLawRole()
    const appTreeData = await this.getAppletTreeForLawRole()
    this.manageMenuIdList = this.renderTreeData(lawTreeData)
    this.appletMenuIdList = this.renderTreeData(appTreeData)
  },
  methods: {
    async handleSubmit(name) {
      let selectMenuIdList = this.$refs.lawTree.getCheckedNodes()
      const manageMenuIdList = this.getTreeList(selectMenuIdList)
      let list = this.$refs.appTree.getCheckedNodes()
      const appletMenuIdList = this.getTreeList(list)
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const result = await post(END_POINTS.ADD_ROLE, {
            configId: localStorage.getItem('configId'),
            roleName: this.formValidate.roleName,
            manageMenuIdList,
            appletMenuIdList
          })
          if (result.code === 2000) {
            this.$Message.success({
              content: this.$t('monitor.success')
            })
            this.$router.push({ name: '角色管理' })
          }
        }
      })
    },
    getTreeList(selectMenuIdList) {
      return selectMenuIdList.map(value => {
        return value.id
      })
    },
    renderTreeData(menuTreeForRoleListData) {
      let levelOneList = []
      menuTreeForRoleListData.menuList.forEach(value => {
        if (value.level === 1) {
          levelOneList.push(value)
        }
      })
      return levelOneList.map(value => {
        let levelTwoList = []
        menuTreeForRoleListData.menuList.forEach(valueTwo => {
          if (valueTwo.pId === value.id) {
            levelTwoList.push({
              id: valueTwo.id,
              pId: valueTwo.pId,
              title: valueTwo.name
            })
          }
        })
        return {
          id: value.id,
          pId: value.pId,
          title: value.name,
          expand: true,
          children: levelTwoList
        }
      })
    },
    async getManageTreeForLawRole() {
      const responseData = await get(END_POINTS.GET_MANAGE_TREE_FOR_LAW_ROLE + `?roleId=${localStorage.getItem('roleId')}`)
      if (responseData.success) {
        return responseData.data
      }
    },
    async getAppletTreeForLawRole() {
      const responseData = await get(END_POINTS.GET_APPLET_TREE_FOR_LAW_ROLE + `?roleId=${localStorage.getItem('roleId')}`)
      if (responseData.success) {
        return responseData.data
      }
    }
  }
}
</script>

<style lang="less">
.accountMgmt__add {
  .accountMgmt__add-content {
    padding: 24px;

    .accountMgmt__add-content-wrapper {
      padding: 24px;
      width: 100%;
      background-color: #FFFFFF;
      border-radius: 2px;

      .accountMgmt__add-form-wrapper {
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

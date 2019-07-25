<template>
  <div class="accountMgmt__add">
    <PairBreadcrumb parentPath="/accountMgmt/roleMgmtHomePage"
                    parentTitle="角色管理"
                    title="新增角色"/>
    <div class="accountMgmt__add-content">
      <div class="accountMgmt__add-content-wrapper">
        <div class="accountMgmt__add-form-wrapper">
          <Form label-position="top">
            <FormItem label="角色:">
              <Input v-model="roleName" placeholder="请输入角色"/>
            </FormItem>
            <FormItem label="权限:">
              <CheckboxGroup v-model="resourceIdList">
                <Checkbox v-for="resource in resourceList"
                          :label="resource.id"
                          :key="resource.id">
                  {{resource.resourceName}}
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <div style="text-align: center;">
              <Button type="primary"
                      @click="submit">
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
      roleName: '',
      resourceIdList: [],
      resourceList: []
    }
  },
  mounted() {
    this.getResourceList()
  },
  methods: {
    async submit() {
      const result = await post(END_POINTS.ADD_ROLE, {
        roleName: this.roleName,
        resourceIdList: this.resourceIdList
      })
      if (result.code === 2000) {
        this.$Message.success({
          content: this.$t('monitor.success')
        })
        this.$router.push({ name: '角色管理' })
      }
    },
    async getResourceList() {
      const result = await get(END_POINTS.GET_RESOURCE_LIST)
      if (result.code === 2000) this.resourceList = result.data
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

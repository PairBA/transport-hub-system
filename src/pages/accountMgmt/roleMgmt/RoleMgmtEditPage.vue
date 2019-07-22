<template>
  <div class="accountMgmt__add">
    <SearchWrapper>
      <Form>
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
        <Button type="primary"
                @click="submit">
          提交
        </Button>
      </Form>
    </SearchWrapper>
  </div>
</template>

<script>
import {
  post,
  get,
  END_POINTS
} from '@/api'
import SearchWrapper from '@/components/wrapper/SearchWrapper'
export default {
  components: {
    SearchWrapper
  },
  data() {
    return {
      id: '',
      roleName: '',
      resourceIdList: [],
      resourceList: []
    }
  },
  mounted() {
    this.getResourceList()
    this.id = this.$route.query.id
    this.getRoleById(this.id)
  },
  methods: {
    async submit() {
      this.editRole()
    },
    async getResourceList() {
      const result = await get(END_POINTS.GET_RESOURCE_LIST)
      if (result.code === 2000) this.resourceList = result.data
    },
    async getRoleById(id) {
      const result = await get(END_POINTS.GET_ROLE_BY_ID + `?roleId=${id}`)
      if (result.code === 2000) {
        this.resourceIdList = result.data.resourceIdList
        this.roleName = result.data.roleName
      }
    },
    async editRole() {
      const result = await post(END_POINTS.EDIT_ROLE, {
        id: this.id,
        roleName: this.roleName,
        resourceIdList: this.resourceIdList
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
.accountMgmt__add{

}

</style>

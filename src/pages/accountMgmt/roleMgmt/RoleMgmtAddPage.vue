<template>
  <div class="accountMgmt__add">
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
  </div>
</template>

<script>
import {
  post,
  get,
  END_POINTS
} from '@/api'
export default {
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
        resourceIdList: this.resourceIdList.join()
      })
      if (result.code === 2000) {
        this.$Message.success({
          content: this.$t('monitor.success')
        })
        this.$router.push({ name: 'roleMgmtHomePage' })
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
.accountMgmt__add{

}

</style>

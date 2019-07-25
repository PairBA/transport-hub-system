<template>
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
</template>

<script>
export default {
  data() {
    return {
      showSpin: false,
      userName: '',
      roleId: '',
      roleList: [],
      userList: []
    }
  },
  methods: {
    goSearch() {
    }
  }
}
</script>

<style lang="less"></style>

<template>
  <div class="exceptionQueue__homePage">
    <ContentLayout :showSpin="showSpin">
      <TableWrapper>
        <Table :columns="columns"
               :data="list">
        </Table>
        <PairPage id="trailList" :total="total" :current="currentPage" :page-size="pageSize" @on-change="getPage" @on-page-size-change="changeSize"></PairPage>
      </TableWrapper>
    </ContentLayout>
  </div>
</template>

<script>
import { dateFormat } from '@/utils'
const detail = require('@/img/common/detail.png')
export default {
  components: {},
  data() {
    return {
      showSpin: false
    }
  },
  computed: {
    list() {
      return this.$store.state.exceptionQueue.list
    },
    currentPage() {
      return this.$store.state.exceptionQueue.currentPage
    },
    pageSize() {
      return this.$store.state.exceptionQueue.pageSize
    },
    total() {
      return this.$store.state.exceptionQueue.total
    },
    columns() {
      return [
        {
          title: '车辆号牌',
          key: 'vehicleNo'
        },
        {
          title: '进场车次',
          key: 'sumIn'
        },
        {
          title: '发车量',
          key: 'sumOn'
        },
        {
          title: '异常排队',
          key: 'sumQcut'
        },
        {
          title: this.$t('sysManage.commonVar.action'),
          key: 'action',
          width: 125,
          align: 'center',
          render: (h, params) => {
            return h('Tooltip', {
              props: {
                content: '查看',
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
                  src: detail
                },
                on: {
                  click: () => {
                    this.goToDetail(params.row)
                  }
                }
              })
            ], '查看')
          }
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    goSearch() {
      this.getHubStatTrailList()
    },
    goToDetail({ mobile, vehicleNo }) {
      this.$router.push({
        name: '异常排队详情',
        query: {
          mobile,
          vehicleNo,
          startDate: dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd'),
          endDate: dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd')
        }
      })
    },
    getPage(currentPage) {
      this.$store.dispatch('exceptionQueue/getHubStatTrailList', { currentPage })
    },
    changeSize(pageSize) {
      this.$store.commit('exceptionQueue/updatePageSize', pageSize)
      this.getPage(1)
    },
    async getHubStatTrailList() {
      if (new Date(this.daterange[1]).getTime() - new Date(this.daterange[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.showSpin = true
        await this.$store.dispatch('exceptionQueue/getHubStatTrailList', { currentPage: 1 })
        this.showSpin = false
      }
    }
  }
}
</script>

<style lang="less">
.exceptionQueue__homePage{
  .ivu-date-picker {
    width: 100%;
  }
}
</style>

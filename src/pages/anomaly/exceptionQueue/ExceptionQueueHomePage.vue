<template>
  <div class="exceptionQueue__homePage">
    <ContentLayout :showSpin="showSpin">
      <div slot="searchCondition">
        <Form>
          <FormItem label="车辆号牌">
            <Input v-model="vehicleNo" placeholder="请输入车辆号牌"/>
          </FormItem>
          <Divider/>
          <FormItem label="开始日期">
            <DatePicker v-model="startDate"></DatePicker>
          </FormItem>
          <Divider/>
          <FormItem label="结束日期">
            <DatePicker v-model="endDate"></DatePicker>
          </FormItem>
          <Button type="primary"
                  @click="goSearch">
            {{ $t("sysManage.queryBar.searchBT") }}
          </Button>
        </Form>
      </div>
      <div slot="content">
        <TableWrapper>
          <Table :columns="columns"
                 :data="list">
          </Table>
          <PairPage id="trailList" :total="total" :current="currentPage" :page-size="pageSize" @on-change="getPage" @on-page-size-change="changeSize"></PairPage>
        </TableWrapper>
      </div>
    </ContentLayout>
  </div>
</template>

<script>
import ContentLayout from '@/components/ContentLayout'
import TableWrapper from '@/components/wrapper/TableWrapper'
import PairPage from '@/components/common/PairPage'
import {
  post,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
export default {
  components: {
    ContentLayout,
    TableWrapper,
    PairPage
  },
  data() {
    return {
      showSpin: false,
      vehicleNo: '',
      startDate: new Date(),
      endDate: new Date(),
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  computed: {
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
            return h('span', {
              style: {
                cursor: 'pointer',
                marginLeft: '12px'
              },
              on: {
                click: () => {
                  this.goToDetail(params.row)
                }
              }
            }, '查看')
          }
        }
      ]
    }
  },
  async mounted() {
    this.goSearch()
  },
  methods: {
    goSearch() {
      this.getHubStatTrailList()
    },
    goToDetail({ mobile, vehicleNo }) {
      this.$router.push({ name: '异常排队详情', query: { mobile, vehicleNo, startDate: dateFormat(this.startDate, 'yyyy-MM-dd'), endDate: dateFormat(this.endDate, 'yyyy-MM-dd') } })
    },
    getPage(currentPage) {
      this.currentPage = currentPage
      this.goSearch()
    },
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.getPage(1)
    },
    initPage() {
      this.getPage(1)
    },
    async getHubStatTrailList() {
      const result = await post(END_POINTS.GET_HUB_STAT_TRAIL_LIST, {
        currentPage: this.currentPage,
        orderBy: '',
        pageSize: this.pageSize,
        queryVO: {
          hubCode: localStorage.getItem('hubCode'),
          startDate: dateFormat(this.startDate, 'yyyy-MM-dd'),
          endDate: dateFormat(this.endDate, 'yyyy-MM-dd'),
          vehicleNo: this.vehicleNo,
          type: 'CUTQ',
          areaCode: 'CNSCA1',
          driverType: 'TAXI',
          gps: null
        },
        refreshTotalRecord: true
      })
      if (result.code === 2001) {
        this.currentPage = result.currentPage
        this.pageSize = result.pageSize
        this.list = result.data
        this.total = result.total
      } else {
        this.currentPage = 1
        this.total = 0
        this.list = []
      }
    }
  }
}
</script>

<style lang="less">
.exceptionQueue__homePage{}
</style>

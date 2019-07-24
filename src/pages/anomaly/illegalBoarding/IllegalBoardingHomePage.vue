<template>
  <div class="illegalBoarding__homePage">
    <ContentLayout :showSpin="showSpin">
      <div slot="searchCondition">
        <Form>
          <FormItem label="车辆号牌">
            <Input v-model="vehicleNo" placeholder="请输入车辆号牌"/>
          </FormItem>
          <FormItem label="时间区间：">
            <DatePicker v-model="daterange"
                        type="daterange"
                        format="yyyy/MM/dd"
                        placement="bottom-start"
                        placeholder="请选择时间区间"
                        :clearable="false"
                        :editable="false"
                        :options="options">
            </DatePicker>
          </FormItem>
          <Divider/>
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
import { post, END_POINTS } from '@/api'
import { dateFormat } from '@/utils'
export default {
  components: {},
  data() {
    return {
      showSpin: false,
      vehicleNo: '',
      daterange: [new Date(), new Date()],
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      }
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
          title: '违规上客',
          key: 'sumOnAlert'
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
  mounted() {
    this.goSearch()
  },
  methods: {
    goSearch() {
      this.getHubStatTrailList()
    },
    goToDetail({ mobile, vehicleNo }) {
      this.$router.push({
        name: '违规上客详情',
        query: {
          mobile,
          vehicleNo,
          startDate: dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd'),
          endDate: dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd')
        }
      })
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
          startDate: dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd'),
          endDate: dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd'),
          vehicleNo: this.vehicleNo,
          type: 'ALERT_ON',
          areaCode: localStorage.getItem('areaCode'),
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
.illegalBoarding__homePage{
  .ivu-date-picker {
    width: 100%;
  }
}
</style>

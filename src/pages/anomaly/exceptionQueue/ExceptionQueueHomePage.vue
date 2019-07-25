<template>
  <div class="exceptionQueue__homePage">
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
const detail = require('@/img/common/detail.png')
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
  async mounted() {
    this.goSearch()
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
      if (new Date(this.daterange[1]).getTime() - new Date(this.daterange[0]).getTime() > 6 * 24 * 60 * 60 * 1000) {
        this.$Message.warning({
          content: '时间间隔不能大于7天！'
        })
      } else {
        this.showSpin = true
        const result = await post(END_POINTS.GET_HUB_STAT_TRAIL_LIST, {
          currentPage: this.currentPage,
          orderBy: '',
          pageSize: this.pageSize,
          queryVO: {
            hubCode: localStorage.getItem('hubCode'),
            startDate: dateFormat(new Date(this.daterange[0]), 'yyyy-MM-dd'),
            endDate: dateFormat(new Date(this.daterange[1]), 'yyyy-MM-dd'),
            vehicleNo: this.vehicleNo,
            type: 'CUTQ',
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

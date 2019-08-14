<template>
  <div class="searchTrip__homePage">
    <ContentLayout :showSpin="showSpin">
      <Row id="jumpView" :gutter="24">
        <Col span="14">
          <div class="content__card">
            <MeterTripSearchAMap>
            </MeterTripSearchAMap>
          </div>
        </Col>
        <Col span="10">
          <div class="content__card">
            <Row style="padding: 14px 14px 10px 14px;">
              <PairIcon type="real-car"
                        class="meter-trip-search-car-icon"/>
              <span class="meter-trip-search-car-title">
                {{$t("sysManage.meterTripSearch.itineraryRecord")}}
              </span>
            </Row>
            <div class="meter-trip-search-car-line"></div>
            <div class="meter-trip-search-itemlist">
              <div v-for="item in showMeterTripList"
                   :class="{ 'meter-trip-search-itemlist-active' : activeItemId === item.meterTripId}"
                   @click="activeItem(item.meterTripId, item.recDate, item.activeTripStatus)"
                   :id="item.meterTripId"
                   :key="item.meterTripId">
                <Row style="padding: 0 16px;">
                  <Row class="meter-trip-search-itemlist-title"
                       style="margin-top: 16px;">
                    <span style="float: left;font-size: 18px;font-weight: bold;color: #107AEF;margin-right: 15px;line-height: 18px;">
                      {{item.vehicleNo}}
                    </span>
                    <span style="float: left;">
                      {{item.distance}}
                      {{$t("sysManage.unit.km")}}&nbsp;
                      {{item.duration}}
                      {{$t("sysManage.unit.minute")}}
                    </span>
                    <span style="float: right;color: #2A9EF6;cursor: pointer;"
                          @click="gotoInfoPage(item.meterTripId, item.recDate)">
                      {{$t("sysManage.commonVar.actionInfo")}}
                    </span>
                  </Row>
                  <div style="font-size:16px;line-height:21px;margin-top: 4px">
                    {{$t("sysManage.commonVar.companyName")}}: {{item.companyName}} <span style="margin-left: 30px">{{$t("sysManage.queryBar.terminalManufacturer")}}: {{item.terminalName}}</span>
                  </div>
                  <Row class="meter-trip-search-itemlist-info"
                       style="margin-top: 8px;">
                    <Col span="1">
                      <PairIcon type="greenpoint"
                                class="meter-trip-search-itemlist-icon"/>
                    </Col>
                    <Col span="19">
                      <span style="margin-left: 8px;float: left;">
                        {{item.orgLocName}}
                      </span>
                    </Col>
                    <Col span="4">
                      <span style="float: right;">
                        {{item.timeDBoard}}
                      </span>
                    </Col>
                  </Row>
                  <Row class="meter-trip-search-itemlist-info"
                       style="margin-top: 8px;">
                    <Col span="1">
                      <PairIcon type="redpoint"
                                class="meter-trip-search-itemlist-icon"/>
                    </Col>
                    <Col span="19">
                      <span style="margin-left: 8px;float: left;">
                        {{item.destLocName}}
                      </span>
                    </Col>
                    <Col span="4">
                      <span style="float: right;">
                        {{item.timeDAlight}}
                      </span>
                    </Col>
                  </Row>
                </Row>
                <div class="meter-trip-search-car-line"
                     style="margin-top: 16px;"></div>
              </div>
              <Row style="padding: 16px;">
                <Page :current="currentPage"
                      :total="total"
                      :page-size="pageSize"
                      @on-change="getPage"
                      size="small"
                      simple
                      style="float: right;margin-top: 4px;"/>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </ContentLayout>
  </div>
</template>

<script>
import MeterTripSearchAMap from '@/components/tripTrail/MeterTripSearchAMap'

export default {
  components: {
    MeterTripSearchAMap
  },
  data() {
    return {
      activeItemId: '',
      parentPath: '',
      parentTitle: ''
    }
  },
  computed: {
    showMeterTripList: {
      get() {
        return this.$store.state.meterTripSearch.meterTripListObject.showMeterTripList
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMeterTripListObjectShowMeterTripList', value)
      }
    },
    meterTripListObject() {
      return this.$store.state.meterTripSearch.meterTripListObject
    },
    meterTripList() {
      return this.$store.state.meterTripSearch.meterTripListObject.meterTripList
    },
    total() {
      return this.$store.state.meterTripSearch.meterTripListObject.total
    },
    pageSize() {
      return this.$store.state.meterTripSearch.meterTripListObject.pageSize
    },
    currentPage: {
      get() {
        return this.$store.state.meterTripSearch.meterTripListObject.currentPage
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMeterTripListObjectCurrentPage', value)
      }
    },
    areaCode: {
      get() {
        return this.$store.state.areaCodeForSelect
      },
      set(value) {
        this.$store.commit('updateAreaCodeForSelect', value)
        this.$store.dispatch('getCenterGpsByAreaCode', value)
      }
    },
    driverType: {
      get() {
        return this.$store.state.meterTripSearch.driverType
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateDriverType', value)
      }
    },
    activeTripStatus: {
      get() {
        return this.$store.state.meterTripSearch.activeTripStatus
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateActiveTripStatus', value)
      }
    },
    showSpin: {
      get() {
        return this.$store.state.search.showSpin
      },
      set(value) {
        this.$store.commit('search/updateShowSpin', value)
      }
    }
  },
  methods: {
    async activeItem(meterTripId, recDate, activeTripStatus) {
      this.showSpin = true
      this.activeItemId = meterTripId
      this.activeTripStatus = activeTripStatus
      let location = this.$t('sysManage.commonVar.location')
      let dropOffLocation = this.$t('sysManage.commonVar.dropOffLocation')
      let duringTheTrip = this.$t('sysManage.commonVar.duringTheTrip')
      // 点中卡片后获取轨迹
      const result = await this.$store.dispatch('meterTripSearch/getGpsListForMap', { meterTripId, recDate, mapType: this.mapType, location, dropOffLocation, duringTheTrip })
      if (result.code === 2006) {
        this.$Message.warning({
          content: result.msg
        })
      }
      this.showSpin = false
    },
    getPage(currentPage) {
      this.currentPage = currentPage
      // 当前页不大于总页数
      if (currentPage <= this.meterTripListObject.totalPage) {
        this.showMeterTripList = [] // 清空显示的列表
        let showList = []
        for (let i = this.meterTripListObject.pageSize * (currentPage - 1) + 1; i <= ((this.meterTripListObject.total > this.meterTripListObject.pageSize * currentPage) ? (this.meterTripListObject.pageSize * currentPage) : (this.meterTripListObject.total)); i++) {
          showList.push(this.meterTripList[i - 1])
        }
        this.showMeterTripList = showList
      }
    },
    gotoInfoPage(meterTripId, recDate) {
      this.$router.push({ path: '/transactionRecord/meterTripDetail', query: { meterTripId: meterTripId, recDate: recDate, driverType: this.driverType } })
    }
  },
  async mounted() {
    this.showSpin = true
    await this.$store.dispatch('meterTripSearch/getGpsStepList')
    this.showSpin = false
  }
}
</script>

<style lang="less">
.searchTrip__homePage {
  .ivu-date-picker {
    width: 49%;
  }

  .ivu-page-prev,
  .ivu-page-next,
  .ivu-page-item-jump-prev,
  .ivu-page-item-jump-next {
    min-width: 12px !important;
  }

  .ivu-page-simple
  .ivu-page-simple-pager
  input {
    width: 35px;
  }

  .search-wrapper
  .ivu-input-wrapper {
    width: 125px;
  }

  .ivu-radio-group-button .ivu-radio-wrapper-checked {
    background: #5584FF !important;
    color: #FFFFFF !important;
  }

  .ivu-radio-group-button .ivu-radio-wrapper {
    color: #666666;
    background: #F5F6F9;
    padding: 0 5px;
  }

  .meter-trip-search-car-icon {
    width: 24px;
    float: left;
    margin-top: 4px;
  }

  .meter-trip-search-car-title {
    float: left;
    font-size: 20px;
    font-weight: 600;
    margin-left: 8px;
  }

  .meter-trip-search-car-line {
    width: 100%;
    height: 1px;
    background-color: #E9E9E9;
  }

  .meter-trip-search-itemlist {
  }

  .meter-trip-search-itemlist-title {
    font-size: 14px;
    color: #333333;
    font-weight: 600;
  }

  .meter-trip-search-itemlist-info {
    font-size: 16px;
    color: #333333;
    font-weight: 600;
  }

  .meter-trip-search-itemlist-icon {
    width: 8px;
    float: right;
  }

  .meter-trip-search-itemlist-active {
    background-color: #F8F9FC;
    border-left: 6px solid #9D9D9D;
  }
}
</style>

<template>
  <div class="searchTrip__homePage">
    <ContentLayout :showSpin="isShowPairSpin">
      <div slot="searchCondition">
        <Form label-position="top">
          <FormItem :label="$t('sysManage.queryBar.orgLocName')">
            <input v-model="mtsOrgLocName"
                   id="mtsOrgLocName"
                   class="meter-trip-search-content-input"
                   :placeholder="$t('sysManage.queryBar.orgLocNamePH')"/>
          </FormItem>
          <FormItem :label="$t('sysManage.meterTripSearch.boardingTimeInterval')">
            <DatePicker type="date"
                        v-model="mtsOrgDate"
                        format="yyyy/MM/dd"
                        style="float: left;"
                        :editable="true"
                        :clearable="true"
                        :placeholder="$t('sysManage.queryBar.datePH')">
            </DatePicker>
            <TimePicker type="time"
                        v-model="mtsOrgTime"
                        format="HH:mm"
                        style="float: right;"
                        :editable="true"
                        :clearable="true"
                        :placeholder="$t('sysManage.queryBar.timePH')">
            </TimePicker>
          </FormItem>
          <FormItem :label="$t('sysManage.meterTripSearch.timeFrame')">
            <RadioGroup v-model="orgMin" type="button">
              <Radio label="5">5 {{ $t('sysManage.meterTripSearch.minute') }}</Radio>
              <Radio label="15">15 {{ $t('sysManage.meterTripSearch.minute') }}</Radio>
              <Radio label="30">30 {{ $t('sysManage.meterTripSearch.minute') }}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('sysManage.queryBar.destLocName')">
            <input v-model="mtsDestLocName"
                   id="mtsDestLocName"
                   class="meter-trip-search-content-input"
                   :placeholder="$t('sysManage.queryBar.destLocNamePH')"/>
          </FormItem>
          <FormItem :label="$t('sysManage.meterTripSearch.departureTimeInterval')">
            <DatePicker type="date"
                        v-model="mtsDestDate"
                        format="yyyy/MM/dd"
                        style="float: left;"
                        :disabled="destTimeDisabled"
                        :editable="true"
                        :clearable="true"
                        :placeholder="$t('sysManage.queryBar.datePH')">
            </DatePicker>
            <TimePicker type="time"
                        v-model="mtsDestTime"
                        format="HH:mm"
                        style="float: right;"
                        :disabled="destTimeDisabled"
                        :editable="true"
                        :clearable="true"
                        :placeholder="$t('sysManage.queryBar.timePH')">
            </TimePicker>
          </FormItem>
          <FormItem :label="$t('sysManage.meterTripSearch.timeFrame')">
            <RadioGroup v-if="destTimeDisabled" v-model="destMin" type="button">
              <Radio label="5" disabled>5 {{ $t('sysManage.meterTripSearch.minute') }}</Radio>
              <Radio label="15" disabled>15 {{ $t('sysManage.meterTripSearch.minute') }}</Radio>
              <Radio label="30" disabled>30 {{ $t('sysManage.meterTripSearch.minute') }}</Radio>
            </RadioGroup>
            <RadioGroup v-else v-model="destMin" type="button">
              <Radio label="5">5 {{ $t('sysManage.meterTripSearch.minute') }}</Radio>
              <Radio label="15">15 {{ $t('sysManage.meterTripSearch.minute') }}</Radio>
              <Radio label="30">30 {{ $t('sysManage.meterTripSearch.minute') }}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Checkbox v-model="closeMeter">
              {{ $t('sysManage.meterTripSearch.notCloseMeter') }}
            </Checkbox>
          </FormItem>
          <Button type="primary"
                  @click="goSearch">
            {{ $t("sysManage.queryBar.searchBT") }}
          </Button>
        </Form>
      </div>
      <div slot="content">
        <Row id="jumpView" :gutter="24">
          <Col span="14">
            <div class="content__card">
              <MeterTripSearchAMap @lostFoundGoSearch="goSearch">
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
                    <span style="float: left;font-size: 18px;font-weight: bold;color: #333333;margin-right: 15px;line-height: 18px;">
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
      </div>
    </ContentLayout>
  </div>
</template>

<script>
import ContentLayout from '@/components/ContentLayout'
import MeterTripSearchAMap from '@/components/tripTrail/MeterTripSearchAMap'
import { dateFormat } from '../../../utils'

export default {
  components: {
    ContentLayout,
    MeterTripSearchAMap
  },
  data() {
    return {
      isLostFoundOpen: false,
      isShowPairSpin: false,
      isLoadMap: false,
      destTimeDisabled: false,
      activeItemId: '',
      isCheckIn: true,
      parentPath: '',
      parentTitle: ''
    }
  },
  computed: {
    areaCodeListForSelect() {
      return this.$store.state.areaCodeListForSelect
    },
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
    mtsOrgLocName: {
      get() {
        return this.$store.state.meterTripSearch.mtsOrgLocName
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateSearchOrgLocName', value)
        if (!value) {
          this.$store.commit('meterTripSearch/updateOrgRetangleBounds', [])
        }
      }
    },
    mtsOrgDate: {
      get() {
        return this.$store.state.meterTripSearch.mtsOrgDate
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMtsOrgDate', value)
      }
    },
    mtsOrgTime: {
      get() {
        return this.$store.state.meterTripSearch.mtsOrgTime
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMtsOrgTime', value)
      }
    },
    mtsDestLocName: {
      get() {
        return this.$store.state.meterTripSearch.mtsDestLocName
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateSearchDestLocName', value)
        if (!value) {
          this.$store.commit('meterTripSearch/updateDestRetangleBounds', [])
        }
      }
    },
    mtsDestDate: {
      get() {
        return this.$store.state.meterTripSearch.mtsDestDate
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMtsDestDate', value)
      }
    },
    mtsDestTime: {
      get() {
        return this.$store.state.meterTripSearch.mtsDestTime
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMtsDestTime', value)
      }
    },
    orgMin: {
      get() {
        return this.$store.state.meterTripSearch.orgMin
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateOrgMin', value)
      }
    },
    destMin: {
      get() {
        return this.$store.state.meterTripSearch.destMin
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateDestMin', value)
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
    closeMeter: {
      get() {
        return this.$store.state.meterTripSearch.closeMeter
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateCloseMeter', value)
      }
    },
    mtsOrgLocGps: {
      get() {
        return this.$store.state.meterTripSearch.mtsOrgLocGps
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMtsOrgLocGps', value)
      }
    },
    mtsDestLocGps: {
      get() {
        return this.$store.state.meterTripSearch.mtsDestLocGps
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMtsDestLocGps', value)
      }
    },
    meterTripMarkers: {
      get() {
        return this.$store.state.meterTripSearch.gpsListForAMap.markers
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMeterTripMarkers', value)
      }
    },
    meterTripLine: {
      get() {
        return this.$store.state.meterTripSearch.gpsListForAMap.polylines
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMeterTripPolylines', value)
      }
    }
  },
  watch: {
    areaCode: 'getAreaName',
    closeMeter: 'initIsDisabled'
  },
  methods: {
    initIsDisabled() {
      if (this.closeMeter) {
        this.destTimeDisabled = true
        this.mtsDestDate = ''
        this.mtsDestTime = ''
      } else {
        this.destTimeDisabled = false
      }
    },
    async goSearch() {
      this.isShowPairSpin = true
      this.isCheckIn = true
      if (this.closeMeter) { // 可能未关闭计价器
        if (!this.mtsOrgLocName) {
          this.isCheckIn = false
          this.$Message.warning({
            content: this.$t('sysManage.meterTripSearch.enterPickUpPoint')
          })
        } else if (!this.mtsDestLocName) {
          this.isCheckIn = false
          this.$Message.warning({
            content: this.$t('sysManage.meterTripSearch.enterDropOffPoint')
          })
        } else if (!this.mtsOrgDate || !this.mtsOrgTime) {
          this.isCheckIn = false
          this.$Message.warning({
            content: this.$t('sysManage.meterTripSearch.boardingTimeIntervalPH')
          })
        }
      } else { // 关闭了计价器
        if (!this.mtsOrgLocName && !this.mtsDestLocName) {
          this.isCheckIn = false
          this.$Message.warning({
            content: this.$t('sysManage.meterTripSearch.enterPoints')
          })
        } else if ((!this.mtsOrgDate || !this.mtsOrgTime) &&
          (!this.mtsDestDate || !this.mtsDestTime)) {
          this.isCheckIn = false
          this.$Message.warning({
            content: this.$t('sysManage.meterTripSearch.enterTimeIntervals')
          })
        } else {
          if (this.mtsOrgDate && this.mtsOrgTime && this.mtsDestDate && this.mtsDestTime) {
            let orgTimeStart = dateFormat(new Date(this.mtsOrgDate), 'yyyy-MM-dd') + ' ' + this.mtsOrgTime + ':00'
            let orgTimeStartStamp = new Date(orgTimeStart).getTime()
            let destTimeStart = dateFormat(new Date(this.mtsDestDate), 'yyyy-MM-dd') + ' ' + this.mtsDestTime + ':00'
            let destTimeStartStamp = new Date(destTimeStart).getTime()
            if (destTimeStartStamp < orgTimeStartStamp) {
              this.isCheckIn = false
              this.$Message.warning({
                content: this.$t('sysManage.meterTripSearch.cantBeLessThan')
              })
            }
          }
        }
      }
      if (this.isCheckIn) {
        this.currentPage = 1
        let result = await this.$store.dispatch('meterTripSearch/getMeterTripSearchList')
        if (result.success) {
          if (result.code === 2006) {
            this.$Message.warning({
              content: result.msg
            })
          } else {
            // 有数据时，滚动页面显示到指定位置
            document.getElementById('jumpView').scrollIntoView(true)
          }
        } else {
          this.$Message.warning({
            content: result.msg
          })
        }
      }
      this.meterTripMarkers = []
      this.meterTripLine = ''
      this.isShowPairSpin = false
    },
    async getAreaName() {
      await this.$store.dispatch('meterTripSearch/getGpsStepList')
      // 当运营区域变化的时候，将自动添加的地址列表div浮层都删除掉
      let paras = document.getElementsByClassName('amap-sug-result')
      for (let i = 0; i < paras.length; i++) {
        // 删除元素 元素.parentNode.removeChild(元素)
        if (paras[i] != null) {
          paras[i].parentNode.removeChild(paras[i])
          i--
        }
      }
      this.isLoadMap = true
    },
    async activeItem(meterTripId, recDate, activeTripStatus) {
      this.isShowPairSpin = true
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
      this.isShowPairSpin = false
    },
    getPage(currentPage) {
      this.isShowPairSpin = true
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
      this.isShowPairSpin = false
    },
    gotoInfoPage(meterTripId, recDate) {
      this.$router.push({ path: '/transactionRecord/meterTripDetail', query: { meterTripId: meterTripId, recDate: recDate, driverType: this.driverType } })
    },
    getQueryAndInit() {
      let areaCode = this.$route.query.areaCode
      if (areaCode) { // 通过失物找回跳转到该页必带运营区域参数，通过该参数做总控制
        this.areaCode = areaCode
        this.isLostFoundOpen = true
        this.closeMeter = false
        let orgName = this.$route.query.orgName
        let orgLng = this.$route.query.orgLng
        let orgLat = this.$route.query.orgLat
        if (orgName && orgLng && orgLat) {
          this.mtsOrgLocName = orgName
          this.mtsOrgLocGps = [orgLng, orgLat]
          this.isLostFoundOpen = true
        } else {
          this.mtsOrgLocName = orgName
          this.mtsOrgLocGps = []
        }
        let orgTime = this.$route.query.orgTime
        if (orgTime && orgTime !== '-') {
          this.mtsOrgDate = new Date(dateFormat(new Date(orgTime), 'yyyy-MM-dd') + ' 00:00:00')
          this.mtsOrgTime = dateFormat(new Date(orgTime), 'hh:mm')
          this.isLostFoundOpen = true
        } else {
          this.mtsOrgDate = ''
          this.mtsOrgTime = ''
        }
        let destName = this.$route.query.destName
        let destLng = this.$route.query.destLng
        let destLat = this.$route.query.destLat
        if (destName && destLng && destLat) {
          this.mtsDestLocName = destName
          this.mtsDestLocGps = [destLng, destLat]
          this.isLostFoundOpen = true
        } else {
          this.mtsDestLocName = ''
          this.mtsDestLocGps = []
        }
        let destTime = this.$route.query.destTime
        if (destTime && destTime !== '-') {
          this.mtsDestDate = new Date(dateFormat(new Date(destTime), 'yyyy-MM-dd') + ' 00:00:00')
          this.mtsDestTime = dateFormat(new Date(destTime), 'hh:mm')
          this.isLostFoundOpen = true
        } else {
          this.mtsDestDate = ''
          this.mtsDestTime = ''
        }
        let timeLimit = this.$route.query.timeLimit
        if (timeLimit) {
          this.orgMin = timeLimit
          this.destMin = timeLimit
          this.isLostFoundOpen = true
        } else {
          this.orgMin = '5'
          this.destMin = '5'
        }
        if (this.$route.query.parentPath && this.$route.query.parentTitle) {
          this.parentPath = this.$route.query.parentPath
          this.parentTitle = this.$route.query.parentTitle
        }
      }
    }
  },
  async mounted() {
    this.isShowPairSpin = true
    await this.$store.dispatch('meterTripSearch/getGpsStepList')
    this.getAreaName() // 初始化运营区域成功后才获取选中的运营区域名
    this.getQueryAndInit()
    this.isShowPairSpin = false
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

  .meter-trip-search-content-input {
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    position: relative;
    cursor: text;
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

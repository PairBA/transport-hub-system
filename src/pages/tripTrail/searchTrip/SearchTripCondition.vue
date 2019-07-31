<template>
  <div class="searxh-trip__condition">
    <MenuSearchWrapper>
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
                      :editable="false"
                      :clearable="true"
                      :placeholder="$t('sysManage.queryBar.datePH')">
          </DatePicker>
          <TimePicker type="time"
                      v-model="mtsOrgTime"
                      format="HH:mm"
                      style="float: right;"
                      :editable="false"
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
                      :editable="false"
                      :clearable="true"
                      :placeholder="$t('sysManage.queryBar.datePH')">
          </DatePicker>
          <TimePicker type="time"
                      v-model="mtsDestTime"
                      format="HH:mm"
                      style="float: right;"
                      :disabled="destTimeDisabled"
                      :editable="false"
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
        <div style="text-align: center">
          <Button type="primary"
                  @click="goSearch">
            {{ $t("sysManage.queryBar.searchBT") }}
          </Button>
        </div>
      </Form>
    </MenuSearchWrapper>
  </div>
</template>

<script>
import { dateFormat } from '@/utils'
export default {
  data() {
    return {
      destTimeDisabled: false,
      isLostFoundOpen: false,
      isCheckIn: true
    }
  },
  computed: {
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
    },
    currentPage: {
      get() {
        return this.$store.state.meterTripSearch.meterTripListObject.currentPage
      },
      set(value) {
        this.$store.commit('meterTripSearch/updateMeterTripListObjectCurrentPage', value)
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
  watch: {
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
      this.showSpin = true
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
      this.showSpin = false
    }
  }
}
</script>

<style lang="less">
.searxh-trip__condition {
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

  .ivu-date-picker {
    width: 49%;
  }

  .ivu-radio-group-button {
    .ivu-radio-wrapper {
      color: #BFBFBF;
    }

    .ivu-radio-wrapper-checked {
      color: #2A9EF6;
    }
  }
}
</style>

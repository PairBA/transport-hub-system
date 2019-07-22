<template>
    <div class="vehicleTrajectory__homePage">
      <ContentLayout :showSpin="showSpin">
        <div slot="searchCondition">
          <Form>
            <FormItem label="车辆号牌">
              <Input v-model="vehicleNo" placeholder="请输入车辆号牌"/>
            </FormItem>
            <FormItem :label="$t('sysManage.commonVar.startDateAndTime')">
              <DatePicker v-model="vehtStartDate" :editable="false" :clearable="false" type="date"
                          :options="options" :placeholder="$t('sysManage.queryBar.datePH')"/>
              <TimePicker v-model="vehtStartHour" :editable="false" :clearable="false" format="HH:mm"
                          :placeholder="$t('sysManage.queryBar.timeSelectPH')"
                          style="margin-left: 24px"/>
            </FormItem>
            <FormItem :label="$t('sysManage.commonVar.endDateAndTime')">
              <DatePicker v-model="vehtEndDate" :editable="false" :clearable="false" type="date"
                          :options="options" :placeholder="$t('sysManage.queryBar.datePH')"/>
              <TimePicker v-model="vehtEndHour" :editable="false" :clearable="false" format="HH:mm"
                          :placeholder="$t('sysManage.queryBar.timeSelectPH')"
                          style="margin-left: 24px"/>
            </FormItem>
            <Divider/>
            <Button type="primary" style="margin: 0 0 24px 24px" @click="goSearch">{{$t("sysManage.queryBar.searchBT")}}</Button>
          </Form>
        </div>
        <div slot="content">
        </div>
      </ContentLayout>
    </div>
</template>

<script>
import ContentLayout from '@/components/ContentLayout'
import {
  get,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
export default {
  components: {
    ContentLayout
  },
  data() {
    return {
      vehicleNo: '',
      vehtStartDate: '',
      vehtStartHour: '',
      vehtEndDate: '',
      vehtEndHour: '',
      vehtCorrected: true,
      options: {
        disabledDate(date) {
          return date && date.valueOf() < new Date().getTime() - 15 * 24 * 60 * 60 * 1000
          // return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  methods: {
    goSearch() {

    },
    async getTrailListForVehicle() {
      const response = await get(END_POINTS.GET_TRAIL_LIST + `?vehicleNo=${this.vehicleNo}&driverType=TAXI&startDate=${dateFormat(new Date(this.vehtStartDate), 'yyyy-MM-dd')} ${this.vehtStartHour}:00&endDate=${dateFormat(new Date(this.vehtEndDate), 'yyyy-MM-dd')} ${this.vehtEndHour}:00&corrected=${this.vehtCorrected}`)
      if (response.success) {
        console.log(response)
      }
      return response
    }
  }
}
</script>

<style lang="less">
.vehicleTrajectory__homePage{}
</style>

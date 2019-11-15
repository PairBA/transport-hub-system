import login from './modules/login'
import permission from './modules/permission'
import meterTripSearch from './modules/meterTripSearch'
import search from './modules/search'
import focus from './modules/focus/focus'
import vehicleQuery from './modules/focus/vehicleQuery'
import exceptionQueue from './modules/anomaly/exceptionQueue'
import illegalBoarding from './modules/anomaly/illegalBoarding'
import gateVehicle from './modules/anomaly/gateVehicle'
import gpsAnomaly from './modules/anomaly/gpsAnomaly'
import gpsOnlineTime from './modules/anomaly/gpsOnlineTime'
import accountMgmt from './modules/accountMgmt/accountMgmt'
import watchDutySchedule from './modules/watchDutySchedule/watchDutySchedule'
import gateVehicleSearch from './modules/trafficFlow/gateVehicleSearch'
import capacityScheduling from './modules/capacityScheduling/capacityScheduling'
import driverSearch from './modules/areaManage/driverSearch'
import vehicleSearch from './modules/areaManage/vehicleSearch'

export default {
  login,
  permission,
  meterTripSearch,
  search,
  exceptionQueue,
  illegalBoarding,
  gateVehicle,
  gpsAnomaly,
  gpsOnlineTime,
  accountMgmt,
  focus,
  vehicleQuery,
  watchDutySchedule,
  gateVehicleSearch,
  capacityScheduling,
  driverSearch,
  vehicleSearch
}

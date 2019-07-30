import login from './modules/login'
import permission from './modules/permission'
import meterTripSearch from './modules/meterTripSearch'
import search from './modules/search'
import focus from './modules/focus/focus'
import vehicleQuery from './modules/focus/vehicleQuery'
import exceptionQueue from './modules/anomaly/exceptionQueue'
import illegalBoarding from './modules/anomaly/illegalBoarding'
import gateVehicle from './modules/anomaly/gateVehicle'
import accountMgmt from './modules/accountMgmt/accountMgmt'

export default {
  login,
  permission,
  meterTripSearch,
  search,
  exceptionQueue,
  illegalBoarding,
  gateVehicle,
  accountMgmt,
  focus,
  vehicleQuery
}

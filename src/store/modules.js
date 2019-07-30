import login from './modules/login'
import permission from './modules/permission'
import meterTripSearch from './modules/meterTripSearch'
import search from './modules/search'
import exceptionQueue from './modules/anomaly/exceptionQueue'
import illegalBoarding from './modules/anomaly/illegalBoarding'
import gateVehicle from './modules/anomaly/gateVehicle'

export default {
  login,
  permission,
  meterTripSearch,
  search,
  exceptionQueue,
  illegalBoarding,
  gateVehicle
}

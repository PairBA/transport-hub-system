export const searchComponentsReg = {
  VehicleTrajectorySearch: () => import('@/pages/tripTrail/vehicleTrajectory/VehicleTrajectorySearch.vue'),
  SearchTripCondition: () => import('@/pages/tripTrail/searchTrip/SearchTripCondition.vue'),
  TrafficFlowSearch: () => import('@/pages/trafficFlow/TrafficFlowSearch.vue'),
  ExceptionQueueCondition: () => import('@/pages/lawSupervising/exceptionQueue/ExceptionQueueCondition.vue'),
  IllegalBoardingCondition: () => import('@/pages/lawSupervising/illegalBoarding/IllegalBoardingCondition.vue'),
  GateVehicleCondition: () => import('@/pages/anomaly/gateVehicle/GateVehicleCondition.vue'),
  AccountMgmtCondition: () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtCondition.vue'),
  FocusSearch: () => import('@/pages/lawSupervising/focus/FocusSearch.vue'),
  VehicleQuerySearch: () => import('@/pages/lawSupervising/vehicleQuery/VehicleQuerySearch.vue'),
  WatchDutyScheduleCondition: () => import('@/pages/watchDutySchedule/watchDutySchedule/WatchDutyScheduleCondition.vue'),
  GateVehicleSearchCondition: () => import('@/pages/trafficFlow/gateVehicle/GateVehicleSearchCondition.vue'),
  GpsAnomalyCondition: () => import('@/pages/lawSupervising/gpsAnomaly/GpsAnomalyCondition.vue'),
  GpsOnlineTimeCondition: () => import('@/pages/anomaly/gpsOnlineTime/GpsOnlineTimeCondition.vue'),
  NoVehicleCondition: () => import('@/pages/lawSupervising/noVehicle/NoVehicleCondition.vue'),
  CloneVehicleCondition: () => import('@/pages/lawSupervising/cloneVehicle/CloneVehicleCondition.vue')
}

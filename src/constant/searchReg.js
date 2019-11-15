export const searchComponentsReg = {
  VehicleTrajectorySearch: () => import('@/pages/areaManage/vehicleTrajectory/VehicleTrajectorySearch.vue'),
  SearchTripCondition: () => import('@/pages/commonService/searchTrip/SearchTripCondition.vue'),
  TrafficFlowSearch: () => import('@/pages/areaManage/trafficFlow/TrafficFlowSearch.vue'),
  ExceptionQueueCondition: () => import('@/pages/lawSupervising/exceptionQueue/ExceptionQueueCondition.vue'),
  IllegalBoardingCondition: () => import('@/pages/lawSupervising/illegalBoarding/IllegalBoardingCondition.vue'),
  GateVehicleCondition: () => import('@/pages/lawSupervising/gateVehicle/GateVehicleCondition.vue'),
  AccountMgmtCondition: () => import('@/pages/systemManage/accountMgmt/AccountMgmtCondition.vue'),
  FocusSearch: () => import('@/pages/lawSupervising/focus/FocusSearch.vue'),
  VehicleQuerySearch: () => import('@/pages/lawSupervising/vehicleQuery/VehicleQuerySearch.vue'),
  WatchDutyScheduleCondition: () => import('@/pages/systemManage/watchDutySchedule/WatchDutyScheduleCondition.vue'),
  GateVehicleSearchCondition: () => import('@/pages/areaManage/gateVehicle/GateVehicleSearchCondition.vue'),
  GpsAnomalyCondition: () => import('@/pages/areaManage/gpsAnomaly/GpsAnomalyCondition.vue'),
  GpsOnlineTimeCondition: () => import('@/pages/lawSupervising/gpsOnlineTime/GpsOnlineTimeCondition.vue'),
  NoVehicleCondition: () => import('@/pages/lawSupervising/noVehicle/NoVehicleCondition.vue'),
  CloneVehicleCondition: () => import('@/pages/lawSupervising/cloneVehicle/CloneVehicleCondition.vue'),
  DriverSearch: () => import('@/pages/areaManage/driverSearch/DriverSearch.vue'),
  VehicleSearch: () => import('@/pages/areaManage/vehicleSearch/VehicleSearch.vue'),
  CapacitySchedulingSearch: () => import('@/pages/areaManage/capacityScheduling/CapacitySchedulingSearch.vue')
}

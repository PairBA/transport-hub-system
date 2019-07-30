export const searchComponentsReg = {
  VehicleTrajectorySearch: () => import('@/pages/tripTrail/vehicleTrajectory/VehicleTrajectorySearch.vue'),
  SearchTripCondition: () => import('@/pages/tripTrail/searchTrip/SearchTripCondition.vue'),
  TrafficFlowSearch: () => import('@/pages/trafficFlow/TrafficFlowSearch.vue'),
  ExceptionQueueCondition: () => import('@/pages/anomaly/exceptionQueue/ExceptionQueueCondition.vue'),
  IllegalBoardingCondition: () => import('@/pages/anomaly/illegalBoarding/IllegalBoardingCondition.vue'),
  GateVehicleCondition: () => import('@/pages/anomaly/gateVehicle/GateVehicleCondition.vue'),
  AccountMgmtCondition: () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtCondition.vue')
}

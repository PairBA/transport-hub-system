// 帐号管理
const AccountMgmtHomePage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtHomePage')
const RoleMgmtHomePage = () => import('@/pages/accountMgmt/roleMgmt/RoleMgmtHomePage')
// 值班表
const WatchDutyScheduleHomePage = () => import('@/pages/watchDutySchedule/watchDutySchedule/WatchDutyScheduleHomePage')
const ScheduleHomePage = () => import('@/pages/watchDutySchedule/schedule/ScheduleHomePage')
// 行程轨迹
const VehicleTrajectoryHomePage = () => import('@/pages/tripTrail/vehicleTrajectory/VehicleTrajectoryHomePage')
const SearchTripHomePage = () => import('@/pages/tripTrail/searchTrip/SearchTripHomePage')
// 异常告警
const ExceptionQueueHomePage = () => import('@/pages/anomaly/exceptionQueue/ExceptionQueueHomePage')
const GateVehicleHomePage = () => import('@/pages/anomaly/gateVehicle/GateVehicleHomePage')
const IllegalBoardingHomePage = () => import('@/pages/anomaly/illegalBoarding/IllegalBoardingHomePage')
const GpsAnomalyHomePage = () => import('@/pages/anomaly/gpsAnomaly/GpsAnomalyHomePage')
const GpsOnlineTimeHomePage = () => import('@/pages/anomaly/gpsOnlineTime/GpsOnlineTimeHomePage')
// 车流量
const TrafficFlowHomePage = () => import('@/pages/trafficFlow/TrafficFlowHomePage')
const GateVehicleSearchHomePage = () => import('@/pages/trafficFlow/gateVehicle/GateVehicleHomePage')
// 重点关注
const FocusHomePage = () => import('@/pages/focus/focus/FocusHomePage')
const VehicleQueryHomePage = () => import('@/pages/focus/vehicleQuery/VehicleQueryHomePage')

export const accountMgmt = [
  {
    name: '账号管理',
    path: '/accountMgmt/accountMgmtHomePage',
    search: 'AccountMgmtCondition',
    component: AccountMgmtHomePage
  },
  {
    name: '角色管理',
    path: '/accountMgmt/roleMgmtHomePage',
    search: '',
    component: RoleMgmtHomePage
  }
]

export const watchDutySchedule = [
  {
    name: '值班表',
    path: '/watchDutySchedule/watchDutyScheduleHomePage',
    search: 'WatchDutyScheduleCondition',
    component: WatchDutyScheduleHomePage
  },
  {
    name: '班次时间',
    path: '/watchDutySchedule/scheduleHomePage',
    search: '',
    component: ScheduleHomePage
  }
]

export const tripTrail = [
  {
    name: '车辆轨迹',
    path: '/tripTrail/vehicleTrajectoryHomePage',
    search: 'VehicleTrajectorySearch',
    component: VehicleTrajectoryHomePage
  },
  {
    name: '行程查找',
    path: '/tripTrail/searchTripHomePage',
    search: 'SearchTripCondition',
    component: SearchTripHomePage
  }
]

export const trafficFlow = [
  {
    name: '车流量统计',
    path: '/trafficFlow/TrafficFlowHomePage',
    search: 'TrafficFlowSearch',
    component: TrafficFlowHomePage
  },
  {
    name: '闸口车辆查询',
    path: '/trafficFlow/gateVehicleHomePage',
    search: 'GateVehicleSearchCondition',
    component: GateVehicleSearchHomePage
  }
]

export const focus = [
  {
    name: '重点关注',
    path: '/focus/FocusHomePage',
    search: 'FocusSearch',
    component: FocusHomePage
  },
  {
    name: '加入重点关注',
    path: '/focus/VehicleQueryHomePage',
    search: 'VehicleQuerySearch',
    component: VehicleQueryHomePage
  }
]

export const anomaly = [
  {
    name: '异常排队',
    path: '/anomaly/exceptionQueueHomePage',
    search: 'ExceptionQueueCondition',
    component: ExceptionQueueHomePage
  },
  {
    name: '闸口异常车辆',
    path: '/anomaly/gateVehicleHomePage',
    search: 'GateVehicleCondition',
    component: GateVehicleHomePage
  },
  {
    name: '违规上客',
    path: '/anomaly/illegalBoardingHomePage',
    search: 'IllegalBoardingCondition',
    component: IllegalBoardingHomePage
  },
  {
    name: 'GPS异常统计',
    path: '/anomaly/gpsAnomalyHomePage',
    search: 'GpsAnomalyCondition',
    component: GpsAnomalyHomePage
  },
  {
    name: 'GPS在线时间',
    path: '/anomaly/gpsOnlineHomePage',
    search: 'GpsOnlineTimeCondition',
    component: GpsOnlineTimeHomePage
  }
]

export default [
  ...anomaly,
  ...watchDutySchedule,
  ...accountMgmt,
  ...focus,
  ...trafficFlow,
  ...tripTrail
]

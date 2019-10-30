// 异常告警
// const GateVehicleHomePage = () => import('@/pages/anomaly/gateVehicle/GateVehicleHomePage')

// 重点关注
const VehicleQueryHomePage = () => import('@/pages/focus/vehicleQuery/VehicleQueryHomePage')
// 执法监察
const GpsAnomalyHomePage = () => import('@/pages/anomaly/gpsAnomaly/GpsAnomalyHomePage')
const MeterTripErrorHomePage = () => import('@/pages/lawSupervising/meterTripError/MeterTripErrorHomePage')
const FocusHomePage = () => import('@/pages/focus/focus/FocusHomePage')
const ExceptionQueueHomePage = () => import('@/pages/anomaly/exceptionQueue/ExceptionQueueHomePage')
const IllegalBoardingHomePage = () => import('@/pages/anomaly/illegalBoarding/IllegalBoardingHomePage')
const NoVehicleHomePage = () => import('@/pages/lawSupervising/noVehicle/NoVehicleHomePage')
const CloneVehicleHomePage = () => import('@/pages/lawSupervising/cloneVehicle/CloneVehicleHomePage')

// 区域管理
const TrafficFlowHomePage = () => import('@/pages/trafficFlow/TrafficFlowHomePage')
const GateVehicleSearchHomePage = () => import('@/pages/trafficFlow/gateVehicle/GateVehicleHomePage')
const VehicleTrajectoryHomePage = () => import('@/pages/tripTrail/vehicleTrajectory/VehicleTrajectoryHomePage')
const ActiveSafetyHomePage = () => import('@/pages/areaManage/activeSafety/ActiveSafetyHomePage')
const CapacitySchedulingHomePage = () => import('@/pages/areaManage/capacityScheduling/CapacitySchedulingHomePage')

// 公共服务
const ShortTripHomePage = () => import('@/pages/commonService/shortTrip/ShortTripHomePage')
const SearchTripHomePage = () => import('@/pages/tripTrail/searchTrip/SearchTripHomePage')

// 系统设置
const AccountMgmtHomePage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtHomePage')
const RoleMgmtHomePage = () => import('@/pages/accountMgmt/roleMgmt/RoleMgmtHomePage')
const WatchDutyScheduleHomePage = () => import('@/pages/watchDutySchedule/watchDutySchedule/WatchDutyScheduleHomePage')
const ScheduleHomePage = () => import('@/pages/watchDutySchedule/schedule/ScheduleHomePage')
export const lawSupervising = [
  {
    name: 'GPS异常',
    path: '/lawSupervising/gpsAnomalyHomePage',
    search: 'GpsAnomalyCondition',
    component: GpsAnomalyHomePage
  },
  {
    name: '计价器异常',
    path: '/lawSupervising/meterTripErrorHomePage',
    search: '',
    component: MeterTripErrorHomePage
  },
  {
    name: '重点关注',
    path: '/lawSupervising/FocusHomePage',
    search: 'FocusSearch',
    component: FocusHomePage
  },
  {
    name: '异常排队',
    path: '/lawSupervising/exceptionQueueHomePage',
    search: 'ExceptionQueueCondition',
    component: ExceptionQueueHomePage
  },
  {
    name: '违规上客',
    path: '/lawSupervising/illegalBoardingHomePage',
    search: 'IllegalBoardingCondition',
    component: IllegalBoardingHomePage
  },
  {
    name: '未注册车',
    path: '/lawSupervising/noVehicleHomePage',
    search: 'NoVehicleCondition',
    component: NoVehicleHomePage
  },
  {
    name: '疑似克隆车',
    path: '/lawSupervising/cloneVehicleHomePage',
    search: 'CloneVehicleCondition',
    component: CloneVehicleHomePage
  }
]
export const areaManage = [
  {
    name: '车流量统计',
    path: '/areaManage/TrafficFlowHomePage',
    search: 'TrafficFlowSearch',
    component: TrafficFlowHomePage
  },
  {
    name: '闸口车辆查询',
    path: '/areaManage/gateVehicleHomePage',
    search: 'GateVehicleSearchCondition',
    component: GateVehicleSearchHomePage
  },
  {
    name: '车辆轨迹',
    path: '/areaManage/vehicleTrajectoryHomePage',
    search: 'VehicleTrajectorySearch',
    component: VehicleTrajectoryHomePage
  },
  {
    name: '主动安全',
    path: '/areaManage/activeSafetyHomePage',
    search: '',
    component: ActiveSafetyHomePage
  },
  {
    name: '运力调度',
    path: '/areaManage/capacitySchedulingHomePage',
    search: '',
    component: CapacitySchedulingHomePage
  }
]

export const commonService = [
  {
    name: '短途补员',
    path: '/commonService/shortTripHomePage',
    search: '',
    component: ShortTripHomePage
  },
  {
    name: '行程查找',
    path: '/commonService/searchTripHomePage',
    search: 'SearchTripCondition',
    component: SearchTripHomePage
  }
]

export const systemManage = [
  {
    name: '值班表',
    path: '/systemManage/watchDutyScheduleHomePage',
    search: 'WatchDutyScheduleCondition',
    component: WatchDutyScheduleHomePage
  },
  {
    name: '班次时间',
    path: '/systemManage/scheduleHomePage',
    search: '',
    component: ScheduleHomePage
  },
  {
    name: '账号管理',
    path: '/systemManage/accountMgmtHomePage',
    search: 'AccountMgmtCondition',
    component: AccountMgmtHomePage
  },
  {
    name: '角色管理',
    path: '/systemManage/roleMgmtHomePage',
    search: '',
    component: RoleMgmtHomePage
  }
]

export const focus = [
  {
    name: '加入重点关注',
    path: '/focus/VehicleQueryHomePage',
    search: 'VehicleQuerySearch',
    component: VehicleQueryHomePage
  }
]

// export const anomaly = [
//   {
//     name: '闸口异常车辆',
//     path: '/anomaly/gateVehicleHomePage',
//     search: 'GateVehicleCondition',
//     component: GateVehicleHomePage
//   },
//   {
//     name: 'GPS在线时长',
//     path: '/anomaly/gpsOnlineHomePage',
//     search: 'GpsOnlineTimeCondition',
//     component: GpsOnlineTimeHomePage
//   }
// ]

export default [
  ...lawSupervising,
  ...commonService,
  ...areaManage,
  ...systemManage
]

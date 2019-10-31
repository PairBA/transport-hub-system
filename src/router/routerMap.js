// 执法监察
const GpsAnomalyHomePage = () => import('@/pages/lawSupervising/gpsAnomaly/GpsAnomalyHomePage')
const MeterTripErrorHomePage = () => import('@/pages/lawSupervising/meterTripError/MeterTripErrorHomePage')
const FocusHomePage = () => import('@/pages/lawSupervising/focus/FocusHomePage')
const VehicleQueryHomePage = () => import('@/pages/lawSupervising/vehicleQuery/VehicleQueryHomePage')
const ExceptionQueueHomePage = () => import('@/pages/lawSupervising/exceptionQueue/ExceptionQueueHomePage')
const IllegalBoardingHomePage = () => import('@/pages/lawSupervising/illegalBoarding/IllegalBoardingHomePage')
const NoVehicleHomePage = () => import('@/pages/lawSupervising/noVehicle/NoVehicleHomePage')
const CloneVehicleHomePage = () => import('@/pages/lawSupervising/cloneVehicle/CloneVehicleHomePage')

// 区域管理
const TrafficFlowHomePage = () => import('@/pages/areaManage/trafficFlow/TrafficFlowHomePage')
const GateVehicleSearchHomePage = () => import('@/pages/areaManage/gateVehicle/GateVehicleHomePage')
const VehicleTrajectoryHomePage = () => import('@/pages/areaManage/vehicleTrajectory/VehicleTrajectoryHomePage')
const ActiveSafetyHomePage = () => import('@/pages/areaManage/activeSafety/ActiveSafetyHomePage')
const CapacitySchedulingHomePage = () => import('@/pages/areaManage/capacityScheduling/CapacitySchedulingHomePage')

// 公共服务
const ShortTripHomePage = () => import('@/pages/commonService/shortTrip/ShortTripHomePage')
const SearchTripHomePage = () => import('@/pages/commonService/searchTrip/SearchTripHomePage')

// 系统设置
const AccountMgmtHomePage = () => import('@/pages/systemManage/accountMgmt/AccountMgmtHomePage')
const RoleMgmtHomePage = () => import('@/pages/systemManage/roleMgmt/RoleMgmtHomePage')
const WatchDutyScheduleHomePage = () => import('@/pages/systemManage/watchDutySchedule/WatchDutyScheduleHomePage')
const ScheduleHomePage = () => import('@/pages/systemManage/schedule/ScheduleHomePage')
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
    name: '加入重点关注',
    path: '/lawSupervising/VehicleQueryHomePage',
    search: 'VehicleQuerySearch',
    component: VehicleQueryHomePage
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

export default [
  ...lawSupervising,
  ...commonService,
  ...areaManage,
  ...systemManage
]

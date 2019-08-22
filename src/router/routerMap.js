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
// 车流量
const TrafficFlowHomePage = () => import('@/pages/trafficFlow/TrafficFlowHomePage')
const GateVehicleSearchHomePage = () => import('@/pages/trafficFlow/gateVehicle/GateVehicleHomePage')
// 重点关注
const FocusHomePage = () => import('@/pages/focus/focus/FocusHomePage')
const VehicleQueryHomePage = () => import('@/pages/focus/vehicleQuery/VehicleQueryHomePage')

export default [
  {
    name: '账号管理',
    path: '/accountMgmt/accountMgmtHomePage',
    component: AccountMgmtHomePage
  },
  {
    name: '角色管理',
    path: '/accountMgmt/roleMgmtHomePage',
    component: RoleMgmtHomePage
  },
  {
    name: '班次时间',
    path: '/watchDutySchedule/scheduleHomePage',
    component: ScheduleHomePage
  },
  {
    name: '值班表',
    path: '/watchDutySchedule/watchDutyScheduleHomePage',
    component: WatchDutyScheduleHomePage
  },
  {
    name: '车辆轨迹',
    path: '/tripTrail/vehicleTrajectoryHomePage',
    component: VehicleTrajectoryHomePage
  },
  {
    name: '行程查找',
    path: '/tripTrail/searchTripHomePage',
    component: SearchTripHomePage
  },
  {
    name: '异常排队',
    path: '/anomaly/exceptionQueueHomePage',
    component: ExceptionQueueHomePage
  },
  {
    name: '闸口异常车辆',
    path: '/anomaly/gateVehicleHomePage',
    component: GateVehicleHomePage
  },
  {
    name: '违规上客',
    path: '/anomaly/illegalBoardingHomePage',
    component: IllegalBoardingHomePage
  },
  {
    name: '车流量统计',
    path: '/trafficFlow/TrafficFlowHomePage',
    component: TrafficFlowHomePage
  },
  {
    name: '闸口车辆查询',
    path: '/trafficFlow/GateVehicleHomePage',
    component: GateVehicleSearchHomePage
  },
  {
    name: '重点关注',
    path: '/focus/FocusHomePage',
    component: FocusHomePage
  },
  {
    name: '加入重点关注',
    path: '/focus/VehicleQueryHomePage',
    component: VehicleQueryHomePage
  }
]

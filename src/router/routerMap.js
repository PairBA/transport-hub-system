// 帐号管理
const AccountMgmtHomePage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtHomePage')
const RoleMgmtHomePage = () => import('@/pages/accountMgmt/roleMgmt/RoleMgmtHomePage')
// 值班表
const WatchDutyScheduleHomePage = () => import('@/pages/watchDutySchedule/watchDutySchedule/WatchDutyScheduleHomePage')
const ScheduleHomePage = () => import('@/pages/watchDutySchedule/schedule/ScheduleHomePage')
// 行程轨迹
const VehicleTrajectoryHomePage = () => import('@/pages/tripTrail/vehicleTrajectory/VehicleTrajectoryHomePage')
const SearchTripHomePage = () => import('@/pages/tripTrail/searchTrip/SearchTripHomePage')
// 车流量
const TrafficFlowHomePage = () => import('@/pages/trafficFlow/TrafficFlowHomePage')
// 重点关注
const FocusHomePage = () => import('@/pages/focus/focus/FocusHomePage')
const VehicleQueryHomePage = () => import('@/pages/focus/vehicleQuery/VehicleQueryHomePage')

export default [
  {
    name: 'accountMgmtHomePage',
    path: '/accountMgmt/accountMgmtHomePage',
    component: AccountMgmtHomePage
  },
  {
    name: 'roleMgmtHomePage',
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
    name: '车流量统计',
    path: '/trafficFlow/TrafficFlowHomePage',
    component: TrafficFlowHomePage
  },
  {
    name: '重点关注',
    path: '/focus/FocusHomePage',
    component: FocusHomePage
  },
  {
    name: '车辆查询',
    path: '/focus/VehicleQueryHomePage',
    component: VehicleQueryHomePage
  }
]

// 帐号管理
const AccountMgmtHomePage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtHomePage')
const RoleMgmtHomePage = () => import('@/pages/accountMgmt/roleMgmt/RoleMgmtHomePage')
// 值班表
const WatchDutyScheduleHomePage = () => import('@/pages/watchDutySchedule/watchDutySchedule/WatchDutyScheduleHomePage')
const ScheduleHomePage = () => import('@/pages/watchDutySchedule/schedule/ScheduleHomePage')
// 行程轨迹
const VehicleTrajectoryHomePage = () => import('@/pages/tripTrail/vehicleTrajectory/VehicleTrajectoryHomePage')
const SearchTripHomePage = () => import('@/pages/tripTrail/searchTrip/SearchTripHomePage')
export default [
  {
    name: '帐号管理',
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
  }
]

// 帐号管理
const AccountMgmtHomePage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtHomePage')
const RoleMgmtHomePage = () => import('@/pages/accountMgmt/roleMgmt/RoleMgmtHomePage')
// 值班表
const ScheduleHomePage = () => import('@/pages/watchDutySchedule/schedule/ScheduleHomePage')
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
  }
]

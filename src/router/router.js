import routerMap from '@/router/routerMap'
const MainPage = () => import('@/pages/MainPage')
const Login = () => import('@/pages/Login')
const NotFound = () => import('@/pages/NotFound')
const AccountMgmtAddPage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtAddPage')
const AccountMgmtEditPage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtEditPage')
const RoleMgmtAddPage = () => import('@/pages/accountMgmt/roleMgmt/RoleMgmtAddPage')
const RoleMgmtEditPage = () => import('@/pages/accountMgmt/roleMgmt/RoleMgmtEditPage')
const ScheduleAddPage = () => import('@/pages/watchDutySchedule/schedule/ScheduleAddPage')
const ScheduleEditPage = () => import('@/pages/watchDutySchedule/schedule/ScheduleEditPage')

export const routerCommon = {
  path: '/',
  component: MainPage,
  children: [
    ...routerMap,
    {
      path: '/accountMgmt/accountMgmtAddPage',
      name: '新增账号',
      component: AccountMgmtAddPage
    },
    {
      path: '/accountMgmt/accountMgmtEditPage',
      name: '修改账号',
      component: AccountMgmtEditPage
    },
    {
      path: '/accountMgmt/roleMgmtAddPage',
      name: '新增角色',
      component: RoleMgmtAddPage
    },
    {
      path: '/accountMgmt/roleMgmtEditPage',
      name: '修改角色',
      component: RoleMgmtEditPage
    },
    {
      path: '/watchDutySchedule/scheduleAddPage',
      name: '新增班次',
      component: ScheduleAddPage
    },
    {
      path: '/watchDutySchedule/scheduleEditPage',
      name: '编辑班次',
      component: ScheduleEditPage
    }
  ]
}

export const routers = [
  routerCommon,
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '*',
    component: NotFound
  }
]

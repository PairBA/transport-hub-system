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
const ExceptionQueueDetail = () => import('@/pages/lawSupervising/exceptionQueue/ExceptionQueueDetail')
const IllegalBoardingDetail = () => import('@/pages/lawSupervising/illegalBoarding/IllegalBoardingDetail')
const GpsOnlineTimeHomePage = () => import('@/pages/anomaly/gpsOnlineTime/GpsOnlineTimeHomePage')
export const routerCommon = {
  path: '/',
  component: MainPage,
  children: [
    ...routerMap,
    {
      path: '/systemManage/accountMgmtAddPage',
      name: '新增账号',
      component: AccountMgmtAddPage
    },
    {
      path: '/systemManage/accountMgmtEditPage',
      name: '修改账号',
      component: AccountMgmtEditPage
    },
    {
      path: '/systemManage/roleMgmtAddPage',
      name: '新增角色',
      component: RoleMgmtAddPage
    },
    {
      path: '/systemManage/roleMgmtEditPage',
      name: '修改角色',
      component: RoleMgmtEditPage
    },
    {
      path: '/systemManage/scheduleAddPage',
      name: '新增班次',
      component: ScheduleAddPage
    },
    {
      path: '/systemManage/scheduleEditPage',
      name: '编辑班次',
      component: ScheduleEditPage
    },
    {
      path: '/lawSupervising/exceptionQueueDetail',
      name: '异常排队详情',
      component: ExceptionQueueDetail
    },
    {
      path: '/lawSupervising/illegalBoardingDetail',
      name: '违规上客详情',
      component: IllegalBoardingDetail
    },
    {
      name: 'GPS在线时长',
      path: '/lawSupervising/gpsOnlineHomePage',
      component: GpsOnlineTimeHomePage
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

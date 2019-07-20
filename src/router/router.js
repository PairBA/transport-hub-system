import routerMap from '@/router/routerMap'
const MainPage = () => import('@/pages/MainPage')
const Login = () => import('@/pages/Login')
const NotFound = () => import('@/pages/NotFound')
const index = () => import('@/pages/index')
const AccountMgmtAddPage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtAddPage')
const AccountMgmtEditPage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtEditPage')

export const routerCommon = {
  path: '/',
  component: MainPage,
  children: [
    ...routerMap,
    {
      path: '/realMap/index',
      name: 'index',
      component: index
    },
    {
      path: '/accountMgmt/accountMgmtAddPage',
      name: '新增账号',
      component: AccountMgmtAddPage
    },
    {
      path: '/accountMgmt/accountMgmtEditPage',
      name: '修改账号',
      component: AccountMgmtEditPage
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

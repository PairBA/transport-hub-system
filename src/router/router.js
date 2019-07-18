const MainPage = () => import('@/pages/MainPage')
const Login = () => import('@/pages/Login')
const NotFound = () => import('@/pages/NotFound')
const index = () => import('@/pages/index')

export const routerCommon = {
  path: '/',
  component: MainPage,
  children: [
    {
      path: '/realMap/index',
      name: 'index',
      component: index
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

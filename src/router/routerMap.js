// 帐号管理
const AccountMgmtHomePage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtHomePage')
const RoleMgmtHomePage = () => import('@/pages/accountMgmt/accountMgmt/RoleMgmtHomePage')
export default [
  {
    name: 'accountMgmtHomePage',
    path: '/accountMgmt/accountMgmtHomePage',
    component: AccountMgmtHomePage
  },
  {
    name: 'accountMgmtHomePage',
    path: '/accountMgmt/roleMgmtHomePage',
    component: RoleMgmtHomePage
  }
]

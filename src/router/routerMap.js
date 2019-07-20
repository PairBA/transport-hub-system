// 帐号管理
const AccountMgmtHomePage = () => import('@/pages/accountMgmt/accountMgmt/AccountMgmtHomePage')
const RoleMgmtHomePage = () => import('@/pages/accountMgmt/roleMgmt/RoleMgmtHomePage')
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
  }
]

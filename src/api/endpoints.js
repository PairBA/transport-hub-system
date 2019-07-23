export default {
  LOGIN: '/api/lawSystem/auth/login',
  TOKEN_EXPIRE: '/api/lawSystem/auth/tokenExpire',
  GET_RESOURCE_LIST: '/api/lawSystem/accountManage/getResourceList',
  GET_ROLE_LIST: '/api/lawSystem/accountManage/getRoleList',
  // 帐号管理
  GET_USER_LIST: '/api/lawSystem/accountManage/getUserList',
  ADD_USER: '/api/lawSystem/accountManage/addUser',
  DELETE_USER_BY_ID: '/api/lawSystem/accountManage/deleteUserById',
  GET_USER_BY_ID: '/api/lawSystem/accountManage/getUserById',
  EDIT_USER: '/api/lawSystem/accountManage/editUser',
  // 角色管理
  ADD_ROLE: '/api/lawSystem/accountManage/addRole',
  GET_ROLE_BY_ID: '/api/lawSystem/accountManage/getRoleById',
  EDIT_ROLE: '/api/lawSystem/accountManage/editRole',
  DELETE_ROLE_BY_ID: '/api/lawSystem/accountManage/deleteRoleById',
  // 班次
  GET_SCHEDULE_LIST: '/api/lawSystem/gateAlert/getScheduleList',
  ADD_SCHEDULE: '/api/lawSystem/gateAlert/addSchedule',
  GET_SCHEDULE_BY_ID: '/api/lawSystem/gateAlert/getScheduleById',
  EDIT_SCHEDULE: '/api/lawSystem/gateAlert/editSchedule',
  DELETE_SCHEDULE_BY_ID: '/api/lawSystem/gateAlert/deleteScheduleById',
  // 值班表
  GET_PLAN_DETAIL_LIST: '/api/lawSystem/gateAlert/getPlanDetailList',
  GET_PLAN_WORKER_LIST: '/api/lawSystem/gateAlert/getPlanWorkerList',
  ADD_PLAN_WORKER: '/api/lawSystem/gateAlert/addPlanWorker',
  DELETE_PLAN_WORKER: '/api/lawSystem/gateAlert/deletePlanWorker',
  // 行程轨迹
  GET_TRAIL_LIST: '/api/vehicle/trail/getTrailList',
  GET_CODE_TYPE: '/api/admin/cmCode/getCodeType',
  GET_METER_TRIP_SEARCH_LIST: '/api/meterTrip/getMeterTripSearchList', // 行程查找分页查询
  GET_GPS_LIST: '/api/meterTrip/getGpsList'
}

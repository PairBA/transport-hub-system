export default {
  LOGIN: '/api/lawSystem/auth/login',
  LOGOUT: '/api/lawSystem/auth/logout',
  TOKEN_EXPIRE: '/api/lawSystem/auth/tokenExpire',
  GET_RESOURCE_LIST: '/api/lawSystem/accountManage/getResourceList',
  GET_RESOURCE_LIST_BY_ROLE: '/api/lawSystem/auth/getResourceListByRole',
  GET_ROLE_LIST: '/api/lawSystem/accountManage/getRoleList',
  GET_COMP_LIST_FOR_SELECT_BY_AREA_CODE: 'api/dmComp/getCompListForSelectByAreaCode',
  GET_CENTER_GPS_BY_AREA_CODE: 'api/admin/commonInfo/getCenterGpsByAreaCode',
  GET_TERMINAL_LIST: 'api/gpsQuality/getTerminalList',
  GET_GATE_JUDGE_LIST: 'api/gateVehicle/getGateJudgeList',
  // 帐号管理
  GET_USER_LIST: '/api/lawSystem/accountManage/getUserList',
  ADD_USER: '/api/lawSystem/accountManage/addUser',
  DELETE_USER_BY_ID: '/api/lawSystem/accountManage/deleteUserById',
  GET_USER_BY_ID: '/api/lawSystem/accountManage/getUserById',
  EDIT_USER: '/api/lawSystem/accountManage/editUser',
  GET_ROLE_LIST_FOR_SELECT: '/api/lawSystem/accountManage/getRoleListForSelect',
  // 角色管理
  ADD_ROLE: '/api/lawSystem/accountManage/addRole',
  GET_ROLE_BY_ID: '/api/lawSystem/accountManage/getRoleById',
  EDIT_ROLE: '/api/lawSystem/accountManage/editRole',
  DELETE_ROLE_BY_ID: '/api/lawSystem/accountManage/deleteRoleById',
  GET_MANAGE_TREE_FOR_LAW_ROLE: 'api/lawSystem/meManage/getManageTreeForLawRole',
  GET_APPLET_TREE_FOR_LAW_ROLE: 'api/lawSystem/meManage/getAppletTreeForLawRole',
  // 班次
  GET_SCHEDULE_LIST: '/api/lawSystem/gateAlert/getScheduleList',
  ADD_SCHEDULE: '/api/lawSystem/gateAlert/addSchedule',
  GET_SCHEDULE_BY_ID: '/api/lawSystem/gateAlert/getScheduleById',
  EDIT_SCHEDULE: '/api/lawSystem/gateAlert/editSchedule',
  DELETE_SCHEDULE_BY_ID: '/api/lawSystem/gateAlert/deleteScheduleById',
  // 值班表
  GET_PLAN_DETAIL_LIST: '/api/lawSystem/gateAlert/getPlanDetailList',
  // 车流量统计
  GET_VEHICLE_FLOW_COUNT: '/api/vehicleFlowCount/getVehicleFlowCount',
  GET_VEHICLE_FLOW_COUNT_EXCEL: '/api/vehicleFlowCount/getVehicleFlowCountExcel',
  // 重点关注
  GET_HUB_FOCUS_VEHICLE_LIST: '/api/transhub/fullscreen/getHubFocusVehicleList',
  GET_HUB_FOCUS_VEHICLE_EXCEL: '/api/transhub/fullscreen/getHubFocusVehicleExcel',
  GET_HUB_STAT_TRAIL_LIST: '/api/transhub/fullscreen/getHubStatTrailList',
  GET_HUB_STAT_TRAIL_ALL_EXCEL: '/api/transhub/fullscreen/getHubStatTrailAllExcel',
  GET_LAST_TRAIL_LIST: '/api/vehicle/trail/getLastTrailList',
  CANCEL_FOCUS: '/api/transhub/fullscreen/cancelFocus',
  IS_VEHICLE_FOCUS: '/api/transhub/fullscreen/isVehicleFocus',
  UPLOAD_FOCUS_VEHICLE_LIST: '/api/transhub/fullscreen/uploadFocusVehicleList',
  GET_VEHICLE_INFO_BY_NO: '/api/dmVehicle/getVehicleInfoByNo',
  FOCUS_VEHICLE: '/api/transhub/fullscreen/focusVehicle',
  GET_PLAN_WORKER_LIST: '/api/lawSystem/gateAlert/getPlanWorkerList',
  ADD_PLAN_WORKER: '/api/lawSystem/gateAlert/addPlanWorker',
  DELETE_PLAN_WORKER: '/api/lawSystem/gateAlert/deletePlanWorker',
  // 行程轨迹
  GET_TRAIL_LIST: '/api/vehicle/trail/getTrailList',
  GET_CODE_TYPE: '/api/admin/cmCode/getCodeType',
  GET_METER_TRIP_SEARCH_LIST: '/api/meterTrip/getMeterTripSearchList', // 行程查找分页查询
  GET_GPS_LIST: '/api/meterTrip/getGpsList',
  // 异常排队
  GET_HUB_SUM_QCUT_LIST_DETAIL: '/api/transhub/fullscreen/getHubQcutListDetail',
  GET_HUB_SUM_ON_ALERT_LIST_DETAIL: '/api/transhub/fullscreen/getHubOnAlertListDetail',
  EXPORT_GATE_JUDGE_REPORT: '/api/gateVehicle/exportGateJudgeReport',
  GET_HUB_EVENT_LIST: '/api/transhub/trailReplay/getHubEventList',
  GET_HUB_STAT_TRAIL_CUTQ_EXCEL: '/api/transhub/fullscreen/getHubStatTrailCutqExcel',
  GET_HUB_STAT_TRAIL_ALERTON_EXCEL: '/api/transhub/fullscreen/getHubStatTrailAlertOnExcel',
  GET_TRANS_HUB_POLYGON_AREA: '/api/transhub/polygon/getTransHubPolygonArea',
  GET_HUB_STAT_TRAIL_GRAPH: '/api/lawSystem/graph/getHubStatTrailGraph',
  GET_GATE_JUDGE_GRAPH: '/api/lawSystem/graph/getGateJudgeGraph',
  UPLOAD_WORKER_LIST: '/api/lawSystem/gateAlert/uploadWorkerList',
  // GPS异常统计
  GET_GPS_ERROR_STAT_LIST: '/api/gateVehicle/getGpsErrorStatList',
  EXPORT_GPS_ERROR_STAT_LIST: '/api/gateVehicle/exportGpsErrorStatList',
  GET_GPS_POINT_COUNT: 'api/gpsQuality/getGpsPointCount',
  // 闸口车辆查询
  GET_GATE_VEHICLE_LIST: '/api/gateVehicle/getGateVehicleList',
  EXPORT_GATE_VEHICLE_LIST: '/api/gateVehicle/exportGateVehicleList',
  // 驾驶员查询
  GET_DRIVER_BASE_INFO_LIST: '/api/tocc/driver/getDriverBaseInfoList'
}

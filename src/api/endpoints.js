export default {
  LOGIN: 'auth/name',
  TOKEN_EXPIRE: 'auth/TokenExpire',
  CAPTCHA: 'auth/captcha',
  TRANSHUB_EST: 'api/transhub/est/getDynamicData',
  GET_HUB_LIST: 'api/transhub/getHubList',
  GET_HUB_LIST_BY_AREA_CODE: 'api/transhub/getHubListByAreaCode',
  GET_TRANSPORT_NOTIFY_CONFIG: 'api/transhub/config/getTransportNotifyConfig',
  GET_TRANSPORT_STAT: 'api/transhub/getStatData',
  GET_TRANSPORT_TRAIL_LIST: 'api/transhub/trailReplay/getTransHubTrailList',
  GET_TRANS_HUB_POLYGON_AREA: 'api/transhub/polygon/getTransHubPolygonArea',
  GET_TRANSHUB_TRAIL_COUNT: 'api/transhub/trailReplay/getHubTrailCount',
  GET_TRANSHUB_HEATMAP_LIST: 'api/transhub/trip/getHeatMapList',
  GET_HUB_TRAIL_LIST: 'api/transhub/trailReplay/getHubTrailList',
  GET_HUB_EVENT_LIST: 'api/transhub/trailReplay/getHubEventList',
  UPDATE_HUB_NOTIFY_CONFIG: 'api/transhub/config/updateTransportNotifyConfig',
  UPDATE_HUB_NOTIFY_TYPE: 'api/transhub/config/updateTransportNotifyType',
  NOTIFY_DRIVER_BY_MAN: 'api/transhub/est/notifyDriverByMan',
  GET_NOTIFY_HIST_LIMIT_THREE: 'api/transhub/hist/getNotifyHistListLimitThree',
  GET_NOTIFY_HIST_LIST: 'api/transhub/hist/getNotifyHistList',
  GET_LAST_TRANSHUB_NOTIFY_CONFIG: 'api/transhub/config/getLastTransportNotifyConfig',
  GET_DISTANCE_LIST: 'api/transhub/trip/getDistanceList',
  GET_SHORTCUT_LIST: 'api/transhub/shortcut/getShortcutList',
  GET_HUB_TRIP_LIST_BY_VEHICLE_NO: 'api/transhub/trip/getHubTripListByVehicleNo',
  GET_HUB_TRIP_LIST: 'api/transhub/trip/getHubTripList',
  ADD_BLACK_LIST: 'api/transhub/trip/addBlackList',
  GET_HUB_COUNT_TRIP: 'api/transhub/fullscreen/getHubCountTrip',
  GET_HUB_GRAPH: 'api/transhub/fullscreen/getHubGraph',
  GET_SMART_DISPATCH_LIST: 'api/transhub/fullscreen/getSmartDispatchList',
  GET_HUB_STAT_VEHICLE_LIST: 'api/transhub/fullscreen/getHubStatVehicleList',
  GET_HUB_OVERVIEW: 'api/transhub/fullscreen/getHubOverview',
  GET_HUB_MAP: 'api/transhub/fullscreen/getHubMap',
  GET_HUB_STAT_TRAIL_LIST: 'api/transhub/fullscreen/getHubStatTrailList',
  GET_HUB_TRIP_SHORT_LIST_DETAIL: 'api/transhub/fullscreen/getHubTripShortListDetail',
  GET_HUB_SUM_ON_ALERT_LIST_DETAIL: 'api/transhub/fullscreen/getHubOnAlertListDetail',
  GET_HUB_ALL_LIST_DETAIL: 'api/transhub/fullscreen/getHubAllListDetail',
  GET_HUB_SUM_QCUT_LIST_DETAIL: 'api/transhub/fullscreen/getHubQcutListDetail',
  GET_GPS_LIST: 'api/meterTrip/getGpsList',
  GET_COMP_LIST_FOR_SELECT: 'api/dmComp/getCompListForSelect',
  GET_COMP_LIST_FOR_SELECT_BY_SYS_GROUP: 'api/dmComp/getCompListForSelectBySysGroup',
  GET_COMP_LIST_FOR_SELECT_BY_AREA_CODE: 'api/dmComp/getCompListForSelectByAreaCode',
  GET_AREA_CODE_NAME: 'api/admin/gridArea/getManageAreaCodeListForSelect',
  GET_All_AREA_CODE: 'api/admin/gridArea/getAreaCodeName',
  GET_DRIVER_STATUS_STATISTICS: 'api/admin/driverLocation/getDriverStatusStatistics',
  DRIVING_RECORD_LIST: 'api/admin/drivingRecord/list',
  DRIVING_RECORD_DETAIL: 'api/admin/drivingRecord/detail',
  GET_METER_TRIP_LIST: 'api/meterTrip/getMeterTripList',
  GET_DM_COMPANY_LIST: 'api/dmComp/getDmCompList',
  GET_DM_COMPANY_INFO: 'api/dmComp/getDmCompById',
  GET_ALL_DMCOM_PPROFILE: 'api/dmComp/getAllDmCompProfile',
  GET_CODE_TYPE: 'api/admin/cmCode/getCodeType',
  INSERT_DMCOMP: 'api/dmComp/insertDmComp',
  DELETE_DMCOMP: 'api/dmComp/deleteDmComp',
  UPDATE_DMCOMP: 'api/dmComp/updateDmComp',
  GET_VEHICLE_LIST: 'api/dmVehicle/getVehicleList',
  GET_COMPLIST_FOR_SELECT: 'api/dmComp/getCompListForSelect',
  GET_DM_ROLE_LIST: 'api/admin/dmPermission/getDmRoleList',
  UPDATE_DM_ROLE_BY_DRIVER_ID_LIST: 'api/admin/dmPermission/updateDmRoleByDriverIdList',
  GET_DM_RESOURCE_LIST: 'api/admin/dmPermission/getDmResourceList',
  GET_ROLE_RESOURCE_LIST: 'api/admin/dmPermission/getRoleResourceList',
  UPDATE_DM_ROLE_INFO: 'api/admin/dmPermission/updateDmRoleInfo',
  UPDATE_ROLE_RESOURCE_BY_RESOURCE_ID_LIST: 'api/admin/dmPermission/updateRoleResourceByResourceIdList',
  GET_DM_RESOURCE_INFO: 'api/admin/dmPermission/getDmResourceInfo',
  GET_DM_ROLE_INFO: 'api/admin/dmPermission/getDmRoleInfo',
  UPDATE_DM_RESOURCE_INFO: 'api/admin/dmPermission/updateDmResourceInfo',
  GET_VEHICLE_BY_ID: 'api/dmVehicle/getVehicleById',
  GET_DRIVER_LIST: 'api/dmVehicle',
  UPLOAD_IMAGE: 'api/fileupload/image',
  PUT_UPDATE_VEHICLE: 'api/dmVehicle/updateVehicle',
  DELETE_VEHICLE: 'api/dmVehicle/deleteVehicle',
  INSERT_VEHICLE: 'api/dmVehicle/insertVehicle',
  CONFIRM_ADD_DRIVER: 'api/dmVehicle/confirmAddDriver',
  GET_DRIVER_FOR_VEHICLE: 'api/dmVehicle/getDriverForVehicle',
  GET_TAXI_DRIVER_LIST: 'api/taxiDriver/getDriverList',
  GET_DRIVER_BY_ID: 'api/taxiDriver/getDriverById',
  GET_VEHICLE_BY_COMP_ID: 'api/dmVehicle/getVehicleByCompId',
  GET_METERTRIP_RATING: 'api/taxiDriver/getMeterTripRating',
  UPDATED_RIVER: 'api/taxiDriver/updateDriver',
  DELETE_DRIVER: 'api/taxiDriver/deleteDriver',
  INSERT_DRIVER: 'api/taxiDriver/insertDriver',
  GET_SHARE_TRIPS_TATISTICS: 'api/driverTripShare/getShareTripStatistics',
  GET_SHARE_TRIP_LIST: 'api/driverTripShare/getShareTripList',
  GET_TRIP_BY_ID: 'api/meterTrip/getTripById',
  GET_TRIP_RATING_BY_ID: 'api/meterTrip/getTripRatingById',
  GET_MONTHLY_STAT_INFO: 'api/operating/stat/getMonthlyStatInfo',
  GET_DAILY_GRAPH: 'api/operating/graph/getDailyGraph',
  GET_HOURLY_GRAPH: 'api/operating/graph/getHourlyGraph',
  GET_TRIP_GRAPH: 'api/operating/graph/getTripGraph',
  GET_VEHICLE_GRAPH: 'api/operating/graph/getVehicleGraph',
  GET_CENTER_GPS_BY_AREA_CODE: 'api/admin/commonInfo/getCenterGpsByAreaCode',
  GET_TOP_GRID_LIST: 'api/odAnalysis/heat/getTopGridList',
  GET_HEATMAP_GRAPH_DATA: 'api/odAnalysis/heat/getHeatMapGraphData',
  GET_NETWORK_ANALYSIS_DATA: 'api/odAnalysis/network/getNetworkAnalysisData',
  GET_NETWORK_DATA_LIST: 'api/odAnalysis/network/getNetWorkDataList',
  GET_DRIVER_STATUS_STATISTICS_BY_DISTRICT: 'api/admin/driverLocation/getDriverStatusStatisticsByDistrict',
  GET_DRIVER_LOCATION_BY_GPS_CONDITION: 'api/admin/driverLocation/getDriverLocationByGpsCondition',
  GET_DRIVER_STATUS_BY_DISTRICT: 'api/admin/driverLocation/getDriverStatusByDistrict',
  GET_VEHICLE_REAL_TIME_INFO: 'api/admin/driverLocation/getVehicleRealTimeInfo',
  GET_RESOURCE_LIST_BY_ROLE_NAME: 'api/admin/roleAuthority/getResourceListByRoleName',
  GET_HOME_PAGE_FOR_ROLE: 'api/admin/roleAuthority/getHomePageForRole',
  GET_MENU_ITEM_LIST: 'api/admin/roleAuthority/getMenuItemList',
  GET_MENU_TREE_FOR_ROLE: 'api/admin/roleAuthority/getMenuTreeForRole',
  GET_PARENT_ID_FOR_LEVEL: 'api/admin/roleAuthority/getParentIdForLevel',
  INSERT_MENU_ITEM: 'api/admin/roleAuthority/insertMenuItem',
  GET_MENU_ITEM_BY_ID: 'api/admin/roleAuthority/getMenuItemById',
  UPDATE_MENU_ITEM: 'api/admin/roleAuthority/updateMenuItem',
  DELETE_MENU_ITEM_BY_ID: 'api/admin/roleAuthority/deleteMenuItemById',
  GET_ROLE_LIST: 'api/admin/role/getRoleList',
  GET_EFFECTIVE_ROLE_LIST: 'api/admin/roleAuthority/getEffectiveRoleList',
  INSERT_ROLE: 'api/admin/role/insertRole',
  UPDATE_ROLE: 'api/admin/role/updateRole',
  DELETE_ROLE: 'api/admin/role/deleteRole',
  GET_RESOURCE_ID_LIST_BY_ROLE_ID: 'api/admin/roleAuthority/getResourceIdListByRoleId',
  GET_ROLE_BY_ID: 'api/admin/role/getRoleById',
  GET_ROLE_FOR_USER: 'api/admin/role/getRoleForUser',
  GET_USER_LIST: 'api/admin/user/getUserList',
  GET_GROUP_CONFIG_LIST: 'api/admin/roleAuthority/getGroupConfigList',
  GET_COMPANY_BY_ROLE: 'api/admin/user/getCompanyByRole',
  INSERT_USER: 'api/admin/user/insertUser',
  GET_USER_BY_ID: 'api/admin/user/getUserById',
  UPDATE_USER: 'api/admin/user/updateUser',
  DELETE_USER: 'api/admin/user/deleteUser',
  GET_ADMIN_USER_LIST: 'api/admin/user/getAdminUserList',
  INSERT_ADMIN_USER: 'api/admin/user/insertAdminUser',
  DELETE_ADMIN_USER: 'api/admin/user/deleteAdminUser',
  INSERT_GROUP_CONFIG: 'api/admin/roleAuthority/insertGroupConfig',
  GET_GROUP_CONFIG_BY_ID: 'api/admin/roleAuthority/getGroupConfigById',
  UPDATE_GROUP_CONFIG: 'api/admin/roleAuthority/updateGroupConfig',
  DELETE_GROUP_CONFIG_BY_ID: 'api/admin/roleAuthority/deleteGroupConfigById',
  SAVE_ODLINE: 'api/odAnalysis/line/saveOdLine',
  GET_OD_LINE_LIST: 'api/odAnalysis/line/getOdLineList',
  DELETE_OD_LINE: 'api/odAnalysis/line/deleteOdLine',
  UPDATE_OD_LINE: 'api/odAnalysis/line/updateOdLine',
  GET_CHARGE_STATEMENT_LIST: 'api/admin/drivingRecord/findChargeStatementList',
  GET_CHARGE_DETAIL_LIST: 'api/admin/drivingRecord/findChargeDetailList',
  GET_ELECTRIC_VEHICLE: 'api/capacity/getElectricVehicle',
  GET_ELECTRIC_DEMAND: 'api/capacity/getElectricDemand',
  GET_ELECTRIC_REMAIN: 'api/capacity/getElectricRemain',
  GET_ELECTRIC_DISTRIBUTE: 'api/capacity/getElectricDistribute',
  GET_LINE_ANALYSIS_DATA: 'api/odAnalysis/line/getLineAnalysisData',
  GET_TRAIL_LIST: 'api/vehicle/trail/getTrailList',
  GET_LAST_TRAIL_LIST: 'api/vehicle/trail/getLastTrailList',
  GET_HUB_FOCUS_VEHICLE_LIST: 'api/transhub/fullscreen/getHubFocusVehicleList', // 重点关注table1
  GET_HUB_FOCUS_LIST_DETAIL: 'api/transhub/fullscreen/getHubFocusListDetail', // 重点关注table2
  // 重点关注相关接口
  IS_VEHICLE_FOCUS: 'api/transhub/fullscreen/isVehicleFocus',
  FOCUS_VEHICLE: 'api/transhub/fullscreen/focusVehicle',
  CANCEL_FOCUS: 'api/transhub/fullscreen/cancelFocus',
  // 能源分析
  GET_ENERGY_ANALYSIS: 'api/energy/getEnergyAnalysis',
  FIND_WORK_HOUR_STAT_BY_BY_CONDITION: 'api/workingHour/findWorkHourStatByByCondition', // 查询每日工时统计结果(分页)
  GET_WORK_HOUR_RULE_LIST: 'api/workingHour/getWorkHourRuleList', // 查询工时管理规则(分页)
  DELETE_WORK_HOUR_RULE_BY_MAIN_ID: 'api/workingHour/deleteWorkHourRuleByMainId', // 通过主表id删除工时管理规则
  DELETE_WORK_HOUR_RULE_BY_RULEID: 'api/workingHour/deleteWorkHourRuleByRuleId', // 通过从表表id删除工时管理规则
  GET_WORK_HOUR_RULE_BY_ID: 'api/workingHour/getWorkHourRuleById', // 通过主表id获取工时管理规则
  INSERT_WORK_HOUR_RULE: 'api/workingHour/insertWorkHourRule', // 新增工时管理规则
  UPDATE_WORK_HOUR_RULE: 'api/workingHour/updateWorkHourRule', // 编辑工时管理规则
  EXPORT_WORK_HOUR_REPORT: 'api/report/workHour/exportWorkHourReport', // 工时报表
  GET_WORK_HOUR_DIS_GRAPH: 'api/workingHour/getWorkHourDisGraph', // 工时报表
  FIND_ALL_TEMPLATE: 'api/push/findAllTemplate', // 获取消息推送的模板清单
  PUSH_TO_DRIVER: 'api/push/pushToDriver', // 向司机推送消息
  FIND_DRIVER_PUSH_RECORD: 'api/push/findDriverPushRecord', // 获取消息推送历史分页
  RESEND_TO_DRIVER: 'api/push/resendToDriver', // 重新推送消息给司机
  REISSUE_TO_DRIVER: 'api/push/reissueToDriver', // 补发消息给司机
  FIND_TERM_VAL_BY_AREACODE: 'api/versionTermVal/findTermValByAreaCode', // 最低版本列表
  INSERT_TERMVAL: 'api/versionTermVal/insertTermVal', // 新增最低版本
  UPDATE_TERMVAL: 'api/versionTermVal/updateTermVal', // 更新最低版本
  // 一口价
  GET_FIXED_METER_TRIP_LIST: 'api/meter/fareReceipt/getFixedMeterTripList',
  GET_METER_TRIP_FARE_DETAIL: 'api/meter/fareReceipt/getMeterTripFareDetail',
  GET_FIXED_POLYGON_LIST: 'api/meter/fareReceipt/getFixedPolygonList',
  ADD_FIXED_POLYGON: 'api/meter/fareReceipt/addFixedPolygon',
  UPDATE_FIXED_POLYGON: 'api/meter/fareReceipt/updateFixedPolygon',
  DELETE_FIXED_POLYGON: 'api/meter/fareReceipt/deleteFixedPolygon',
  DELETE_TERMVAL: 'api/versionTermVal/deleteTermVal', // 删除最低版本
  FIND_TERM_VER_GROUP_BY_VEHICLE: 'api/versionTermVal/findTermVerGroupByVehicle', // 获取所有终端版本
  FIND_TERM_VER_BY_VEHICLE: 'api/versionTermVal/findTermVerByVehicle', // 获取指定车牌终端版本历史
  COUNT_TERM_BY_VERSION: 'api/versionTermVal/countTermByVersion', // 终端版本统计
  FIND_VALVER_GROUP_BY_VEHICLE: 'api/versionTermVal/findValVerGroupByVehicle', // 终端版本统计
  FIND_VALVER_BY_VEHICLE: 'api/versionTermVal/findValVerByVehicle', // 获取指定车辆计价规则版本历史
  COUNT_VAL_BY_VERSION: 'api/versionTermVal/countValByVersion', // 计价规则版本统计
  GET_METER_TRIP_SEARCH_LIST: 'api/meterTrip/getMeterTripSearchList', // 行程查找分页查询
  GET_CONTACT_INFO_BY_USER_NAME: 'api/admin/safety/getContactInfoByUserName', // 根据账号获取联系方式
  SEND_CODE_BY_MOBILE: 'api/admin/code/sendCodeByMobile', // 根据手机号发送验证码
  SEND_CODE_BY_EMAIL: 'api/admin/code/sendCodeByEmail', // 根据邮箱发送验证码
  UPDATE_PASSWORD_BY_CODE: 'api/admin/safety/updatePasswordByCode', // 根据验证码修改密码
  UPDATE_MOBILE_OR_EMAIL_BY_CODE_AND_PWD: 'api/admin/safety/updateMobileOrEmailByCodeAndPwd', // 根据用户密码和验证码修改手机号码或邮箱
  UPDATE_PWD_BY_OLDPWD: 'api/admin/safety/updatePwdByOldPwd', // 根据用户密码和验证码修改手机号码或邮箱
  GET_QUERY_INFO_LIST: 'api/taxiComment/getQueryInfoList', // 查询用户提交的失物查询记录
  UPDATE_PROCESS_RESULT: 'api/taxiComment/updateProcessResult', // 更新用户查询的处理结果

  // 根据车牌号模糊查询车辆信息
  GET_VEHICLE_BY_COMP_ID_AND_VEHICLE_NO: 'api/dmVehicle/getVehicleByCompIdAndVehicleNo',
  // 根据姓名手机号模糊查询驾驶员信息
  GET_TAXI_DRIVER_LIST_BY_CONDITION: 'api/dmVehicle/getTaxiDriverListByCondition',
  DOWNLOAD_TERM_EXCEL: 'api/versionTermVal/downloadTermExcel', // 下载终端版本Excel
  DOWNLOAD_VAL_EXCEL: 'api/versionTermVal/downloadValExcel', // 下载计价规则版本Excel
  // 实时供给
  GET_PICKUP_GRID_LIST: 'api/pickup/getPickupGridList',
  GET_PICKUP_GRAPH: 'api/pickup/getPickupGraph',
  GET_INEFFICIENCY_GRID_LIST: 'api/pickup/getInefficiencyGridList',
  GET_INEFFICIENCY_GRID_GRAPH: 'api/pickup/getInefficiencyGridGraph',
  // 异常停运相关接口
  GET_VEHICLE_OPERATION_STATUS_LIST: 'api/alarmRule/getVehicleOperationStatusList',
  GET_ABNORMAL_OUTAGE_ALARM_RULE_LIST: 'api/alarmRule/getAbnormalOutageAlarmRuleList',
  POST_ABNORMAL_OUTAGE_ALARM_RULE: 'api/alarmRule/postAbnormalOutageAlarmRule',
  GET_ABNORMAL_OUTAGE_ALARM_RULE: 'api/alarmRule/getAbnormalOutageAlarmRule',
  PUT_ABNORMAL_OUTAGE_ALARM_RULE: 'api/alarmRule/putAbnormalOutageAlarmRule',
  DELETE_ABNORMAL_OUTAGE_ALARM_RULE: 'api/alarmRule/deleteAbnormalOutageAlarmRule',
  // 充电站分析
  GET_CHARGE_STATION_LIST: 'api/chargeStation/getChargeStationList',
  GET_CHARGE_GRID_INFO_LIST: 'api/chargeStation/getChargeGridInfoList',
  GET_GRID_CHARGE_DETAIL: 'api/chargeStation/getGridChargeDetail',
  // 通用配置信息菜单相关接口
  GET_CODE_LIST: 'api/admin/cmCode/getCodeList',
  INSERT_CODE: 'api/admin/cmCode/insertCode',
  GET_CODE_BY_ID: 'api/admin/cmCode/getCodeById',
  UPDATE_CODE: 'api/admin/cmCode/updateCode',
  DELETE_CODE: 'api/admin/cmCode/deleteCode',
  REFRESH_COMMON_CODE_LIST: 'api/admin/cmCode/refreshCommonCodeList',
  // 终端数据质量相关接口
  GET_GPS_QUALITY_DAILY_STAT: 'api/gpsQuality/getGpsQualityDailyStat',
  GET_GPS_ONLINE_VEHICLE: 'api/gpsQuality/getGpsOnlineVehicle',
  GET_GPS_QUALITY_RADAR_STAT: 'api/gpsQuality/getGpsQualityRadarStat',
  GET_GPS_POINT_COUNT: 'api/gpsQuality/getGpsPointCount',
  GET_TERMINAL_LIST: 'api/gpsQuality/getTerminalList',
  EXPORT_GPS_ONLINE_TIME_REPORT: 'api/report/gpsQuality/exportGpsQualityReport',
  GET_GPS_ONLINE_LIST: 'api/gpsQuality/getGpsOnlineTimeList',
  GET_GATE_JUDGE_LIST: 'api/gateVehicle/getGateJudgeList',
  GET_VEHICLE_STATUS_SUMMARY: 'api/vehicleStatus/getVehicleStatusSummary',
  GET_VEHICLE_STATUS_LIST: 'api/vehicleStatus/getVehicleStatusList',
  GET_DISTRICT_NAME_BY_GPS: 'api/admin/driverLocation/getDistrictNameByGps',
  GET_DISTRICT_LIST_FOR_SELECT: 'api/admin/driverLocation/getDistrictListForSelect',
  // 交通枢纽管理菜单相关接口
  GET_TRANS_PORT_HUB_LIST: 'api/transportHub/getTransportHubList',
  ADD_TRANS_PORT_HUB: 'api/transportHub/addTransportHub',
  GET_TRANSPORT_HUB_INFO: 'api/transportHub/getTransportHubInfo',
  ADD_POLYGON_AREA: 'api/transportHub/addPolygonArea',
  DELETE_POLYGON_AREA: 'api/transportHub/deletePolygonArea',
  EDIT_TRANSPORT_HUB: 'api/transportHub/editTransportHub',
  EDIT_POLYGON_AREA: 'api/transportHub/editPolygonArea',
  UPDATE_HUB_STATUS: 'api/transportHub/updateHubStatus',
  DELETE_TRANSPORT_HUB: 'api/transportHub/deleteTransportHub',
  GET_POLYGON_AREA_INFO: 'api/transportHub/getPolygonAreaInfo',
  EXPORT_GATE_JUDGE_REPORT: 'api/gateVehicle/exportGateJudgeReport',
  // 虚拟站点
  INSERT_STAND: 'api/taxiStand/insertStand',
  P_POST_DROPOFF_REQUEST_BY_STAND_POINT: 'api/dropoff/pPostDropOffRequestByStandPoint',
  FIND_TAXI_STAND_BY_CONDITION: 'api/taxiStand/findTaxiStandByCondition',
  UPDATE_STAND: 'api/taxiStand/updateStand',
  GET_STAND_BY_ID: 'api/taxiStand/getStandById',
  DELETE_STAND: 'api/taxiStand/deleteStand',
  REFRESH_STAND: 'api/taxiStand/refreshStand'
}

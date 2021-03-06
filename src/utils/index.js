import provinceCode from '@/constant/provinceCode'

export const dateFormat = (date, fmt) => {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

export const numFormat = (value) => {
  if (!value) return '0'
  const intPart = Number(value).toFixed(0) // 获取整数部分
  return intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
}

// 将div全屏
export const launchIntoFullscreen = (element) => {
  element.style.width = screen.width + 'px'
  element.style.height = screen.height + 'px'
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

// 退出按钮事件全屏
export const exitFullscreen = (element) => {
  element.style.width = null
  element.style.height = null
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else if (document.mozFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitIsFullScreen) {
    document.webkitExitFullscreen()
  }
}

// 处理里程的通用方法，保留小数点后一位
export const dealDistance = (distance) => {
  let dealDistance = distance
  if (distance) {
    dealDistance = distance.toFixed(1)
  }
  return dealDistance
}

// 处理时间的通用方法，保留整数
export const dealDuration = (duration) => {
  let dealDuration = duration
  if (duration > 0 && duration < 1) {
    dealDuration = 1
  } else {
    dealDuration = Math.round(duration)
  }
  return dealDuration
}

// 通过格子的数据获取到格子的边界点
export const getRectangleByStepAndGridCode = (gridCode, lngStep, latStep) => {
  const gridCodeArr = gridCode.split('::')
  const lng = Number((gridCodeArr[0] * lngStep).toFixed(6))
  const lat = Number((gridCodeArr[1] * latStep).toFixed(6))
  const southWest = [lng, lat]
  const northEast = [lng + lngStep, lat + latStep]
  return [southWest, northEast]
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 根据当前日期获取上一个月
 * return “2018-01”
 */
export const getPreMonth = () => {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()
  if (month === 0) {
    year = year - 1
    month = 12
  }
  month = month < 10 ? '0' + month : month
  return `${year}-${month}`
}

export const addMarker = (eventGps, iconUrl, title, color, size, paddingSize) => {
  let eventGpsNew = eventGps
  if (!Array.isArray(eventGps)) eventGpsNew = [eventGps.lng, eventGps.lat]
  return {
    position: eventGpsNew,
    icon: iconUrl,
    title: title,
    color: color,
    size: size,
    paddingSize: paddingSize
  }
}

export const addMarkerPosition = (eventGps, iconUrl, title, meterTripId, recDate) => {
  let marker = {
    position: eventGps,
    icon: iconUrl,
    title: title,
    meterTripId: meterTripId,
    recDate: recDate
  }
  return marker
}

export const addMarkerPositionForGmap = (eventGps, iconUrl, title, meterTripId, recDate) => {
  let marker = {
    position: { lat: eventGps[1], lng: eventGps[0] },
    icon: iconUrl,
    title: title,
    meterTripId: meterTripId,
    recDate: recDate
  }
  return marker
}

export const addMarkerPositionForRealGmap = (eventGps, iconUrl, vehicleNo, driverStatus) => {
  let marker = {
    position: { lat: eventGps[1], lng: eventGps[0] },
    icon: iconUrl,
    vehicleNo: vehicleNo,
    driverStatus: driverStatus
  }
  return marker
}

export const addMarkerPositionForRealAmap = (eventGps, iconUrl, vehicleNo, driverId, driverStatus, time) => {
  let marker = {
    position: eventGps,
    icon: iconUrl,
    vehicleNo: vehicleNo,
    driverId: driverId,
    driverStatus: driverStatus,
    time: time
  }
  return marker
}

export const drawTripLine = (lineArr, lineColor) => {
  let polyline = {
    path: lineArr, // 设置线覆盖物路径
    isOutline: true, // 描边
    strokeColor: lineColor, //  线颜色
    strokeWeight: 6, // 线宽
    strokeStyle: 'solid', // 线样式
    lineJoin: 'round', // 折线拐点的绘制样式
    showDir: true
  }
  return polyline
}

export const getVehicleNo = (value, areaCode) => {
  let vehicleNo = value
  const charactersReg = new RegExp('^[\u4e00-\u9fa5]')
  if (!charactersReg.test(value)) {
    const areaCodeSimple = areaCode.substring(0, 4)
    vehicleNo = provinceCode[areaCodeSimple] ? `${provinceCode[areaCodeSimple]}${vehicleNo}` : `${vehicleNo}`
  }
  return vehicleNo
}

export const getVehicleNoPrefix = (areaCode) => {
  return provinceCode[areaCode.substring(0, 4)] + areaCode.substring(4, 5)
}

export const getHubTrailTableArr = hubTrailList => {
  const resultArr = []
  const map = {}
  hubTrailList.forEach(value => {
    if (!map[value.dateStr]) {
      resultArr.push({
        dateStr: value.dateStr,
        list: [value]
      })
      map[value.dateStr] = value
    } else {
      const result = resultArr.find(result => result.dateStr === value.dateStr)
      result.list.push(value)
    }
  })
  return resultArr
}

export const getAMapPathByPathStr = pathStr => {
  let pathArr = []
  if (pathStr) {
    pathArr = pathStr.split(';').map(point => {
      const pointArr = point.split(',')
      return [Number(pointArr[0]), Number(pointArr[1])]
    })
  }
  return pathArr
}

export const renderHeader = (h, params) => {
  return h('Tooltip', {
    props: {
      content: params.column.title,
      transfer: true,
      placement: 'top'
    }
  }, params.column.title)
}

// 文件下载
export const downloadFile = url => {
  // 删除多余的 iframe
  let downloadFileIframe = document.getElementById('downloadFileIframe')
  if (downloadFileIframe) {
    document.body.removeChild(downloadFileIframe)
  }
  // 创建本次下载的 iframe
  let iframe = document.createElement('iframe')
  iframe.id = 'downloadFileIframe'
  iframe.style.display = 'none'
  iframe.src = url
  document.body.appendChild(iframe)
}

/**
 * 高德地图根据经纬度数组返回地址名
 *
 * @param lngLat
 *    经纬度数组，如：[116.396574, 39.992706]
 * @param callback
 *    回调执行的方法
 */
export const AMapGeocoder = (lngLat, callback) => {
  if (!lngLat && lngLat.length !== 2) {
    throw new Error('Invalid param lngLat is not a gps array!')
  }
  if (!callback && typeof callback !== 'function') {
    throw new Error('Invalid param callback is not a function!')
  }
  AMap.plugin('AMap.Geocoder', () => {
    const geocoder = new AMap.Geocoder({
      radius: 500 // lngLat为中心点的范围，单位：米
    })
    geocoder.getAddress(lngLat, callback)
  })
}

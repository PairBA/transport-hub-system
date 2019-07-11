import provinceCode from '@/constant/provinceCode'

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

// 根据menuKey从resourceList中获取url
export const getUrlByMenuKey = (resourceList, menuKey) => {
  let url = ''
  resourceList.forEach(res => {
    let menu = res.children.find(item => item.menuKey === menuKey)
    if (menu) {
      url = menu.url
    }
  })
  return url
}

// 根据menuKey从resourceList中获取name
export const getNameByMenuKey = (resourceList, menuKey) => {
  let name = ''
  resourceList.forEach(res => {
    let menu = res.children.find(item => item.menuKey === menuKey)
    if (menu) {
      name = menu.name
    }
  })
  return name
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
export const formatDate = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
}
export const formatDateToMinute = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  return `${year}-${month}-${day} ${hour}:${minute}`
}
export const formatDateToHourStr = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()

  return `${year}-${month}-${day} ${hour}`
}
export const formatDateToDay = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  return `${year}-${month}-${day}`
}
export const formatDateToMonth = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)

  return `${year}-${month}`
}
export const formatDateToDayNum = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  return `${year}${month}${day}`
}
export const formatDateToNoYear = (date) => {
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  return `${month}-${day} ${hour}:${minute}`
}
export const formatDateToHHmmss = (date) => {
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  return `${hour}:${minute}:${seconds}`
}
export const formatDateToHour = (date) => {
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  return `${hour}:${minute}`
}
export const formatDateToOnlyMinute = (date) => {
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  return `${minute}`
}
export const formatDateToOnlyHour = (date) => {
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()

  return `${hour}`
}
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
export const formatIntDateToStr = (dateInt) => {
  if (dateInt && dateInt > 0) {
    let dateStr = dateInt.toString()
    return dateStr.slice(0, 4) + '/' + dateStr.slice(4, 6) + '/' + dateStr.slice(6) + ' 00:00:00'
  } else {
    return ''
  }
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

export const formatDateForHour = (date) => {
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  return `${hour}:${minute}`
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
export const getGMapPathByPathStr = pathStr => {
  let pathArr = []
  if (pathStr) {
    pathArr = pathStr.split(';').map(point => {
      const pointArr = point.split(',')
      return { lat: Number(pointArr[1]), lng: Number(pointArr[0]) }
    })
  }
  return pathArr
}

// 前端消息队列管理
export const messageQueueMgmt = (list, type) => {
  if (localStorage.getItem('meMessageQueue')) {
    let object = JSON.parse(localStorage.getItem('meMessageQueue'))
    list.forEach(vehicle => {
      let isPush = true
      object.forEach(item => {
        if (vehicle.id === item.id && item.type === type) {
          isPush = false
        }
      })
      if (isPush) {
        object.push(vehicle)
      }
    })
    localStorage.setItem('meMessageQueue', JSON.stringify(object))
  } else {
    localStorage.setItem('meMessageQueue', JSON.stringify(list))
  }
  // console.log(JSON.parse(localStorage.getItem('meMessageQueue')))
}
// 根据类型获取队列清单
export const getMessageQueue = (type) => {
  if (localStorage.getItem('meMessageQueue')) {
    let list = []
    let object = JSON.parse(localStorage.getItem('meMessageQueue'))
    object.forEach(item => {
      if (item.type === type) {
        list.push(item)
      }
    })
    // console.log(list)
    return list
  } else {
    return []
  }
}
// 根据id清单和类型删除发送成功的清单
export const delMessageQueueByIdAndType = (list, type) => {
  if (localStorage.getItem('meMessageQueue')) {
    let object = JSON.parse(localStorage.getItem('meMessageQueue'))
    let newObject = []
    object.forEach(item => {
      let isRetain = true
      list.forEach(id => {
        if (id === item.id && type === item.type) { // id和type都一致的不要
          isRetain = false
        }
      })
      if (isRetain) {
        newObject.push(item)
      }
    })
    localStorage.setItem('meMessageQueue', JSON.stringify(newObject))
    // console.log(newObject)
  }
}
// 清空消息队列
export const emptyMessageQueue = () => {
  if (localStorage.getItem('meMessageQueue')) {
    localStorage.removeItem('meMessageQueue')
  }
}

export const mapStyleParam = [
  {
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#1d2c4d'
      }
    ]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#8ec3b9'
      }
    ]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#1a3646'
      }
    ]
  },
  {
    'featureType': 'administrative.country',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#4b6878'
      }
    ]
  },
  {
    'featureType': 'administrative.land_parcel',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#64779e'
      }
    ]
  },
  {
    'featureType': 'administrative.province',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#4b6878'
      }
    ]
  },
  {
    'featureType': 'landscape.man_made',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#334e87'
      }
    ]
  },
  {
    'featureType': 'landscape.natural',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#023e58'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#283d6a'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#6f9ba5'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#1d2c4d'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#023e58'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#3C7680'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#304a7d'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#98a5be'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#1d2c4d'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#2c6675'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#255763'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#b0d5ce'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#023e58'
      }
    ]
  },
  {
    'featureType': 'transit',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#98a5be'
      }
    ]
  },
  {
    'featureType': 'transit',
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#1d2c4d'
      }
    ]
  },
  {
    'featureType': 'transit.line',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#283d6a'
      }
    ]
  },
  {
    'featureType': 'transit.station',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#3a4762'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#0e1626'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#4e6d70'
      }
    ]
  }
]

export const gradient = [
  'rgba(0, 255, 0, 0)',
  '#ffea00',
  'red'
]

export const renderHeader = (h, params) => {
  return h('Tooltip', {
    props: {
      content: params.column.title,
      transfer: true,
      placement: 'top'
    }
  }, params.column.title)
}

// 根据索引值获取色值（4个色值）
export const getColorByIndex = (index) => {
  let color = '#0091FF'
  switch (index) {
    case 0: color = '#0091FF'; break
    case 1: color = '#70DC40'; break
    case 2: color = '#FBA301'; break
    case 3: color = '#FB3030'; break
    default: color = '#FB3030'
  }
  return color
}

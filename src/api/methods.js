import axios from 'axios'
import router from '../router'

const baseUrl = process.env.VUE_APP_BASE_URL
// 添加一个响应拦截器
axios.interceptors.response.use((response) => {
  // Do something with response data
  const responseData = response.data
  if (responseData.code === 4001 || responseData.code === 4007) {
    localStorage.removeItem('token')
    router.push('/login')
  } else return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export async function send (url, {
  method = 'GET',
  data = {},
  headers = {},
  params = {}
}) {
  let responseData
  try {
    const response = await axios({
      url: `${url}`,
      baseURL: `${baseUrl}`,
      timeout: 1000 * 120,
      method,
      headers: {
        'me-client-type': 'me-client/web',
        'x-me-token': localStorage.getItem('token'),
        'lang': localStorage.getItem('trans-language'),
        ...headers
      },
      data,
      params
    })
    responseData = response.data
  } catch (e) {
    responseData = (e.response && e.response.data) || {
      success: false,
      type: 'RT',
      msg: 'Request Timeout'
    }
  }

  return responseData
}

export async function post (url, data) {
  let headers = {
    'Content-Type': 'application/json'
  }
  return send(url, {
    method: 'POST',
    data,
    headers
  })
}

export async function get (url, params = {}) {
  return send(url, {
    params
  })
}

export async function deleteSend (url) {
  return send(url, {
    method: 'DELETE'
  })
}

export async function put (url, data) {
  return send(url, {
    method: 'PUT',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

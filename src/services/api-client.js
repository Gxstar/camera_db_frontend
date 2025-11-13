import axios from 'axios'

// 创建axios实例
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', // 根据实际后端API地址修改
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    console.log(`发起请求: ${config.method?.toUpperCase()} ${config.url}`)
    
    // 可以在这里添加认证token
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    console.log(`请求成功: ${response.status} ${response.config.url}`)
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    console.error('响应错误:', error.response?.status, error.message)
    
    // 统一错误处理
    if (error.response) {
      // 服务器返回了错误状态码
      switch (error.response.status) {
        case 401:
          console.error('未授权，请重新登录')
          // 可以在这里跳转到登录页
          break
        case 403:
          console.error('禁止访问')
          break
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器内部错误')
          break
        default:
          console.error('请求失败:', error.response.status)
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络错误，请检查网络连接')
    } else {
      // 请求配置出错
      console.error('请求配置错误:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
import axios from 'axios'

// 创建axios实例
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // 根据实际后端API地址修改
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

// API方法封装
export const apiService = {
  // 品牌相关API
  brands: {
    // 获取品牌列表
    getBrands: () => apiClient.get('/brands'),
    
    // 获取单个品牌详情
    getBrandById: (id) => apiClient.get(`/brands/${id}`),
    
    // 创建品牌
    createBrand: (brandData) => apiClient.post('/brands', brandData),
    
    // 更新品牌
    updateBrand: (id, brandData) => apiClient.put(`/brands/${id}`, brandData),
    
    // 删除品牌
    deleteBrand: (id) => apiClient.delete(`/brands/${id}`),
  },
  
  // 相机相关API
  cameras: {
    // 获取相机列表
    getCameras: (params) => apiClient.get('/cameras', { params }),
    
    // 获取单个相机详情
    getCameraById: (id) => apiClient.get(`/cameras/${id}`),
    
    // 根据品牌获取相机
    getCamerasByBrand: (brandId) => apiClient.get(`/cameras?brandId=${brandId}`),
    
    // 创建相机
    createCamera: (cameraData) => apiClient.post('/cameras', cameraData),
    
    // 更新相机
    updateCamera: (id, cameraData) => apiClient.put(`/cameras/${id}`, cameraData),
    
    // 删除相机
    deleteCamera: (id) => apiClient.delete(`/cameras/${id}`),
  },
  
  // 镜头相关API
  lenses: {
    // 获取镜头列表
    getLenses: (params) => apiClient.get('/lenses', { params }),
    
    // 获取单个镜头详情
    getLensById: (id) => apiClient.get(`/lenses/${id}`),
    
    // 根据品牌获取镜头
    getLensesByBrand: (brandId) => apiClient.get(`/lenses?brandId=${brandId}`),
    
    // 创建镜头
    createLens: (lensData) => apiClient.post('/lenses', lensData),
    
    // 更新镜头
    updateLens: (id, lensData) => apiClient.put(`/lenses/${id}`, lensData),
    
    // 删除镜头
    deleteLens: (id) => apiClient.delete(`/lenses/${id}`),
  },
  
  // 通用方法
  get: (url, config) => apiClient.get(url, config),
  post: (url, data, config) => apiClient.post(url, data, config),
  put: (url, data, config) => apiClient.put(url, data, config),
  delete: (url, config) => apiClient.delete(url, config),
}

// 默认导出
// export default apiService

export default apiClient
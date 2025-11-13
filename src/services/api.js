// 主API入口文件 - 整合所有独立模块
import brandsApi from './api/brands.js'
import camerasApi from './api/cameras.js'
import lensesApi from './api/lenses.js'
import authApi from './api/auth.js'
import searchApi from './api/search.js'
import usersApi from './api/users.js'
import apiClient from './api-client.js'

// 整合所有API模块
export const apiService = {
  brands: brandsApi,
  cameras: camerasApi,
  lenses: lensesApi,
  auth: authApi,
  search: searchApi,
  users: usersApi,
  
  // 健康检查
  health: () => apiClient.get('/health'),
}

// 默认导出
export default apiService
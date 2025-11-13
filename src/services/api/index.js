import brandsApi from './brands.js'
import camerasApi from './cameras.js'
import lensesApi from './lenses.js'
import authApi from './auth.js'
import searchApi from './search.js'
import usersApi from './users.js'
import apiClient from '../api-client.js'

// 主API服务 - 整合所有模块
export const apiService = {
  // 品牌相关API
  brands: brandsApi,
  
  // 相机相关API
  cameras: camerasApi,
  
  // 镜头相关API
  lenses: lensesApi,
  
  // 认证相关API
  auth: authApi,
  
  // 搜索相关API
  search: searchApi,
  
  // 用户相关API
  users: usersApi,
  
  // 健康检查
  health: () => apiClient.get('/api/v1/health'),
}

export default apiService
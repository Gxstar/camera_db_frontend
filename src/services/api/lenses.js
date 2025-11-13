import apiClient from '../api-client.js'

// 镜头相关API
export const lensesApi = {
  // 获取镜头列表（支持筛选）
  getLenses: (params = {}) => apiClient.get('/api/v1/lenses/', { params }),
  
  // 创建镜头（需要管理员权限）
  createLens: (lensData) => apiClient.post('/api/v1/lenses/', lensData),
  
  // 获取单个镜头信息
  getLensById: (id) => apiClient.get(`/api/v1/lenses/${id}`),
  
  // 更新镜头信息（需要管理员权限）
  updateLens: (id, lensData) => apiClient.put(`/api/v1/lenses/${id}`, lensData),
  
  // 删除镜头（需要管理员权限）
  deleteLens: (id) => apiClient.delete(`/api/v1/lenses/${id}`),
  
  // 根据镜头型号获取镜头信息
  getLensByModel: (model) => apiClient.get(`/api/v1/lenses/model/${model}`),
  
  // 搜索镜头
  searchLenses: (query) => apiClient.get(`/api/v1/lenses/search/${query}`),
  
  // 激活镜头（需要管理员权限）
  activateLens: (id) => apiClient.patch(`/api/v1/lenses/${id}/activate`),
  
  // 停用镜头（需要管理员权限）
  deactivateLens: (id) => apiClient.patch(`/api/v1/lenses/${id}/deactivate`),
  
  // 获取镜头类型列表
  getLensTypes: () => apiClient.get('/api/v1/lenses/types/'),
  
  // 获取对焦类型列表
  getFocusTypes: () => apiClient.get('/api/v1/lenses/focus-types/'),
}

export default lensesApi
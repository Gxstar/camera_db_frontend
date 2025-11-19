import apiClient from '../api-client.js'

// 镜头相关API
export const lensesApi = {
  // 获取镜头列表
  getLenses: (params = {}) => apiClient.get('/lenses/', { params }),
  
  // 创建镜头
  createLens: (lensData) => apiClient.post('/lenses/', lensData),
  
  // 获取单个镜头信息
  getLensById: (id) => apiClient.get(`/lenses/${id}`),
  
  // 更新镜头信息
  updateLens: (id, lensData) => apiClient.put(`/lenses/${id}`, lensData),
  
  // 删除镜头
  deleteLens: (id) => apiClient.delete(`/lenses/${id}`),
  
  // 根据型号获取镜头信息
  getLensByModel: (model) => apiClient.get(`/lenses/model/${model}`),
  
  // 搜索镜头
  searchLenses: (query) => apiClient.get(`/lenses/search/${query}`),
  
  // 激活镜头
  activateLens: (id) => apiClient.patch(`/lenses/${id}/activate`),
  
  // 停用镜头
  deactivateLens: (id) => apiClient.patch(`/lenses/${id}/deactivate`),
  
  // 获取镜头类型列表
  getLensTypes: () => apiClient.get('/lenses/types/'),
  
  // 获取对焦类型列表
  getFocusTypes: () => apiClient.get('/lenses/focus-types/'),
}

export default lensesApi
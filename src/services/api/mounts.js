import apiClient from '../api-client.js'

// 卡口相关API
// 基于后端API文档实现，包含以下功能：
// - GET /mounts/ - 获取卡口列表
// - POST /mounts/ - 创建卡口
// - GET /mounts/{mount_id} - 获取单个卡口信息
// - PUT /mounts/{mount_id} - 更新卡口信息
// - DELETE /mounts/{mount_id} - 删除卡口
// - PATCH /mounts/{mount_id}/activate - 激活卡口
// - PATCH /mounts/{mount_id}/deactivate - 停用卡口

export const mountsApi = {
  // 获取卡口列表（支持筛选）
  getMounts: (params = {}) => apiClient.get('/mounts/', { params }),
  
  // 创建卡口（需要管理员权限）
  createMount: (mountData) => apiClient.post('/mounts/', mountData),
  
  // 获取单个卡口信息
  getMountById: (id) => apiClient.get(`/mounts/${id}`),
  
  // 更新卡口信息（需要管理员权限）
  updateMount: (id, mountData) => apiClient.put(`/mounts/${id}`, mountData),
  
  // 删除卡口（需要管理员权限）
  deleteMount: (id) => apiClient.delete(`/mounts/${id}`),
  
  // 激活卡口（需要管理员权限）
  activateMount: (id) => apiClient.patch(`/mounts/${id}/activate`),
  
  // 停用卡口（需要管理员权限）
  deactivateMount: (id) => apiClient.patch(`/mounts/${id}/deactivate`),
  
  // 兼容AdminView.vue中的create调用
  create: (mountData) => apiClient.post('/mounts/', mountData),
  
  // 兼容AdminView.vue中的update调用
  update: (id, mountData) => apiClient.put(`/mounts/${id}`, mountData),
  
  // 兼容AdminView.vue中的delete调用
  delete: (id) => apiClient.delete(`/mounts/${id}`),
}

export default mountsApi
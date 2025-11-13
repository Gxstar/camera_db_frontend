import apiClient from '../api-client.js'

// 相机相关API
export const camerasApi = {
  // 获取相机列表（支持筛选）
  getCameras: (params = {}) => apiClient.get('/api/v1/cameras/', { params }),
  
  // 创建相机（需要管理员权限）
  createCamera: (cameraData) => apiClient.post('/api/v1/cameras/', cameraData),
  
  // 获取单个相机信息
  getCameraById: (id) => apiClient.get(`/api/v1/cameras/${id}`),
  
  // 更新相机信息（需要管理员权限）
  updateCamera: (id, cameraData) => apiClient.put(`/api/v1/cameras/${id}`, cameraData),
  
  // 删除相机（需要管理员权限）
  deleteCamera: (id) => apiClient.delete(`/api/v1/cameras/${id}`),
  
  // 激活相机（需要管理员权限）
  activateCamera: (id) => apiClient.patch(`/api/v1/cameras/${id}/activate`),
  
  // 停用相机（需要管理员权限）
  deactivateCamera: (id) => apiClient.patch(`/api/v1/cameras/${id}/deactivate`),
}

export default camerasApi
import apiClient from '../api-client.js'

// 用户相关API
export const usersApi = {
  // 获取用户列表（支持筛选）
  getUsers: (params = {}) => apiClient.get('/api/v1/users/', { params }),
  
  // 创建新用户（需要管理员权限）
  createUser: (userData) => apiClient.post('/api/v1/users/', userData),
  
  // 获取单个用户信息
  getUserById: (id) => apiClient.get(`/api/v1/users/${id}`),
  
  // 更新用户信息（需要管理员权限）
  updateUser: (id, userData) => apiClient.put(`/api/v1/users/${id}`, userData),
  
  // 删除用户（需要管理员权限）
  deleteUser: (id) => apiClient.delete(`/api/v1/users/${id}`),
  
  // 激活用户（需要管理员权限）
  activateUser: (id) => apiClient.patch(`/api/v1/users/${id}/activate`),
  
  // 停用用户（需要管理员权限）
  deactivateUser: (id) => apiClient.patch(`/api/v1/users/${id}/deactivate`),
  
  // 获取当前登录用户信息
  getCurrentUser: () => apiClient.get('/api/v1/users/me'),
  
  // 更新当前登录用户信息
  updateCurrentUser: (userData) => apiClient.put('/api/v1/users/me', userData),
}

export default usersApi
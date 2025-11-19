import apiClient from '../api-client.js'

// 用户相关API
export const usersApi = {
  // 获取用户列表
  getUsers: (params = {}) => apiClient.get('/users/', { params }),
  
  // 创建用户
  createUser: (userData) => apiClient.post('/users/', userData),
  
  // 获取单个用户信息
  getUserById: (id) => apiClient.get(`/users/${id}`),
  
  // 更新用户信息
  updateUser: (id, userData) => apiClient.put(`/users/${id}`, userData),
  
  // 删除用户
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
  
  // 激活用户
  activateUser: (id) => apiClient.patch(`/users/${id}/activate`),
  
  // 停用用户
  deactivateUser: (id) => apiClient.patch(`/users/${id}/deactivate`),
  
  // 获取当前登录用户信息
  getCurrentUser: () => apiClient.get('/users/me'),
  
  // 更新当前登录用户信息
  updateCurrentUser: (userData) => apiClient.put('/users/me', userData),
}

export default usersApi
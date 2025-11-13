import apiClient from '../api-client.js'

// 认证相关API
export const authApi = {
  // 用户登录，获取访问令牌
  login: (username, password) => apiClient.post('/api/v1/auth/login', 
    new URLSearchParams({ username, password }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  ),
  
  // 刷新访问令牌
  refreshToken: () => apiClient.post('/api/v1/auth/refresh'),
  
  // 获取当前登录用户信息
  getMe: () => apiClient.get('/api/v1/auth/me'),
}

export default authApi
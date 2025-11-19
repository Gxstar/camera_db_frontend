import apiClient from '../api-client.js'

// 认证相关API
export const authApi = {
  // 用户登录，获取访问令牌
  login: (username, password) => apiClient.post('/auth/login', 
    new URLSearchParams({ username, password }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  ),
  
  // 刷新访问令牌
  refreshToken: () => apiClient.post('/auth/refresh'),
  
  // 获取当前登录用户信息
  getMe: () => apiClient.get('/auth/me'),
}

export default authApi
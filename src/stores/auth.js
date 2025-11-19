import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/services/api/auth'

// 定义认证状态存储
export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref(null)
  const token = ref(localStorage.getItem('authToken') || null)
  const isAuthenticated = ref(!!token.value)

  // 动作
  const login = async (username, password) => {
    try {
      console.log('开始登录请求...')
      const response = await authApi.login(username, password)
      console.log('登录响应:', response)
      console.log('响应数据:', response.data)
      
      // 检查响应结构
      if (!response.data || !response.data.access_token) {
        console.error('响应中缺少access_token:', response.data)
        return { success: false, error: '登录响应格式错误' }
      }
      
      token.value = response.data.access_token
      localStorage.setItem('authToken', token.value)
      isAuthenticated.value = true
      
      console.log('令牌已保存到localStorage')
      
      // 获取用户信息
      await fetchUser()
      
      return { success: true }
    } catch (error) {
      console.error('登录错误详情:', error)
      console.error('错误响应:', error.response)
      console.error('错误数据:', error.response?.data)
      logout()
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || '登录失败' 
      }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('authToken')
  }

  const fetchUser = async () => {
    if (!token.value) return
    
    try {
      const response = await authApi.getMe()
      user.value = response.data
    } catch (error) {
      console.error('获取用户信息失败:', error)
      logout()
    }
  }

  const refreshToken = async () => {
    try {
      const response = await authApi.refreshToken()
      token.value = response.data.access_token
      localStorage.setItem('authToken', token.value)
      return { success: true }
    } catch (error) {
      logout()
      return { success: false, error: '令牌刷新失败' }
    }
  }

  // 初始化时获取用户信息
  if (isAuthenticated.value) {
    fetchUser()
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    fetchUser,
    refreshToken
  }
})
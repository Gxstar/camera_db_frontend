import apiClient from '../api-client.js'

// 搜索相关API
export const searchApi = {
  // 通用搜索
  search: (query) => apiClient.get(`/api/v1/search/${query}`),
  
  // 按名称搜索
  searchByName: (name) => apiClient.get(`/api/v1/search/name/${name}`),
}

export default searchApi
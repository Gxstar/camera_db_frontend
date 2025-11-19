import apiClient from '../api-client.js'

// 搜索相关API
export const searchApi = {
  // 搜索所有内容
  search: (query) => apiClient.get(`/search/${query}`),
  
  // 根据名称搜索
  searchByName: (name) => apiClient.get(`/search/name/${name}`),
}

export default searchApi
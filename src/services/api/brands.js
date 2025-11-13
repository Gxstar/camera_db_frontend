import apiClient from '../api-client.js'

// 品牌相关API
export const brandsApi = {
  // 获取品牌列表（支持筛选）
  getBrands: (params = {}) => apiClient.get('/api/v1/brands/', { params }),
  
  // 创建品牌（需要管理员或编辑者权限）
  createBrand: (brandData) => apiClient.post('/api/v1/brands/', brandData),
  
  // 获取单个品牌信息
  getBrandById: (id) => apiClient.get(`/api/v1/brands/${id}`),
  
  // 更新品牌信息（需要管理员或编辑者权限）
  updateBrand: (id, brandData) => apiClient.put(`/api/v1/brands/${id}`, brandData),
  
  // 删除品牌（需要管理员权限）
  deleteBrand: (id) => apiClient.delete(`/api/v1/brands/${id}`),
  
  // 根据品牌名称获取品牌信息
  getBrandByName: (name) => apiClient.get(`/api/v1/brands/name/${name}`),
  
  // 激活品牌（需要管理员权限）
  activateBrand: (id) => apiClient.patch(`/api/v1/brands/${id}/activate`),
  
  // 停用品牌（需要管理员权限）
  deactivateBrand: (id) => apiClient.patch(`/api/v1/brands/${id}/deactivate`),
  
  // 获取品牌类型列表
  getBrandTypes: () => apiClient.get('/api/v1/brands/types/'),
}

export default brandsApi
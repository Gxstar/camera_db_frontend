import apiClient from '../api-client.js'

// 品牌相关API
export const brandsApi = {
  // 获取品牌列表（支持筛选）
  getBrands: (params = {}) => apiClient.get('/brands/', { params }),
  
  // 创建品牌（需要管理员或编辑者权限）
  createBrand: (brandData) => apiClient.post('/brands/', brandData),
  
  // 获取单个品牌信息
  getBrandById: (id) => apiClient.get(`/brands/${id}`),
  
  // 更新品牌信息（需要管理员或编辑者权限）
  updateBrand: (id, brandData) => apiClient.put(`/brands/${id}`, brandData),
  
  // 删除品牌（需要管理员权限）
  deleteBrand: (id) => apiClient.delete(`/brands/${id}`),
  
  // 根据品牌名称获取品牌信息
  getBrandByName: (name) => apiClient.get(`/brands/name/${name}`),
  
  // 激活品牌（需要管理员权限）
  activateBrand: (id) => apiClient.patch(`/brands/${id}/activate`),
  
  // 停用品牌（需要管理员权限）
  deactivateBrand: (id) => apiClient.patch(`/brands/${id}/deactivate`),
  
  // 获取品牌类型列表
  getBrandTypes: () => apiClient.get('/brands/types/'),
}

export default brandsApi
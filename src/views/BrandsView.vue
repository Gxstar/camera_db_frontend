<template>
    <v-container fluid>
        <!-- 加载状态 -->
        <v-row v-if="loading">
            <v-col cols="12" class="text-center">
                <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
                <div class="mt-4 text-h6">加载品牌信息中...</div>
            </v-col>
        </v-row>

        <!-- 错误状态 -->
        <v-row v-else-if="error">
            <v-col cols="12" class="text-center">
                <v-alert type="error" variant="outlined" class="mb-4">
                    {{ error }}
                </v-alert>
                <v-btn @click="fetchBrands" color="primary" size="large">
                    <v-icon start icon="mdi-refresh"></v-icon>
                    重新加载
                </v-btn>
            </v-col>
        </v-row>

        <!-- 正常显示 -->
        <div v-else>
            <!-- 页面标题 -->
            <v-row class="mb-6">
                <v-col cols="12">
                    <div class="d-flex align-center">
                        <v-icon icon="mdi-tag-multiple" size="32" class="mr-3 text-primary"></v-icon>
                        <h1 class="text-h4 font-weight-bold">相机品牌</h1>
                        <v-chip class="ml-3" color="primary" variant="outlined">
                            {{ brands.length }} 个品牌
                        </v-chip>
                    </div>
                    <v-divider class="mt-2"></v-divider>
                </v-col>
            </v-row>

            <!-- 品牌列表 -->
            <v-row>
                <v-col v-for="brand in brands" :key="brand.id" cols="6" sm="4" md="3" lg="3" xl="2">
                    <v-card 
                        class="brand-card" 
                        elevation="4" 
                        @click="navigateToBrand(brand)" 
                        height="200"
                        :ripple="{ center: true }"
                    >
                        <v-card-text class="pa-4 text-center d-flex flex-column justify-center h-100">
                            <!-- 品牌Logo -->
                            <v-img 
                                :src="getBrandLogoUrl(brand.name)" 
                                :alt="brand.name" 
                                height="80" 
                                contain 
                                class="mb-3"
                            ></v-img>
                            
                            <!-- 品牌名称 -->
                            <div class="text-h6 font-weight-bold text-primary">{{ brand.name }}</div>
                            
                            <!-- 品牌类型 -->
                            <div class="text-caption text-medium-emphasis mt-1">
                                {{ brand.brand_type || '相机品牌' }}
                            </div>
                            
                            <!-- 状态指示器 -->
                            <v-chip 
                                v-if="brand.is_active !== undefined" 
                                :color="brand.is_active ? 'success' : 'error'" 
                                size="small" 
                                class="mt-2"
                            >
                                {{ brand.is_active ? '活跃' : '停用' }}
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- 空状态 -->
            <v-row v-if="brands.length === 0">
                <v-col cols="12" class="text-center">
                    <v-icon icon="mdi-information-outline" size="64" class="text-grey-lighten-1 mb-4"></v-icon>
                    <div class="text-h6 text-grey">暂无品牌数据</div>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '@/services/api.js'

const router = useRouter()

// 响应式数据
const brands = ref([])
const loading = ref(true)
const error = ref(null)

// 获取品牌数据
const fetchBrands = async () => {
    try {
        loading.value = true
        error.value = null
        
        const response = await apiService.brands.getBrands()
        brands.value = Array.isArray(response.data) ? response.data : []
        
    } catch (err) {
        console.error('获取品牌数据失败:', err)
        error.value = '获取品牌数据失败，请检查网络连接或后端服务状态'
    } finally {
        loading.value = false
    }
}

// 获取品牌Logo URL
const getBrandLogoUrl = (brandName) => {
    const logoMap = {
        '佳能': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Canon_logo.svg/320px-Canon_logo.svg.png',
        '尼康': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nikon_logo.svg/320px-Nikon_logo.svg.png',
        '索尼': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sony_logo.svg/320px-Sony_logo.svg.png',
        '富士': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Fujifilm_logo.svg/320px-Fujifilm_logo.svg.png',
        '松下': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Panasonic_logo_%28Blue%29.svg/320px-Panasonic_logo_%28Blue%29.svg.png',
        '奥林巴斯': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Olympus_Corporation_logo.svg/320px-Olympus_Corporation_logo.svg.png'
    }
    return logoMap[brandName] || 'https://via.placeholder.com/200x100?text=' + encodeURIComponent(brandName)
}

// 导航到品牌详情
const navigateToBrand = (brand) => {
    // 实际项目中可以导航到对应的品牌详情页
    console.log('导航到品牌详情:', brand.name)
    // router.push({ name: 'brand-detail', params: { id: brand.id } })
}

// 组件挂载时获取数据
onMounted(() => {
    fetchBrands()
})
</script>

<style scoped>
.brand-card {
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 12px;
}

.brand-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}
</style>
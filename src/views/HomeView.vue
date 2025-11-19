<template>
    <v-container>
        <!-- 加载状态 -->
        <v-row v-if="loading">
            <v-col cols="12" class="text-center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <div class="mt-2">加载中...</div>
            </v-col>
        </v-row>

        <!-- 错误状态 -->
        <v-row v-else-if="error">
            <v-col cols="12" class="text-center">
                <v-alert type="error" variant="outlined">
                    {{ error }}
                </v-alert>
                <v-btn @click="fetchData" color="primary" class="mt-2">重试</v-btn>
            </v-col>
        </v-row>

        <!-- 正常显示 -->
        <div v-else>
            <!-- 品牌部分 -->
            <v-row>
                <v-col class="mt-2" cols="12">
                    <div class="d-flex justify-space-between align-center">
                        <strong>品牌</strong>
                        <v-btn variant="elevated" color="primary" @click="showMoreBrands">显示更多</v-btn>
                    </div>
                </v-col>
                <v-divider :thickness="3" class="border-opacity-50" color="info"></v-divider>
                <v-col v-for="brand in brands" :key="brand.id" cols="6" sm="4" md="3" lg="3" xl="2">
                    <v-card class="brand-card" elevation="2" @click="navigateToBrand(brand)" height="160">
                        <v-card-text class="pa-3 text-center d-flex flex-column justify-center h-100">
                            <v-img :src="getBrandLogoUrl(brand.name)" :alt="brand.name" height="70" contain class="mb-2"></v-img>
                            <div class="brand-name text-body-2 font-weight-medium">{{ brand.name }}</div>
                            <div class="brand-description text-caption text-medium-emphasis mt-1">{{ brand.brand_type || '相机品牌' }}</div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- 相机部分 -->
            <v-row class="mt-8">
                <v-col class="mt-2" cols="12">
                    <div class="d-flex justify-space-between align-center">
                        <strong>相机</strong>
                        <v-btn variant="elevated" color="primary" @click="showMoreCameras">显示更多</v-btn>
                    </div>
                </v-col>
                <v-divider :thickness="3" class="border-opacity-50" color="info"></v-divider>
                <v-col v-for="camera in cameras" :key="camera.id" cols="6" sm="4" md="3" lg="3" xl="2">
                    <v-card class="brand-card" elevation="2" @click="navigateToCamera(camera)" height="180">
                        <v-card-text class="pa-3 text-center d-flex flex-column justify-center h-100">
                            <v-img :src="getCameraImageUrl(camera.model)" :alt="camera.model" height="80" contain class="mb-2"></v-img>
                            <div class="brand-name text-body-2 font-weight-medium">{{ camera.model }}</div>
                            <div class="brand-description text-caption text-medium-emphasis mt-1">{{ camera.brand?.name || '未知品牌' }}</div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- 镜头部分 -->
            <v-row class="mt-8">
                <v-col class="mt-2" cols="12">
                    <div class="d-flex justify-space-between align-center">
                        <strong>镜头</strong>
                        <v-btn variant="elevated" color="primary" @click="showMoreLenses">显示更多</v-btn>
                    </div>
                </v-col>
                <v-divider :thickness="3" class="border-opacity-50" color="info"></v-divider>
                <v-col v-for="lens in lenses" :key="lens.id" cols="6" sm="4" md="3" lg="3" xl="2">
                    <v-card class="brand-card" elevation="2" @click="navigateToLens(lens)" height="180">
                        <v-card-text class="pa-3 text-center d-flex flex-column justify-center h-100">
                            <v-img :src="getLensImageUrl(lens.model)" :alt="lens.model" height="80" contain class="mb-2"></v-img>
                            <div class="brand-name text-body-2 font-weight-medium">{{ lens.model }}</div>
                            <div class="brand-description text-caption text-medium-emphasis mt-1">
                                {{ lens.min_focal_length }}-{{ lens.max_focal_length }}mm 
                                {{ lens.max_aperture_min ? `f/${lens.max_aperture_min}` : '' }}
                            </div>
                        </v-card-text>
                    </v-card>
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
const cameras = ref([])
const lenses = ref([])
const loading = ref(true)
const error = ref(null)

// 获取数据函数
const fetchData = async () => {
    try {
        loading.value = true
        error.value = null

        // 使用预定义的API方法并行获取品牌、相机、镜头数据
        const [brandsResponse, camerasResponse, lensesResponse] = await Promise.all([
            apiService.brands.getBrands({ limit: 6 }),
            apiService.cameras.getCameras({ limit: 6 }),
            apiService.lenses.getLenses({ limit: 6 })
        ])

        // 更新数据
        brands.value = Array.isArray(brandsResponse.data) ? brandsResponse.data : []
        cameras.value = Array.isArray(camerasResponse.data) ? camerasResponse.data : []
        lenses.value = Array.isArray(lensesResponse.data) ? lensesResponse.data : []

    } catch (err) {
        console.error('获取数据失败:', err)
        error.value = '获取数据失败，请检查网络连接或后端服务状态'
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

// 获取相机图片URL
const getCameraImageUrl = (model) => {
    return `https://picsum.photos/200/150?random=${model}&camera`
}

// 获取镜头图片URL
const getLensImageUrl = (model) => {
    return `https://picsum.photos/200/150?random=${model}&lens`
}

// 组件挂载时获取数据
onMounted(() => {
    fetchData()
})

// 导航函数
const navigateToBrand = (brand) => {
    // 实际项目中可以导航到对应的品牌详情页
    console.log('导航到品牌:', brand.name)
}

const navigateToCamera = (camera) => {
    // 实际项目中可以导航到对应的相机详情页
    console.log('导航到相机:', camera.name)
}

const navigateToLens = (lens) => {
    // 实际项目中可以导航到对应的镜头详情页
    console.log('导航到镜头:', lens.name)
}

// 显示更多函数
const showMoreBrands = () => {
    router.push('/brands')
}

const showMoreCameras = () => {
    router.push('/cameras')
}

const showMoreLenses = () => {
    router.push('/lenses')
}
</script>

<style scoped>
.brand-card {
    cursor: pointer;
    transition: all 0.3s ease;
}

.brand-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
}

.brand-name {
    line-height: 1.2;
    margin-bottom: 2px;
}

.brand-description {
    line-height: 1.1;
}
</style>
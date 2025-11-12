<template>
    <v-container>
        <v-row>
            <v-col class="mt-2" cols="12">
                <div class="d-flex justify-space-between align-center">
                    <strong>品牌</strong>
                    <v-btn variant="elevated" color="primary" @click="showMoreBrands">显示更多</v-btn>
                </div>
            </v-col>
            <v-divider :thickness="3" class="border-opacity-50" color="info"></v-divider>
            <v-col v-for="brand in brands" :key="brand.name" cols="6" sm="4" md="3" lg="3" xl="2">
                <v-card class="brand-card" elevation="2" @click="navigateToBrand(brand)" height="160">
                    <v-card-text class="pa-3 text-center d-flex flex-column justify-center h-100">
                        <v-img :src="brand.logoUrl" :alt="brand.name" height="70" contain class="mb-2"></v-img>
                        <div class="brand-name text-body-2 font-weight-medium">{{ brand.name }}</div>
                        <div class="brand-description text-caption text-medium-emphasis mt-1">{{ brand.description }}
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- 相机v-row -->
        <v-row class="mt-8">
            <v-col class="mt-2" cols="12">
                <div class="d-flex justify-space-between align-center">
                    <strong>相机</strong>
                    <v-btn variant="elevated" color="primary" @click="showMoreCameras">显示更多</v-btn>
                </div>
            </v-col>
            <v-divider :thickness="3" class="border-opacity-50" color="info"></v-divider>
            <v-col v-for="camera in cameras" :key="camera.name" cols="6" sm="4" md="3" lg="3" xl="2">
                <v-card class="brand-card" elevation="2" @click="navigateToCamera(camera)" height="180">
                    <v-card-text class="pa-3 text-center d-flex flex-column justify-center h-100">
                        <v-img :src="camera.imageUrl" :alt="camera.name" height="80" contain class="mb-2"></v-img>
                        <div class="brand-name text-body-2 font-weight-medium">{{ camera.name }}</div>
                        <div class="brand-description text-caption text-medium-emphasis mt-1">{{ camera.brand }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- 镜头v-row -->
        <v-row class="mt-8">
            <v-col class="mt-2" cols="12">
                <div class="d-flex justify-space-between align-center">
                    <strong>镜头</strong>
                    <v-btn variant="elevated" color="primary" @click="showMoreLenses">显示更多</v-btn>
                </div>
            </v-col>
            <v-divider :thickness="3" class="border-opacity-50" color="info"></v-divider>
            <v-col v-for="lens in lenses" :key="lens.name" cols="6" sm="4" md="3" lg="3" xl="2">
                <v-card class="brand-card" elevation="2" @click="navigateToLens(lens)" height="180">
                    <v-card-text class="pa-3 text-center d-flex flex-column justify-center h-100">
                        <v-img :src="lens.imageUrl" :alt="lens.name" height="80" contain class="mb-2"></v-img>
                        <div class="brand-name text-body-2 font-weight-medium">{{ lens.name }}</div>
                        <div class="brand-description text-caption text-medium-emphasis mt-1">{{ lens.description }}
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


// 模拟数据 - 品牌
const brands = ref([
    {
        name: '佳能',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Canon_logo.svg/320px-Canon_logo.svg.png',
        description: '日本知名相机品牌'
    },
    {
        name: '尼康',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nikon_logo.svg/320px-Nikon_logo.svg.png',
        description: '日本光学仪器制造商'
    },
    {
        name: '索尼',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sony_logo.svg/320px-Sony_logo.svg.png',
        description: '日本跨国企业集团'
    },
    {
        name: '富士',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Fujifilm_logo.svg/320px-Fujifilm_logo.svg.png',
        description: '日本摄影器材公司'
    },
    {
        name: '松下',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Panasonic_logo_%28Blue%29.svg/320px-Panasonic_logo_%28Blue%29.svg.png',
        description: '日本电子产品制造商'
    },
    {
        name: '奥林巴斯',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Olympus_Corporation_logo.svg/320px-Olympus_Corporation_logo.svg.png',
        description: '日本光学产品公司'
    }
])

// 模拟数据 - 相机
const cameras = ref([
    { name: 'EOS R5', imageUrl: 'https://picsum.photos/200/150?random=1', brand: '佳能' },
    { name: 'Z7 II', imageUrl: 'https://picsum.photos/200/150?random=2', brand: '尼康' },
    { name: 'A7R IV', imageUrl: 'https://picsum.photos/200/150?random=3', brand: '索尼' },
    { name: 'X-T4', imageUrl: 'https://picsum.photos/200/150?random=4', brand: '富士' },
    { name: 'EOS R6', imageUrl: 'https://picsum.photos/200/150?random=5', brand: '佳能' },
    { name: 'Z6 II', imageUrl: 'https://picsum.photos/200/150?random=6', brand: '尼康' }
])

// 模拟数据 - 镜头
const lenses = ref([
    { name: '24-70mm f/2.8', imageUrl: 'https://picsum.photos/200/150?random=11', description: '标准变焦镜头' },
    { name: '70-200mm f/2.8', imageUrl: 'https://picsum.photos/200/150?random=12', description: '长焦变焦镜头' },
    { name: '35mm f/1.4', imageUrl: 'https://picsum.photos/200/150?random=13', description: '广角定焦镜头' },
    { name: '50mm f/1.2', imageUrl: 'https://picsum.photos/200/150?random=14', description: '标准定焦镜头' },
    { name: '85mm f/1.4', imageUrl: 'https://picsum.photos/200/150?random=15', description: '人像定焦镜头' },
    { name: '16-35mm f/2.8', imageUrl: 'https://picsum.photos/200/150?random=16', description: '超广角变焦镜头' }
])

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
    router.push({ name: 'brands' })
}

const showMoreCameras = () => {
    router.push({ name: 'cameras' })
}

const showMoreLenses = () => {
    router.push({ name: 'lenses' })
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
<template>
    <v-container>
        <v-row>
            <v-col class="mt-2" cols="12">
                <div class="d-flex justify-space-between align-center">
                    <strong>品牌</strong>
                    <v-btn variant="elevated" color="primary">显示更多</v-btn>
                </div>
            </v-col>
            <v-divider :thickness="3" class="border-opacity-50" color="info"></v-divider>
            <v-col v-for="j in 6" cols="6" md="2">
                <v-sheet height="150"></v-sheet>
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
    { name: '佳能', icon: 'mdi-camera' },
    { name: '尼康', icon: 'mdi-camera' },
    { name: '索尼', icon: 'mdi-camera' },
    { name: '富士', icon: 'mdi-camera' }
])

// 模拟数据 - 相机
const cameras = ref([
    { name: 'EOS R5', icon: 'mdi-camera' },
    { name: 'Z7 II', icon: 'mdi-camera' },
    { name: 'A7R IV', icon: 'mdi-camera' },
    { name: 'X-T4', icon: 'mdi-camera' }
])

// 模拟数据 - 镜头
const lenses = ref([
    { name: '24-70mm f/2.8', icon: 'mdi-camera-lens' },
    { name: '70-200mm f/2.8', icon: 'mdi-camera-lens' },
    { name: '35mm f/1.4', icon: 'mdi-camera-lens' },
    { name: '50mm f/1.2', icon: 'mdi-camera-lens' },
    { name: '85mm f/1.4', icon: 'mdi-camera-lens' },
    { name: '16-35mm f/2.8', icon: 'mdi-camera-lens' },
    { name: '100-400mm f/4.5-5.6', icon: 'mdi-camera-lens' },
    { name: '105mm f/2.8', icon: 'mdi-camera-lens' }
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
</script>

<style scoped></style>
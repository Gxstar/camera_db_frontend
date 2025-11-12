<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="camera in cameras" :key="camera.name" cols="6" sm="4" md="3" lg="3" xl="2">
                <v-card class="brand-card" elevation="2" @click="navigateToCamera(camera)" height="180">
                    <v-img :src="camera.imageUrl" height="80" contain></v-img>
                    <v-card-text class="pa-3 text-center d-flex flex-column justify-center h-100">
                        <div class="text-h6">{{ camera.name }}</div>
                        <div class="text-body-2 mt-1">{{ camera.description }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 模拟相机数据
const cameras = ref([
    {
        name: '佳能 EOS R5',
        description: '4500万像素全画幅无反相机',
        imageUrl: 'https://via.placeholder.com/150x100?text=EOS+R5'
    },
    {
        name: '尼康 Z7 II',
        description: '4570万像素全画幅无反相机',
        imageUrl: 'https://via.placeholder.com/150x100?text=Z7+II'
    },
    {
        name: '索尼 A7R IV',
        description: '6100万像素全画幅无反相机',
        imageUrl: 'https://via.placeholder.com/150x100?text=A7R+IV'
    },
    {
        name: '富士 X-T4',
        description: '2610万像素APS-C无反相机',
        imageUrl: 'https://via.placeholder.com/150x100?text=X-T4'
    },
    {
        name: '佳能 EOS R6',
        description: '2010万像素全画幅无反相机',
        imageUrl: 'https://via.placeholder.com/150x100?text=EOS+R6'
    },
    {
        name: '尼康 Z6 II',
        description: '2450万像素全画幅无反相机',
        imageUrl: 'https://via.placeholder.com/150x100?text=Z6+II'
    }
])

const router = useRouter()

const navigateToCamera = (camera) => {
    // 这里可以添加导航到相机详情页的逻辑
    console.log('导航到相机详情:', camera.name)
}
</script>
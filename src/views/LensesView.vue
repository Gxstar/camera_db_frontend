<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="lens in lenses" :key="lens.name" cols="6" sm="4" md="3" lg="3" xl="2">
                <v-card class="brand-card" elevation="2" @click="navigateToLens(lens)" height="180">
                    <v-img :src="lens.imageUrl" height="80" contain></v-img>
                    <v-card-text class="pa-3 text-center d-flex flex-column justify-center h-100">
                        <div class="text-h6">{{ lens.name }}</div>
                        <div class="text-body-2 mt-1">{{ lens.description }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 模拟镜头数据
const lenses = ref([
    {
        name: '24-70mm f/2.8',
        description: '标准变焦镜头',
        imageUrl: 'https://via.placeholder.com/150x100?text=24-70mm'
    },
    {
        name: '70-200mm f/2.8',
        description: '长焦变焦镜头',
        imageUrl: 'https://via.placeholder.com/150x100?text=70-200mm'
    },
    {
        name: '35mm f/1.4',
        description: '广角定焦镜头',
        imageUrl: 'https://via.placeholder.com/150x100?text=35mm'
    },
    {
        name: '50mm f/1.2',
        description: '标准定焦镜头',
        imageUrl: 'https://via.placeholder.com/150x100?text=50mm'
    },
    {
        name: '85mm f/1.4',
        description: '人像定焦镜头',
        imageUrl: 'https://via.placeholder.com/150x100?text=85mm'
    },
    {
        name: '16-35mm f/2.8',
        description: '超广角变焦镜头',
        imageUrl: 'https://via.placeholder.com/150x100?text=16-35mm'
    }
])

const router = useRouter()

const navigateToLens = (lens) => {
    // 这里可以添加导航到镜头详情页的逻辑
    console.log('导航到镜头详情:', lens.name)
}
</script>
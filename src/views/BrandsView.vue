<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="brand in brands" :key="brand.name" cols="6" sm="4" md="3" lg="3" xl="2">
                <v-card class="brand-card" elevation="2" @click="navigateToBrand(brand)" height="180">
                    <v-img :src="brand.logoUrl" height="100" contain></v-img>
                    <v-card-text>
                        <div class="text-h6">{{ brand.name }}</div>
                        <div class="text-body-2">{{ brand.description }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 从数据库获取品牌列表
const brands = ref([])
const router = useRouter()

</script>
<template>
    <v-container fluid>
        <!-- 欢迎区域 -->
        <v-row class="mb-10 mt-4">
            <v-col cols="12" class="text-center">
                <div class="display-1 font-weight-bold primary--text mb-4 animate__animated animate__fadeInDown">
                    阿星摄影数据库
                </div>
                <div class="text-h5 text-medium-emphasis animate__animated animate__fadeIn animate__delay-1s">
                    记录光影，珍藏每一刻。探索最全面的器材数据与摄影灵感。
                </div>
                <!-- 快捷搜索框或搜索引导 -->
                <v-responsive max-width="600" class="mx-auto mt-8">
                    <v-text-field
                        prepend-inner-icon="mdi-magnify"
                        label="搜索器材、品牌或摄影知识"
                        variant="solo-filled"
                        rounded="pill"
                        color="primary"
                        class="elevation-2"
                    ></v-text-field>
                </v-responsive>
            </v-col>
        </v-row>

        <!-- 焦点分类入口 -->
        <v-row>
            <v-col v-for="category in categories" :key="category.title" cols="12" sm="6" md="4">
                <v-hover v-slot="{ isHovering, props }">
                    <v-card
                        v-bind="props"
                        :elevation="isHovering ? 12 : 2"
                        :class="{ 'on-hover': isHovering }"
                        class="category-card cursor-pointer"
                        @click="navigateTo(category.routeName)"
                    >
                        <v-img
                            :src="category.image"
                            height="240"
                            cover
                            class="align-end text-white"
                        >
                            <div class="gradient-overlay pa-4 w-100">
                                <div class="text-h5 font-weight-bold mb-1">{{ category.title }}</div>
                                <div class="text-subtitle-2">{{ category.subtitle }}</div>
                            </div>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>

        <!-- 最近更新/热门推荐 -->
        <v-row class="mt-12 mb-8">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon icon="mdi-star-outline" color="amber-darken-2" class="mr-2" size="32"></v-icon>
                    <h2 class="text-h4 font-weight-bold">热门推荐</h2>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" color="primary" append-icon="mdi-chevron-right">查看更多</v-btn>
                </div>
                <v-divider class="mt-2"></v-divider>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="item in featuredItems" :key="item.name" cols="12" sm="4" md="3">
                <v-card class="mx-auto h-100" elevation="1">
                    <v-img :src="item.image" height="200" cover></v-img>
                    <v-card-title class="pb-0">{{ item.name }}</v-card-title>
                    <v-card-subtitle class="pt-2">{{ item.brand }}</v-card-subtitle>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" variant="text">了解详情</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (routeName) => {
    router.push({ name: routeName })
}

const categories = ref([
    {
        title: '器材品牌',
        subtitle: '搜罗全球顶级影像制造商',
        routeName: 'brands',
        image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=800&auto=format&fit=crop'
    },
    {
        title: '相机机身',
        subtitle: '从微单到胶片，应有尽有',
        routeName: 'cameras',
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop'
    },
    {
        title: '光学镜头',
        subtitle: '探索最极致的成像体验',
        routeName: 'lenses',
        image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop'
    }
])

const featuredItems = ref([
    {
        name: 'EOS R5',
        brand: 'Canon',
        image: 'https://images.unsplash.com/photo-1616423642157-194168019782?q=80&w=400&auto=format&fit=crop'
    },
    {
        name: 'Z9',
        brand: 'Nikon',
        image: 'https://images.unsplash.com/photo-1603575448878-868a20723f5d?q=80&w=400&auto=format&fit=crop'
    },
    {
        name: 'A7R V',
        brand: 'Sony',
        image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=400&auto=format&fit=crop'
    },
    {
        name: 'X-T5',
        brand: 'Fujifilm',
        image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=400&auto=format&fit=crop'
    }
])
</script>

<style scoped>
.category-card {
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    border-radius: 16px;
    overflow: hidden;
}

.category-card:hover {
    transform: scale(1.02);
}

.gradient-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
}

.display-1 {
    font-size: 3.5rem;
    letter-spacing: -1px;
}
</style>

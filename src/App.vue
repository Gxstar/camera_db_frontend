<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const drawer = ref(false)
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// 判断是否不在管理页面
const isNotAdmin = computed(() => route.name !== 'admin')

// 导航到指定路由
const navigateTo = (routeName) => {
  if (routeName === 'user-center') {
    const userId = authStore.user?.id || 'me' // 如果还没加载出 ID，先用 me 占位或者根据业务处理
    router.push({ name: routeName, params: { id: userId } })
  } else {
    router.push({ name: routeName })
  }
  drawer.value = false
}

// 用户注销
const logout = () => {
  authStore.logout()
  router.push({ name: 'login' })
  drawer.value = false
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon v-if="isNotAdmin" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title style="cursor: pointer" @click="navigateTo('home')">阿星摄影数据库</v-app-bar-title>
      <v-spacer></v-spacer>
      
      <!-- 未登录状态：显示登录按钮 -->
      <v-btn v-if="!authStore.isAuthenticated" 
             prepend-icon="mdi-login" 
             variant="text" 
             @click="navigateTo('login')">
        登录
      </v-btn>
      
      <!-- 已登录状态：显示用户信息和注销按钮 -->
      <div v-else class="d-flex align-center">
        <v-avatar size="32" class="mr-2">
          <v-icon icon="mdi-account" size="24"></v-icon>
        </v-avatar>
        <span class="mr-3">{{ authStore.user?.username || '用户' }}</span>
        <v-btn icon="mdi-logout" variant="text" @click="logout" title="注销"></v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-if="isNotAdmin" v-model="drawer" temporary class="bg-gradient-to-b from-blue-50 to-white">
      <v-list class="py-2">
        <v-list-item link title="首页" prepend-icon="mdi-home" class="hover:bg-blue-100 transition-colors duration-200" @click="navigateTo('home')">
          <template v-slot:prepend>
            <v-icon icon="mdi-home" class="text-blue-600 mr-3" />
          </template>
        </v-list-item>

        <v-list-item link title="品牌" prepend-icon="mdi-tag-multiple"
          class="hover:bg-green-100 transition-colors duration-200" @click="navigateTo('brands')">
          <template v-slot:prepend>
            <v-icon icon="mdi-tag-multiple" class="text-green-600 mr-3" />
          </template>
        </v-list-item>

        <v-list-item link title="相机" prepend-icon="mdi-camera"
          class="hover:bg-purple-100 transition-colors duration-200" @click="navigateTo('cameras')">
          <template v-slot:prepend>
            <v-icon icon="mdi-camera" class="text-purple-600 mr-3" />
          </template>
        </v-list-item>

        <v-list-item link title="镜头" prepend-icon="mdi-camera-iris"
          class="hover:bg-orange-100 transition-colors duration-200" @click="navigateTo('lenses')">
          <template v-slot:prepend>
            <v-icon icon="mdi-camera-iris" class="text-orange-600 mr-3" />
          </template>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item v-if="authStore.isAuthenticated" link title="个人中心" prepend-icon="mdi-account-circle"
          class="hover:bg-blue-50 transition-colors duration-200" @click="navigateTo('user-center')">
          <template v-slot:prepend>
            <v-icon icon="mdi-account-circle" class="text-blue-600 mr-3" />
          </template>
        </v-list-item>

        <v-list-item v-if="authStore.isAuthenticated" link title="管理后台" prepend-icon="mdi-cog"
          class="hover:bg-red-100 transition-colors duration-200" @click="navigateTo('admin')">
          <template v-slot:prepend>
            <v-icon icon="mdi-cog" class="text-red-600 mr-3" />
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
        <router-view />
    </v-main>
  </v-app>
</template>

<style scoped></style>

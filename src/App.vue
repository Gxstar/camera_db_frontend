<script setup>
import HomeView from './views/HomeView.vue'
import { ref } from 'vue'

const drawer = ref(false)
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>阿星摄影数据库</v-app-bar-title>
      <v-btn icon="mdi-account-circle" variant="text"></v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary class="bg-gradient-to-b from-blue-50 to-white">
      <v-list class="py-2">
        <v-list-item link title="首页" prepend-icon="mdi-home" class="hover:bg-blue-100 transition-colors duration-200">
          <template v-slot:prepend>
            <v-icon icon="mdi-home" class="text-blue-600 mr-3" />
          </template>
        </v-list-item>

        <v-list-item link title="品牌" prepend-icon="mdi-tag-multiple"
          class="hover:bg-green-100 transition-colors duration-200">
          <template v-slot:prepend>
            <v-icon icon="mdi-tag-multiple" class="text-green-600 mr-3" />
          </template>
        </v-list-item>

        <v-list-item link title="相机" prepend-icon="mdi-camera"
          class="hover:bg-purple-100 transition-colors duration-200">
          <template v-slot:prepend>
            <v-icon icon="mdi-camera" class="text-purple-600 mr-3" />
          </template>
        </v-list-item>

        <v-list-item link title="镜头" prepend-icon="mdi-camera-iris"
          class="hover:bg-orange-100 transition-colors duration-200">
          <template v-slot:prepend>
            <v-icon icon="mdi-camera-iris" class="text-orange-600 mr-3" />
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
        <HomeView />
    </v-main>
  </v-app>
</template>

<style scoped></style>

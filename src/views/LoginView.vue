<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>用户登录</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-alert v-if="errorMessage" type="error" dismissible>
              {{ errorMessage }}
            </v-alert>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                label="用户名"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                :rules="usernameRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="密码"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="passwordRules"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" :loading="loading" :disabled="!valid">
              登录
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const valid = ref(false)
const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const form = ref()

const usernameRules = [
  v => !!v || '用户名是必填项',
  v => (v && v.length >= 3) || '用户名至少需要3个字符'
]

const passwordRules = [
  v => !!v || '密码是必填项',
  v => (v && v.length >= 6) || '密码至少需要6个字符'
]

const login = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    // 使用Pinia存储进行登录
    const result = await authStore.login(username.value, password.value)
    
    if (result.success) {
      // 跳转到管理页面
      router.push('/admin')
    } else {
      errorMessage.value = result.error || '登录失败，请稍后重试'
    }
  } catch (error) {
    console.error('登录失败:', error)
    errorMessage.value = '登录失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
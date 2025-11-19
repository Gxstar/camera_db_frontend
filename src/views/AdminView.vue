<template>
  <div class="admin-container">
    <v-card class="mx-auto" max-width="1200">
      <!-- 标题栏 -->
      <v-card-title class="d-flex align-center">
        <span class="text-h5">管理系统</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="logout">注销</v-btn>
      </v-card-title>

      <!-- 导航标签页 -->
      <v-tabs v-model="activeTab" fixed-tabs>
        <v-tab value="users">用户管理</v-tab>
        <v-tab value="brands">品牌管理</v-tab>
        <v-tab value="cameras">相机管理</v-tab>
        <v-tab value="lenses">镜头管理</v-tab>
        <v-tab value="mounts">卡口管理</v-tab>
      </v-tabs>

      <!-- 标签页内容 -->
      <v-window v-model="activeTab">
        <!-- 用户管理 -->
        <v-window-item value="users">
          <v-card-text>
            <v-data-table
              :headers="userHeaders"
              :items="users"
              class="elevation-1"
              hide-default-footer
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>用户列表</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="userDialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                      <v-btn color="primary" dark v-bind="props">新增用户</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ editingUser ? '编辑用户' : '新增用户' }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="userForm.username"
                                label="用户名"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="userForm.email"
                                label="邮箱"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-switch
                                v-model="userForm.is_active"
                                label="激活状态"
                              ></v-switch>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" variant="text" @click="userDialog = false">取消</v-btn>
                        <v-btn color="blue darken-1" variant="text" @click="saveUser">保存</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.is_active="{ item }">
                <v-chip :color="item.is_active ? 'green' : 'red'" small>
                  {{ item.is_active ? '激活' : '未激活' }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="me-2" @click="openUserDialog(item)">mdi-pencil</v-icon>
                <v-icon size="small" @click="deleteUser(item.id)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-window-item>

        <!-- 品牌管理 -->
        <v-window-item value="brands">
          <v-card-text>
            <v-data-table
              :headers="brandHeaders"
              :items="brands"
              class="elevation-1"
              hide-default-footer
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>品牌列表</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="brandDialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                      <v-btn color="primary" dark v-bind="props">新增品牌</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ editingBrand ? '编辑品牌' : '新增品牌' }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="brandForm.name"
                                label="名称"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="brandForm.country"
                                label="国家"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" variant="text" @click="brandDialog = false">取消</v-btn>
                        <v-btn color="blue darken-1" variant="text" @click="saveBrand">保存</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="me-2" @click="openBrandDialog(item)">mdi-pencil</v-icon>
                <v-icon size="small" @click="deleteBrand(item.id)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-window-item>

        <!-- 相机管理 -->
        <v-window-item value="cameras">
          <v-card-text>
            <v-data-table
              :headers="cameraHeaders"
              :items="cameras"
              class="elevation-1"
              hide-default-footer
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>相机列表</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="cameraDialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                      <v-btn color="primary" dark v-bind="props">新增相机</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ editingCamera ? '编辑相机' : '新增相机' }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="cameraForm.name"
                                label="名称"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-select
                                v-model="cameraForm.brand_id"
                                :items="brandOptions"
                                label="品牌"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12">
                              <v-select
                                v-model="cameraForm.mount_id"
                                :items="mountOptions"
                                label="卡口"
                                required
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" variant="text" @click="cameraDialog = false">取消</v-btn>
                        <v-btn color="blue darken-1" variant="text" @click="saveCamera">保存</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="me-2" @click="openCameraDialog(item)">mdi-pencil</v-icon>
                <v-icon size="small" @click="deleteCamera(item.id)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-window-item>

        <!-- 镜头管理 -->
        <v-window-item value="lenses">
          <v-card-text>
            <v-data-table
              :headers="lensHeaders"
              :items="lenses"
              class="elevation-1"
              hide-default-footer
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>镜头列表</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="lensDialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                      <v-btn color="primary" dark v-bind="props">新增镜头</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ editingLens ? '编辑镜头' : '新增镜头' }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="lensForm.name"
                                label="名称"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-select
                                v-model="lensForm.brand_id"
                                :items="brandOptions"
                                label="品牌"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12">
                              <v-select
                                v-model="lensForm.mount_id"
                                :items="mountOptions"
                                label="卡口"
                                required
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" variant="text" @click="lensDialog = false">取消</v-btn>
                        <v-btn color="blue darken-1" variant="text" @click="saveLens">保存</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="me-2" @click="openLensDialog(item)">mdi-pencil</v-icon>
                <v-icon size="small" @click="deleteLens(item.id)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-window-item>

        <!-- 卡口管理 -->
        <v-window-item value="mounts">
          <v-card-text>
            <v-data-table
              :headers="mountHeaders"
              :items="mounts"
              class="elevation-1"
              hide-default-footer
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>卡口列表</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="mountDialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                      <v-btn color="primary" dark v-bind="props">新增卡口</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ editingMount ? '编辑卡口' : '新增卡口' }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="mountForm.name"
                                label="名称"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" variant="text" @click="mountDialog = false">取消</v-btn>
                        <v-btn color="blue darken-1" variant="text" @click="saveMount">保存</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="me-2" @click="openMountDialog(item)">mdi-pencil</v-icon>
                <v-icon size="small" @click="deleteMount(item.id)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import apiService from '@/services/api'
const { users: userApi, brands: brandApi, cameras: cameraApi, lenses: lensApi, mounts: mountApi } = apiService

// 路由和存储
const router = useRouter()
const authStore = useAuthStore()

// 当前活动的选项卡
const activeTab = ref('users')

// 用户管理相关状态
const users = ref([])
const userDialog = ref(false)
const userForm = ref({ username: '', email: '', is_active: true })
const editingUser = ref(null)
const userHeaders = [
  { title: 'ID', key: 'id' },
  { title: '用户名', key: 'username' },
  { title: '邮箱', key: 'email' },
  { title: '激活状态', key: 'is_active' },
  { title: '创建时间', key: 'created_at' },
  { title: '操作', key: 'actions', sortable: false }
]

// 品牌管理相关状态
const brands = ref([])
const brandDialog = ref(false)
const brandForm = ref({ name: '', country: '' })
const editingBrand = ref(null)
const brandHeaders = [
  { title: 'ID', key: 'id' },
  { title: '名称', key: 'name' },
  { title: '国家', key: 'country' },
  { title: '操作', key: 'actions', sortable: false }
]

// 相机管理相关状态
const cameras = ref([])
const cameraDialog = ref(false)
const cameraForm = ref({ name: '', brand_id: null, mount_id: null })
const editingCamera = ref(null)
const cameraHeaders = [
  { title: 'ID', key: 'id' },
  { title: '名称', key: 'name' },
  { title: '品牌', key: 'brand_name' },
  { title: '卡口', key: 'mount_name' },
  { title: '操作', key: 'actions', sortable: false }
]

// 镜头管理相关状态
const lenses = ref([])
const lensDialog = ref(false)
const lensForm = ref({ name: '', brand_id: null, mount_id: null })
const editingLens = ref(null)
const lensHeaders = [
  { title: 'ID', key: 'id' },
  { title: '名称', key: 'name' },
  { title: '品牌', key: 'brand_name' },
  { title: '卡口', key: 'mount_name' },
  { title: '操作', key: 'actions', sortable: false }
]

// 卡口管理相关状态
const mounts = ref([])
const mountDialog = ref(false)
const mountForm = ref({ name: '' })
const editingMount = ref(null)
const mountHeaders = [
  { title: 'ID', key: 'id' },
  { title: '名称', key: 'name' },
  { title: '操作', key: 'actions', sortable: false }
]

// 品牌和卡口选项（用于下拉选择）
const brandOptions = ref([])
const mountOptions = ref([])

// 获取所有数据
const fetchData = async () => {
  await Promise.all([
    fetchUsers(),
    fetchBrands(),
    fetchCameras(),
    fetchLenses(),
    fetchMounts()
  ])
}

// 获取用户列表
const fetchUsers = async () => {
  try {
    const response = await userApi.getAll()
    users.value = response.data
  } catch (error) {
    console.error('获取用户列表失败:', error)
  }
}

// 获取品牌列表
const fetchBrands = async () => {
  try {
    const response = await brandApi.getAll()
    brands.value = response.data
    brandOptions.value = response.data.map(brand => ({
      value: brand.id,
      title: brand.name
    }))
  } catch (error) {
    console.error('获取品牌列表失败:', error)
  }
}

// 获取相机列表
const fetchCameras = async () => {
  try {
    const response = await cameraApi.getAll()
    cameras.value = response.data
  } catch (error) {
    console.error('获取相机列表失败:', error)
  }
}

// 获取镜头列表
const fetchLenses = async () => {
  try {
    const response = await lensApi.getAll()
    lenses.value = response.data
  } catch (error) {
    console.error('获取镜头列表失败:', error)
  }
}

// 获取卡口列表
const fetchMounts = async () => {
  try {
    const response = await mountApi.getAll()
    mounts.value = response.data
    mountOptions.value = response.data.map(mount => ({
      value: mount.id,
      title: mount.name
    }))
  } catch (error) {
    console.error('获取卡口列表失败:', error)
  }
}

// 用户操作
const openUserDialog = (user = null) => {
  if (user) {
    editingUser.value = { ...user }
    userForm.value = { ...user }
  } else {
    editingUser.value = null
    userForm.value = { username: '', email: '', is_active: true }
  }
  userDialog.value = true
}

const saveUser = async () => {
  try {
    if (editingUser.value) {
      await userApi.update(editingUser.value.id, userForm.value)
    } else {
      await userApi.create(userForm.value)
    }
    await fetchUsers()
    userDialog.value = false
  } catch (error) {
    console.error('保存用户失败:', error)
  }
}

const deleteUser = async (id) => {
  if (confirm('确定要删除这个用户吗？')) {
    try {
      await userApi.delete(id)
      await fetchUsers()
    } catch (error) {
      console.error('删除用户失败:', error)
    }
  }
}

// 品牌操作
const openBrandDialog = (brand = null) => {
  if (brand) {
    editingBrand.value = { ...brand }
    brandForm.value = { ...brand }
  } else {
    editingBrand.value = null
    brandForm.value = { name: '', country: '' }
  }
  brandDialog.value = true
}

const saveBrand = async () => {
  try {
    if (editingBrand.value) {
      await brandApi.update(editingBrand.value.id, brandForm.value)
    } else {
      await brandApi.create(brandForm.value)
    }
    await fetchBrands()
    brandDialog.value = false
  } catch (error) {
    console.error('保存品牌失败:', error)
  }
}

const deleteBrand = async (id) => {
  if (confirm('确定要删除这个品牌吗？')) {
    try {
      await brandApi.delete(id)
      await fetchBrands()
    } catch (error) {
      console.error('删除品牌失败:', error)
    }
  }
}

// 相机操作
const openCameraDialog = (camera = null) => {
  if (camera) {
    editingCamera.value = { ...camera }
    cameraForm.value = { ...camera }
  } else {
    editingCamera.value = null
    cameraForm.value = { name: '', brand_id: null, mount_id: null }
  }
  cameraDialog.value = true
}

const saveCamera = async () => {
  try {
    if (editingCamera.value) {
      await cameraApi.update(editingCamera.value.id, cameraForm.value)
    } else {
      await cameraApi.create(cameraForm.value)
    }
    await fetchCameras()
    cameraDialog.value = false
  } catch (error) {
    console.error('保存相机失败:', error)
  }
}

const deleteCamera = async (id) => {
  if (confirm('确定要删除这个相机吗？')) {
    try {
      await cameraApi.delete(id)
      await fetchCameras()
    } catch (error) {
      console.error('删除相机失败:', error)
    }
  }
}

// 镜头操作
const openLensDialog = (lens = null) => {
  if (lens) {
    editingLens.value = { ...lens }
    lensForm.value = { ...lens }
  } else {
    editingLens.value = null
    lensForm.value = { name: '', brand_id: null, mount_id: null }
  }
  lensDialog.value = true
}

const saveLens = async () => {
  try {
    if (editingLens.value) {
      await lensApi.update(editingLens.value.id, lensForm.value)
    } else {
      await lensApi.create(lensForm.value)
    }
    await fetchLenses()
    lensDialog.value = false
  } catch (error) {
    console.error('保存镜头失败:', error)
  }
}

const deleteLens = async (id) => {
  if (confirm('确定要删除这个镜头吗？')) {
    try {
      await lensApi.delete(id)
      await fetchLenses()
    } catch (error) {
      console.error('删除镜头失败:', error)
    }
  }
}

// 卡口操作
const openMountDialog = (mount = null) => {
  if (mount) {
    editingMount.value = { ...mount }
    mountForm.value = { ...mount }
  } else {
    editingMount.value = null
    mountForm.value = { name: '' }
  }
  mountDialog.value = true
}

const saveMount = async () => {
  try {
    if (editingMount.value) {
      await mountApi.update(editingMount.value.id, mountForm.value)
    } else {
      await mountApi.create(mountForm.value)
    }
    await fetchMounts()
    mountDialog.value = false
  } catch (error) {
    console.error('保存卡口失败:', error)
  }
}

const deleteMount = async (id) => {
  if (confirm('确定要删除这个卡口吗？')) {
    try {
      await mountApi.delete(id)
      await fetchMounts()
    } catch (error) {
      console.error('删除卡口失败:', error)
    }
  }
}

// 用户注销
const logout = () => {
  authStore.logout()
  router.push('/login')
}

// 初始化加载数据
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.v-data-table {
  margin: 16px;
}

.v-card-title {
  padding: 16px 24px;
}

.v-tabs {
  border-bottom: 1px solid #e0e0e0;
}

.v-dialog :deep(.v-card) {
  border-radius: 8px;
}

.v-form :deep(.v-text-field) {
  margin-bottom: 16px;
}
</style>

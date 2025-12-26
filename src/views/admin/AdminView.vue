<template>
  <v-layout class="admin-layout">
    <!-- 侧边导航栏 -->
    <v-navigation-drawer
      v-model="drawer"
      permanent
      elevation="2"
      class="admin-sidebar"
      :rail="rail"
      @click="rail = false"
    >
      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
        title="管理系统"
        nav
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :active="activeTab === item.value"
          @click="activeTab = item.value"
          color="primary"
          rounded="lg"
          class="mb-1"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" variant="tonal" prepend-icon="mdi-logout" @click="logout">
            {{ rail ? '' : '退出登录' }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="admin-main bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <!-- 页面标题 -->
        <div class="d-flex align-center mb-6 px-4">
          <div>
            <h1 class="text-h4 font-weight-bold grey-darken-3">{{ currentEntity.label }}</h1>
            <p class="text-subtitle-1 text-grey-darken-1">管理系统中的{{ currentEntity.label }}数据</p>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            size="large"
            elevation="1"
            class="text-none"
            rounded="lg"
            @click="openDialog()"
          >
            新增{{ currentEntity.singleLabel }}
          </v-btn>
        </div>

        <!-- 数据表格卡片 -->
        <v-card elevation="0" rounded="xl" class="table-card">
          <v-data-table
            :headers="currentEntity.headers"
            :items="dataList"
            :loading="loading"
            loading-text="正在加载数据..."
            hover
            class="admin-table"
          >
            <!-- 自定义激活状态列 -->
            <template v-slot:item.is_active="{ item }">
              <v-chip
                :color="item.is_active ? 'success' : 'error'"
                size="small"
                variant="flat"
                class="font-weight-medium"
              >
                {{ item.is_active ? '已激活' : '未激活' }}
              </v-chip>
            </template>

            <!-- 操作列 -->
            <template v-slot:item.actions="{ item }">
              <div class="d-flex ga-2">
                <v-btn
                  icon="mdi-pencil-outline"
                  variant="text"
                  size="small"
                  color="primary"
                  @click="openDialog(item)"
                ></v-btn>
                <v-btn
                  icon="mdi-delete-outline"
                  variant="text"
                  size="small"
                  color="error"
                  @click="confirmDelete(item)"
                ></v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-container>

      <!-- 编辑/新增对话框 -->
      <v-dialog v-model="dialog" max-width="900px" transition="dialog-bottom-transition" scrollable>
        <v-card rounded="xl" class="pa-2">
          <v-card-title class="d-flex align-center pa-4">
            <span class="text-h5 font-weight-bold">{{ editingItem ? '编辑' : '新增' }}{{ currentEntity.singleLabel }}</span>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" @click="dialog = false"></v-btn>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="pa-4" style="max-height: 70vh;">
            <v-form ref="form" v-model="formValid">
              <!-- 只读信息展示 (仅编辑模式) -->
              <v-row v-if="editingItem" class="mb-4 ga-4 px-3">
                <v-chip size="small" variant="tonal" color="grey">ID: {{ editingItem.id }}</v-chip>
                <v-chip v-if="editingItem.create_time" size="small" variant="tonal" color="grey">创建: {{ formatDate(editingItem.create_time) }}</v-chip>
                <v-chip v-if="editingItem.update_time" size="small" variant="tonal" color="grey">更新: {{ formatDate(editingItem.update_time) }}</v-chip>
              </v-row>

              <v-row>
                <v-col
                  v-for="field in currentEntity.formFields"
                  :key="field.key"
                  cols="12"
                  :md="field.md || 6"
                >
                  <!-- 文本输入 -->
                  <v-text-field
                    v-if="field.type === 'text' || field.type === 'number'"
                    v-model="formData[field.key]"
                    :label="field.label"
                    :type="field.type === 'number' ? 'number' : 'text'"
                    :rules="field.required ? [v => !!v || `${field.label}是必填项`] : []"
                    :readonly="field.readonly"
                    :hint="field.hint"
                    persistent-hint
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                  ></v-text-field>

                  <!-- 日期选择 (简化为文本输入，实际应配合 date picker) -->
                  <v-text-field
                    v-else-if="field.type === 'date'"
                    v-model="formData[field.key]"
                    :label="field.label"
                    type="date"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                  ></v-text-field>

                  <!-- 下拉选择 -->
                  <v-select
                    v-else-if="field.type === 'select'"
                    v-model="formData[field.key]"
                    :items="getOptions(field.optionKey)"
                    :label="field.label"
                    :rules="field.required ? [v => !!v || `${field.label}是必填项`] : []"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                  ></v-select>

                  <!-- 开关 -->
                  <v-switch
                    v-else-if="field.type === 'switch'"
                    v-model="formData[field.key]"
                    :label="field.label"
                    color="primary"
                    inset
                  ></v-switch>

                  <!-- 文本域 -->
                  <v-textarea
                    v-else-if="field.type === 'textarea'"
                    v-model="formData[field.key]"
                    :label="field.label"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    rows="3"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              class="text-none px-6"
              rounded="lg"
              @click="dialog = false"
            >
              取消
            </v-btn>
            <v-btn
              color="primary"
              variant="flat"
              class="text-none px-6"
              rounded="lg"
              :loading="saving"
              @click="saveItem"
            >
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 删除确认对话框 -->
      <v-dialog v-model="deleteDialog" max-width="400px">
        <v-card rounded="xl" class="pa-4">
          <v-card-title class="text-h5 text-center px-4 pt-4">确认删除？</v-card-title>
          <v-card-text class="text-center text-grey-darken-1 pa-4">
            确定要删除此{{ currentEntity.singleLabel }}吗？此操作无法撤销。
          </v-card-text>
          <v-card-actions class="justify-center pt-2 pb-4">
            <v-btn variant="text" rounded="lg" class="px-6" @click="deleteDialog = false">取消</v-btn>
            <v-btn color="error" variant="flat" rounded="lg" class="px-6" @click="doDelete">确定删除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 通知提示 -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" rounded="lg" elevation="10">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar.show = false">关闭</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import apiService from '@/services/api'

// 路由与存储
const router = useRouter()
const authStore = useAuthStore()

// 侧边栏状态
const drawer = ref(true)
const rail = ref(false)
const activeTab = ref('users')

// UI 状态
const loading = ref(false)
const saving = ref(false)
const dialog = ref(false)
const deleteDialog = ref(false)
const formValid = ref(false)
const snackbar = ref({ show: false, text: '', color: 'success' })

// 数据状态
const dataList = ref([])
const formData = ref({})
const editingItem = ref(null)
const itemToDelete = ref(null)

// 选项数据
const brandOptions = ref([])
const mountOptions = ref([])
const sensorSizeOptions = [
  { title: '中画幅', value: 'medium_format' },
  { title: '全画幅', value: 'full_frame' },
  { title: '半画幅 (APS-C)', value: 'aps_c' },
  { title: 'M43', value: 'm43' },
  { title: '1英寸', value: 'one_inch' },
  { title: '其他', value: 'other' }
]
const lensTypeOptions = [
  { title: '定焦', value: 'prime' },
  { title: '变焦', value: 'zoom' },
  { title: '微距', value: 'macro' },
  { title: '鱼眼', value: 'fisheye' },
  { title: '移轴', value: 'tilt_shift' },
  { title: '增距镜', value: 'teleconverter' }
]
const focusTypeOptions = [
  { title: '自动对焦', value: 'autofocus' },
  { title: '手动对焦', value: 'manual' },
  { title: '自动+手动', value: 'autofocus_manual' }
]
const roleOptions = [
  { title: '管理员', value: 'ADMIN' },
  { title: '普通用户', value: 'USER' }
]

// 实体配置
const entityConfigs = {
  users: {
    label: '用户管理',
    singleLabel: '用户',
    icon: 'mdi-account-group-outline',
    fetch: apiService.users.getUsers,
    save: (id, data) => id ? apiService.users.updateUser(id, data) : apiService.users.createUser(data),
    delete: apiService.users.deleteUser,
    headers: [
      { title: 'ID', key: 'id' },
      { title: '用户名', key: 'username' },
      { title: '邮箱', key: 'email' },
      { title: '角色', key: 'role' },
      { title: '状态', key: 'is_active' },
      { title: '操作', key: 'actions', sortable: false }
    ],
    formFields: [
      { key: 'username', label: '用户名', type: 'text', required: true, md: 6 },
      { key: 'email', label: '邮箱', type: 'text', required: true, md: 6 },
      { key: 'password', label: '密码', type: 'text', required: false, md: 6, hint: '留空表示不修改' },
      { key: 'role', label: '角色', type: 'select', optionKey: 'roles', md: 6 },
      { key: 'is_active', label: '启用状态', type: 'switch', md: 12 }
    ]
  },
  brands: {
    label: '品牌管理',
    singleLabel: '品牌',
    icon: 'mdi-watermark',
    fetch: apiService.brands.getBrands,
    save: (id, data) => id ? apiService.brands.updateBrand(id, data) : apiService.brands.createBrand(data),
    delete: apiService.brands.deleteBrand,
    headers: [
      { title: 'ID', key: 'id' },
      { title: '名称', key: 'name' },
      { title: '国家', key: 'country' },
      { title: '操作', key: 'actions', sortable: false }
    ],
    formFields: [
      { key: 'name', label: '名称', type: 'text', required: true, md: 6 },
      { key: 'country', label: '国家/地区', type: 'text', md: 6 },
      { key: 'website', label: '官方网站', type: 'text', md: 12 },
      { key: 'brand_type', label: '品牌类型', type: 'text', md: 6 },
      { key: 'logo_url', label: 'Logo URL', type: 'text', md: 6 },
      { key: 'description', label: '品牌描述', type: 'textarea', md: 12 }
    ]
  },
  mounts: {
    label: '卡口管理',
    singleLabel: '卡口',
    icon: 'mdi-vector-point-select',
    fetch: apiService.mounts.getMounts,
    save: (id, data) => id ? apiService.mounts.updateMount(id, data) : apiService.mounts.createMount(data),
    delete: apiService.mounts.deleteMount,
    headers: [
      { title: 'ID', key: 'id' },
      { title: '名称', key: 'name' },
      { title: '法兰距', key: 'flange_distance' },
      { title: '操作', key: 'actions', sortable: false }
    ],
    formFields: [
      { key: 'name', label: '卡口名称', type: 'text', required: true, md: 12 },
      { key: 'flange_distance', label: '法兰距 (mm)', type: 'number', md: 6 },
      { key: 'release_year', label: '发布年份', type: 'number', md: 6 },
      { key: 'description', label: '卡口描述', type: 'textarea', md: 12 }
    ]
  },
  cameras: {
    label: '相机管理',
    singleLabel: '相机',
    icon: 'mdi-camera-outline',
    fetch: apiService.cameras.getCameras,
    save: (id, data) => id ? apiService.cameras.updateCamera(id, data) : apiService.cameras.createCamera(data),
    delete: apiService.cameras.deleteCamera,
    headers: [
      { title: 'ID', key: 'id' },
      { title: '型号', key: 'model' },
      { title: '品牌', key: 'brand_name' },
      { title: '传感器', key: 'sensor_size' },
      { title: '操作', key: 'actions', sortable: false }
    ],
    formFields: [
      { key: 'brand_id', label: '品牌', type: 'select', optionKey: 'brands', required: true, md: 6 },
      { key: 'mount_id', label: '卡口', type: 'select', optionKey: 'mounts', required: true, md: 6 },
      { key: 'series', label: '产品系列', type: 'text', md: 6 },
      { key: 'model', label: '相机型号', type: 'text', required: true, md: 6 },
      { key: 'sensor_size', label: '传感器尺寸', type: 'select', optionKey: 'sensorSizes', md: 6 },
      { key: 'megapixels', label: '有效像素 (百万)', type: 'number', md: 6 },
      { key: 'ibis_level', label: '机身防抖级别', type: 'text', md: 6 },
      { key: 'weight', label: '重量 (克)', type: 'number', md: 6 },
      { key: 'release_date', label: '发布日期', type: 'date', md: 6 },
      { key: 'release_price', label: '发布价格 (元)', type: 'number', md: 6 },
      { key: 'has_hot_shoe', label: '热靴', type: 'switch', md: 3 },
      { key: 'has_built_in_flash', label: '内置闪光灯', type: 'switch', md: 3 },
      { key: 'has_wifi', label: 'WiFi', type: 'switch', md: 3 },
      { key: 'has_bluetooth', label: '蓝牙', type: 'switch', md: 3 },
      { key: 'description', label: '备注说明', type: 'textarea', md: 12 }
    ]
  },
  lenses: {
    label: '镜头管理',
    singleLabel: '镜头',
    icon: 'mdi-camera-iris',
    fetch: apiService.lenses.getLenses,
    save: (id, data) => id ? apiService.lenses.updateLens(id, data) : apiService.lenses.createLens(data),
    delete: apiService.lenses.deleteLens,
    headers: [
      { title: 'ID', key: 'id' },
      { title: '型号', key: 'model' },
      { title: '品牌', key: 'brand_name' },
      { title: '卡口', key: 'mount_name' },
      { title: '操作', key: 'actions', sortable: false }
    ],
    formFields: [
      { key: 'brand_id', label: '品牌', type: 'select', optionKey: 'brands', required: true, md: 6 },
      { key: 'mount_id', label: '卡口', type: 'select', optionKey: 'mounts', required: true, md: 6 },
      { key: 'model', label: '镜头型号', type: 'text', required: true, md: 12 },
      { key: 'lens_type', label: '镜头类型', type: 'select', optionKey: 'lensTypes', md: 6 },
      { key: 'focus_type', label: '对焦方式', type: 'select', optionKey: 'focusTypes', md: 6 },
      { key: 'min_focal_length', label: '最小焦距 (mm)', type: 'number', md: 6 },
      { key: 'max_focal_length', label: '最大焦距 (mm)', type: 'number', md: 6 },
      { key: 'min_aperture', label: '最大光圈 (f/)', type: 'number', md: 6 },
      { key: 'max_aperture', label: '最小光圈 (f/)', type: 'number', md: 6 },
      { key: 'min_focus_distance', label: '最近对焦 (m)', type: 'number', md: 6 },
      { key: 'filter_thread', label: '滤镜口径 (mm)', type: 'number', md: 6 },
      { key: 'weight', label: '重量 (克)', type: 'number', md: 6 },
      { key: 'length', label: '长度 (mm)', type: 'number', md: 6 },
      { key: 'release_date', label: '发布日期', type: 'date', md: 6 },
      { key: 'release_price', label: '发布价格 (元)', type: 'number', md: 6 },
      { key: 'has_stabilization', label: '防抖', type: 'switch', md: 12 },
      { key: 'description', label: '备注说明', type: 'textarea', md: 12 }
    ]
  }
}

const menuItems = computed(() => {
  return Object.keys(entityConfigs).map(key => ({
    title: entityConfigs[key].label,
    value: key,
    icon: entityConfigs[key].icon
  }))
})

const currentEntity = computed(() => entityConfigs[activeTab.value])

// 获取数据方法
const fetchData = async () => {
  loading.value = true
  try {
    const response = await currentEntity.value.fetch()
    dataList.value = response.data
    
    // 如果是品牌或卡口，更新选项
    if (activeTab.value === 'brands') {
      brandOptions.value = response.data.map(b => ({ title: b.name, value: b.id }))
    } else if (activeTab.value === 'mounts') {
      mountOptions.value = response.data.map(m => ({ title: m.name, value: m.id }))
    }
  } catch (err) {
    showSnackbar('加载数据失败', 'error')
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 辅助获取选项
const getOptions = (key) => {
  if (key === 'brands') return brandOptions.value
  if (key === 'mounts') return mountOptions.value
  if (key === 'sensorSizes') return sensorSizeOptions
  if (key === 'lensTypes') return lensTypeOptions
  if (key === 'focusTypes') return focusTypeOptions
  if (key === 'roles') return roleOptions
  return []
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString()
}

// 初始加载及 Tab 切换加载
onMounted(async () => {
  // 先加载依赖选项
  try {
    const [bRes, mRes] = await Promise.all([
      apiService.brands.getBrands(),
      apiService.mounts.getMounts()
    ])
    brandOptions.value = bRes.data.map(b => ({ title: b.name, value: b.id }))
    mountOptions.value = mRes.data.map(m => ({ title: m.name, value: m.id }))
  } catch (err) {
    console.error('加载选项失败:', err)
  }
  fetchData()
})

watch(activeTab, () => {
  fetchData()
})

// 操作逻辑
const openDialog = (item = null) => {
  editingItem.value = item
  if (item) {
    formData.value = { ...item }
  } else {
    // 根据 formFields 生成初始数据
    const initialData = {}
    currentEntity.value.formFields.forEach(f => {
      if (f.type === 'switch') {
        initialData[f.key] = false
      } else if (f.type === 'number') {
        initialData[f.key] = null
      } else {
        initialData[f.key] = f.type === 'select' ? null : ''
      }
    })
    // 用户模型特例
    if (activeTab.value === 'users') {
      initialData.is_active = true
      initialData.role = 'USER'
    }
    formData.value = initialData
  }
  dialog.value = true
}

const saveItem = async () => {
  if (!formValid.value) return
  
  saving.value = true
  try {
    const id = editingItem.value ? editingItem.value.id : null
    // 过滤掉不可提交的字段和某些特例
    const dataToSave = { ...formData.value }
    delete dataToSave.id
    delete dataToSave.create_time
    delete dataToSave.update_time
    delete dataToSave.brand_name
    delete dataToSave.mount_name
    
    if (activeTab.value === 'users' && !dataToSave.password) {
      delete dataToSave.password
    }
    
    await currentEntity.value.save(id, dataToSave)
    showSnackbar(`${editingItem.value ? '编辑' : '新增'}成功`)
    dialog.value = false
    fetchData()
  } catch (err) {
    showSnackbar('保存失败', 'error')
    console.error(err)
  } finally {
    saving.value = false
  }
}

const confirmDelete = (item) => {
  itemToDelete.value = item
  deleteDialog.value = true
}

const doDelete = async () => {
  try {
    await currentEntity.value.delete(itemToDelete.value.id)
    showSnackbar('删除成功')
    deleteDialog.value = false
    fetchData()
  } catch (err) {
    showSnackbar('删除失败', 'error')
    console.error(err)
  }
}

const showSnackbar = (text, color = 'success') => {
  snackbar.value = { show: true, text, color }
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.admin-layout {
  height: 100vh;
}

.admin-sidebar {
  border-right: none !important;
}

.table-card {
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.admin-table {
  background: transparent !important;
}

.admin-table :deep(th) {
  font-weight: 600 !important;
  color: #616161 !important;
  text-transform: uppercase;
  font-size: 0.75rem !important;
  letter-spacing: 0.05em;
}

.admin-table :deep(td) {
  font-size: 0.9rem !important;
}

/* 动画过度 */
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.3s ease-in-out;
}

.v-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>


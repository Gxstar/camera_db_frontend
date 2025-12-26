<template>
  <div class="user-center">
    <!-- 顶部背景与个人资料概要 -->
    <div class="profile-header elevation-4">
      <v-img
        src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2000&auto=format&fit=crop"
        height="300"
        cover
        class="header-bg"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height bg-grey-lighten-2">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </template>
      </v-img>
      
      <v-container class="profile-info-container">
        <v-row align="end" class="profile-row">
          <v-col cols="auto">
            <v-avatar size="140" class="profile-avatar border-4 border-white elevation-10">
              <v-img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <div class="text-white mb-2">
              <h1 class="text-h3 font-weight-bold mb-1 shadow-text">阿星摄影师 (ID: {{ userId }})</h1>
              <p class="text-subtitle-1 shadow-text opacity-90">用镜头捕捉瞬间，用光影讲述故事。| 📸 徕粉 | ⛰️ 风光爱好者</p>
            </div>
          </v-col>
          <v-col cols="auto" class="pb-4">
            <v-btn color="white" variant="elevated" prepend-icon="mdi-pencil" class="text-primary font-weight-bold">
              编辑资料
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- 主体内容区 -->
    <v-container class="mt-8 mb-12">
      <v-row>
        <!-- 左侧社交/统计卡片 -->
        <v-col cols="12" md="3">
          <v-card class="rounded-xl pa-4 mb-6" elevation="2">
            <v-list density="compact">
              <v-list-item v-for="(stat, i) in stats" :key="i" class="px-0">
                <template v-slot:prepend>
                  <v-icon :icon="stat.icon" color="primary" class="mr-3"></v-icon>
                </template>
                <v-list-item-title class="font-weight-medium text-grey-darken-1">{{ stat.label }}</v-list-item-title>
                <template v-slot:append>
                  <span class="text-h6 font-weight-bold color-primary">{{ stat.value }}</span>
                </template>
              </v-list-item>
            </v-list>
            <v-divider class="my-4"></v-divider>
            <div class="px-2">
              <div class="text-overline mb-2">摄影技能</div>
              <div class="d-flex flex-wrap gap-2">
                <v-chip v-for="tag in tags" :key="tag" size="small" variant="tonal" color="primary" class="mr-2 mb-2">
                  {{ tag }}
                </v-chip>
              </div>
            </div>
          </v-card>

          <!-- 成就微章 -->
          <v-card class="rounded-xl pa-4" elevation="1">
            <div class="text-subtitle-2 font-weight-bold mb-3">获得勋章</div>
            <v-row dense>
              <v-col v-for="n in 4" :key="n" cols="3">
                <v-tooltip text="早期贡献者">
                  <template v-slot:activator="{ props }">
                    <v-avatar v-bind="props" color="amber-lighten-4" size="40">
                      <v-icon icon="mdi-medal" color="amber-darken-2"></v-icon>
                    </v-avatar>
                  </template>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- 右侧功能区 -->
        <v-col cols="12" md="9">
          <v-card class="rounded-xl" elevation="2">
            <v-tabs v-model="activeTab" color="primary" align-tabs="start" class="px-4 pt-2">
              <v-tab value="gear" class="text-none">
                <v-icon start icon="mdi-camera-outline"></v-icon>
                我的装备柜
              </v-tab>
              <v-tab value="wishlist" class="text-none">
                <v-icon start icon="mdi-heart-outline"></v-icon>
                收藏夹
              </v-tab>
              <v-tab value="activity" class="text-none">
                <v-icon start icon="mdi-comment-text-outline"></v-icon>
                动态与评价
              </v-tab>
            </v-tabs>

            <v-window v-model="activeTab" class="pa-6">
              <!-- 装备柜 -->
              <v-window-item value="gear">
                <div class="d-flex align-center justify-space-between mb-6">
                  <h3 class="text-h6 font-weight-bold">持有器材 ({{ userGear.length }})</h3>
                  <v-btn variant="text" color="primary" prepend-icon="mdi-plus">添加动态</v-btn>
                </div>
                <v-row>
                  <v-col v-for="item in userGear" :key="item.id" cols="12" sm="6" lg="4">
                    <v-card variant="outlined" class="gear-card rounded-lg overflow-hidden">
                      <v-img :src="item.image" height="150" cover></v-img>
                      <v-card-text>
                        <div class="d-flex justify-space-between align-start">
                          <div>
                            <div class="text-subtitle-1 font-weight-bold">{{ item.name }}</div>
                            <div class="text-caption text-grey">{{ item.brand }} | {{ item.type }}</div>
                          </div>
                          <v-chip size="x-small" color="primary" variant="flat">主力</v-chip>
                        </div>
                        <div class="mt-3 text-caption text-medium-emphasis">
                          <v-icon icon="mdi-calendar" size="14" class="mr-1"></v-icon>
                          购入于 {{ item.purchasedAt }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- 收藏夹 -->
              <v-window-item value="wishlist">
                <v-row>
                  <v-col v-for="item in wishlist" :key="item.id" cols="12" sm="6">
                    <v-list-item border rounded="lg" class="mb-3 pa-4">
                      <template v-slot:prepend>
                        <v-avatar rounded="lg" size="80" class="mr-4">
                          <v-img :src="item.image" cover></v-img>
                        </v-avatar>
                      </template>
                      <v-list-item-title class="text-h6 font-weight-bold">{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle class="mt-1">
                        预计心理价位: <span class="text-primary font-weight-bold">￥{{ item.targetPrice }}</span>
                      </v-list-item-subtitle>
                      <template v-slot:append>
                        <v-btn icon="mdi-heart" color="red" variant="text"></v-btn>
                      </template>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- 评价动态 -->
              <v-window-item value="activity">
                <v-timeline side="end" align="start" density="compact">
                  <v-timeline-item v-for="comment in comments" :key="comment.id" dot-color="primary" size="small">
                    <v-card class="elevation-1 rounded-lg">
                      <v-card-title class="text-subtitle-1 pb-0">
                        评价了 <span class="text-primary">{{ comment.target }}</span>
                        <v-rating
                          :model-value="comment.rating"
                          color="amber"
                          density="compact"
                          half-increments
                          readonly
                          size="small"
                          class="ml-2 d-inline-flex"
                        ></v-rating>
                      </v-card-title>
                      <v-divider class="mx-4 mt-2 mb-1"></v-divider>
                      <v-card-text class="text-body-2 text-grey-darken-1">
                        "{{ comment.content }}"
                      </v-card-text>
                      <v-card-actions class="pt-0 pr-4 justify-end">
                        <span class="text-caption text-disabled">{{ comment.date }}</span>
                      </v-card-actions>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = ref(route.params.id)

const activeTab = ref('gear')

const stats = ref([
  { label: '持有器材', value: 8, icon: 'mdi-camera' },
  { label: '希望清单', value: 12, icon: 'mdi-heart' },
  { label: '点赞总数', value: '1.2k', icon: 'mdi-thumb-up' },
  { label: '发表评论', value: 45, icon: 'mdi-comment' }
])

const tags = ['风光摄影', '人文纪实', '大疆特约', '胶片控', '后期大神']

const userGear = ref([
  { id: 1, name: 'EOS R5', brand: 'Canon', type: '机身', purchasedAt: '2023-05', image: 'https://images.unsplash.com/photo-1616423642157-194168019782?q=80&w=400' },
  { id: 2, name: 'RF 24-70mm f/2.8L', brand: 'Canon', type: '镜头', purchasedAt: '2023-06', image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=400' },
  { id: 3, name: 'X100V', brand: 'Fujifilm', type: '机身', purchasedAt: '2022-12', image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=400' }
])

const wishlist = ref([
  { id: 1, name: 'Leica M11', targetPrice: '58,000', image: 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=400' },
  { id: 2, name: 'A7R V', targetPrice: '21,999', image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=400' }
])

const comments = ref([
  { id: 1, target: 'Canon RF 50mm f/1.2L', rating: 5, content: '现代光学设计的巅峰，全开光圈锐度惊人，虽然沉重但是绝对值得。', date: '2天前' },
  { id: 2, target: 'Fujifilm X-T5', rating: 4.5, content: '复古操纵感非常棒，4000万像素细节满满。', date: '1周前' },
  { id: 3, target: 'Sony A7R IV', rating: 4, content: '画质没得说，就是屏幕发色一直让我有点纠结。', date: '1个月前' }
])
</script>

<style scoped>
.user-center {
  background-color: #f8fafc;
  min-height: 100vh;
}

.profile-header {
  position: relative;
  background-color: #000;
}

.header-bg {
  filter: brightness(0.7);
}

.profile-info-container {
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 2rem;
  margin-top: -80px;
  position: relative;
}

.profile-avatar {
  background-color: white;
  margin-top: -40px;
}

.shadow-text {
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.gear-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: white;
}

.gear-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.opacity-90 {
  opacity: 0.9;
}

.color-primary {
  color: #1867C0;
}

.gap-2 {
  gap: 8px;
}
</style>

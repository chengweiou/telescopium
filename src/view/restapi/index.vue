<template>
  <request v-for="(e, i) in formList" :key="`req${i}`" :reqi="i"/>
  <div class="df df-aic" @click="add">
    # <icon-circle-plus style="margin: 3px; width: 18px; height: 18px;"/>
  </div>
  <el-divider/>
</template>

<script setup>
// tip: 导入 component
import request from './request.vue'
import { CirclePlus as IconCirclePlus } from '@element-plus/icons'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, emptyFn, clone, storage } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
const formList = computed(() => store.state.restapi.formList)
const restList = computed(() => store.state.restapi.restList)
// tip: 定义 方法
const add = () => {
  store.dispatch('restapi/add')
}
// tip: 初始化空数据
</script>

<style scoped>
</style>

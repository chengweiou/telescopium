<template>
  <div style="width: 100%;">
    <div class="df df-jcsb" style="height: 60px;">
      <section class="center pointer" style="font-size: 24px; " @click="go('restapi')">后端api测试系统</section>
    </div>
  </div>
</template>

<script setup>
// tip: 导入 component
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
// tip: 定义 方法
const go = (v) => {
  if (route.name == v) return
  store.dispatch('tab/changeAsider', v)
  router.push({ name: v })
}
// tip: 初始化空数据
</script>

<style scoped>
</style>

<style>
</style>

<i18n>
en:
  login: login
zh:
  login: 登录
</i18n>

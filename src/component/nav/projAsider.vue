<template>
  <el-menu :default-active="active" :collapse="isCollapse" class="el-menu-vertical">
    <el-menu-item index="restapi" @click="goAsider('restapi')"><icon-document-checked style="margin: 3px; width: 12px;"/>restapi</el-menu-item>
    <el-sub-menu index="i18nGroup">
      <template #title>
        <icon-location style="margin: 3px; width: 12px;"/>
        <span>语言</span>
      </template>
    <el-menu-item index="i18nZh" @click="changeLanguage('zh')">中文</el-menu-item>
    <el-menu-item index="i18nEn" @click="changeLanguage('en')">English</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
// tip: 导入 component
import { DocumentChecked as IconDocumentChecked, Location as IconLocation } from '@element-plus/icons'
// tip: 导入 data
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, emptyFn, clone, storage } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute(), { t, locale } = useI18n({ inheritLocale: true })
// tip: 定义 页面
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
const isCollapse = ref(false)
// tip: 定义 computed 计算的
const me = computed(() =>store.state.me.user)
const active = computed(() =>store.state.tab.asider)
// tip: 定义 方法
const go = (v) => {
  if (route.name == v) return
  router.push({ name: v })
}
const goAsider = (v) => {
  if (route.name == v) return
  store.dispatch('tab/changeAsider', v)
  go(v)
}
const onLogin = () => {
  store.dispatch('me/onLogin')
}
const logout = () => {
  store.dispatch('me/logout')
}
const changeLanguage = (v) => {
  locale.value = v
  storage.set('lang', locale.value)
}

// tip: 初始化空数据
// tip 其他生命周期
onMounted(() => {
  window.onresize = () => {
    let w = document.body.clientWidth
    isCollapse.value = w < 800
  }

})
</script>


<style scoped>

</style>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
  min-width: 150px;
}
.el-menu {
  color: #fff;
  background: transparent;
  --el-menu-background-color: transparent;
  --el-menu-hover-background-color: #3a5fe6;
  --el-menu-text-color: #fff;
  background-color: transparent;
}
</style>

<i18n>
en:
  login: login
zh:
  login: 登录
</i18n>

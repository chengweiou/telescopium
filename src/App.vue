<template>
  <div class="f-c" style="height: 100%;">
    <router-view name="full"/>
    <fail-box/>
  </div>
</template>

<script setup>
// tip: 导入 component
import FailBox from '@/component/failBox/index.vue'
// tip: 导入 data
// tip: 定义 各种 use
// tip: 定义 页面
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
// tip: 初始化空数据
</script>


<script>
export default {
  name: 'App',
}
</script>

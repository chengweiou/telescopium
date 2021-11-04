<template>
  <div>
    <el-form-item>
      <el-container>
        <div style="margin-right: 20px; flex: 1;">{{kName}}</div>
        <div style="margin-right: 20px; flex: 1;">{{vName}}</div>
        <el-button @click="$emit('addMethod')">增加</el-button>
      </el-container>

    </el-form-item>
    <el-form-item v-for="(e, i) in list" :key="`h${i}`">
      <el-container>
        <el-input v-model="e.k" style="margin-right: 20px;"/><el-input v-model="e.v" style="margin-right: 20px;" /><el-button @click.prevent="$emit('addMethod', i)">删除</el-button>
      </el-container>
    </el-form-item>
    <el-form-item>
      <slot name="shortcut"/>
    </el-form-item>
  </div>
</template>

<script setup>
// tip: 导入 component
// tip: 导入 data
// tip: 定义 各种 use
// tip: 定义 页面
defineProps({
  kName: { type: String, default: 'k' },
  vName: { type: String, default: 'v' },
  addMethod: { type: Function, default: () => {} },
  removeMethod: { type: Function, default: () => {} },
  list: { type: Array, required: true },
})
defineEmits(['addMethod', 'removeMethod'])
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
// tip: 初始化空数据
</script>

<style scoped>
</style>

<template>
  <div>
    <el-form-item>
      <el-container>
        <div style="margin-right: 20px; flex: 1;">{{kName}}</div>
        <div style="margin-right: 20px; flex: 1;">{{vName}}</div>
        <el-button @click="addMethod">增加</el-button>
      </el-container>

    </el-form-item>
    <el-form-item v-for="(e, i) in list" :key="`h${i}`">
      <el-container>
        <el-input v-model="e.k" style="margin-right: 20px;"/><el-input v-model="e.v" style="margin-right: 20px;" /><el-button @click.prevent="removeMethod(i)">删除</el-button>
      </el-container>
    </el-form-item>
    <el-form-item>
      <slot name="shortcut"/>
    </el-form-item>
  </div>
</template>

<script>

export default {
  props: {
    kName: { type: String, default: 'k' },
    vName: { type: String, default: 'v' },
    addMethod: { type: Function, default: () => {} },
    removeMethod: { type: Function, default: () => {} },
    list: { type: Array, required: true },
  },
}
</script>
<style scoped>
</style>

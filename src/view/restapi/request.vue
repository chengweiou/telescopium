<template>
  <input :id="`req${reqi}`" type="checkbox" class="reqChk " style="display: none;" >
  <div class="df df-wrap" style="">
    <label class="pointer" :for="`req${reqi}`" style="width: 50px;"># {{reqi + 1}}</label>
    <el-form ref="formEl" :model="form" :rules="rules" style="margin-right: 20px; flex: 1;" @submit.prevent>
      <el-form-item prop="url">
        <div class="df">
          <el-radio-group v-model="form.method" size="mini">
            <el-radio-button v-for="e in methodList" :key="e" :label="e"></el-radio-button>
          </el-radio-group>
          <div style="flex: 1;">
            <el-input v-model="form.url" @keyup.enter="send" />
          </div>

        </div>
      </el-form-item>
      <requestKv :k-name="`Header Name`" :v-name="`Header Value`" :list="form.headerList" @add-method="addHeader" @remove-method="removeHeader">
        <template #shortcut>
          <el-button @click.prevent="addToken">token</el-button>
          <el-button @click.prevent="addLoginAccount">loginAccount</el-button>
        </template>
      </requestKv>
      <requestKv :k-name="`Param Name`" :v-name="`Param Value`" :list="form.paramList" @add-method="addParam" @remove-method="removeParam">
      </requestKv>
    </el-form>
    <div style="width: 100px;">
      <el-button v-loading="loading" :disabled="loading" @click="send">Fetch</el-button>
    </div>
    <div class="collapse-box" style="margin-bottom: 20px; flex: 1; border-radius: 3px;">
      <div class="collapse" style="word-break: break-all;">{{rest}}</div>
    </div>
    <div class="center pointer" style="width: 50px; height: 50px; background: black; border-radius: 50%; position: relative; left: -20px;" @click="remove"><icon-delete style="width: 12px;"/></div>
  </div>
  <el-divider/>
</template>

<script setup>
// tip: 导入 component
import requestKv from './requestKv.vue'
import { Delete as IconDelete } from '@element-plus/icons'
import { ElNotification } from 'element-plus'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, emptyFn, clone, storage } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
const props = defineProps({
  reqi: { type: Number, default: 0 },
})
const formEl = ref(null)
// tip: 定义 不需要关联的
const rules = {
  url: [{ required: true, message: 'please input url', trigger: 'blur' }],
}
// tip: 定义 需要关联的
const loading = ref(false)
// tip: 定义 computed 计算的
const form = computed(() => store.state.restapi.formList[props.reqi])
const rest = computed(() => store.state.restapi.restList[props.reqi])
const methodList = computed(() => store.state.restapiTrans.methodList)
// tip: 定义 方法
const remove = () => {
  store.dispatch('restapi/remove', { reqi: props.reqi })
}
const addHeader = () => {
  form.value.headerList.push({k: '', v: ''})
}
const removeHeader = (i) => {
  form.value.headerList.splice(i, 1)
}
const addToken = () => {
  if (form.value.headerList.filter(e => e.k=='token').length) return
  form.value.headerList.unshift({k: 'token', v: ''})
}
const addLoginAccount = () => {
  if (form.value.headerList.filter(e => e.k=='loginaccount').length) return
  let i = form.value.headerList.filter(e => e.k=='token').length
  form.value.headerList.splice(i, 0, {k: 'loginaccount', v: '{"person":{"id":1}}'})
}
const addParam = () => {
  form.value.paramList.push({k: '', v: ''})
}
const removeParam = (i) => {
  form.value.paramList.splice(i, 1)
}
const send = () => {
  formEl.value.validate(async(valid) => {
    if (!valid) return false
    loading.value = true
    form.value.headerList = form.value.headerList.filter(e => e.k && e.v)
    form.value.paramList = form.value.paramList.filter(e => e.k && e.v)
    let pList = await Promise.all([store.dispatch('restapi/send', { reqi: props.reqi, ...form.value }), wait(1000)])
    loading.value = false
    if (!pList[0]) return
    ElNotification({ type: 'success', title: '成功' })
  })


}
// tip: 初始化空数据
</script>

<style scoped>
.reqChk ~ div {
  overflow: hidden;
  transition: max-height ease-in-out .75s;
  max-height: 3000px;
}
.reqChk ~ div > .collapse-box {
  border: 1px solid #ADD8E6;
}
.reqChk ~ div > .collapse-box > .collapse {
  margin: 20px;
}
.reqChk:checked ~ div {
  max-height: 30px;
}
.reqChk:checked ~ div > .collapse-box {
  border: none;
}
.reqChk:checked ~ div > .collapse-box > .collapse {
  margin: 0;
}
</style>

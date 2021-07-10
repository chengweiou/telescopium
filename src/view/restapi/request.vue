<template>
  <input :id="`req${reqi}`" type="checkbox" class="reqChk " style="display: none;" >
  <div class="df df-wrap" style="">
    <label class="pointer" :for="`req${reqi}`" style="width: 50px;"># {{reqi + 1}}</label>
    <el-form ref="form" :model="form" :rules="rules" style="margin-right: 20px; flex: 1;" @submit.prevent>
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
      <requestKv :k-name="`Header Name`" :v-name="`Header Value`" :list="form.headerList" :add-method="addHeader" :remove-method="removeHeader">
        <template #shortcut>
          <el-button @click.prevent="addToken">token</el-button>
          <el-button @click.prevent="addLoginAccount">loginAccount</el-button>
        </template>
      </requestKv>
      <requestKv k-name="`Param Name`" :v-name="`Param Value`" :list="form.paramList" :add-method="addParam" :remove-method="removeParam">
      </requestKv>
    </el-form>
    <div style="width: 100px;">
      <el-button v-loading="loading" :disabled="loading" @click="send">Fetch</el-button>
    </div>
    <div class="collapse-box" style="margin-bottom: 20px; flex: 1; border-radius: 3px;">
      <div class="collapse" style="word-break: break-all;">{{rest}}</div>
    </div>
    <div class="center pointer" style="width: 50px; height: 50px; background: black; border-radius: 50%; position: relative; left: -20px;" @click="remove"><i class="el-icon-delete"></i></div>
  </div>
  <el-divider/>
</template>

<script>
import requestKv from './requestKv.vue'
export default {
  components: {
    requestKv,
  },
  props: {
    reqi: { type: Number, default: 0 },
  },
  data() {
    return {
      rules: {
        url: [{ required: true, message: 'please input url', trigger: 'blur' }],
      },
      loading: false,
    }
  },
  computed: {
    form() { return this.$store.state.restapi.formList[this.reqi] },
    rest() { return this.$store.state.restapi.restList[this.reqi] },
    methodList() { return this.$store.state.restapiTrans.methodList },
  },
  created() {
  },
  methods: {
    remove() {
      this.$store.dispatch('restapi/remove', { reqi: this.reqi })
    },
    addHeader() {
      this.form.headerList.push({k: '', v: ''})
    },
    removeHeader(i) {
      this.form.headerList.splice(i, 1)
    },
    addToken() {
      if (this.form.headerList.filter(e => e.k=='token').length) return
      this.form.headerList.unshift({k: 'token', v: ''})
    },
    addLoginAccount() {
      if (this.form.headerList.filter(e => e.k=='loginaccount').length) return
      let i = this.form.headerList.filter(e => e.k=='token').length
      this.form.headerList.splice(i, 0, {k: 'loginaccount', v: '{"person":{"id":1}}'})
    },
    addParam() {
      this.form.paramList.push({k: '', v: ''})
    },
    removeParam(i) {
      this.form.paramList.splice(i, 1)
    },
    send() {
      this.$refs.form.validate(async(valid) => {
        if (!valid) return false
        this.loading = true
        this.form.headerList = this.form.headerList.filter(e => e.k && e.v)
        this.form.paramList = this.form.paramList.filter(e => e.k && e.v)
        let pList = await Promise.all([this.$store.dispatch('restapi/send', { reqi: this.reqi, ...this.form }), this.$wait(1000)])
        this.loading = false
        if (!pList[0]) return
        this.$notify({ type: 'success', title: '成功' })
      })


    },
  },
}
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

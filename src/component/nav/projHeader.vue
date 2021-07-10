<template>
  <div style="width: 100%;">
    <div class="df df-jcsb" style="height: 60px;">
      <section class="center pointer" style="font-size: 24px; " @click="go('restapi')">后端api测试系统</section>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    me() { return this.$store.state.me.user },
  },
  methods: {
    go(v) {
      if (this.$route.name == v) return
      this.$store.dispatch('tab/changeAsider', v)
      this.$router.push({ name: v })
    },
  },
}
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

<template>
  <request v-for="(e, i) in formList" :key="`req${i}`" :reqi="i"/>
  <div @click="add">
    # <i class="el-icon-circle-plus-outline"></i>
    <el-divider/>
  </div>
</template>

<script>
import request from './request.vue'
export default {
  components: {
    request,
  },
  data() {
    return {
    }
  },
  computed: {
    formList() { return this.$store.state.restapi.formList },
    restList() { return this.$store.state.restapi.restList },
  },
  created() {
  },
  methods: {
    add() {
      this.$store.dispatch('restapi/add')
    },
  },
}
</script>
<style scoped>
</style>

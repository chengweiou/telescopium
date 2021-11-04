<template>
  <div class="el-input-div">
    <slot></slot>
  </div>
</template>

<style scoped>
.el-input-div {
  /* todo 旧版的再div这边，新版的到label那边去了？ */
  /* margin-left: 16px; */
  margin-bottom: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

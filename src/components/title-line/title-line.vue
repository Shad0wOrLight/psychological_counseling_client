<template>
  <!-- 标题行 -->
  <div class="titleLine">
    <div class="titleText">{{ title }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style lang="less" scoped>
.titleText {
  height: 20px;
  padding-left: 15px;
  color: #414141;
  font-size: 13px;
  line-height: 20px;
  border-left: 10px solid rgb(80, 191, 96);
  margin-bottom: 5px;
}
</style>

<template>
  <!-- 帖子封面 -->
  <div class="articleBox">
    <van-cell
      v-for="item in list"
      :key="item.id"
      class="item"
      center
      :to="`/forum/article/${item.id}`"
    >
      <template #title>
        <h3>{{ item.title }}</h3>
        <div class="label">{{ item.content }}</div>
      </template>
      <template #value>
        <span class="time">{{ timediff(item.createTime) }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script setup>
import { timediff } from "@/utils/format";

const porps = defineProps({
  list: Array,
});
</script>

<style lang="less" scoped>
.item {
  .label {
    width: 270px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .time {
    display: inline-block;
    padding-top: 22px;
    font-size: 12px;
  }
}
</style>

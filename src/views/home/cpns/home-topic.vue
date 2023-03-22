<template>
  <div class="homeTopic">
    <title-line title="帖子交流" />
    <ArticleBox :list="articleList" />
    <RouterLink class="more" to="/forum">更多帖子</RouterLink>
  </div>
</template>

<script setup>
import TitleLine from "@/components/title-line/title-line.vue";
import useHomeStore from "@/stores/modules/home";
import ArticleBox from "@/views/forum/cpns/article-box.vue";
import { storeToRefs } from "pinia";

const { articleList } = storeToRefs(useHomeStore());
</script>

<style lang="less" scoped>
.homeTopic {
  border-top: 10px solid #eeeeee;
  padding-top: 15px;
  .more {
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>

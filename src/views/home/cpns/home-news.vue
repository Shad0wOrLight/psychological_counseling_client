<template>
  <div class="newsList">
    <title-line title="心理资讯" />
    <NewsBox :list="newsList" />
    <RouterLink class="more" to="/news">更多资讯</RouterLink>
  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import NewsBox from "../../../components/news-box/news-box.vue";
import TitleLine from "@/components/title-line/title-line.vue";
const homeStore = useHomeStore();
const { newsList } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.newsList {
  border-top: 10px solid #eeeeee;
  padding-top: 15px;
}
.more {
  display: block;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>

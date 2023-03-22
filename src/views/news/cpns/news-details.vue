<template>
  <!-- 资讯详情 -->
  <div class="newsDetails">
    <!-- 导航栏 -->
    <nav-bar title="详情"></nav-bar>
    <!-- 内容主体 -->
    <div class="container">
      <router-link
        class="type"
        :to="{ name: 'news', params: { type: news?.type } }"
      >
        {{ news?.type }}
      </router-link>

      <div class="title">{{ news?.title }}</div>
      <div class="desc">
        <span>发布于{{ dateFormat(news?.createTime) }}</span>
        <span class="author">{{ news?.author }}</span>
      </div>
      <div class="cover">
        <img :src="news?.cover" alt="" />
      </div>
      <p class="content" v-html="news?.content"></p>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/nav-bar/nav-bar.vue";
import { dateFormat } from "@/utils/format";
import useHomeStore from "@/stores/modules/home";
import { useRoute } from "vue-router";
import useNewsStore from "@/stores/modules/news";

const homeStore = useHomeStore();
const newsStore = useNewsStore();
const route = useRoute();

//当前热门列表
const list = newsStore.currentList.length
  ? newsStore.currentList
  : homeStore.newsList;
const news = list.find((news) => news.id == route.query.id); //当前分类下的资讯列表
</script>

<style lang="less" scoped>
.container {
  padding: 15px 15px 0 15px;
  .type {
    display: block;
    width: 70px;
    height: 25px;
    background: #5cc665;
    font-size: 13px;
    line-height: 25px;
    text-align: center;
    color: #fff;
  }
  .title {
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
  }
  .desc {
    margin-top: 10px;
    font-size: 13px;
    color: #a7a7a7;
    .author {
      margin-left: 10px;
      color: #279f32;
    }
  }
  .cover {
    margin-top: 15px;
    text-align: center;
  }
  .content {
    font-size: 14px;
    font-family: Arial;
    line-height: 1.7em;
  }
}
</style>

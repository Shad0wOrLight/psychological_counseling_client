<template>
  <div class="home">
    <!-- 顶部搜索栏 -->
    <SearchBar />
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="4000"
      indicator-color="white"
      lazy-render
    >
      <van-swipe-item v-for="banner in bannerList" :key="banner.id">
        <img :src="banner.src" />
      </van-swipe-item>
    </van-swipe>
    <!-- 菜单栏 -->
    <van-grid :column-num="3" border center>
      <van-grid-item
        v-for="item in menuList"
        :key="item.id"
        :icon="item.icon"
        :text="item.text"
        :to="item.path"
      />
    </van-grid>
    <!-- 首页文章列表 -->
    <home-news />
    <!-- 首页测评列表 -->
    <HomeEvaluation />
    <!-- 首页咨询师列表 -->
    <HomeConsult />
    <!-- 帖子列表 -->
    <HomeTopic />
  </div>
</template>

<script setup>
import HomeNews from "./cpns/home-news";
import bannerList from "@/assets/data/banner";
import menuList from "@/assets/data/menu";
import useHomeStore from "@/stores/modules/home";
import HomeEvaluation from "./cpns/home-evaluation.vue";
import HomeConsult from "./cpns/home-consult.vue";
import HomeTopic from "./cpns/home-topic.vue";
import SearchBar from "./cpns/search-bar.vue";

const homeStroe = useHomeStore();
//获取首页信息
homeStroe.getAllNews();
homeStroe.getAllEvaluation();
homeStroe.getAllConsultant();
homeStroe.getAllArticle();
</script>

<style lang="less" scoped>
.home {
  .van-nav-bar__title {
    color: rgb(80, 191, 96);
  }
  /deep/ .van-grid-item__text {
    font-size: 14px;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>

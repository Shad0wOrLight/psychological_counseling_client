<template>
  <!-- 资讯主界面 -->
  <div class="news">
    <nav-bar title="资讯" />
    <!-- 标签栏 -->
    <van-tabs
      v-model:active="activeName"
      sticky
      offset-top="46px"
      color="#4bc956"
      title-active-color="#4bc956"
      @click-tab="clickTab"
    >
      <!-- 资讯列表 -->
      <div class="newsList">
        <van-tab v-for="item in typeList" :title="item.name" :name="item.name">
          <div class="tags">
            <van-tag
              :class="currentIndex == index ? 'active' : 'tag'"
              v-for="(tag, index) in item.tags"
              round
              size="medium"
              @click="filterByTag(tag, index)"
            >
              {{ tag }}
            </van-tag>
          </div>

          <HotRecomend title="热门资讯" :list="currentHotList" />
          <div class="now">
            <TitleLine title="最新资讯" />
          </div>
          <NewsBox :list="newList" />
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>

<script setup>
import NavBar from "@/components/nav-bar/nav-bar.vue";
import typeList from "@/assets/data/types";
import HotRecomend from "@/components/hot-recomend/hot-recomend.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import useNewsStore from "@/stores/modules/news";
import { storeToRefs } from "pinia";
import NewsBox from "@/components/news-box/news-box.vue";
import TitleLine from "@/components/title-line/title-line.vue";

const newsStore = useNewsStore();
const route = useRoute();
const { newList, currentTabName, currentHotList } = storeToRefs(newsStore);

const { type = "" } = route.params;
const activeName = type ? ref(type) : ref(currentTabName); //当前选中的标签名
const currentIndex = ref(-1); //当前分类标签索引

// 选择分类标签后
const filterByTag = (tag, index) => {
  currentIndex.value = index;
  const type = activeName.value == "全部" ? "" : activeName.value;
  newsStore.findNews({ type, tags: tag });
};

// 改变标签页名称
const clickTab = ({ name }) => {
  currentIndex.value = -1;
  activeName.value = name;
};

//监听当前标签选项
watch(
  activeName,
  (type) => {
    if (type == "全部") {
      newsStore.findNews();
    } else {
      newsStore.findNews({ type });
    }
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.newsList {
  margin-top: 15px;
  .tags {
    display: flex;
    justify-content: space-around;
    margin-bottom: 8px;
    .tag {
      padding: 5px 10px;
      color: #909090;
      background-color: #f0f0f0;
    }
    .active {
      padding: 5px 10px;
      background-color: #4bc956;
      color: #fff;
    }
  }
  .now {
    margin-top: 15px;
  }
}
</style>

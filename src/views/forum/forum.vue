<template>
  <!-- 论坛主界面 -->
  <div class="forum">
    <!-- 标签栏 -->
    <van-tabs sticky>
      <van-tab title="最新">
        <div class="content">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <ArticleBox :list="articleList" />
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="专题">
        <div class="container">
          <div class="menu">
            <van-sticky :offset-top="44">
              <van-sidebar v-model="active" @change="typeChange">
                <van-sidebar-item
                  v-for="item in types"
                  :key="item"
                  :title="item"
                />
              </van-sidebar>
            </van-sticky>
          </div>

          <div class="list">
            <van-cell
              v-for="item in currentList"
              :key="item.id"
              class="item"
              center
              :to="`/forum/article/${item.id}`"
            >
              <template #title>
                <h4>{{ item.title }}</h4>
                <div class="label">{{ item.content }}</div>
              </template>
              <template #value>
                <span class="time">{{ timediff(item.createTime) }}</span>
              </template>
            </van-cell>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 发布帖子图标入口 -->
    <div class="icon" @click="router.push('/article/add')">
      <van-icon name="add" size="50" />
    </div>
  </div>
</template>

<script setup>
import useForumStore from "@/stores/modules/forum";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import ArticleBox from "./cpns/article-box.vue";
import { timediff } from "@/utils/format";
import { useRouter } from "vue-router";

const router = useRouter();
const forumStore = useForumStore();
forumStore.getAllArticle();
const { articleList, currentList } = storeToRefs(forumStore);

const active = ref(0); //侧边栏索引
const loading = ref(false); //是否加载中
const types = ["婚恋", "职场", "家庭", "其他"]; //帖子分类

//下拉刷新
const onRefresh = () => {
  forumStore.getAllArticle().then(() => {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
};

//种类改变
const typeChange = (i) => {
  forumStore.changeCurrentList(articleList.value, types[i]);
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .list {
    width: 295px;
    flex: 1;
  }
  .item {
    .label {
      width: 200px;
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
}

.icon {
  position: fixed;
  bottom: 150px;
  right: 45px;
}
</style>

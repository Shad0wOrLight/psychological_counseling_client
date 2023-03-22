div
<template>
  <div class="nav-bar">
    <div class="search">
      <van-search
        v-model="keyword"
        show-action
        :clearable="false"
        placeholder="请输入搜索关键词"
        @search="globalSearch"
        @cancel="onCancel"
        @update:model-value="globalSearch"
        @focus="show = true"
      />
    </div>
    <!-- 搜索结果列表 -->
    <div class="list" v-if="show">
      <div class="record">
        <div class="history">历史记录</div>
        <van-icon name="delete-o" @click="deleteHistory" />
      </div>
      <div class="tags">
        <van-tag
          class="tag"
          round
          size="medium"
          v-for="(item, index) in history"
          @click="searchHistory(index)"
        >
          {{ item }}
        </van-tag>
      </div>
      <div class="item" v-if="searchList?.userList?.length">
        <TitleLine title="咨询师列表" />
        <ConsultList
          :list="searchList?.userList?.filter((item) => item.role == 1)"
        />
      </div>
      <div class="item" v-if="searchList?.newsList?.length">
        <TitleLine title="资讯列表" />

        <NewsBox :list="searchList?.newsList" />
      </div>
      <div class="item" v-if="searchList?.articleList?.length">
        <TitleLine title="帖子列表" />
        <ArticleBox :list="searchList?.articleList" />
      </div>
      <div class="item" v-if="searchList?.questionnaireList?.length">
        <TitleLine title="测评列表" />
        <EvaluationBox :list="searchList?.questionnaireList" />
      </div>
      <van-empty
        image="search"
        description="没有搜索到相关内容哦"
        v-if="searchEmpty"
      />
    </div>
  </div>
</template>

<script setup>
import EvaluationBox from "@/components/evaluation-box/evaluation-box.vue";
import NewsBox from "@/components/news-box/news-box.vue";
import TitleLine from "@/components/title-line/title-line.vue";
import useHomeStore from "@/stores/modules/home";
import ConsultList from "@/views/consult/cpns/consult-list.vue";
import ArticleBox from "@/views/forum/cpns/article-box.vue";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { debounce } from "@/utils/debounce";

const homeStore = useHomeStore();
homeStore.changeSearchList("");
const { searchList } = storeToRefs(homeStore);

const keyword = ref(""); //关键字
const history = ref([]); //历史记录
const show = ref(false); //是否展示搜索结果弹框
//搜索结果是否为空
const searchEmpty = computed(() => {
  return Object.values(searchList.value).every((item) => item.length == 0);
});

// 取消搜索
const onCancel = () => {
  keyword.value = "";
  homeStore.changeSearchList("");
  show.value = false;
};

// 全局搜索
const fn = () => {
  if (keyword.value) {
    homeStore.search(keyword.value).then(() => {
      if (!history.value.includes(keyword.value)) {
        history.value.push(keyword.value);
      }
    });
  } else {
    homeStore.changeSearchList("");
  }
};
const globalSearch = debounce(fn, 500, keyword.value);

// 清空历史记录
const deleteHistory = () => {
  history.value = [];
};
// 根据历史记录搜索
const searchHistory = (i) => {
  keyword.value = history.value[i];
  globalSearch();
};
</script>

<style lang="less" scoped>
.nav-bar {
  position: relative;

  .list {
    position: absolute;
    width: 100%;
    top: 54px;
    z-index: 1;
    background-color: #f7f7f7;
    min-height: 345px;
    .record {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 20px 0 15px;
    }
    .tags {
      margin-top: 10px;
      margin-left: 20px;

      .tag {
        margin-right: 10px;
        margin-bottom: 8px;
        padding: 5px 10px;
        color: #909090;
        background-color: #f0f0f0;
      }
    }
    .item {
      margin-top: 15px;
    }
  }
}
</style>

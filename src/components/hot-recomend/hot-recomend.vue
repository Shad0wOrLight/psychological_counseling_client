<template>
  <!-- 热门推荐组件 -->
  <div class="hotRecomend">
    <TitleLine :title="title" />
    <div class="hotList">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="showDetails(item)"
      >
        <div class="image">
          <img :src="item.cover" alt="" />
        </div>
        <div class="desc">
          <span>{{ item.title || item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TitleLine from "@/components/title-line/title-line.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  title: String,
  list: Array,
});
const router = useRouter();

// 展示资讯详情
const showDetails = (item) => {
  const path =
    props.title == "热门资讯" ? "/news/details" : "/evaluation/details";
  router.push({ path, query: { id: item.id } });
};
</script>

<style lang="less" scoped>
.hotRecomend {
  .hotList {
    overflow: hidden;
    overflow-x: scroll;
    display: flex;
    .item {
      padding: 10px;
      .image {
        width: 120px;
        height: 100px;
        img {
          border-radius: 8px;

          max-width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .desc {
        width: 120px;

        margin-top: 5px;
        font-size: 13px;
        overflow: hidden;
        display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
        -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
        -webkit-line-clamp: 2; /* 显示的行数 */
      }
    }
  }
}
.hotList::-webkit-scrollbar {
  // 隐藏滚动条
  display: none;
}
</style>

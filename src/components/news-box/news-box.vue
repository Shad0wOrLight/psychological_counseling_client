<template>
  <!-- 资讯封面信息 -->
  <div class="cover">
    <div class="news-box">
      <div class="item" v-for="item in list" :key="item.id">
        <van-card @click="showDetail(item)">
          <template #price>
            <van-tag plain round size="medium" v-for="tag in item.tags">
              {{ tag }}
            </van-tag>
          </template>
          <template #tags>
            <div class="desc">{{ item.author }}</div>
          </template>
          <template #thumb>
            <img class="cover" :src="item.cover" alt="" />
          </template>
          <template #title>
            <div class="title">{{ item.title }}</div>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  list: Array,
});

const router = useRouter();
const showDetail = ({ id }) => {
  router.push({
    name: "newsDetails",
    query: {
      id,
    },
  });
};
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid rgb(238, 238, 238);
  margin: 5px 0;
  .van-card {
    background: none;
    .van-card__thumb {
      .cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    /deep/ .van-card__content {
      font-size: 16px;
      color: #000018;
      padding-left: 10px;
    }
    .desc {
      font-size: 14px;
      font-weight: normal;
      position: absolute;
      top: 43px;
    }
    .van-tag--default.van-tag--plain {
      margin-right: 5px;
      font-weight: normal;
      color: #a7a7a7;
    }
  }
}
</style>
